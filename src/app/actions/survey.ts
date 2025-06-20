'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createServerClient } from '@/lib/supabase/client'
import { surveyFormSchema, type SurveyFormData } from '@/lib/validations/survey'
import { generateOpportunities } from '@/lib/ai/opportunity-generator'

export async function submitSurvey(data: SurveyFormData) {
  let blueprintId: string | null = null;
  try {
    // Validate the data
    const validatedData = surveyFormSchema.parse(data)
    
    const supabase = createServerClient()
    
    let profileId: string;

    // 1. Check if a profile with this email already exists
    const { data: existingProfile } = await supabase
      .from('profiles')
      .select('id')
      .eq('email', validatedData.email)
      .single();

    if (existingProfile) {
      // If profile exists, use its ID
      profileId = existingProfile.id;
    } else {
      // If no profile exists, create a new one
      const { data: newProfile, error: newProfileError } = await supabase
        .from('profiles')
        .insert({
          email: validatedData.email,
        })
        .select('id')
        .single();
      
      if (newProfileError) {
        console.error('Profile creation error:', newProfileError);
        throw new Error('Failed to create profile');
      }
      profileId = newProfile.id;
    }

    // Create the blueprint
    const { data: blueprint, error: blueprintError } = await supabase
      .from('blueprints')
      .insert({
        profile_id: profileId,
        initiative: validatedData.initiative,
        challenge: validatedData.challenge,
        systems: validatedData.systems,
        value: validatedData.value,
        opportunities: null, // Will be populated by AI
      })
      .select('id')
      .single()

    if (blueprintError) {
      console.error('Blueprint creation error:', blueprintError)
      throw new Error('Failed to create blueprint')
    }
    
    blueprintId = blueprint.id;

    // 2. Generate AI opportunities
    const opportunities = await generateOpportunities(validatedData);

    // 3. Update the blueprint with the generated opportunities
    const { error: updateError } = await supabase
      .from('blueprints')
      .update({ opportunities })
      .eq('id', blueprintId);

    if (updateError) {
      console.error('Error updating blueprint with opportunities:', updateError);
      // Even if this fails, we can still redirect. The user can regenerate later.
    }
    
  } catch (error) {
    console.error('Survey submission error:', error)
    throw new Error('Failed to submit survey. Please try again.')
  }

  if (blueprintId) {
    revalidatePath('/survey')
    // Redirect to the new dashboard page, which we'll build in Week 3
    redirect(`/dashboard/${blueprintId}`)
  }
} 