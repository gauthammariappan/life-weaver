import { Sparkles, TrendingUp, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface PredictionWidgetProps {
  predictedMood: number;
  confidence: number;
  factors: { name: string; impact: 'positive' | 'negative' | 'neutral'; weight: number }[];
}

export function PredictionWidget({ predictedMood, confidence, factors }: PredictionWidgetProps) {
  const moodLabel = predictedMood >= 7 ? 'Great' : predictedMood >= 5 ? 'Good' : 'Challenging';
  const moodColor = predictedMood >= 7 ? 'text-fitness' : predictedMood >= 5 ? 'text-mood' : 'text-destructive';
  
  return (
    <div className="glass rounded-xl p-6 relative overflow-hidden">
      {/* Background glow */}
      <div className={cn(
        "absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl opacity-20",
        predictedMood >= 7 ? "bg-fitness" : predictedMood >= 5 ? "bg-mood" : "bg-destructive"
      )} />
      
      <div className="relative">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Tomorrow's Prediction</h3>
        </div>
        
        <div className="flex items-end gap-2 mb-2">
          <span className={cn("text-5xl font-bold", moodColor)}>
            {predictedMood.toFixed(1)}
          </span>
          <span className="text-2xl text-muted-foreground mb-1">/10</span>
        </div>
        
        <p className="text-muted-foreground mb-4">
          Predicted mood: <span className={cn("font-medium", moodColor)}>{moodLabel}</span>
        </p>
        
        <div className="flex items-center gap-2 mb-6 text-sm text-muted-foreground">
          <TrendingUp className="w-4 h-4" />
          <span>{confidence}% confidence (LSTM model)</span>
        </div>
        
        <div className="space-y-3">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Contributing Factors
          </p>
          {factors.map((factor, i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {factor.impact === 'positive' ? (
                  <div className="w-2 h-2 rounded-full bg-fitness" />
                ) : factor.impact === 'negative' ? (
                  <div className="w-2 h-2 rounded-full bg-destructive" />
                ) : (
                  <div className="w-2 h-2 rounded-full bg-muted-foreground" />
                )}
                <span className="text-sm text-foreground">{factor.name}</span>
              </div>
              <span className={cn(
                "text-xs font-medium",
                factor.impact === 'positive' ? 'text-fitness' : 
                factor.impact === 'negative' ? 'text-destructive' : 'text-muted-foreground'
              )}>
                {factor.impact === 'positive' ? '+' : factor.impact === 'negative' ? '-' : ''}
                {factor.weight}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
