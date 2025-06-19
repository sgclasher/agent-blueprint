'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createServerClient } from '@/lib/supabase/client'
import { surveyFormSchema, type SurveyFormData } from '@/lib/validations/survey'

export async function submitSurvey(data: SurveyFormData) {
  try {
    // Validate the data
    const validatedData = surveyFormSchema.parse(data)
    
    const supabase = createServerClient()
    
    // First, try to find existing profile by email
    const { data: existingProfile } = await supabase
      .from('profiles')
      .select('*')
      .eq('email', validatedData.email)
      .single()

    let profile
    if (existingProfile) {
      // Update existing profile
      const { data: updatedProfile, error: profileError } = await supabase
        .from('profiles')
        .update({ updated_at: new Date().toISOString() })
        .eq('email', validatedData.email)
        .select()
        .single()
      
      if (profileError) {
        console.error('Profile update error:', profileError)
        throw new Error('Failed to update profile')
      }
      profile = updatedProfile
    } else {
      // Create new profile
      const { data: newProfile, error: profileError } = await supabase
        .from('profiles')
        .insert({
          email: validatedData.email,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .select()
        .single()
      
      if (profileError) {
        console.error('Profile creation error:', profileError)
        throw new Error('Failed to create profile')
      }
      profile = newProfile
     }

    // Create the blueprint
    const { data: blueprint, error: blueprintError } = await supabase
      .from('blueprints')
      .insert({
        profile_id: profile.id,
        initiative: validatedData.initiative,
        challenge: validatedData.challenge,
        systems: validatedData.systems,
        value: validatedData.value,
        opportunities: null, // Will be populated by AI in Week 2
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single()

    if (blueprintError) {
      console.error('Blueprint creation error:', blueprintError)
      throw new Error('Failed to create blueprint')
    }

    // For now, redirect to a success page
    // In Week 2, we'll add AI generation here
    revalidatePath('/survey')
    redirect(`/survey/success?blueprintId=${blueprint.id}`)
    
  } catch (error) {
    // Don't catch redirect errors - let them bubble up
    const errorString = String(error)
    if (errorString.includes('NEXT_REDIRECT')) {
      throw error
    }
    
    console.error('Survey submission error:', error)
    throw new Error('Failed to submit survey. Please try again.')
  }
} 