import { useMemo } from "react";
import { Moon, Brain, Dumbbell, Smartphone } from "lucide-react";
import { Header } from "@/components/Header";
import { MetricCard } from "@/components/MetricCard";
import { InsightCard } from "@/components/InsightCard";
import { RecommendationCard } from "@/components/RecommendationCard";
import { CorrelationChart } from "@/components/CorrelationChart";
import { DayTypeChart } from "@/components/DayTypeChart";
import { PredictionWidget } from "@/components/PredictionWidget";
import { StreakWidget } from "@/components/StreakWidget";
import { 
  generateMockDailyData, 
  mockInsights, 
  mockRecommendations,
  weeklyStats 
} from "@/lib/mock-data";

const Index = () => {
  const dailyData = useMemo(() => generateMockDailyData(), []);
  const latestData = dailyData[dailyData.length - 1];
  
  const predictionFactors = [
    { name: 'Good sleep last night', impact: 'positive' as const, weight: 35 },
    { name: 'Workout completed', impact: 'positive' as const, weight: 25 },
    { name: 'Screen time within limit', impact: 'positive' as const, weight: 20 },
    { name: 'High stress yesterday', impact: 'negative' as const, weight: 15 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Hero Section */}
        <section className="mb-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">
                Good evening, <span className="text-gradient">Explorer</span>
              </h2>
              <p className="text-muted-foreground">
                Here's your life pattern analysis for today
              </p>
            </div>
            <div className="text-sm text-muted-foreground">
              Last synced: {new Date().toLocaleTimeString()}
            </div>
          </div>
          
          {/* Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
              title="Sleep Score"
              value={latestData.sleepScore}
              subtitle={`${weeklyStats.averageSleep}h avg this week`}
              icon={Moon}
              trend={5}
              variant="sleep"
            />
            <MetricCard
              title="Mood Score"
              value={latestData.moodScore}
              subtitle={`${weeklyStats.averageMood}/10 avg this week`}
              icon={Brain}
              trend={-2}
              variant="mood"
            />
            <MetricCard
              title="Fitness Score"
              value={latestData.fitnessScore}
              subtitle={`${weeklyStats.workoutsCompleted} workouts this week`}
              icon={Dumbbell}
              trend={12}
              variant="fitness"
            />
            <MetricCard
              title="Digital Balance"
              value={latestData.socialScore}
              subtitle={`${weeklyStats.screenTimeAvg}m avg daily`}
              icon={Smartphone}
              trend={8}
              variant="social"
            />
          </div>
        </section>
        
        {/* Charts & Prediction Section */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          <div className="lg:col-span-2">
            <CorrelationChart data={dailyData} />
          </div>
          <div className="space-y-6">
            <PredictionWidget
              predictedMood={7.2}
              confidence={78}
              factors={predictionFactors}
            />
          </div>
        </section>
        
        {/* Day Types & Streak Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <DayTypeChart data={dailyData} />
          <StreakWidget
            streak={weeklyStats.streak}
            improvement={weeklyStats.improvement}
            bestDay={weeklyStats.bestDay}
          />
        </section>
        
        {/* Insights Section */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-foreground mb-6">
            AI Insights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockInsights.map((insight, index) => (
              <InsightCard key={insight.id} insight={insight} index={index} />
            ))}
          </div>
        </section>
        
        {/* Recommendations Section */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-foreground mb-6">
            Weekly Optimization
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockRecommendations.map((rec, index) => (
              <RecommendationCard key={rec.id} recommendation={rec} index={index} />
            ))}
          </div>
        </section>
        
        {/* Footer */}
        <footer className="text-center py-8 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Life Pattern Engine • Your data, analyzed and predicted
          </p>
        </footer>
      </main>
    </div>
  );
};

export default Index;
