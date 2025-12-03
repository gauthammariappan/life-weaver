import { Sun, Sunset, Clock, Users } from 'lucide-react';
import { PeakHours } from '@/types/productivity';

interface PeakHoursCardProps {
  peakHours: PeakHours;
}

export function PeakHoursCard({ peakHours }: PeakHoursCardProps) {
  return (
    <div className="card-elevated rounded-2xl p-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
      <h3 className="font-display text-xl font-semibold text-foreground mb-6">Peak Hours</h3>
      
      <div className="space-y-4">
        {/* Morning Peak */}
        <div className="flex items-center gap-4 p-4 rounded-xl bg-secondary/50">
          <div className="w-12 h-12 rounded-full bg-energy/10 flex items-center justify-center">
            <Sun className="w-6 h-6 text-energy" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-muted-foreground">Morning Window</p>
            <p className="font-display text-lg font-semibold text-foreground">
              {peakHours.morning.start}:00 - {peakHours.morning.end}:00
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-display font-bold text-energy">{peakHours.morning.score}%</p>
            <p className="text-xs text-muted-foreground">avg focus</p>
          </div>
        </div>

        {/* Afternoon Peak */}
        <div className="flex items-center gap-4 p-4 rounded-xl bg-secondary/50">
          <div className="w-12 h-12 rounded-full bg-focus/10 flex items-center justify-center">
            <Sunset className="w-6 h-6 text-focus" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-muted-foreground">Afternoon Window</p>
            <p className="font-display text-lg font-semibold text-foreground">
              {peakHours.afternoon.start}:00 - {peakHours.afternoon.end}:00
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-display font-bold text-focus">{peakHours.afternoon.score}%</p>
            <p className="text-xs text-muted-foreground">avg focus</p>
          </div>
        </div>

        {/* Recommendations */}
        <div className="pt-4 border-t border-border space-y-3">
          <div className="flex items-center gap-3">
            <Clock className="w-4 h-4 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Best for Deep Work</p>
              <p className="text-sm font-medium text-foreground">{peakHours.bestTimeForDeepWork}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Users className="w-4 h-4 text-rest" />
            <div>
              <p className="text-xs text-muted-foreground">Best for Meetings</p>
              <p className="text-sm font-medium text-foreground">{peakHours.bestTimeForMeetings}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
