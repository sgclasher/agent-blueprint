# Agent Blueprint MVP Implementation Plan

## 🎉 Week 1 Status: COMPLETE - Ready for Testing!

**What's been implemented:**
- ✅ Complete survey form with 6 fields and validation
- ✅ Beautiful UI using ShadCN components
- ✅ Database schema ready for Supabase
- ✅ Form submission handling with server actions
- ✅ Landing page and success page
- ✅ Responsive design optimized for mobile/tablet/desktop

**What you need to do to test:**
1. Set up your Supabase project and get credentials
2. Create `.env.local` with your Supabase and OpenAI keys (see .env.local.example)
3. Run the `supabase_migration.sql` in your Supabase SQL editor
4. Visit `http://localhost:3000` and test the survey flow!

## Current Task: Await `searchParams` Promise

- [x] **Refactor `src/app/survey/success/page.tsx`:**
    - `await` the `searchParams` prop to resolve the promise being passed by Next.js 15/Turbopack.
    - This will correctly retrieve the URL parameters and resolve the rendering error.
    - Remove the now-unnecessary `headers()` and `console.log()` calls.

### Overview
Building an agentic AI advisory MVP that transforms a 60-second business survey into personalized AI workflow opportunities with interactive React Flow diagrams.

**Tech Stack:** Next.js 15, React 19, Supabase, OpenAI GPT-4, Tailwind CSS, ShadCN UI, React Flow

### Pre-Development Setup
- [x] Create `.env.local` file with required environment variables:
  - [ ] `NEXT_PUBLIC_SUPABASE_URL` (user needs to add)
  - [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` (user needs to add)
  - [ ] `SUPABASE_SERVICE_ROLE_KEY` (user needs to add)
  - [ ] `OPENAI_API_KEY` (user needs to add)
- [ ] Set up Supabase project and obtain credentials (user needs to do)
- [x] Configure ShadCN UI components (run initialization)
- [x] Install any missing dependencies (check for lucide-react, zod, react-hook-form)

### Week 1: Survey UI & Supabase Profiles
**Goal:** Complete survey form (F-1) and profile persistence

#### Database Schema Setup
- [x] Create Supabase migration for core tables:
  - [x] `profiles` table:
    ```sql
    - id (uuid, primary key, references auth.users)
    - email (text, unique)
    - created_at (timestamptz)
    - updated_at (timestamptz)
    ```
  - [x] `blueprints` table:
    ```sql
    - id (uuid, primary key)
    - profile_id (uuid, FK to profiles)
    - initiative (text)
    - challenge (text)
    - systems (text[])
    - value (text)
    - opportunities (jsonb) -- Will store array of opportunity objects
    - created_at (timestamptz)
    - updated_at (timestamptz)
    ```
  - [x] Enable RLS policies for both tables

#### Survey Implementation
- [x] Create `/src/app/survey/page.tsx` - Survey form page
- [x] Create `/src/components/survey/SurveyForm.tsx` - Main survey component with 6 fields:
  - Email (for profile)
  - Initiative name
  - Primary challenge
  - Current systems (multi-select or comma-separated)
  - Business value metric
  - Contact preference (optional for MVP)
- [x] Create `/src/lib/supabase/client.ts` - Supabase client initialization
- [x] Create `/src/lib/supabase/types.ts` - TypeScript types for database
- [x] Implement form validation with Zod schemas
- [x] Create server action `/src/app/actions/survey.ts` for form submission
- [x] Style with Tailwind CSS and ShadCN UI components:
  - Use Card, Input, Label, Button, Select components
  - Implement responsive grid layout
  - Add form field descriptions and helper text

#### Testing Week 1
- [ ] Write unit tests for form validation
- [ ] Test survey form submission with various inputs
- [ ] Verify data persistence in Supabase
- [ ] Test error states (duplicate email, network errors)
- [ ] Test responsive design on mobile/tablet/desktop

### Week 2: GPT-4 Integration (F-2)
**Goal:** Implement AI opportunity generation

#### OpenAI Setup
- [ ] Create `/src/lib/openai/client.ts` - OpenAI client initialization
- [ ] Create `/src/lib/openai/tools.ts` - Function calling tool definitions
- [ ] Create `/src/lib/openai/prompts.ts` - System prompts for opportunity generation

#### Opportunity Data Structure
```typescript
interface Opportunity {
  id: string;
  title: string;
  description: string;
  roiEstimate: {
    timeframe: string;
    metric: string;
    value: string;
  };
  workflowSteps: Array<{
    id: string;
    title: string;
    description: string;
    toolsRequired: string[];
  }>;
  priority: 'high' | 'medium' | 'low';
}
```

#### API Implementation
- [ ] Create `/src/app/api/generate-opportunities/route.ts`