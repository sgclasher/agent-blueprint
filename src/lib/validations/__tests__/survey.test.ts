/**
 * @jest-environment node
 */
import { surveyFormSchema, type SurveyFormData } from '../survey'

describe('surveyFormSchema', () => {
  const validSurveyData: SurveyFormData = {
    email: 'test@example.com',
    initiative: 'Test Initiative',
    challenge: 'This is a detailed challenge description that meets minimum length',
    systems: ['CRM', 'Email Marketing'],
    value: 'Increase revenue by 20% through automation',
    contactPreference: 'email'
  }

  describe('email validation', () => {
    it('should accept valid email addresses', () => {
      const testEmails = [
        'test@example.com',
        'user.name@domain.co.uk',
        'firstname+lastname@example.com',
        'test123@test-domain.com'
      ]

      testEmails.forEach(email => {
        const result = surveyFormSchema.safeParse({
          ...validSurveyData,
          email
        })
        expect(result.success).toBe(true)
      })
    })

    it('should reject invalid email addresses', () => {
      const invalidEmails = [
        '',
        'invalid-email',
        'test@',
        '@domain.com',
        'test.domain.com',
        'test@domain',
        'test @domain.com'
      ]

      invalidEmails.forEach(email => {
        const result = surveyFormSchema.safeParse({
          ...validSurveyData,
          email
        })
        expect(result.success).toBe(false)
        if (!result.success) {
          expect(result.error.issues[0].path).toContain('email')
        }
      })
    })

    it('should require email field', () => {
      const result = surveyFormSchema.safeParse({
        ...validSurveyData,
        email: ''
      })
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Email is required')
      }
    })
  })

  describe('initiative validation', () => {
    it('should accept valid initiative names', () => {
      const validInitiatives = [
        'CRM',
        'Customer Service Automation',
        'A'.repeat(200) // Maximum length
      ]

      validInitiatives.forEach(initiative => {
        const result = surveyFormSchema.safeParse({
          ...validSurveyData,
          initiative
        })
        expect(result.success).toBe(true)
      })
    })

    it('should reject initiatives that are too short', () => {
      const shortInitiatives = ['', 'A', 'AB']

      shortInitiatives.forEach(initiative => {
        const result = surveyFormSchema.safeParse({
          ...validSurveyData,
          initiative
        })
        expect(result.success).toBe(false)
      })
    })

    it('should reject initiatives that are too long', () => {
      const longInitiative = 'A'.repeat(201)
      const result = surveyFormSchema.safeParse({
        ...validSurveyData,
        initiative: longInitiative
      })
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Initiative name must be less than 200 characters')
      }
    })
  })

  describe('challenge validation', () => {
    it('should accept valid challenge descriptions', () => {
      const validChallenges = [
        'This is a detailed challenge description that meets requirements',
        'A'.repeat(10), // Minimum length
        'A'.repeat(1000) // Maximum length
      ]

      validChallenges.forEach(challenge => {
        const result = surveyFormSchema.safeParse({
          ...validSurveyData,
          challenge
        })
        expect(result.success).toBe(true)
      })
    })

    it('should reject challenges that are too short', () => {
      const shortChallenges = ['', 'short', 'A'.repeat(9)]

      shortChallenges.forEach(challenge => {
        const result = surveyFormSchema.safeParse({
          ...validSurveyData,
          challenge
        })
        expect(result.success).toBe(false)
      })
    })

    it('should reject challenges that are too long', () => {
      const longChallenge = 'A'.repeat(1001)
      const result = surveyFormSchema.safeParse({
        ...validSurveyData,
        challenge: longChallenge
      })
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Challenge description must be less than 1000 characters')
      }
    })
  })

  describe('systems validation', () => {
    it('should accept valid system arrays', () => {
      const validSystemArrays = [
        ['CRM'],
        ['CRM', 'Email Marketing', 'Analytics'],
        Array(10).fill('System') // Maximum length
      ]

      validSystemArrays.forEach(systems => {
        const result = surveyFormSchema.safeParse({
          ...validSurveyData,
          systems
        })
        expect(result.success).toBe(true)
      })
    })

    it('should reject empty systems array', () => {
      const result = surveyFormSchema.safeParse({
        ...validSurveyData,
        systems: []
      })
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Please select at least one system')
      }
    })

    it('should reject systems array with too many items', () => {
      const tooManySystems = Array(11).fill('System')
      const result = surveyFormSchema.safeParse({
        ...validSurveyData,
        systems: tooManySystems
      })
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Please select no more than 10 systems')
      }
    })
  })

  describe('value validation', () => {
    it('should accept valid value descriptions', () => {
      const validValues = [
        'Valid value description',
        'A'.repeat(5), // Minimum length
        'A'.repeat(500) // Maximum length
      ]

      validValues.forEach(value => {
        const result = surveyFormSchema.safeParse({
          ...validSurveyData,
          value
        })
        expect(result.success).toBe(true)
      })
    })

    it('should reject values that are too short', () => {
      const shortValues = ['', 'A', 'ABCD']

      shortValues.forEach(value => {
        const result = surveyFormSchema.safeParse({
          ...validSurveyData,
          value
        })
        expect(result.success).toBe(false)
      })
    })

    it('should reject values that are too long', () => {
      const longValue = 'A'.repeat(501)
      const result = surveyFormSchema.safeParse({
        ...validSurveyData,
        value: longValue
      })
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Value description must be less than 500 characters')
      }
    })
  })

  describe('contactPreference validation', () => {
    it('should accept valid contact preferences', () => {
      const result = surveyFormSchema.safeParse({
        ...validSurveyData,
        contactPreference: 'email'
      })
      expect(result.success).toBe(true)
    })

    it('should accept undefined contact preference', () => {
      const { contactPreference, ...dataWithoutContact } = validSurveyData
      const result = surveyFormSchema.safeParse(dataWithoutContact)
      expect(result.success).toBe(true)
    })
  })

  describe('complete form validation', () => {
    it('should validate complete valid form data', () => {
      const result = surveyFormSchema.safeParse(validSurveyData)
      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data).toEqual(validSurveyData)
      }
    })

    it('should return multiple errors for multiple invalid fields', () => {
      const invalidData = {
        email: 'invalid-email',
        initiative: 'A', // Too short
        challenge: 'short', // Too short
        systems: [], // Empty array
        value: 'AB', // Too short
      }

      const result = surveyFormSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues).toHaveLength(5)
      }
    })
  })
}) 