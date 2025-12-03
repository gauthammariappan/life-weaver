import { useState } from 'react';
import { Moon, Brain, Zap, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { DailyInput } from '@/types/productivity';

interface DailyInputFormProps {
  onSubmit: (input: DailyInput) => void;
  initialValues?: DailyInput | null;
}

export function DailyInputForm({ onSubmit, initialValues }: DailyInputFormProps) {
  const [sleepHours, setSleepHours] = useState(initialValues?.sleepHours || 7);
  const [stressLevel, setStressLevel] = useState(initialValues?.stressLevel || 5);
  const [focusLevel, setFocusLevel] = useState(initialValues?.focusLevel || 5);

  const handleSubmit = () => {
    onSubmit({
      sleepHours,
      stressLevel,
      focusLevel,
      date: new Date().toISOString().split('T')[0],
    });
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="font-display text-2xl font-semibold text-foreground mb-2">
          How are you today?
        </h2>
        <p className="text-muted-foreground">
          Let's optimize your day based on how you're feeling
        </p>
      </div>

      {/* Sleep Input */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-focus/10 flex items-center justify-center">
            <Moon className="w-5 h-5 text-focus" />
          </div>
          <div className="flex-1">
            <label className="text-sm font-medium text-foreground">Hours of Sleep</label>
            <p className="text-xs text-muted-foreground">How much did you sleep last night?</p>
          </div>
          <span className="text-2xl font-display font-semibold text-focus">{sleepHours}h</span>
        </div>
        <Slider
          value={[sleepHours]}
          onValueChange={(v) => setSleepHours(v[0])}
          min={3}
          max={12}
          step={0.5}
          className="py-2"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>3h</span>
          <span className="text-focus">Optimal: 7-9h</span>
          <span>12h</span>
        </div>
      </div>

      {/* Stress Input */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-energy/10 flex items-center justify-center">
            <Brain className="w-5 h-5 text-energy" />
          </div>
          <div className="flex-1">
            <label className="text-sm font-medium text-foreground">Stress Level</label>
            <p className="text-xs text-muted-foreground">How stressed are you feeling?</p>
          </div>
          <span className="text-2xl font-display font-semibold text-energy">{stressLevel}/10</span>
        </div>
        <Slider
          value={[stressLevel]}
          onValueChange={(v) => setStressLevel(v[0])}
          min={1}
          max={10}
          step={1}
          className="py-2"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Calm</span>
          <span>Moderate</span>
          <span>Very stressed</span>
        </div>
      </div>

      {/* Focus Input */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-rest/10 flex items-center justify-center">
            <Zap className="w-5 h-5 text-rest" />
          </div>
          <div className="flex-1">
            <label className="text-sm font-medium text-foreground">Current Focus</label>
            <p className="text-xs text-muted-foreground">How focused do you feel right now?</p>
          </div>
          <span className="text-2xl font-display font-semibold text-rest">{focusLevel}/10</span>
        </div>
        <Slider
          value={[focusLevel]}
          onValueChange={(v) => setFocusLevel(v[0])}
          min={1}
          max={10}
          step={1}
          className="py-2"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Scattered</span>
          <span>Moderate</span>
          <span>Laser focused</span>
        </div>
      </div>

      <Button 
        onClick={handleSubmit} 
        className="w-full h-12 text-base font-medium"
        size="lg"
      >
        Generate My Optimal Day
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </div>
  );
}
