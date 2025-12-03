import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: number;
  variant: 'sleep' | 'mood' | 'fitness' | 'social' | 'schedule';
  className?: string;
}

const variantStyles = {
  sleep: {
    gradient: 'gradient-sleep',
    glow: 'glow-sleep',
    iconBg: 'bg-sleep/20',
    iconColor: 'text-sleep',
  },
  mood: {
    gradient: 'gradient-mood',
    glow: 'glow-mood',
    iconBg: 'bg-mood/20',
    iconColor: 'text-mood',
  },
  fitness: {
    gradient: 'gradient-fitness',
    glow: 'glow-fitness',
    iconBg: 'bg-fitness/20',
    iconColor: 'text-fitness',
  },
  social: {
    gradient: 'gradient-social',
    glow: 'glow-social',
    iconBg: 'bg-social/20',
    iconColor: 'text-social',
  },
  schedule: {
    gradient: 'bg-schedule',
    glow: '',
    iconBg: 'bg-schedule/20',
    iconColor: 'text-schedule',
  },
};

export function MetricCard({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  trend, 
  variant,
  className 
}: MetricCardProps) {
  const styles = variantStyles[variant];
  
  return (
    <div 
      className={cn(
        "glass rounded-xl p-5 transition-all duration-300 hover:scale-[1.02] group",
        className
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={cn(
          "p-2.5 rounded-lg transition-all duration-300",
          styles.iconBg,
          "group-hover:scale-110"
        )}>
          <Icon className={cn("w-5 h-5", styles.iconColor)} />
        </div>
        {trend !== undefined && (
          <span className={cn(
            "text-xs font-medium px-2 py-1 rounded-full",
            trend >= 0 ? "bg-fitness/20 text-fitness" : "bg-destructive/20 text-destructive"
          )}>
            {trend >= 0 ? '+' : ''}{trend}%
          </span>
        )}
      </div>
      
      <h3 className="text-muted-foreground text-sm font-medium mb-1">{title}</h3>
      <p className="text-3xl font-semibold text-foreground">{value}</p>
      {subtitle && (
        <p className="text-muted-foreground text-xs mt-1">{subtitle}</p>
      )}
      
      <div className={cn(
        "h-1 rounded-full mt-4 overflow-hidden bg-muted"
      )}>
        <div 
          className={cn("h-full rounded-full transition-all duration-500", styles.gradient)}
          style={{ width: `${typeof value === 'number' ? value : 75}%` }}
        />
      </div>
    </div>
  );
}
