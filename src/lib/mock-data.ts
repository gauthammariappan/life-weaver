import { DailyAggregate, Insight, WeeklyRecommendation } from "@/types/life-data";

// Generate mock data for the last 30 days
export const generateMockDailyData = (): DailyAggregate[] => {
  const data: DailyAggregate[] = [];
  const today = new Date();
  
  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    const sleepScore = Math.floor(Math.random() * 40) + 60;
    const moodScore = Math.floor(Math.random() * 40) + 55;
    const fitnessScore = Math.floor(Math.random() * 50) + 50;
    const socialScore = Math.floor(Math.random() * 45) + 50;
    const overallScore = Math.round((sleepScore + moodScore + fitnessScore + socialScore) / 4);
    
    let dayType: 'great' | 'good' | 'average' | 'poor';
    if (overallScore >= 80) dayType = 'great';
    else if (overallScore >= 65) dayType = 'good';
    else if (overallScore >= 50) dayType = 'average';
    else dayType = 'poor';
    
    data.push({
      date: date.toISOString().split('T')[0],
      sleepScore,
      moodScore,
      fitnessScore,
      socialScore,
      overallScore,
      dayType,
    });
  }
  
  return data;
};

export const mockInsights: Insight[] = [
  {
    id: '1',
    type: 'correlation',
    title: 'Sleep is your #1 lever',
    description: 'Analysis shows 7+ hours of sleep correlates with 40% better mood scores the next day. Your sleep consistency has the strongest impact on overall wellbeing.',
    confidence: 92,
    relatedMetrics: ['sleep', 'mood'],
    icon: '🎯',
  },
  {
    id: '2',
    type: 'prediction',
    title: 'Tomorrow looks promising',
    description: 'Based on your patterns, tomorrow has an 78% probability of being a "good" or "great" day if you maintain tonight\'s sleep schedule.',
    confidence: 78,
    relatedMetrics: ['mood', 'sleep'],
    icon: '🔮',
  },
  {
    id: '3',
    type: 'correlation',
    title: 'Morning workouts boost mood',
    description: 'Days with morning exercise (before 10am) show 25% higher mood scores compared to evening workouts or rest days.',
    confidence: 85,
    relatedMetrics: ['fitness', 'mood', 'schedule'],
    icon: '💪',
  },
  {
    id: '4',
    type: 'correlation',
    title: 'Screen time threshold detected',
    description: 'Mood drops significantly when social media usage exceeds 90 minutes. You perform best with 30-60 minutes of daily social time.',
    confidence: 88,
    relatedMetrics: ['social', 'mood'],
    icon: '📱',
  },
];

export const mockRecommendations: WeeklyRecommendation[] = [
  {
    id: '1',
    category: 'sleep',
    title: 'Optimize your bedtime',
    description: 'Your best days follow nights where you slept before 11pm. Consider shifting bedtime 30 minutes earlier.',
    impact: 'high',
    actionable: 'Set a bedtime alarm for 10:30pm this week',
  },
  {
    id: '2',
    category: 'fitness',
    title: 'Add one more workout',
    description: 'You averaged 3 workouts last week. Data shows your mood peaks at 4-5 workouts per week.',
    impact: 'medium',
    actionable: 'Schedule a 30-min workout on Wednesday',
  },
  {
    id: '3',
    category: 'social',
    title: 'Reduce evening scrolling',
    description: 'Phone usage after 9pm correlates with poor sleep quality. Try a digital sunset.',
    impact: 'high',
    actionable: 'Enable Do Not Disturb mode at 9pm',
  },
  {
    id: '4',
    category: 'mood',
    title: 'Journal on low days',
    description: 'Your mood logs with notes show faster recovery. Writing helps process emotions.',
    impact: 'medium',
    actionable: 'Add a note when mood drops below 5',
  },
];

export const weeklyStats = {
  averageSleep: 7.2,
  averageMood: 6.8,
  workoutsCompleted: 4,
  screenTimeAvg: 85,
  bestDay: 'Thursday',
  worstDay: 'Monday',
  streak: 12,
  improvement: 8,
};
