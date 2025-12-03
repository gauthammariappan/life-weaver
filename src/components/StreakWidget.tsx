import { Flame, TrendingUp, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

interface StreakWidgetProps {
  streak: number;
  improvement: number;
  bestDay: string;
}

export function StreakWidget({ streak, improvement, bestDay }: StreakWidgetProps) {
  return (
    <div className="glass rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Your Progress</h3>
        <div className="flex items-center gap-1 text-mood">
          <Flame className="w-5 h-5" />
          <span className="font-bold">{streak} day streak</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-secondary/50 rounded-lg p-4">
          <div className="flex items-center gap-2 text-fitness mb-1">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-medium">Improvement</span>
          </div>
          <p className="text-2xl font-bold text-foreground">+{improvement}%</p>
          <p className="text-xs text-muted-foreground">vs last month</p>
        </div>
        
        <div className="bg-secondary/50 rounded-lg p-4">
          <div className="flex items-center gap-2 text-sleep mb-1">
            <Calendar className="w-4 h-4" />
            <span className="text-sm font-medium">Best Day</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{bestDay}</p>
          <p className="text-xs text-muted-foreground">highest avg score</p>
        </div>
      </div>
    </div>
  );
}
