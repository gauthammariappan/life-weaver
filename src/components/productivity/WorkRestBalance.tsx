import { Battery, Zap } from 'lucide-react';

interface WorkRestBalanceProps {
  work: number;
  rest: number;
}

export function WorkRestBalance({ work, rest }: WorkRestBalanceProps) {
  return (
    <div className="card-elevated rounded-2xl p-6 animate-fade-in" style={{ animationDelay: '0.15s' }}>
      <h3 className="font-display text-xl font-semibold text-foreground mb-4">Work/Rest Balance</h3>
      
      <div className="relative h-8 rounded-full overflow-hidden bg-muted">
        <div
          className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-focus to-focus/80 transition-all duration-700"
          style={{ width: `${work}%` }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 bg-gradient-to-l from-rest to-rest/80 transition-all duration-700"
          style={{ width: `${rest}%` }}
        />
      </div>

      <div className="flex justify-between mt-4">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-focus" />
          <span className="text-sm text-muted-foreground">Work</span>
          <span className="font-display font-semibold text-foreground">{work}%</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-display font-semibold text-foreground">{rest}%</span>
          <span className="text-sm text-muted-foreground">Rest</span>
          <Battery className="w-4 h-4 text-rest" />
        </div>
      </div>

      <p className="text-xs text-muted-foreground mt-4 text-center">
        {work > 85 
          ? "Consider adding more breaks for sustained performance"
          : work < 60
          ? "Good balance! You have plenty of recovery time"
          : "Optimal work-rest ratio for productivity"
        }
      </p>
    </div>
  );
}
