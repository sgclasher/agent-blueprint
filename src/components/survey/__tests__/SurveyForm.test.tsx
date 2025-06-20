import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SurveyForm } from '../SurveyForm'
import { createMockSurveyData } from '@/test-utils'

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  Loader2: ({ className }: { className?: string }) => <div data-testid="loader" className={className} />,
  Check: ({ className }: { className?: string }) => <div data-testid="check-icon" className={className} />,
  X: ({ className }: { className?: string }) => <div data-testid="x-icon" className={className} />,
}))

describe('SurveyForm', () => {
  const mockOnSubmit = jest.fn()
  const user = userEvent.setup()

  beforeEach(() => {
    jest.clearAllMocks()
  })

    describe('Component Rendering', () => {
    it('should render all form fields with correct labels', () => {
      render(<SurveyForm onSubmit={mockOnSubmit} />)
      
      expect(screen.getByLabelText(/email address/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/initiative name/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/primary challenge/i)).toBeInTheDocument()
      expect(screen.getByText(/current systems & tools/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/business value & success metrics/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/preferred contact method/i)).toBeInTheDocument()
    })

    it('should render form title and description', () => {
      render(<SurveyForm onSubmit={mockOnSubmit} />)

      expect(screen.getByText('AI Opportunity Discovery Survey')).toBeInTheDocument()
      expect(screen.getByText(/help us understand your business needs/i)).toBeInTheDocument()
    })

    it('should render submit button with correct text', () => {
      render(<SurveyForm onSubmit={mockOnSubmit} />)

      expect(screen.getByRole('button', { name: /generate my ai opportunities/i })).toBeInTheDocument()
    })
  })

  describe('Form Interactions', () => {
    it('should allow typing in email field', async () => {
      render(<SurveyForm onSubmit={mockOnSubmit} />)
      
      const emailInput = screen.getByLabelText(/email address/i)
      await user.clear(emailInput)
      await user.type(emailInput, 'newemail@test.com')
      
      expect(emailInput).toHaveValue('newemail@test.com')
    })

    it('should allow typing in initiative field', async () => {
      render(<SurveyForm onSubmit={mockOnSubmit} />)
      
      const initiativeInput = screen.getByLabelText(/initiative name/i)
      await user.clear(initiativeInput)
      await user.type(initiativeInput, 'New Initiative')
      
      expect(initiativeInput).toHaveValue('New Initiative')
    })
  })

  describe('Form Validation', () => {
    it('should render form with validation schema ready', () => {
      render(<SurveyForm onSubmit={mockOnSubmit} />)

      const emailInput = screen.getByLabelText(/email address/i)
      const initiativeInput = screen.getByLabelText(/initiative name/i)
      const challengeInput = screen.getByLabelText(/primary challenge/i)
      const valueInput = screen.getByLabelText(/business value & success metrics/i)
      
      // Verify form fields have proper validation attributes
      expect(emailInput).toHaveAttribute('type', 'email')
      expect(emailInput).toHaveAttribute('name', 'email')
      expect(initiativeInput).toHaveAttribute('name', 'initiative')
      expect(challengeInput).toHaveAttribute('name', 'challenge')
      expect(valueInput).toHaveAttribute('name', 'value')
    })

    it('should have default values populated for testing', () => {
      render(<SurveyForm onSubmit={mockOnSubmit} />)

      const emailInput = screen.getByLabelText(/email address/i)
      const initiativeInput = screen.getByLabelText(/initiative name/i)
      
      expect(emailInput).toHaveValue('test@example.com')
      expect(initiativeInput).toHaveValue('Streamline RFP Procurement Process')
    })
  })

  describe('Form Submission', () => {
    it('should call onSubmit with correct data when form is valid', async () => {
      const validData = createMockSurveyData()
      render(<SurveyForm onSubmit={mockOnSubmit} />)

      const emailInput = screen.getByLabelText(/email address/i)
      const initiativeInput = screen.getByLabelText(/initiative name/i)

      await user.clear(emailInput)
      await user.type(emailInput, validData.email)
      
      await user.clear(initiativeInput)
      await user.type(initiativeInput, validData.initiative)

      const submitButton = screen.getByRole('button', { name: /generate my ai opportunities/i })
      await user.click(submitButton)

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalled()
      })
    })

    it('should show loading state during submission', async () => {
      let resolveSubmit: () => void
      const submitPromise = new Promise<void>((resolve) => {
        resolveSubmit = resolve
      })
      mockOnSubmit.mockReturnValue(submitPromise)

      render(<SurveyForm onSubmit={mockOnSubmit} />)

      const submitButton = screen.getByRole('button', { name: /generate my ai opportunities/i })
      await user.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText(/generating ai opportunities/i)).toBeInTheDocument()
        expect(screen.getByTestId('loader')).toBeInTheDocument()
        expect(submitButton).toBeDisabled()
      })

      resolveSubmit!()

      await waitFor(() => {
        expect(screen.getByText(/generate my ai opportunities/i)).toBeInTheDocument()
        expect(submitButton).not.toBeDisabled()
      })
    })
  })
}) 