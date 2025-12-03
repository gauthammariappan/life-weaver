import { Briefcase, Coffee, Zap, Users } from 'lucide-react';
import { TimeBlock } from '@/types/productivity';

interface ScheduleTimelineProps {
  schedule: TimeBlock[];
}

const blockConfig = {
  deepWork: {
    icon: Zap,
    color: 'bg-focus/10 border-focus/30 text-focus',
    iconBg: 'bg-focus',
    label: 'Deep Work',
  },
  lightWork: {
    icon: Briefcase,
    color: 'bg-energy/10 border-energy/30 text-energy',
    iconBg: 'bg-energy',
    label: 'Light Work',
  },
  break: {
    icon: Coffee,
    color: 'bg-rest/10 border-rest/30 text-rest',
    iconBg: 'bg-rest',
    label: 'Break',
  },
  meeting: {
    icon: Users,
    color: 'bg-task/10 border-task/30 text-task',
    iconBg: 'bg-task',
    label: 'Meeting',
  },
};

export function ScheduleTimeline({ schedule }: ScheduleTimelineProps) {
  const formatTime = (hour: number) => {
    const h = Math.floor(hour);
    const m = (hour % 1) * 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
  };

  return (
    <div className="card-elevated rounded-2xl p-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-display text-xl font-semibold text-foreground">Recommended Schedule</h3>
          <p className="text-sm text-muted-foreground mt-1">AI-optimized time blocks</p>
        </div>
      </div>

      <div className="space-y-3">
        {schedule.map((block, index) => {
          const config = blockConfig[block.type];
          const Icon = config.icon;
          const duration = block.endHour - block.startHour;

          return (
            <div
              key={index}
              className={`flex items-center gap-4 p-4 rounded-xl border ${config.color} transition-all hover:scale-[1.01]`}
              style={{ animationDelay: `${0.3 + index * 0.05}s` }}
            >
              <div className={`w-10 h-10 rounded-lg ${config.iconBg} flex items-center justify-center`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground truncate">{block.label}</p>
                <p className="text-sm text-muted-foreground">{config.label}</p>
              </div>

              <div className="text-right">
                <p className="font-mono text-sm font-medium text-foreground">
                  {formatTime(block.startHour)} - {formatTime(block.endHour)}
                </p>
                <p className="text-xs text-muted-foreground">
                  {duration >= 1 ? `${duration}h` : `${duration * 60}min`}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
