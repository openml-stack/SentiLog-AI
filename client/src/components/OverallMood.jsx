import React from 'react';

const OverallMood = () => {
  // This would typically come from your data
  const moodScore = 82; 
  const moodLabel = "Great";
  
  return (
    <div className="card">
      <div className="card-header">
        <div className="card-title">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-purple">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
            <line x1="9" y1="9" x2="9.01" y2="9"></line>
            <line x1="15" y1="9" x2="15.01" y2="9"></line>
          </svg>
          Overall Mood
        </div>
      </div>
      <div className="card-content">
        <div className="mood-score-container">
          <div className="mood-score-circle">
            <svg width="100" height="100" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="rgba(148, 163, 184, 0.2)"
                strokeWidth="8"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="url(#mood-gradient)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${(2 * Math.PI * 40) * (moodScore / 100)} ${2 * Math.PI * 40}`}
                transform="rotate(-90 50 50)"
              />
              <defs>
                <linearGradient id="mood-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#a855f7" />
                  <stop offset="100%" stopColor="#6366f1" />
                </linearGradient>
              </defs>
              <text x="50" y="50" textAnchor="middle" dy="7" fontSize="20" fontWeight="bold" fill="#f8fafc">
                {moodScore}
              </text>
              <text x="50" y="65" textAnchor="middle" fontSize="10" fill="#94a3b8">
                /100
              </text>
            </svg>
          </div>
          <div className="mood-label">{moodLabel}</div>
        </div>
      </div>
    </div>
  );
};

export default OverallMood;