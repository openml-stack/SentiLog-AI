import React, { useState } from "react";
import SentimentCard from "./SentimentCard";
import { Link } from "react-router-dom";
import api from "../axios";

const AIPulseIcon = () => (
  <div className="flex items-center justify-center mb-2">
    <span className="relative flex h-10 w-10">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gradient-to-r from-blue-400 to-pink-400 opacity-60"></span>
      <span className="relative inline-flex rounded-full h-10 w-10 bg-gradient-to-r from-blue-500 to-pink-500 items-center justify-center text-white text-2xl font-bold shadow-lg">
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path
            d="M12 2v2m0 16v2m10-10h-2M4 12H2m15.07-7.07l-1.41 1.41M6.34 17.66l-1.41 1.41m12.02 0l1.41-1.41M6.34 6.34L4.93 4.93"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </span>
    </span>
  </div>
);

const AnimatedTechBG = () => (
  <svg
    className="absolute inset-0 w-full h-full z-0 pointer-events-none"
    viewBox="0 0 600 400"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="circuit" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.12" />
        <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.10" />
      </linearGradient>
    </defs>
    <g stroke="url(#circuit)" strokeWidth="2">
      <polyline points="50,50 150,50 150,350 550,350" />
      <polyline points="100,100 300,100 300,300 500,300" />
      <polyline points="200,200 400,200 400,250 450,250" />
      <circle cx="150" cy="50" r="4" fill="#60a5fa" />
      <circle cx="300" cy="100" r="4" fill="#a78bfa" />
      <circle cx="400" cy="200" r="4" fill="#60a5fa" />
      <circle cx="550" cy="350" r="4" fill="#a78bfa" />
    </g>
    <g>
      <circle
        className="animate-pulse"
        cx="500"
        cy="300"
        r="6"
        fill="#a78bfa"
        fillOpacity="0.3"
      />
      <circle
        className="animate-pulse"
        cx="450"
        cy="250"
        r="6"
        fill="#60a5fa"
        fillOpacity="0.3"
      />
    </g>
  </svg>
);

const QuickActions = () => {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const handleAnalyze = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    setShowResult(false);
    try {
      const res = await api.post("/api/news/analyze", { text });
      setResult(res.data);
      setTimeout(() => setShowResult(true), 200); // Animate in
    } catch (err) {
      setError("Failed to analyze sentiment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      data-aos="fade-up"
      id="live-demo-section"
      className="max-w-2xl mx-auto px-4 py-16"
    >
      <div className="relative bg-white/60 backdrop-blur-2xl rounded-3xl shadow-2xl p-10 flex flex-col gap-4 border border-pink-200 overflow-hidden">
        <AnimatedTechBG />
        <div
          className="absolute -top-1 -left-1 w-[calc(100%+8px)] h-[calc(100%+8px)] pointer-events-none rounded-[inherit] border-4 border-transparent bg-gradient-to-r from-blue-200 via-pink-200 to-transparent animate-gradient-move opacity-60 z-0"
          style={{ filter: "blur(6px)" }}
        ></div>
        <div className="relative z-10">
          <AIPulseIcon />
          <h2 className="text-2xl font-extrabold mb-2 text-gray-900 tracking-tight">
            Live AI Sentiment Demo
          </h2>
          <p className="text-gray-600 mb-4">
            Paste any text or news article and see how SentiLog AI analyzes it
            in real time.
          </p>
          <textarea
            className="border-2 border-pink-200 p-3 rounded-xl w-full min-h-[80px] resize-y focus:outline-none focus:ring-2 focus:ring-blue-200 bg-white/80 text-gray-800 placeholder-pink-300 font-medium shadow"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste some text or article here..."
          />
          <div className="flex gap-2 mt-4">
            <button
              className="px-6 py-2 bg-gradient-to-r from-blue-500 to-pink-500 text-white rounded-xl font-semibold shadow-lg hover:scale-105 hover:shadow-pink-400/60 focus:ring-4 focus:ring-blue-200 transition-all duration-200 disabled:opacity-60"
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
              className="px-6 py-2 bg-green-500 text-white rounded-xl font-semibold shadow hover:bg-green-600 transition-colors"
            >
              Log a Mood Entry
            </Link>
          </div>
          {error && <div className="text-red-500 mt-2">{error}</div>}
          <div className="mt-6 min-h-[60px]">
            {result && showResult ? (
              <div className="animate-fade-in-up">
                <SentimentCard
                  sentiment={result.sentiment}
                  emotion={result.emotion}
                />
              </div>
            ) : (
              <div className="text-gray-400 italic text-center">
                Sentiment and emotion will appear here.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuickActions;

// Add the following to your global CSS for the animated border and fade-in:
// .animate-gradient-move {
//   background-size: 200% 200%;
//   animation: gradientMove 4s ease-in-out infinite;
// }
// @keyframes gradientMove {
//   0% { background-position: 0% 50%; }
//   50% { background-position: 100% 50%; }
//   100% { background-position: 0% 50%; }
// }
// .animate-fade-in-up {
//   animation: fadeInUp 0.7s cubic-bezier(.39,.575,.56,1) both;
// }
// @keyframes fadeInUp {
//   0% { opacity: 0; transform: translateY(30px); }
//   100% { opacity: 1; transform: translateY(0); }
// }
