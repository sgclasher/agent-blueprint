import { z } from 'zod'

export const surveyFormSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  
  initiative: z
    .string()
    .min(1, 'Initiative name is required')
    .min(3, 'Initiative name must be at least 3 characters')
    .max(200, 'Initiative name must be less than 200 characters'),
  
  challenge: z
    .string()
    .min(1, 'Primary challenge is required')
    .min(10, 'Please provide a more detailed challenge description')
    .max(1000, 'Challenge description must be less than 1000 characters'),
  
  systems: z
    .array(z.string())
    .min(1, 'Please select at least one system')
    .max(10, 'Please select no more than 10 systems'),
  
  value: z
    .string()
    .min(1, 'Business value metric is required')
    .min(5, 'Please provide more detail about the business value')
    .max(500, 'Value description must be less than 500 characters'),
  
  contactPreference: z
    .string()
    .optional()
})

export type SurveyFormData = z.infer<typeof surveyFormSchema> 