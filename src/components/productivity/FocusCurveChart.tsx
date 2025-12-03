import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { FocusPrediction } from '@/types/productivity';

interface FocusCurveChartProps {
  data: FocusPrediction[];
  currentHour?: number;
}

export function FocusCurveChart({ data, currentHour = new Date().getHours() }: FocusCurveChartProps) {
  const chartData = data.map(d => ({
    ...d,
    time: `${d.hour}:00`,
    isCurrent: d.hour === currentHour,
  }));

  return (
    <div className="card-elevated rounded-2xl p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-display text-xl font-semibold text-foreground">Focus Curve</h3>
          <p className="text-sm text-muted-foreground mt-1">AI-predicted focus levels throughout your day</p>
        </div>
        <div className="flex gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-focus" />
            <span className="text-muted-foreground">Focus</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-energy" />
            <span className="text-muted-foreground">Energy</span>
          </div>
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="focusGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(220, 90%, 56%)" stopOpacity={0.4} />
                <stop offset="100%" stopColor="hsl(220, 90%, 56%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="energyGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(45, 100%, 50%)" stopOpacity={0.3} />
                <stop offset="100%" stopColor="hsl(45, 100%, 50%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="time" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
              interval={2}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
              domain={[0, 100]}
              ticks={[0, 25, 50, 75, 100]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '12px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              }}
              labelStyle={{ color: 'hsl(var(--foreground))' }}
              formatter={(value: number, name: string) => [
                `${value}%`,
                name === 'focusLevel' ? 'Focus' : 'Energy'
              ]}
            />
            <ReferenceLine 
              x={`${currentHour}:00`} 
              stroke="hsl(var(--primary))" 
              strokeDasharray="4 4"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="energyLevel"
              stroke="hsl(45, 100%, 50%)"
              strokeWidth={2}
              fill="url(#energyGradient)"
            />
            <Area
              type="monotone"
              dataKey="focusLevel"
              stroke="hsl(220, 90%, 56%)"
              strokeWidth={2}
              fill="url(#focusGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
        <div className="w-2 h-2 rounded-full bg-primary animate-pulse-soft" />
        <span>Current time marker</span>
      </div>
    </div>
  );
}
