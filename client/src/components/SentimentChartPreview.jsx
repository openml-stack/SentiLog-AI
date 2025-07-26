import React, { useEffect, useRef } from "react";

// Theme color palette
const themeColors = {
  light: {
    '--bg': '#ffffff',
    '--card-bg': '#f9fafb',
    '--border': '#e5e7eb',
    '--heading': '#111827',
    '--body-text': '#374151',
    '--button': '#6366f1',
    '--button-hover': '#4f46e5',
    '--gradient-from': '#6366f1',
    '--gradient-to': '#d946ef',
    '--input-bg': '#ffffff',
    '--input-border': '#d1d5db',
    '--icon': '#6b7280',
    '--link': '#3b82f6',
    '--link-hover': '#1d4ed8',
    '--watermark': 'rgba(59, 130, 246, 0.1)',
    '--chart-mood': '#a78bfa',
    '--chart-news': '#60a5fa',
    '--badge-bg': 'linear-gradient(to right, #60a5fa, #f472b6)',
    '--preview-text': '#3b82f6',
  },
  dark: {
    '--bg': '#0b1120',
    '--card-bg': '#111827',
    '--border': '#1f2937',
    '--heading': '#f3f4f6',
    '--body-text': '#d1d5db',
    '--button': '#6366f1',
    '--button-hover': '#4f46e5',
    '--gradient-from': '#6366f1',
    '--gradient-to': '#d946ef',
    '--input-bg': '#1a2332',
    '--input-border': '#334155',
    '--icon': '#94a3b8',
    '--link': '#60a5fa',
    '--link-hover': '#3b82f6',
    '--watermark': 'rgba(99, 102, 241, 0.15)',
    '--chart-mood': '#a78bfa',
    '--chart-news': '#60a5fa',
    '--badge-bg': 'linear-gradient(to right, #6366f1, #d946ef)',
    '--preview-text': '#60a5fa',
  }
};

const mockData = [
  { day: "Mon", mood: 3, news: 2 },
  { day: "Tue", mood: 4, news: 3 },
  { day: "Wed", mood: 2, news: 4 },
  { day: "Thu", mood: 5, news: 3 },
  { day: "Fri", mood: 4, news: 5 },
  { day: "Sat", mood: 3, news: 2 },
  { day: "Sun", mood: 5, news: 4 },
];

const AnimatedChart = () => {
  const pathMood = useRef(null);
  const pathNews = useRef(null);

  useEffect(() => {
    [pathMood.current, pathNews.current].forEach((path) => {
      if (path) {
        path.style.strokeDasharray = path.getTotalLength();
        path.style.strokeDashoffset = path.getTotalLength();
        setTimeout(() => {
          path.style.transition =
            "stroke-dashoffset 1.2s cubic-bezier(.39,.575,.56,1)";
          path.style.strokeDashoffset = 0;
        }, 200);
      }
    });
  }, []);

  const getPoints = (key) =>
    mockData.map((d, i) => `${i * 50 + 30},${120 - d[key] * 18}`).join(" ");

  return (
    <div className="relative">
      {/* Watermark */}
      <span 
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl font-extrabold select-none pointer-events-none z-10"
        style={{ color: 'var(--watermark)' }}
      >
        Preview
      </span>
      <svg width="360" height="140" viewBox="0 0 360 140" fill="none" className="mx-auto relative z-20">
        <polyline
          ref={pathMood}
          points={getPoints("mood")}
          stroke="var(--chart-mood)"
          strokeWidth="4"
          fill="none"
          className="drop-shadow-md"
          style={{ filter: "url(#glow)" }}
        />
        <polyline
          ref={pathNews}
          points={getPoints("news")}
          stroke="var(--chart-news)"
          strokeWidth="4"
          fill="none"
          strokeDasharray="6 6"
          className="drop-shadow-md"
          style={{ filter: "url(#glow)" }}
        />
        {mockData.map((d, i) => (
          <React.Fragment key={i}>
            <circle 
              cx={i * 50 + 30} 
              cy={120 - d.mood * 18} 
              r="6" 
              fill="var(--chart-mood)" 
              className="animate-pulse" 
            />
            <circle 
              cx={i * 50 + 30} 
              cy={120 - d.news * 18} 
              r="6" 
              fill="var(--chart-news)" 
              className="animate-pulse" 
            />
          </React.Fragment>
        ))}
        {mockData.map((d, i) => (
          <text 
            key={d.day} 
            x={i * 50 + 30} 
            y={135} 
            textAnchor="middle" 
            fontSize="13" 
            fill="var(--icon)"
          >
            {d.day}
          </text>
        ))}
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>
    </div>
  );
};

const SentimentChartPreview = () => {
  useEffect(() => {
    const root = document.documentElement;
    const theme = 'dark'; // Change to 'light' if needed
    const colors = themeColors[theme];

    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  }, []);

  return (
    <div style={{ backgroundColor: 'var(--bg)' }}>
      <section className="max-w-3xl mx-auto px-4 py-12">
        <div 
          className="backdrop-blur-lg rounded-3xl shadow-2xl p-10 flex flex-col items-center border relative"
          style={{
            backgroundColor: 'var(--card-bg)',
            borderColor: 'var(--border)',
          }}
        >
          <span 
            className="absolute top-6 right-6 text-white text-xs font-bold px-4 py-1 rounded-full shadow z-20"
            style={{ background: 'var(--badge-bg)' }}
          >
            Preview
          </span>
          <h2 
            className="text-2xl md:text-3xl font-extrabold mb-2 tracking-tight"
            style={{ color: 'var(--heading)' }}
          >
            Mood vs News: 7-Day AI Snapshot
          </h2>
          <p 
            className="mb-1 text-center max-w-lg"
            style={{ color: 'var(--body-text)' }}
          >
            See how your mood and the sentiment of world news align over the past week. Powered by SentiLog AI.
          </p>
          <p 
            className="text-sm mb-6 text-center"
            style={{ color: 'var(--preview-text)' }}
          >
            This is a sample chart. Your real data will appear here after you use SentiLog AI.
          </p>
          <AnimatedChart />
        </div>
      </section>
    </div>
  );
};

export default SentimentChartPreview;
