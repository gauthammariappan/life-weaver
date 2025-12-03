import { useState, useEffect, useCallback } from 'react';
import { Sparkles, RotateCcw, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DailyInputForm } from '@/components/productivity/DailyInputForm';
import { FocusCurveChart } from '@/components/productivity/FocusCurveChart';
import { PeakHoursCard } from '@/components/productivity/PeakHoursCard';
import { ScheduleTimeline } from '@/components/productivity/ScheduleTimeline';
import { KanbanBoard } from '@/components/productivity/KanbanBoard';
import { ScoreRing } from '@/components/productivity/ScoreRing';
import { InsightsList } from '@/components/productivity/InsightsList';
import { WorkRestBalance } from '@/components/productivity/WorkRestBalance';
import { DailyInput, Task, DayAnalysis } from '@/types/productivity';
import { analyzeDay, saveToLocalStorage, loadFromLocalStorage } from '@/lib/productivity-engine';

const Index = () => {
  const [dailyInput, setDailyInput] = useState<DailyInput | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [analysis, setAnalysis] = useState<DayAnalysis | null>(null);
  const [isDark, setIsDark] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = loadFromLocalStorage();
    if (saved) {
      const today = new Date().toISOString().split('T')[0];
      if (saved.dailyInput?.date === today) {
        setDailyInput(saved.dailyInput);
        setTasks(saved.tasks);
      } else {
        setTasks(saved.tasks.filter(t => t.status !== 'done'));
      }
    }
  }, []);

  // Analyze when input changes
  useEffect(() => {
    if (dailyInput) {
      const result = analyzeDay(dailyInput, tasks);
      setAnalysis(result);
      saveToLocalStorage({ dailyInput, tasks, history: [] });
    }
  }, [dailyInput, tasks]);

  // Toggle dark mode
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  const handleInputSubmit = (input: DailyInput) => {
    setDailyInput(input);
  };

  const handleAddTask = useCallback((task: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...task,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    setTasks(prev => [...prev, newTask]);
  }, []);

  const handleUpdateTask = useCallback((id: string, updates: Partial<Task>) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
  }, []);

  const handleDeleteTask = useCallback((id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  }, []);

  const handleReset = () => {
    setDailyInput(null);
    setAnalysis(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 py-4 max-w-7xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-display text-xl font-semibold text-foreground">You vs AI</h1>
                <p className="text-xs text-muted-foreground">Productivity Coach</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsDark(!isDark)}
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </Button>
              {dailyInput && (
                <Button variant="outline" size="sm" onClick={handleReset}>
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset Day
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {!dailyInput ? (
          // Input Form
          <div className="max-w-lg mx-auto">
            <div className="text-center mb-8 animate-fade-in">
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                Daily Check-in
              </span>
              <h1 className="font-display text-4xl font-bold text-foreground mb-4">
                Let's optimize <span className="text-gradient">your day</span>
              </h1>
              <p className="text-muted-foreground max-w-md mx-auto">
                Tell us how you're feeling and we'll generate an AI-optimized schedule based on your predicted focus curve.
              </p>
            </div>

            <div className="card-elevated rounded-2xl p-8 animate-slide-up">
              <DailyInputForm onSubmit={handleInputSubmit} initialValues={dailyInput} />
            </div>

            {/* Task Board Preview */}
            <div className="mt-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <KanbanBoard
                tasks={tasks}
                onAddTask={handleAddTask}
                onUpdateTask={handleUpdateTask}
                onDeleteTask={handleDeleteTask}
              />
            </div>
          </div>
        ) : analysis ? (
          // Dashboard
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="flex flex-col lg:flex-row items-center gap-8 mb-8">
              <div className="flex-1 animate-fade-in">
                <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                  {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                </span>
                <h1 className="font-display text-4xl lg:text-5xl font-bold text-foreground mb-4">
                  Your day, <span className="text-gradient">optimized</span>
                </h1>
                <p className="text-muted-foreground text-lg max-w-xl">
                  Based on {dailyInput.sleepHours}h sleep, stress level {dailyInput.stressLevel}/10, and focus {dailyInput.focusLevel}/10
                </p>
              </div>
              <div className="animate-scale-in">
                <ScoreRing score={analysis.overallScore} label="Day Score" size="lg" />
              </div>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <FocusCurveChart data={analysis.focusCurve} />
              </div>
              <div className="space-y-6">
                <WorkRestBalance work={analysis.workRestRatio.work} rest={analysis.workRestRatio.rest} />
                <InsightsList insights={analysis.insights} />
              </div>
            </div>

            {/* Schedule & Peak Hours */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <PeakHoursCard peakHours={analysis.peakHours} />
              <ScheduleTimeline schedule={analysis.recommendedSchedule} />
            </div>

            {/* Kanban Board */}
            <KanbanBoard
              tasks={tasks}
              onAddTask={handleAddTask}
              onUpdateTask={handleUpdateTask}
              onDeleteTask={handleDeleteTask}
            />
          </div>
        ) : null}
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8 mt-16">
        <div className="container mx-auto px-4 max-w-7xl text-center">
          <p className="text-sm text-muted-foreground">
            You vs AI • All data stored locally in your browser
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
