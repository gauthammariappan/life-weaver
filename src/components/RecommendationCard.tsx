import { WeeklyRecommendation } from "@/types/life-data";
import { cn } from "@/lib/utils";
import { Moon, Brain, Dumbbell, Smartphone, Calendar, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

interface RecommendationCardProps {
  recommendation: WeeklyRecommendation;
  index: number;
}

const categoryIcons = {
  sleep: Moon,
  mood: Brain,
  fitness: Dumbbell,
  social: Smartphone,
  schedule: Calendar,
};

const categoryStyles = {
  sleep: "gradient-sleep",
  mood: "gradient-mood",
  fitness: "gradient-fitness",
  social: "gradient-social",
  schedule: "bg-schedule",
};

const impactColors = {
  high: "text-fitness bg-fitness/20",
  medium: "text-mood bg-mood/20",
  low: "text-muted-foreground bg-muted",
};

export function RecommendationCard({ recommendation, index }: RecommendationCardProps) {
  const Icon = categoryIcons[recommendation.category];
  
  return (
    <div 
      className={cn(
        "glass rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.01]",
        "animate-slide-in-right"
      )}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className={cn("h-1", categoryStyles[recommendation.category])} />
      <div className="p-5">
        <div className="flex items-start gap-4">
          <div className={cn(
            "p-2.5 rounded-lg",
            `bg-${recommendation.category}/20`
          )}>
            <Icon className={cn("w-5 h-5", `text-${recommendation.category}`)} />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-foreground">{recommendation.title}</h3>
              <span className={cn(
                "text-xs font-medium px-2 py-1 rounded-full capitalize",
                impactColors[recommendation.impact]
              )}>
                {recommendation.impact} impact
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              {recommendation.description}
            </p>
            <div className="flex items-center justify-between">
              <p className="text-xs text-foreground/80 font-medium">
                → {recommendation.actionable}
              </p>
              <Button variant="ghost" size="sm" className="text-primary">
                Apply
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
