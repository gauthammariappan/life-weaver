import { Lightbulb } from 'lucide-react';

interface InsightsListProps {
  insights: string[];
}

export function InsightsList({ insights }: InsightsListProps) {
  return (
    <div className="card-elevated rounded-2xl p-6 animate-fade-in" style={{ animationDelay: '0.25s' }}>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          <Lightbulb className="w-5 h-5 text-primary" />
        </div>
        <h3 className="font-display text-xl font-semibold text-foreground">AI Insights</h3>
      </div>

      <div className="space-y-3">
        {insights.map((insight, index) => (
          <div
            key={index}
            className="flex gap-3 p-3 rounded-lg bg-secondary/30 border-l-2 border-primary/50"
            style={{ animationDelay: `${0.3 + index * 0.1}s` }}
          >
            <span className="text-primary font-mono text-sm">{index + 1}.</span>
            <p className="text-sm text-foreground leading-relaxed">{insight}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
