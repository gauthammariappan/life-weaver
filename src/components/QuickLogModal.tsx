import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Moon, Brain, Dumbbell, Smartphone, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

type LogType = 'sleep' | 'mood' | 'gym' | 'social';

const logConfig = {
  sleep: {
    icon: Moon,
    title: 'Log Sleep',
    color: 'sleep',
    fields: ['hours', 'quality', 'bedTime', 'wakeTime'],
  },
  mood: {
    icon: Brain,
    title: 'Log Mood',
    color: 'mood',
    fields: ['mood', 'energy', 'stress', 'notes'],
  },
  gym: {
    icon: Dumbbell,
    title: 'Log Workout',
    color: 'fitness',
    fields: ['duration', 'type', 'intensity'],
  },
  social: {
    icon: Smartphone,
    title: 'Log Screen Time',
    color: 'social',
    fields: ['screenTime', 'productiveTime'],
  },
};

export function QuickLogModal() {
  const [open, setOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<LogType | null>(null);
  const [formData, setFormData] = useState<Record<string, any>>({});

  const handleSubmit = () => {
    toast({
      title: "Log saved!",
      description: `Your ${selectedType} data has been recorded.`,
    });
    setOpen(false);
    setSelectedType(null);
    setFormData({});
  };

  const renderForm = () => {
    if (!selectedType) {
      return (
        <div className="grid grid-cols-2 gap-3">
          {(Object.keys(logConfig) as LogType[]).map((type) => {
            const config = logConfig[type];
            const Icon = config.icon;
            return (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={cn(
                  "flex flex-col items-center gap-3 p-6 rounded-xl transition-all duration-200",
                  "glass hover:scale-105",
                  `hover:border-${config.color}/50`
                )}
              >
                <div className={cn(
                  "p-3 rounded-lg",
                  `bg-${config.color}/20`
                )}>
                  <Icon className={cn("w-6 h-6", `text-${config.color}`)} />
                </div>
                <span className="font-medium text-foreground">{config.title}</span>
              </button>
            );
          })}
        </div>
      );
    }

    const config = logConfig[selectedType];

    if (selectedType === 'sleep') {
      return (
        <div className="space-y-6">
          <div>
            <Label className="text-foreground">Hours Slept</Label>
            <div className="flex items-center gap-4 mt-2">
              <Slider
                value={[formData.hours || 7]}
                onValueChange={([v]) => setFormData({ ...formData, hours: v })}
                min={0}
                max={12}
                step={0.5}
                className="flex-1"
              />
              <span className="text-2xl font-semibold text-sleep w-16 text-right">
                {formData.hours || 7}h
              </span>
            </div>
          </div>
          <div>
            <Label className="text-foreground">Sleep Quality (1-10)</Label>
            <div className="flex items-center gap-4 mt-2">
              <Slider
                value={[formData.quality || 7]}
                onValueChange={([v]) => setFormData({ ...formData, quality: v })}
                min={1}
                max={10}
                step={1}
                className="flex-1"
              />
              <span className="text-2xl font-semibold text-sleep w-12 text-right">
                {formData.quality || 7}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-foreground">Bed Time</Label>
              <Input
                type="time"
                value={formData.bedTime || '23:00'}
                onChange={(e) => setFormData({ ...formData, bedTime: e.target.value })}
                className="mt-2 bg-secondary border-border"
              />
            </div>
            <div>
              <Label className="text-foreground">Wake Time</Label>
              <Input
                type="time"
                value={formData.wakeTime || '07:00'}
                onChange={(e) => setFormData({ ...formData, wakeTime: e.target.value })}
                className="mt-2 bg-secondary border-border"
              />
            </div>
          </div>
        </div>
      );
    }

    if (selectedType === 'mood') {
      return (
        <div className="space-y-6">
          <div>
            <Label className="text-foreground">Mood (1-10)</Label>
            <div className="flex items-center gap-4 mt-2">
              <Slider
                value={[formData.mood || 7]}
                onValueChange={([v]) => setFormData({ ...formData, mood: v })}
                min={1}
                max={10}
                step={1}
                className="flex-1"
              />
              <span className="text-2xl font-semibold text-mood w-12 text-right">
                {formData.mood || 7}
              </span>
            </div>
          </div>
          <div>
            <Label className="text-foreground">Energy (1-10)</Label>
            <div className="flex items-center gap-4 mt-2">
              <Slider
                value={[formData.energy || 7]}
                onValueChange={([v]) => setFormData({ ...formData, energy: v })}
                min={1}
                max={10}
                step={1}
                className="flex-1"
              />
              <span className="text-2xl font-semibold text-mood w-12 text-right">
                {formData.energy || 7}
              </span>
            </div>
          </div>
          <div>
            <Label className="text-foreground">Stress (1-10)</Label>
            <div className="flex items-center gap-4 mt-2">
              <Slider
                value={[formData.stress || 4]}
                onValueChange={([v]) => setFormData({ ...formData, stress: v })}
                min={1}
                max={10}
                step={1}
                className="flex-1"
              />
              <span className="text-2xl font-semibold text-destructive w-12 text-right">
                {formData.stress || 4}
              </span>
            </div>
          </div>
          <div>
            <Label className="text-foreground">Notes (optional)</Label>
            <Textarea
              value={formData.notes || ''}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="How are you feeling today?"
              className="mt-2 bg-secondary border-border"
            />
          </div>
        </div>
      );
    }

    if (selectedType === 'gym') {
      return (
        <div className="space-y-6">
          <div>
            <Label className="text-foreground">Duration (minutes)</Label>
            <div className="flex items-center gap-4 mt-2">
              <Slider
                value={[formData.duration || 45]}
                onValueChange={([v]) => setFormData({ ...formData, duration: v })}
                min={10}
                max={120}
                step={5}
                className="flex-1"
              />
              <span className="text-2xl font-semibold text-fitness w-20 text-right">
                {formData.duration || 45}m
              </span>
            </div>
          </div>
          <div>
            <Label className="text-foreground">Workout Type</Label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {['cardio', 'strength', 'flexibility', 'mixed'].map((type) => (
                <button
                  key={type}
                  onClick={() => setFormData({ ...formData, type })}
                  className={cn(
                    "px-4 py-2 rounded-lg capitalize transition-all",
                    formData.type === type
                      ? "bg-fitness text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-muted"
                  )}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
          <div>
            <Label className="text-foreground">Intensity (1-10)</Label>
            <div className="flex items-center gap-4 mt-2">
              <Slider
                value={[formData.intensity || 7]}
                onValueChange={([v]) => setFormData({ ...formData, intensity: v })}
                min={1}
                max={10}
                step={1}
                className="flex-1"
              />
              <span className="text-2xl font-semibold text-fitness w-12 text-right">
                {formData.intensity || 7}
              </span>
            </div>
          </div>
        </div>
      );
    }

    if (selectedType === 'social') {
      return (
        <div className="space-y-6">
          <div>
            <Label className="text-foreground">Total Screen Time (minutes)</Label>
            <div className="flex items-center gap-4 mt-2">
              <Slider
                value={[formData.screenTime || 60]}
                onValueChange={([v]) => setFormData({ ...formData, screenTime: v })}
                min={0}
                max={300}
                step={5}
                className="flex-1"
              />
              <span className="text-2xl font-semibold text-social w-20 text-right">
                {formData.screenTime || 60}m
              </span>
            </div>
          </div>
          <div>
            <Label className="text-foreground">Productive Time (minutes)</Label>
            <div className="flex items-center gap-4 mt-2">
              <Slider
                value={[formData.productiveTime || 20]}
                onValueChange={([v]) => setFormData({ ...formData, productiveTime: v })}
                min={0}
                max={formData.screenTime || 60}
                step={5}
                className="flex-1"
              />
              <span className="text-2xl font-semibold text-fitness w-20 text-right">
                {formData.productiveTime || 20}m
              </span>
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" size="lg" className="gap-2">
          <Plus className="w-5 h-5" />
          Quick Log
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-card border-border sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-foreground">
            {selectedType ? logConfig[selectedType].title : 'What would you like to log?'}
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          {renderForm()}
        </div>
        {selectedType && (
          <div className="flex gap-3 mt-6">
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => setSelectedType(null)}
            >
              Back
            </Button>
            <Button 
              variant={logConfig[selectedType].color as any}
              className="flex-1"
              onClick={handleSubmit}
            >
              Save Log
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
