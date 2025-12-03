import { Insight } from "@/types/life-data";
import { cn } from "@/lib/utils";
import { TrendingUp, Sparkles, Lightbulb } from "lucide-react";

interface InsightCardProps {
  insight: Insight;
  index: number;
}

const typeIcons = {
  correlation: TrendingUp,
  prediction: Sparkles,
  recommendation: Lightbulb,
};

const typeStyles = {
  correlation: "border-sleep/30 bg-sleep/5",
  prediction: "border-mood/30 bg-mood/5",
  recommendation: "border-fitness/30 bg-fitness/5",
};

export function InsightCard({ insight, index }: InsightCardProps) {
  const Icon = typeIcons[insight.type];
  
  return (
    <div 
      className={cn(
        "glass rounded-xl p-5 border transition-all duration-300 hover:scale-[1.01]",
        typeStyles[insight.type],
        "animate-fade-in"
      )}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex items-start gap-4">
        <span className="text-3xl">{insight.icon}</span>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-foreground">{insight.title}</h3>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Icon className="w-3.5 h-3.5" />
              <span>{insight.confidence}% confidence</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {insight.description}
          </p>
          <div className="flex gap-2 mt-3">
            {insight.relatedMetrics.map((metric) => (
              <span 
                key={metric}
                className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground capitalize"
              >
                {metric}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
