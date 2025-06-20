import React, { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'

// Mock Supabase client for testing
export const mockSupabaseClient = {
  from: jest.fn(() => ({
    select: jest.fn().mockReturnThis(),
    insert: jest.fn().mockReturnThis(),
    update: jest.fn().mockReturnThis(),
    delete: jest.fn().mockReturnThis(),
    eq: jest.fn().mockReturnThis(),
    single: jest.fn(),
    maybeSingle: jest.fn(),
  })),
  auth: {
    getUser: jest.fn(),
    signInWithOtp: jest.fn(),
    signOut: jest.fn(),
    onAuthStateChange: jest.fn(),
  },
}

// Mock the Supabase client module
jest.mock('@/lib/supabase/client', () => ({
  supabase: mockSupabaseClient,
}))

// Custom render function that includes any providers
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'
export { customRender as render }

// Helper function to create mock form data
export const createMockSurveyData = () => ({
  email: 'test@example.com',
  initiative: 'Test Initiative',
  challenge: 'Test Challenge',
  systems: ['CRM', 'Email'],
  value: 'Revenue Growth',
  contact: 'email',
})

// Helper function to wait for async operations
export const waitFor = (callback: () => void, timeout = 1000) => {
  return new Promise((resolve, reject) => {
    const startTime = Date.now()
    const checkCondition = () => {
      try {
        callback()
        resolve(true)
      } catch (error) {
        if (Date.now() - startTime > timeout) {
          reject(error)
        } else {
          setTimeout(checkCondition, 10)
        }
      }
    }
    checkCondition()
  })
} 