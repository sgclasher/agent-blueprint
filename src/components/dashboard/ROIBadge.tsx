import { Badge } from '@/components/ui/badge';
import { TrendingUp, ArrowDown, Clock } from 'lucide-react';

interface ROIBadgeProps {
  roi: {
    value: string;
    metric: string;
    timeframe: string;
  };
  className?: string;
}

export function ROIBadge({ roi, className }: ROIBadgeProps) {
  const getIcon = () => {
    if (roi.metric.toLowerCase().includes('saved')) {
      return <Clock className="mr-1 h-3 w-3" />;
    }
    if (roi.metric.toLowerCase().includes('reduction')) {
      return <ArrowDown className="mr-1 h-3 w-3" />;
    }
    return <TrendingUp className="mr-1 h-3 w-3" />;
  };

  return (
    <Badge variant="secondary" className={className}>
      {getIcon()}
      {roi.value} {roi.metric} / {roi.timeframe}
    </Badge>
  );
} 