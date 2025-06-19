import Link from 'next/link'
import { ArrowRight, Sparkles, Target, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-50">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Agent Blueprint
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Transform your business with AI. Get personalized workflow recommendations 
            and ROI projections in just 60 seconds.
          </p>
          
          <Button asChild size="lg" className="text-lg px-8 py-6">
            <Link href="/survey">
              Start Your AI Discovery
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          
          <p className="text-sm text-gray-500 mt-4">
            No signup required • Free analysis • Instant results
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            How Agent Blueprint Works
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto mb-4 p-3 bg-blue-100 rounded-full w-fit">
                  <Target className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle>60-Second Survey</CardTitle>
                <CardDescription>
                  Tell us about your business challenge, current systems, and success metrics
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto mb-4 p-3 bg-purple-100 rounded-full w-fit">
                  <Sparkles className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle>AI Analysis</CardTitle>
                <CardDescription>
                  GPT-4 analyzes your needs and generates 3 personalized AI opportunities
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto mb-4 p-3 bg-green-100 rounded-full w-fit">
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle>Interactive Results</CardTitle>
                <CardDescription>
                  Get visual workflow diagrams, ROI estimates, and implementation roadmaps
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Discover Your AI Opportunities?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Join hundreds of business leaders who've already found their quick wins with AI
          </p>
          
          <Button asChild size="lg" variant="secondary" className="text-lg px-8 py-6">
            <Link href="/survey">
              Get Started Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-gray-900 text-gray-400">
        <div className="max-w-6xl mx-auto text-center">
          <p>&copy; 2024 Agent Blueprint. Built with Next.js 15, React 19, and GPT-4.</p>
        </div>
      </footer>
    </div>
  )
}
