import React, {useEffect, useRef} from "react";

const mockData = [
  {day: "Mon", mood: 3, news: 2},
  {day: "Tue", mood: 4, news: 3},
  {day: "Wed", mood: 2, news: 4},
  {day: "Thu", mood: 5, news: 3},
  {day: "Fri", mood: 4, news: 5},
  {day: "Sat", mood: 3, news: 2},
  {day: "Sun", mood: 5, news: 4},
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
      {/* Subtle Preview Watermark */}
      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl font-extrabold text-blue-200/20 select-none pointer-events-none z-10">
        Preview
      </span>
      <svg
        width="360"
        height="140"
        viewBox="0 0 360 140"
        fill="none"
        className="mx-auto relative z-20"
      >
        {/* Mood line */}
        <polyline
          ref={pathMood}
          points={getPoints("mood")}
          stroke="#a78bfa"
          strokeWidth="4"
          fill="none"
          className="drop-shadow-md"
          style={{filter: "url(#glow)"}}
        />
        {/* News line */}
        <polyline
          ref={pathNews}
          points={getPoints("news")}
          stroke="#60a5fa"
          strokeWidth="4"
          fill="none"
          strokeDasharray="6 6"
          className="drop-shadow-md"
          style={{filter: "url(#glow)"}}
        />
        {/* Dots */}
        {/* Added key prop */}
        {mockData.map((d, i) => (

          <React.Fragment key={`dot-group-${i}`}>
            <circle
          <>
            <circle
              key={`mood-dot-${i}`}

              cx={i * 50 + 30}
              cy={120 - d.mood * 18}
              r="6"
              fill="#a78bfa"
              className="animate-pulse"
            />
            <circle

              key={`news-dot-${i}`}

              cx={i * 50 + 30}
              cy={120 - d.news * 18}
              r="6"
              fill="#60a5fa"
              className="animate-pulse"
            />

          </React.Fragment>

          </>
        ))}
        {/* X axis labels */}
        {mockData.map((d, i) => (
          <text
            key={d.day}
            x={i * 50 + 30}
            y={135}
            textAnchor="middle"
            fontSize="13"
            fill="#888"
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

const SentimentChartPreview = () => (
  <section data-aos="fade-down" className="max-w-3xl mx-auto px-4 py-12">
    <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-10 flex flex-col items-center border border-blue-100 relative">
      {/* Preview badge */}
      <span className="absolute top-6 right-6 bg-gradient-to-r from-blue-400 to-pink-400 text-white text-xs font-bold px-4 py-1 rounded-full shadow z-20">
        Preview
      </span>
      <h2 className="text-2xl md:text-3xl font-extrabold mb-2 text-gray-900 tracking-tight">
        Mood vs News: 7-Day AI Snapshot
      </h2>
      <p className="text-gray-600 mb-1 text-center max-w-lg">
        See how your mood and the sentiment of world news align over the past
        week. Powered by SentiLog AI.
      </p>
      <p className="text-blue-500 text-sm mb-6 text-center">
        This is a sample chart. Your real data will appear here after you use
        SentiLog AI.
      </p>
      <AnimatedChart />
    </div>
  </section>
);

export default SentimentChartPreview;
