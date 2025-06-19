# Agent Blueprint MVP Implementation Plan

## 🎉 Week 1 Status: COMPLETE - Ready for Testing!

**What's been implemented:**
- ✅ Complete survey form with 6 fields and validation
- ✅ Beautiful UI using ShadCN components
- ✅ Database schema ready for Supabase
- ✅ Form submission handling with server actions (🐛 Fixed profile upsert bug)
- ✅ Landing page and success page
- ✅ Responsive design optimized for mobile/tablet/desktop
- ✅ Pre-populated test data (RFP procurement scenario) for easy testing

**What you need to do to test:**
1. Set up your Supabase project and get credentials
2. Create `.env.local` with your Supabase and OpenAI keys (see env.local.example)
3. Run the `supabase_migration.sql` in your Supabase SQL editor
4. Visit `http://localhost:3000` and test the survey flow!

**🔧 Latest Fix:** Resolved foreign key constraint error in profile creation/update logic.

## Current Task: MVP Development - Full Implementation Plan

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
- [ ] Create `/src/app/api/generate-opportunities/route.ts` - API endpoint
- [ ] Implement GPT-4 function calling to generate 3 opportunities
- [ ] Update survey server action to trigger AI generation after saving
- [ ] Create `/src/lib/ai/opportunity-generator.ts` - Core AI logic
- [ ] Implement retry logic and error handling
- [ ] Add timeout handling (30 second max)

#### Testing Week 2
- [ ] Test GPT-4 API integration with mock data
- [ ] Verify opportunity generation quality and structure
- [ ] Test error handling (API failures, timeouts, rate limits)
- [ ] Validate generated JSON schema
- [ ] Test with edge cases (very short/long inputs)

### Week 3: Results Dashboard & React Flow (F-4)
**Goal:** Display AI-generated opportunities with interactive diagrams

#### Dashboard Implementation
- [ ] Create `/src/app/dashboard/[blueprintId]/page.tsx` - Results dashboard
- [ ] Create `/src/components/dashboard/OpportunityCard.tsx` - Card for each opportunity
- [ ] Create `/src/components/dashboard/WorkflowDiagram.tsx` - React Flow wrapper
- [ ] Create `/src/components/dashboard/ROIBadge.tsx` - Display ROI estimates
- [ ] Implement React Flow diagrams:
  - Convert workflow steps to nodes and edges
  - Create custom node components with tool icons
  - Style with consistent color scheme
  - Make diagrams interactive (zoom, pan, click nodes)
- [ ] Create `/src/lib/flow/node-generator.ts` - Convert AI output to React Flow format
- [ ] Add dashboard link to survey success page
- [ ] Implement loading states with Skeleton components

#### Testing Week 3
- [ ] Test dashboard rendering with various blueprint data
- [ ] Verify React Flow diagram generation and interaction
- [ ] Test responsive design and mobile touch interactions
- [ ] Test edge cases (empty opportunities, very long workflows)
- [ ] Performance testing with complex diagrams

### Week 4: Profile Management & AI Logs (F-1b, F-3)
**Goal:** Enable profile editing and track AI usage

#### Profile Page
- [ ] Create `/src/app/profile/page.tsx` - Profile management page
- [ ] Create `/src/components/profile/ProfileForm.tsx` - Edit profile form
- [ ] Create `/src/components/profile/InitiativesList.tsx` - Show past initiatives
- [ ] Implement "Regenerate Dashboard" functionality
- [ ] Add navigation component with links between pages
- [ ] Use Toast component for success/error messages

#### AI Logging
- [ ] Create `ai_logs` table in Supabase:
  ```sql
  - id (uuid, primary key)
  - blueprint_id (uuid, FK to blueprints)
  - prompt (text)
  - response (jsonb)
  - model (text)
  - tokens_used (int)
  - cost_estimate (numeric)
  - duration_ms (int)
  - created_at (timestamptz)
  ```
- [ ] Update AI generation to log all interactions
- [ ] Create `/src/lib/logging/ai-logger.ts` - Logging utilities
- [ ] Add cost tracking based on token usage

#### Testing Week 4
- [ ] Test profile CRUD operations
- [ ] Test dashboard regeneration with different inputs
- [ ] Verify AI logs capture all required data
- [ ] Test navigation flow between pages
- [ ] Test concurrent regeneration requests

### Week 5: Authentication & UI Polish (F-5)
**Goal:** Implement magic link auth and polish UI

#### Authentication
- [ ] Configure Supabase Auth for magic links
- [ ] Create `/src/app/auth/callback/route.ts` - Auth callback handler
- [ ] Create `/src/app/auth/login/page.tsx` - Login page
- [ ] Create `/src/components/auth/LoginForm.tsx` - Magic link login form
- [ ] Create `/src/middleware.ts` - Auth middleware
- [ ] Protect routes: /dashboard/*, /profile, /blueprints
- [ ] Update RLS policies to use auth.uid()
- [ ] Add logout functionality

#### UI Polish
- [ ] Add loading states with Spinner and Skeleton components
- [ ] Implement error boundaries for graceful failures
- [ ] Add Sonner for toast notifications
- [ ] Improve mobile responsiveness:
  - Hamburger menu for navigation
  - Touch-friendly buttons and inputs
  - Optimized React Flow for mobile
- [ ] Add animations with Framer Motion
- [ ] Create consistent design tokens
- [ ] Add dark mode support

#### Stretch Goal (F-6): Blueprint List
- [ ] Create `/src/app/blueprints/page.tsx` - List all user blueprints
- [ ] Create `/src/components/blueprints/BlueprintCard.tsx` - Blueprint preview
- [ ] Add "New Initiative" button that pre-fills contact info
- [ ] Implement blueprint search and filtering
- [ ] Add pagination for large lists

#### Testing Week 5
- [ ] Test complete authentication flow
- [ ] Test protected route redirects
- [ ] Test magic link expiration
- [ ] UI/UX testing on various devices and browsers
- [ ] Accessibility testing (keyboard nav, screen readers)
- [ ] Performance audit with Lighthouse

### Week 6: Production Readiness
**Goal:** Prepare for deployment and stakeholder demo

#### Production Prep
- [ ] Add comprehensive error handling and logging
- [ ] Implement rate limiting for API calls (10 requests/minute)
- [ ] Add monitoring with Vercel Analytics
- [ ] Create production environment variables
- [ ] Optimize bundle size:
  - Code splitting for React Flow
  - Lazy load heavy components
  - Optimize images
- [ ] Add security headers
- [ ] Implement CORS policies

#### Deployment
- [ ] Deploy to Vercel
- [ ] Configure production Supabase instance
- [ ] Set up custom domain (if applicable)
- [ ] Configure SSL certificates
- [ ] Set up Vercel environment variables
- [ ] Enable Vercel Analytics and Speed Insights

#### Documentation
- [ ] Update README with:
  - Local development setup
  - Deployment instructions
  - Environment variable reference
- [ ] Create user guide for stakeholders
- [ ] Document API endpoints and data flow
- [ ] Create architecture diagram

#### Final Testing
- [ ] End-to-end testing in production environment
- [ ] Load testing for AI generation (simulate 100 concurrent users)
- [ ] Security audit:
  - RLS policies verification
  - API key exposure check
  - XSS/CSRF protection
- [ ] SEO optimization check
- [ ] Performance testing (Core Web Vitals)

### Success Metrics to Track
- Time to complete survey: Target < 60 seconds
- AI generation time: Target < 5 seconds
- User engagement with React Flow diagrams (clicks, zoom, time spent)
- Number of profile edits/regenerations
- Authentication success rate
- Error rate < 1%

### Technical Debt & Future Considerations
- Implement Redis caching for AI responses
- Add support for multiple AI models (Claude, Gemini)
- Implement more sophisticated workflow diagrams
- Add export functionality (PDF, PNG) for blueprints
- Consider implementing real-time collaboration features
- Add webhook support for enterprise integrations
- Implement A/B testing framework
- Add i18n support for multiple languages
