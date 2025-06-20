import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { type Database } from '@/lib/supabase/types';
import { ROIBadge } from './ROIBadge';
import { Badge } from '@/components/ui/badge';
import { CheckCircle } from 'lucide-react';

// A more specific type for a single opportunity, derived from the database type
type Opportunity = NonNullable<Database['public']['Tables']['blueprints']['Row']['opportunities']>[0];
type Priority = Opportunity['priority'];

interface OpportunityCardProps {
  opportunity: Opportunity;
  className?: string;
}

export function OpportunityCard({ opportunity, className }: OpportunityCardProps) {
  if (!opportunity) return null;

  const priorityStyles: Record<Priority, string> = {
    high: 'bg-red-100 text-red-800 border-red-200 hover:bg-red-100',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-100',
    low: 'bg-green-100 text-green-800 border-green-200 hover:bg-green-100',
  };

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl leading-tight">{opportunity.title}</CardTitle>
          <Badge className={priorityStyles[opportunity.priority]}>
            {opportunity.priority}
          </Badge>
        </div>
        <ROIBadge roi={opportunity.roiEstimate} className="mt-2" />
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 mb-4">{opportunity.description}</p>
        <div>
          <h4 className="font-semibold mb-2">Workflow Steps:</h4>
          <ul className="space-y-2">
            {opportunity.workflowSteps.map((step: Opportunity['workflowSteps'][0], index: number) => (
              <li key={index} className="flex items-start">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                <div>
                  <span className="font-semibold">{step.title}:</span>
                  <span className="text-gray-600 ml-1">{step.description}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
      <CardFooter>
        <p className="text-xs text-gray-500">
          Tools Required: {opportunity.workflowSteps.flatMap((s: Opportunity['workflowSteps'][0]) => s.toolsRequired).join(', ')}
        </p>
      </CardFooter>
    </Card>
  );
} 