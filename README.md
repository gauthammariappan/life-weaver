# Life Pattern Engine

**Your Life → Stored, Analyzed, Predicted**

A personal life analytics dashboard that builds a digital twin of your daily patterns. Track sleep, mood, fitness, and social media usage to uncover correlations, predict outcomes, and receive AI-powered optimization suggestions.

![React](https://img.shields.io/badge/React-18.3-61dafb) ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178c6) ![Tailwind](https://img.shields.io/badge/Tailwind-CSS-38bdf8) ![Recharts](https://img.shields.io/badge/Charts-Recharts-ff7300)

## ✨ Features

### 📊 Multi-Metric Tracking
- **Sleep Logs** — Hours and quality scoring
- **Mood Logs** — Daily emotional state (1-10)
- **Gym Sessions** — Workout frequency and duration
- **Social Media Usage** — Screen time monitoring

### 🧠 ML-Powered Analysis
- **Correlation Graphs** — Visualize relationships between metrics
- **Day Clustering** — K-Means identifies good vs bad day patterns
- **Mood Prediction** — LSTM-inspired next-day forecasting
- **Causal Inference** — Discovers your #1 optimization lever

### 📈 Insights Dashboard
- Weekly life optimization suggestions
- Volatility pattern identification
- Streak tracking for consistency
- Personalized recommendations

## 🛠 Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18 + TypeScript |
| Styling | Tailwind CSS + shadcn/ui |
| Visualization | Recharts |
| State | React Hooks |
| Build | Vite |

## 🚀 Getting Started

```bash
# Clone the repository
git clone <your-repo-url>

# Navigate to project
cd life-pattern-engine

# Install dependencies
npm install

# Start development server
npm run dev
```

## 📁 Project Structure

```
src/
├── components/
│   ├── CorrelationChart.tsx   # Metric correlation visualization
│   ├── DayTypeChart.tsx       # Good/bad day clustering
│   ├── Header.tsx             # App header with actions
│   ├── InsightCard.tsx        # AI insight display
│   ├── MetricCard.tsx         # Individual metric scores
│   ├── PredictionWidget.tsx   # Next-day mood prediction
│   ├── QuickLogModal.tsx      # Data entry modal
│   ├── RecommendationCard.tsx # Weekly suggestions
│   └── StreakWidget.tsx       # Consistency tracking
├── lib/
│   └── mock-data.ts           # Sample data generation
├── types/
│   └── life-data.ts           # TypeScript interfaces
└── pages/
    └── Index.tsx              # Main dashboard
```

## 🧠 Algorithm Overview

### Mood Prediction
Weighted analysis of:
- Sleep quality (highest impact factor)
- Exercise frequency
- Social media usage (inverse correlation)
- Historical mood trends

### Day Clustering
K-Means inspired categorization:
- **Great Days** — High sleep + exercise + low screen time
- **Good Days** — Balanced metrics
- **Rough Days** — Pattern anomalies detected

### Causal Analysis
Identifies primary levers through correlation strength:
> "Sleep is your #1 lever" — typical finding

## 🎨 Design

Dark theme with cyan accents, glassmorphism cards, and smooth animations. Built for focus and clarity.

## 📄 License

MIT License

---

Built with [Lovable](https://lovable.dev)
