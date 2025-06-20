'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, Check, X } from 'lucide-react'

import { surveyFormSchema, type SurveyFormData } from '@/lib/validations/survey'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

// Common systems that businesses use
const COMMON_SYSTEMS = [
  'CRM (Salesforce, HubSpot)',
  'ERP (SAP, Oracle)',
  'Email Marketing (Mailchimp, Constant Contact)',
  'Accounting (QuickBooks, Xero)',
  'Project Management (Asana, Monday)',
  'Customer Support (Zendesk, Intercom)',
  'Analytics (Google Analytics, Mixpanel)',
  'HR Management (BambooHR, Workday)',
  'Inventory Management',
  'Document Management',
  'Other'
]

interface SurveyFormProps {
  onSubmit: (data: SurveyFormData) => Promise<void>
}

export function SurveyForm({ onSubmit }: SurveyFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedSystems, setSelectedSystems] = useState<string[]>([
    'Document Management', 
    'ERP (SAP, Oracle)'
  ])

  const form = useForm<SurveyFormData>({
    resolver: zodResolver(surveyFormSchema),
    defaultValues: {
      email: 'test@example.com',
      initiative: 'Streamline RFP Procurement Process',
      challenge: 'Our current RFP process is manual, slow, and opaque. It involves emailing Word documents, manually tracking vendor responses in spreadsheets, and lacks a centralized system for evaluation. This leads to version control issues, missed deadlines, and difficulty in comparing proposals fairly.',
      systems: ['Document Management', 'ERP (SAP, Oracle)'],
      value: 'Reduce procurement cycle time by 40%, decrease manual effort by 15 hours/week per procurement manager, and improve vendor selection transparency and auditability.',
      contactPreference: 'email'
    }
  })

  const handleSystemToggle = (system: string) => {
    const newSystems = selectedSystems.includes(system)
      ? selectedSystems.filter(s => s !== system)
      : [...selectedSystems, system]
    
    setSelectedSystems(newSystems)
    form.setValue('systems', newSystems)
  }

  const handleSubmit = async (data: SurveyFormData) => {
    setIsSubmitting(true)
    try {
      await onSubmit(data)
    } catch (error) {
      console.error('Form submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>AI Opportunity Discovery Survey</CardTitle>
        <CardDescription>
          Help us understand your business needs to generate personalized AI workflow recommendations.
          This survey takes about 60 seconds to complete.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="your.email@company.com" 
                      type="email"
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    We'll use this to create your profile and share your AI opportunities.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Initiative Field */}
            <FormField
              control={form.control}
              name="initiative"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Initiative Name</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="e.g., Customer Service Automation, Sales Process Optimization" 
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    What's the name or focus area of your AI initiative?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Challenge Field */}
            <FormField
              control={form.control}
              name="challenge"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Primary Challenge</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe the main business challenge you're trying to solve..."
                      className="min-h-[100px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    What specific problem or inefficiency are you looking to address?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Systems Field */}
            <FormField
              control={form.control}
              name="systems"
              render={() => (
                <FormItem>
                  <FormLabel>Current Systems & Tools</FormLabel>
                  <FormDescription>
                    Select all systems your team currently uses (choose up to 10):
                  </FormDescription>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {COMMON_SYSTEMS.map((system) => (
                      <div
                        key={system}
                        onClick={() => handleSystemToggle(system)}
                        className={`p-3 border rounded-lg cursor-pointer transition-all hover:bg-gray-50 ${
                          selectedSystems.includes(system)
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm">{system}</span>
                          {selectedSystems.includes(system) && (
                            <Check className="h-4 w-4 text-blue-600" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Value Field */}
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Business Value & Success Metrics</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="e.g., Reduce response time by 50%, Save 10 hours/week, Increase conversion by 15%"
                      className="min-h-[80px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    How will you measure success? What's the expected business impact?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Contact Preference Field */}
            <FormField
              control={form.control}
              name="contactPreference"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preferred Contact Method (Optional)</FormLabel>
                  <FormControl>
                    <select 
                      className="w-full p-2 border rounded-md"
                      {...field}
                    >
                      <option value="email">Email</option>
                      <option value="phone">Phone</option>
                      <option value="none">No follow-up needed</option>
                    </select>
                  </FormControl>
                  <FormDescription>
                    How would you prefer to be contacted for follow-up questions?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating AI Opportunities...
                </>
              ) : (
                'Generate My AI Opportunities'
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
} 