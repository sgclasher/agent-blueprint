import { SurveyForm } from '@/components/survey/SurveyForm'
import { submitSurvey } from '@/app/actions/survey'

export default function SurveyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Discover Your AI Opportunities
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Get personalized AI workflow recommendations in just 60 seconds
          </p>
          <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              Quick 6-question survey
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
              AI-powered analysis
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
              Interactive workflow diagrams
            </div>
          </div>
        </div>
        
        <SurveyForm onSubmit={submitSurvey} />
        
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>
            Your data is secure and will only be used to generate your AI recommendations.
          </p>
        </div>
      </div>
    </div>
  )
} 