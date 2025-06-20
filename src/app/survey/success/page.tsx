import Link from 'next/link'
import { CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface SuccessPageProps {
  searchParams: {
    blueprintId?: string
  }
}

export default async function SuccessPage({ searchParams: searchParamsPromise }: SuccessPageProps) {
  const searchParams = await searchParamsPromise
  const { blueprintId } = searchParams

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Card className="text-center">
          <CardHeader>
            <div className="mx-auto mb-4">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <CardTitle className="text-2xl text-green-700">
              Survey Submitted Successfully!
            </CardTitle>
            <CardDescription className="text-lg">
              Thank you for providing your business information. Your AI opportunity analysis is being prepared.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">What happens next?</h3>
              <ul className="text-sm text-blue-700 space-y-1 text-left">
                <li>• Your data has been securely saved</li>
                <li>• AI analysis will generate 3 personalized opportunities</li>
                <li>• Interactive workflow diagrams will be created</li>
                <li>• You'll receive detailed ROI estimates</li>
              </ul>
            </div>

            <div className="space-y-3">
              <p className="text-gray-600">
                Blueprint ID: <code className="bg-gray-100 px-2 py-1 rounded text-sm">{blueprintId || 'N/A'}</code>
              </p>
              
              <div className="bg-yellow-50 p-4 rounded-lg">
                <p className="text-yellow-800 text-sm">
                  <strong>Coming in Week 2:</strong> AI-powered opportunity generation will automatically create your personalized recommendations. 
                  For now, your survey data has been saved and is ready for processing.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild>
                <Link href="/survey">
                  Submit Another Survey
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/">
                  Return Home
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 