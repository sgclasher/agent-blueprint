-- Agent Blueprint Database Migration
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create blueprints table
CREATE TABLE IF NOT EXISTS blueprints (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    initiative TEXT NOT NULL,
    challenge TEXT NOT NULL,
    systems TEXT[] NOT NULL,
    value TEXT NOT NULL,
    opportunities JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create ai_logs table (for Week 4)
CREATE TABLE IF NOT EXISTS ai_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    blueprint_id UUID NOT NULL REFERENCES blueprints(id) ON DELETE CASCADE,
    prompt TEXT NOT NULL,
    response JSONB NOT NULL,
    model TEXT NOT NULL,
    tokens_used INTEGER NOT NULL,
    cost_estimate NUMERIC(10,4) NOT NULL,
    duration_ms INTEGER NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE blueprints ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_logs ENABLE ROW LEVEL SECURITY;

-- Create RLS policies (temporary - will be updated in Week 5 with proper auth)
-- For now, allow all operations for development

-- Profiles policies
CREATE POLICY "Allow all operations on profiles" ON profiles
    FOR ALL USING (true) WITH CHECK (true);

-- Blueprints policies  
CREATE POLICY "Allow all operations on blueprints" ON blueprints
    FOR ALL USING (true) WITH CHECK (true);

-- AI logs policies
CREATE POLICY "Allow all operations on ai_logs" ON ai_logs
    FOR ALL USING (true) WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);
CREATE INDEX IF NOT EXISTS idx_blueprints_profile_id ON blueprints(profile_id);
CREATE INDEX IF NOT EXISTS idx_blueprints_created_at ON blueprints(created_at);
CREATE INDEX IF NOT EXISTS idx_ai_logs_blueprint_id ON ai_logs(blueprint_id);
CREATE INDEX IF NOT EXISTS idx_ai_logs_created_at ON ai_logs(created_at);

-- Add updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers for updated_at
CREATE TRIGGER update_profiles_updated_at 
    BEFORE UPDATE ON profiles 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blueprints_updated_at 
    BEFORE UPDATE ON blueprints 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column(); 