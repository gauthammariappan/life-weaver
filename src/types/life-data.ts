export interface SleepLog {
  id: string;
  date: string;
  hoursSlept: number;
  quality: number; // 1-10
  bedTime: string;
  wakeTime: string;
}

export interface MoodLog {
  id: string;
  date: string;
  mood: number; // 1-10
  energy: number; // 1-10
  stress: number; // 1-10
  notes?: string;
}

export interface GymLog {
  id: string;
  date: string;
  duration: number; // minutes
  type: 'cardio' | 'strength' | 'flexibility' | 'mixed';
  intensity: number; // 1-10
  exercises?: string[];
}

export interface SocialMediaLog {
  id: string;
  date: string;
  screenTime: number; // minutes
  platforms: string[];
  productiveTime: number; // minutes
}

export interface ScheduleEntry {
  id: string;
  date: string;
  title: string;
  type: 'class' | 'meeting' | 'work' | 'personal';
  startTime: string;
  endTime: string;
}

export interface DailyAggregate {
  date: string;
  sleepScore: number;
  moodScore: number;
  fitnessScore: number;
  socialScore: number;
  overallScore: number;
  dayType: 'great' | 'good' | 'average' | 'poor';
}

export interface Insight {
  id: string;
  type: 'correlation' | 'prediction' | 'recommendation';
  title: string;
  description: string;
  confidence: number;
  relatedMetrics: string[];
  icon: string;
}

export interface WeeklyRecommendation {
  id: string;
  category: 'sleep' | 'mood' | 'fitness' | 'social' | 'schedule';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  actionable: string;
}
