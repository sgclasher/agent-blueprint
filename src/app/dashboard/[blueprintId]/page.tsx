import { createServerClient } from '@/lib/supabase/client';
import { notFound } from 'next/navigation';
import { OpportunityCard } from '@/components/dashboard/OpportunityCard';
import { type Database } from '@/lib/supabase/types';

type Blueprint = Database['public']['Tables']['blueprints']['Row'];

interface DashboardPageProps {
  params: {
    blueprintId: string;
  };
}

export default async function DashboardPage({ params: paramsPromise }: DashboardPageProps) {
  const params = await paramsPromise;
  const supabase = createServerClient();

  const { data: blueprint, error } = await supabase
    .from('blueprints')
    .select('*')
    .eq('id', params.blueprintId)
    .single();

  if (error || !blueprint) {
    console.error('Error fetching blueprint:', error);
    notFound();
  }

  const opportunities = blueprint.opportunities || [];

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 tracking-tight">AI Opportunity Dashboard</h1>
          <p className="text-lg text-gray-600 mt-1">
            Initiative: <span className="font-semibold">{blueprint.initiative}</span>
          </p>
        </header>
        
        <main className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {opportunities.map((opp: typeof opportunities[0], index: number) => (
            <OpportunityCard key={index} opportunity={opp} />
          ))}
        </main>

        {opportunities.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No opportunities have been generated for this blueprint yet.</p>
            {/* We can add a "Regenerate" button here in a future step */}
          </div>
        )}
      </div>
    </div>
  );
} 