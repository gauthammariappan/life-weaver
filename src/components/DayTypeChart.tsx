import { DailyAggregate } from "@/types/life-data";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell 
} from "recharts";

interface DayTypeChartProps {
  data: DailyAggregate[];
}

const dayTypeColors = {
  great: "hsl(142, 71%, 45%)",
  good: "hsl(199, 89%, 48%)",
  average: "hsl(38, 92%, 50%)",
  poor: "hsl(0, 84%, 60%)",
};

export function DayTypeChart({ data }: DayTypeChartProps) {
  // Count day types
  const counts = data.reduce((acc, d) => {
    acc[d.dayType] = (acc[d.dayType] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const chartData = [
    { type: 'Great', count: counts.great || 0, fill: dayTypeColors.great },
    { type: 'Good', count: counts.good || 0, fill: dayTypeColors.good },
    { type: 'Average', count: counts.average || 0, fill: dayTypeColors.average },
    { type: 'Poor', count: counts.poor || 0, fill: dayTypeColors.poor },
  ];

  return (
    <div className="glass rounded-xl p-6">
      <h3 className="text-lg font-semibold text-foreground mb-1">Day Classification</h3>
      <p className="text-sm text-muted-foreground mb-6">K-Means clustering of your days</p>
      
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={chartData} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 30%, 16%)" horizontal={false} />
          <XAxis 
            type="number"
            stroke="hsl(215, 20%, 55%)"
            fontSize={12}
            tickLine={false}
          />
          <YAxis 
            type="category"
            dataKey="type"
            stroke="hsl(215, 20%, 55%)"
            fontSize={12}
            tickLine={false}
            width={60}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'hsl(222, 47%, 10%)', 
              border: '1px solid hsl(222, 30%, 20%)',
              borderRadius: '8px',
            }}
            labelStyle={{ color: 'hsl(210, 40%, 98%)' }}
            formatter={(value) => [`${value} days`, 'Count']}
          />
          <Bar 
            dataKey="count" 
            radius={[0, 4, 4, 0]}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      
      <div className="flex justify-between mt-4 text-xs text-muted-foreground">
        <span>Based on composite score analysis</span>
        <span className="text-fitness">
          {Math.round(((counts.great || 0) + (counts.good || 0)) / data.length * 100)}% positive days
        </span>
      </div>
    </div>
  );
}
