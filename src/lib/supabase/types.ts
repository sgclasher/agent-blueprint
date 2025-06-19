// Database types for Supabase tables

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          created_at?: string
          updated_at?: string
        }
      }
      blueprints: {
        Row: {
          id: string
          profile_id: string
          initiative: string
          challenge: string
          systems: string[]
          value: string
          opportunities: Opportunity[] | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          profile_id: string
          initiative: string
          challenge: string
          systems: string[]
          value: string
          opportunities?: Opportunity[] | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          profile_id?: string
          initiative?: string
          challenge?: string
          systems?: string[]
          value?: string
          opportunities?: Opportunity[] | null
          created_at?: string
          updated_at?: string
        }
      }
      ai_logs: {
        Row: {
          id: string
          blueprint_id: string
          prompt: string
          response: any
          model: string
          tokens_used: number
          cost_estimate: number
          duration_ms: number
          created_at: string
        }
        Insert: {
          id?: string
          blueprint_id: string
          prompt: string
          response: any
          model: string
          tokens_used: number
          cost_estimate: number
          duration_ms: number
          created_at?: string
        }
        Update: {
          id?: string
          blueprint_id?: string
          prompt?: string
          response?: any
          model?: string
          tokens_used?: number
          cost_estimate?: number
          duration_ms?: number
          created_at?: string
        }
      }
    }
  }
}

// Application types
export interface Opportunity {
  id: string
  title: string
  description: string
  roiEstimate: {
    timeframe: string
    metric: string
    value: string
  }
  workflowSteps: Array<{
    id: string
    title: string
    description: string
    toolsRequired: string[]
  }>
  priority: 'high' | 'medium' | 'low'
}

export interface SurveyFormData {
  email: string
  initiative: string
  challenge: string
  systems: string[]
  value: string
  contactPreference?: string
}

export type Profile = Database['public']['Tables']['profiles']['Row']
export type Blueprint = Database['public']['Tables']['blueprints']['Row']
export type AILog = Database['public']['Tables']['ai_logs']['Row'] 