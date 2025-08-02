import React from 'react';

const LastAnalysis = () => {
  // This would typically come from your data
  const lastEntry = {
    date: 'Jul 24, 2023',
    sentiment: 'Positive',
    mood: 'Excited',
    keywords: ['achievement', 'opportunity', 'progress']
  };
  
  return (
    <div className="card">
      <div className="card-header">
        <div className="card-title">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-blue">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <path d="M14 2v6h6"></path>
            <path d="M16 13H8"></path>
            <path d="M16 17H8"></path>
            <path d="M10 9H8"></path>
          </svg>
          Last Analysis
        </div>
      </div>
      <div className="card-content">
        <div className="last-analysis-container">
          <div className="last-analysis-date">{lastEntry.date}</div>
          <div className="last-analysis-sentiment">
            <span className="badge badge-success">{lastEntry.sentiment}</span>
            <span className="last-analysis-mood">{lastEntry.mood}</span>
          </div>
          <div className="last-analysis-keywords">
            {lastEntry.keywords.map((keyword, index) => (
              <span key={index} className="keyword-tag">#{keyword}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LastAnalysis;