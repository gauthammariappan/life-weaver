interface ScoreRingProps {
  score: number;
  label: string;
  size?: 'sm' | 'md' | 'lg';
}

export function ScoreRing({ score, label, size = 'md' }: ScoreRingProps) {
  const sizes = {
    sm: { container: 'w-20 h-20', text: 'text-xl', label: 'text-xs' },
    md: { container: 'w-32 h-32', text: 'text-3xl', label: 'text-sm' },
    lg: { container: 'w-40 h-40', text: 'text-4xl', label: 'text-base' },
  };

  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const getScoreColor = () => {
    if (score >= 75) return 'hsl(var(--rest))';
    if (score >= 50) return 'hsl(var(--energy))';
    return 'hsl(var(--primary))';
  };

  return (
    <div className={`${sizes[size].container} relative flex items-center justify-center`}>
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
        {/* Background circle */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="hsl(var(--muted))"
          strokeWidth="8"
        />
        {/* Progress circle */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke={getScoreColor()}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`font-display font-bold ${sizes[size].text} text-foreground`}>
          {score}
        </span>
        <span className={`${sizes[size].label} text-muted-foreground`}>{label}</span>
      </div>
    </div>
  );
}
