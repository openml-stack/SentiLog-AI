import React from 'react';

const MoodTrend = () => {
  // This would typically come from your data
  const trendPercentage = 12;
  const trendDirection = 'up';
  const daysCount = 7;
  
  return (
    <div className="card">
      <div className="card-header">
        <div className="card-title">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-indigo">
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
          Mood Trend
        </div>
      </div>
      <div className="card-content">
        <div className="trend-container">
          <div className="trend-value">
            <div className={`trend-icon ${trendDirection === 'up' ? 'trend-up' : 'trend-down'}`}>
              {trendDirection === 'up' ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon">
                  <path d="m5 12 7-7 7 7"></path>
                  <path d="M12 19V5"></path>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon">
                  <path d="M12 5v14"></path>
                  <path d="m19 12-7 7-7-7"></path>
                </svg>
              )}
              <span className="trend-percentage">{trendPercentage}%</span>
            </div>
            <div className="trend-period">last {daysCount} days</div>
          </div>
          <div className="trend-bars">
            {[65, 55, 68, 72, 78, 83, 82].map((value, index) => (
              <div 
                key={index} 
                className="trend-bar"
                style={{ 
                  height: `${value}%`, 
                  background: `linear-gradient(to top, #a855f7 ${value/2}%, #6366f1)` 
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoodTrend;