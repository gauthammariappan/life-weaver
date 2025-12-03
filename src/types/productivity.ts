export interface DailyInput {
  sleepHours: number;
  stressLevel: number; // 1-10
  focusLevel: number; // 1-10
  date: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: 'high' | 'medium' | 'low';
  status: 'todo' | 'inProgress' | 'done';
  estimatedMinutes: number;
  createdAt: string;
}

export interface TimeBlock {
  startHour: number;
  endHour: number;
  type: 'deepWork' | 'lightWork' | 'break' | 'meeting';
  taskId?: string;
  label: string;
}

export interface FocusPrediction {
  hour: number;
  focusLevel: number;
  energyLevel: number;
}

export interface PeakHours {
  morning: { start: number; end: number; score: number };
  afternoon: { start: number; end: number; score: number };
  bestTimeForDeepWork: string;
  bestTimeForMeetings: string;
}

export interface DayAnalysis {
  overallScore: number;
  focusCurve: FocusPrediction[];
  peakHours: PeakHours;
  recommendedSchedule: TimeBlock[];
  workRestRatio: { work: number; rest: number };
  insights: string[];
}

export interface ProductivityState {
  dailyInput: DailyInput | null;
  tasks: Task[];
  analysis: DayAnalysis | null;
  history: Array<{ date: string; input: DailyInput; score: number }>;
}
