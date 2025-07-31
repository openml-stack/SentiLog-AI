import React, { useState, useEffect,useContext } from "react";
import SentimentCard from "./SentimentCard";
import { Link } from "react-router-dom";
import api from "../axios";
import { ThemeContext } from "../context/ThemeContext";
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
  },
  dark: {
    '--bg': '#0a0a0f',
    '--card-bg': '#1a1a2e',
    '--border': '#2d2d44',
    '--heading': '#f8fafc',
    '--body-text': '#cbd5e1',
    '--button': '#7c3aed',
    '--button-hover': '#6d28d9',
    '--gradient-from': '#8b5cf6',
    '--gradient-to': '#ec4899',
    '--input-bg': '#16213e',
    '--input-border': '#475569',
    '--icon': '#94a3b8',
    '--link': '#a855f7',
    '--link-hover': '#9333ea',
    '--success-bg': '#065f46',
    '--success-hover': '#047857',
    '--placeholder': '#64748b',
  }
};

const AIPulseIcon = () => (
  <div className="flex items-center justify-center mb-2">
    <span className="relative flex h-10 w-10">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gradient-to-r from-purple-400 to-pink-400 opacity-40"></span>
      <span className="relative inline-flex rounded-full h-10 w-10 bg-gradient-to-r from-purple-500 to-pink-500 items-center justify-center text-white text-2xl font-bold shadow-2xl">
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path d="M12 2v2m0 16v2m10-10h-2M4 12H2m15.07-7.07l-1.41 1.41M6.34 17.66l-1.41 1.41m12.02 0l1.41-1.41M6.34 6.34L4.93 4.93" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </span>
    </span>
  </div>
);

const AnimatedTechBG = () => (
  <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none" viewBox="0 0 600 400" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="circuit" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.15" />
        <stop offset="100%" stopColor="#ec4899" stopOpacity="0.12" />
      </linearGradient>
      <linearGradient id="circuitGlow" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#a855f7" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#f472b6" stopOpacity="0.6" />
      </linearGradient>
    </defs>
    <g stroke="url(#circuit)" strokeWidth="2">
      <polyline points="50,50 150,50 150,350 550,350" />
      <polyline points="100,100 300,100 300,300 500,300" />
      <polyline points="200,200 400,200 400,250 450,250" />
      <circle cx="150" cy="50" r="4" fill="#8b5cf6" />
      <circle cx="300" cy="100" r="4" fill="#ec4899" />
      <circle cx="400" cy="200" r="4" fill="#a855f7" />
      <circle cx="550" cy="350" r="4" fill="#f472b6" />
    </g>
    <g>
      <circle className="animate-pulse" cx="500" cy="300" r="6" fill="url(#circuitGlow)" fillOpacity="0.4" />
      <circle className="animate-pulse" cx="450" cy="250" r="6" fill="url(#circuitGlow)" fillOpacity="0.4" />
    </g>
  </svg>
);

const QuickActions = () => {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const { theme } = useContext(ThemeContext);
  useEffect(() => {
    const root = document.documentElement;
    const theme = 'dark';
    const colors = themeColors[theme];
    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  }, []);

  const handleAnalyze = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    setShowResult(false);
    try {
      const res = await api.post("/api/news/analyze", { text });
      setResult(res.data);
      setTimeout(() => setShowResult(true), 200);
    } catch (err) {
      setError("Failed to analyze sentiment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`quick-actions transition-colors duration-300 min-h-screen ${
      theme === 'dark' ? 'bg-theme-dark' : 'bg-theme-light'
    }`}>
      <section id="live-demo-section" className="max-w-2xl mx-auto px-4 py-16">
        <div className="relative backdrop-blur-2xl rounded-3xl shadow-2xl p-10 flex flex-col gap-4 border overflow-hidden" style={{
          backgroundColor: 'var(--card-bg)',
          color: 'var(--body-text)',
          borderColor: 'var(--border)',
          boxShadow: '0 25px 50px -12px rgba(139, 92, 246, 0.25), 0 0 0 1px rgba(139, 92, 246, 0.05)',
        }}>
          <AnimatedTechBG />
          <div className="absolute -top-1 -left-1 w-[calc(100%+8px)] h-[calc(100%+8px)] pointer-events-none rounded-[inherit] border-4 border-transparent bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-transparent animate-gradient-move opacity-60 z-0" style={{ filter: 'blur(8px)' }}></div>
          <div className="relative z-10">
            <AIPulseIcon />
            <h2 className="text-2xl font-extrabold mb-2 tracking-tight" style={{ color: 'var(--heading)' }}>
              Live AI Sentiment Demo
            </h2>
            <p className="mb-4" style={{ color: 'var(--body-text)' }}>
              Paste any text or news article and see how SentiLog AI analyzes it in real time.
            </p>
            <textarea
              className="border-2 p-3 rounded-xl w-full min-h-[80px] resize-y focus:outline-none focus:ring-2 focus:ring-purple-500/50 font-medium shadow-lg transition-all duration-200"
              style={{
                backgroundColor: 'var(--input-bg)',
                color: 'var(--body-text)',
                borderColor: 'var(--input-border)',
              }}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste some text or article here..."
            />
            <div className="flex gap-2 mt-4">
              <button
                className="px-6 py-2 text-white rounded-xl font-semibold shadow-lg hover:scale-105 focus:ring-4 focus:ring-purple-500/30 transition-all duration-200 disabled:opacity-60 disabled:hover:scale-100"
                style={{
                  background: 'linear-gradient(135deg, var(--gradient-from), var(--gradient-to))',
                  boxShadow: '0 10px 20px rgba(139, 92, 246, 0.3)',
                }}
                onClick={handleAnalyze}
                disabled={loading || !text.trim()}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>
                    Analyzing...
                  </span>
                ) : (
                  "Analyze"
                )}
              </button>
              <Link
                to="/journal"
                className="px-6 py-2 text-white rounded-xl font-semibold shadow-lg hover:scale-105 focus:ring-4 focus:ring-emerald-500/30 transition-all duration-200"
                style={{
                  backgroundColor: 'var(--success-bg)',
                  boxShadow: '0 10px 20px rgba(5, 95, 70, 0.3)',
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--success-hover)'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'var(--success-bg)'}
              >
                Log a Mood Entry
              </Link>
            </div>
            {error && (
              <div className="text-red-400 mt-2 p-3 bg-red-900/20 border border-red-500/30 rounded-lg">
                {error}
              </div>
            )}
            <div className="mt-6 min-h-[60px]">
              {result && showResult ? (
                <div className="animate-fade-in-up">
                  <SentimentCard sentiment={result.sentiment} emotion={result.emotion} />
                </div>
              ) : (
                <div className="italic text-center p-4 rounded-lg border border-dashed" style={{
                  color: 'var(--placeholder)',
                  borderColor: 'var(--border)',
                  backgroundColor: 'rgba(139, 92, 246, 0.05)'
                }}>
                  Sentiment and emotion will appear here.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default QuickActions;
