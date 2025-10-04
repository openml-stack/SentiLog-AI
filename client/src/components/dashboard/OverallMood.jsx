import React from 'react';
import { Smile, Zap } from 'lucide-react'; // Modern icon library

const OverallMood = () => {
  const moodScore = 82; 
  const moodLabel = "Great";
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (moodScore / 100) * circumference;
  
  return (
    <div className="flex flex-col h-full justify-between">
      <div className="flex items-center gap-2 mb-4 text-sm font-semibold text-indigo-500 dark:text-indigo-400">
        <Smile className="w-5 h-5" />
        Overall Mood
      </div>
      <div className="flex items-center justify-between mt-auto">
        {/* Mood Score Circle */}
        <div className="relative w-24 h-24">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r={radius}
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              className="text-gray-300/50 dark:text-gray-700/50" // Base circle for background
            />
            <circle
              cx="50"
              cy="50"
              r={radius}
              fill="none"
              stroke="url(#mood-gradient-glass)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              transform="rotate(-90 50 50)"
              className="transition-all duration-1000 ease-out"
            />
            <defs>
              <linearGradient id="mood-gradient-glass" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#6366f1" />
              </linearGradient>
            </defs>
            {/* Text inside circle */}
            <text x="50" y="50" textAnchor="middle" dy="0" fontSize="24" fontWeight="extrabold" className="text-gray-800 dark:text-white">
              {moodScore}
            </text>
            <text x="50" y="65" textAnchor="middle" fontSize="10" className="text-gray-500 dark:text-gray-400">
              /100
            </text>
          </svg>
        </div>
        
        <div className="text-right">
          <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-500">
            {moodLabel}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Based on all entries</p>
        </div>
      </div>
    </div>
  );
};

export default OverallMood;