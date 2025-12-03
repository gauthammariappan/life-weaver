import { DailyInput, DayAnalysis, FocusPrediction, PeakHours, TimeBlock, Task } from '@/types/productivity';

// Simulated ML model weights (in real app, this would be a trained model)
const FOCUS_WEIGHTS = {
  sleepBase: 0.4,
  stressImpact: -0.25,
  focusMultiplier: 0.35,
};

// Generate focus curve prediction based on inputs
export function predictFocusCurve(input: DailyInput): FocusPrediction[] {
  const curve: FocusPrediction[] = [];
  const baseEnergy = (input.sleepHours / 8) * 100;
  const stressModifier = (10 - input.stressLevel) / 10;
  const focusBoost = input.focusLevel / 10;

  for (let hour = 6; hour <= 22; hour++) {
    // Natural circadian rhythm simulation
    let circadianFactor = 1;
    if (hour >= 6 && hour < 10) {
      circadianFactor = 0.7 + ((hour - 6) / 4) * 0.3; // Morning ramp up
    } else if (hour >= 10 && hour < 12) {
      circadianFactor = 1.0; // Morning peak
    } else if (hour >= 12 && hour < 14) {
      circadianFactor = 0.75; // Post-lunch dip
    } else if (hour >= 14 && hour < 17) {
      circadianFactor = 0.9; // Afternoon recovery
    } else if (hour >= 17 && hour < 20) {
      circadianFactor = 0.85; // Evening decline
    } else {
      circadianFactor = 0.6; // Night low
    }

    const focusLevel = Math.min(100, Math.max(0,
      baseEnergy * FOCUS_WEIGHTS.sleepBase +
      stressModifier * 30 * FOCUS_WEIGHTS.stressImpact * -1 +
      focusBoost * 40 * FOCUS_WEIGHTS.focusMultiplier +
      circadianFactor * 30 +
      (Math.random() * 10 - 5) // Small noise
    ));

    const energyLevel = Math.min(100, Math.max(0,
      baseEnergy * circadianFactor * stressModifier +
      (Math.random() * 8 - 4)
    ));

    curve.push({
      hour,
      focusLevel: Math.round(focusLevel),
      energyLevel: Math.round(energyLevel),
    });
  }

  return curve;
}

// Identify peak productivity hours
export function identifyPeakHours(curve: FocusPrediction[]): PeakHours {
  const morningHours = curve.filter(p => p.hour >= 6 && p.hour < 12);
  const afternoonHours = curve.filter(p => p.hour >= 12 && p.hour < 18);

  const bestMorning = morningHours.reduce((best, curr) =>
    curr.focusLevel > best.focusLevel ? curr : best
  );
  const bestAfternoon = afternoonHours.reduce((best, curr) =>
    curr.focusLevel > best.focusLevel ? curr : best
  );

  const morningAvg = morningHours.reduce((sum, p) => sum + p.focusLevel, 0) / morningHours.length;
  const afternoonAvg = afternoonHours.reduce((sum, p) => sum + p.focusLevel, 0) / afternoonHours.length;

  return {
    morning: {
      start: Math.max(6, bestMorning.hour - 1),
      end: Math.min(12, bestMorning.hour + 1),
      score: Math.round(morningAvg),
    },
    afternoon: {
      start: Math.max(12, bestAfternoon.hour - 1),
      end: Math.min(18, bestAfternoon.hour + 1),
      score: Math.round(afternoonAvg),
    },
    bestTimeForDeepWork: morningAvg > afternoonAvg
      ? `${bestMorning.hour}:00 - ${bestMorning.hour + 2}:00`
      : `${bestAfternoon.hour}:00 - ${bestAfternoon.hour + 2}:00`,
    bestTimeForMeetings: morningAvg > afternoonAvg
      ? `${bestAfternoon.hour - 1}:00 - ${bestAfternoon.hour + 1}:00`
      : `${bestMorning.hour - 1}:00 - ${bestMorning.hour + 1}:00`,
  };
}

// Generate recommended schedule
export function generateSchedule(
  curve: FocusPrediction[],
  tasks: Task[],
  peakHours: PeakHours
): TimeBlock[] {
  const schedule: TimeBlock[] = [];
  const sortedTasks = [...tasks]
    .filter(t => t.status !== 'done')
    .sort((a, b) => {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });

  let currentHour = 8;
  let taskIndex = 0;

  while (currentHour < 18) {
    const prediction = curve.find(p => p.hour === currentHour);
    const focusLevel = prediction?.focusLevel || 50;

    if (focusLevel >= 70 && taskIndex < sortedTasks.length) {
      // Deep work block
      const task = sortedTasks[taskIndex];
      schedule.push({
        startHour: currentHour,
        endHour: currentHour + 2,
        type: 'deepWork',
        taskId: task.id,
        label: task.title,
      });
      taskIndex++;
      currentHour += 2;
    } else if (focusLevel >= 50) {
      // Light work or meetings
      schedule.push({
        startHour: currentHour,
        endHour: currentHour + 1,
        type: 'lightWork',
        label: 'Admin tasks / Emails',
      });
      currentHour += 1;
    } else {
      // Break time
      schedule.push({
        startHour: currentHour,
        endHour: currentHour + 0.5,
        type: 'break',
        label: 'Rest & recharge',
      });
      currentHour += 0.5;
    }

    // Prevent infinite loops
    if (schedule.length > 20) break;
  }

  return schedule;
}

// Generate insights based on analysis
export function generateInsights(input: DailyInput, curve: FocusPrediction[]): string[] {
  const insights: string[] = [];
  const avgFocus = curve.reduce((sum, p) => sum + p.focusLevel, 0) / curve.length;

  if (input.sleepHours < 7) {
    insights.push("Your sleep deficit may reduce peak focus by ~20%. Consider a 20-min power nap after lunch.");
  }

  if (input.stressLevel >= 7) {
    insights.push("High stress detected. Schedule buffer time between tasks and include mindfulness breaks.");
  }

  if (input.focusLevel >= 8) {
    insights.push("You're in a high-focus state! Tackle your most challenging task first while this lasts.");
  }

  if (avgFocus < 50) {
    insights.push("Today might be better for routine tasks. Save creative work for a higher-energy day.");
  }

  const morningPeak = curve.filter(p => p.hour >= 8 && p.hour < 12)
    .reduce((sum, p) => sum + p.focusLevel, 0) / 4;
  const afternoonPeak = curve.filter(p => p.hour >= 14 && p.hour < 18)
    .reduce((sum, p) => sum + p.focusLevel, 0) / 4;

  if (morningPeak > afternoonPeak + 15) {
    insights.push("You're a morning person today. Front-load important work before noon.");
  } else if (afternoonPeak > morningPeak + 15) {
    insights.push("Afternoon is your power zone today. Use mornings for warm-up tasks.");
  }

  return insights.slice(0, 4);
}

// Main analysis function
export function analyzeDay(input: DailyInput, tasks: Task[]): DayAnalysis {
  const focusCurve = predictFocusCurve(input);
  const peakHours = identifyPeakHours(focusCurve);
  const recommendedSchedule = generateSchedule(focusCurve, tasks, peakHours);
  const insights = generateInsights(input, focusCurve);

  const avgFocus = focusCurve.reduce((sum, p) => sum + p.focusLevel, 0) / focusCurve.length;
  const overallScore = Math.round(
    (input.sleepHours / 8) * 30 +
    ((10 - input.stressLevel) / 10) * 30 +
    (input.focusLevel / 10) * 20 +
    (avgFocus / 100) * 20
  );

  const workBlocks = recommendedSchedule.filter(b => b.type === 'deepWork' || b.type === 'lightWork');
  const restBlocks = recommendedSchedule.filter(b => b.type === 'break');
  const workHours = workBlocks.reduce((sum, b) => sum + (b.endHour - b.startHour), 0);
  const restHours = restBlocks.reduce((sum, b) => sum + (b.endHour - b.startHour), 0);

  return {
    overallScore,
    focusCurve,
    peakHours,
    recommendedSchedule,
    workRestRatio: {
      work: Math.round((workHours / (workHours + restHours)) * 100) || 80,
      rest: Math.round((restHours / (workHours + restHours)) * 100) || 20,
    },
    insights,
  };
}

// LocalStorage helpers
const STORAGE_KEY = 'productivity-coach-data';

export function saveToLocalStorage(state: {
  dailyInput: DailyInput | null;
  tasks: Task[];
  history: Array<{ date: string; input: DailyInput; score: number }>;
}) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function loadFromLocalStorage(): {
  dailyInput: DailyInput | null;
  tasks: Task[];
  history: Array<{ date: string; input: DailyInput; score: number }>;
} | null {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return null;
  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
}
