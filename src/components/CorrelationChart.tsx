import { DailyAggregate } from "@/types/life-data";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend 
} from "recharts";

interface CorrelationChartProps {
  data: DailyAggregate[];
}

export function CorrelationChart({ data }: CorrelationChartProps) {
  const chartData = data.slice(-14).map((d) => ({
    date: new Date(d.date).toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' }),
    Sleep: d.sleepScore,
    Mood: d.moodScore,
    Fitness: d.fitnessScore,
    Social: d.socialScore,
  }));

  return (
    <div className="glass rounded-xl p-6">
      <h3 className="text-lg font-semibold text-foreground mb-1">Pattern Correlations</h3>
      <p className="text-sm text-muted-foreground mb-6">Last 14 days metric overlay</p>
      
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="sleepGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(199, 89%, 48%)" stopOpacity={0.4}/>
              <stop offset="95%" stopColor="hsl(199, 89%, 48%)" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="moodGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(38, 92%, 50%)" stopOpacity={0.4}/>
              <stop offset="95%" stopColor="hsl(38, 92%, 50%)" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="fitnessGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(142, 71%, 45%)" stopOpacity={0.4}/>
              <stop offset="95%" stopColor="hsl(142, 71%, 45%)" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="socialGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(280, 65%, 60%)" stopOpacity={0.4}/>
              <stop offset="95%" stopColor="hsl(280, 65%, 60%)" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 30%, 16%)" />
          <XAxis 
            dataKey="date" 
            stroke="hsl(215, 20%, 55%)"
            fontSize={12}
            tickLine={false}
          />
          <YAxis 
            stroke="hsl(215, 20%, 55%)"
            fontSize={12}
            tickLine={false}
            domain={[0, 100]}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'hsl(222, 47%, 10%)', 
              border: '1px solid hsl(222, 30%, 20%)',
              borderRadius: '8px',
            }}
            labelStyle={{ color: 'hsl(210, 40%, 98%)' }}
          />
          <Legend />
          <Area 
            type="monotone" 
            dataKey="Sleep" 
            stroke="hsl(199, 89%, 48%)" 
            fill="url(#sleepGradient)"
            strokeWidth={2}
          />
          <Area 
            type="monotone" 
            dataKey="Mood" 
            stroke="hsl(38, 92%, 50%)" 
            fill="url(#moodGradient)"
            strokeWidth={2}
          />
          <Area 
            type="monotone" 
            dataKey="Fitness" 
            stroke="hsl(142, 71%, 45%)" 
            fill="url(#fitnessGradient)"
            strokeWidth={2}
          />
          <Area 
            type="monotone" 
            dataKey="Social" 
            stroke="hsl(280, 65%, 60%)" 
            fill="url(#socialGradient)"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
