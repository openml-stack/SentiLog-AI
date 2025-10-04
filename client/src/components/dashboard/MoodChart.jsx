import React, { useState } from 'react';
import { motion } from 'framer-motion';

const CHART_PATHS = {
  
  week: "M0,120 C20,100 40,140 60,90 C80,40 100,80 120,60 C140,40 160,70 180,30 C200,50 220,20 240,10 C260,30 280,5 300,15 C320,25 340,5 360,25 C380,45 400,15 420,45",
  
  // Adjusted 30-day path for smoother, more dynamic movement (Month View)
  month: "M0,100 C35,110 70,60 105,80 C140,130 175,70 210,90 C245,50 280,110 315,70 C350,90 385,50 420,70",
  
  // Adjusted 12-month path for gentle, long-term trend (Year View)
  year: "M0,95 C70,115 140,80 210,100 C280,120 350,75 420,95"
};

const X_AXIS_LABELS = {
    week: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    month: ["1st", "5th", "10th", "15th", "20th", "25th", "30th"],
    year: ["Jan", "Mar", "May", "Jul", "Sep", "Nov"],
};


const LineChartPlot = ({ pathD }) => (
  <motion.svg 
    className="w-full h-full" 
    preserveAspectRatio="none"
    initial={{ opacity: 0, pathLength: 0 }}
    animate={{ opacity: 1, pathLength: 1 }}
    transition={{ duration: 1.5, ease: "easeInOut" }}
  >
    <defs>
      <linearGradient id="gradient1-glass" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#a855f7" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#6366f1" stopOpacity="0.05" />
      </linearGradient>
      <linearGradient id="stroke-gradient-glass" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#a855f7" />
        <stop offset="100%" stopColor="#6366f1" />
      </linearGradient>
    </defs>
    <path
      d={pathD + " L420,180 L0,180 Z"}
      fill="url(#gradient1-glass)"
    />
    <path
      d={pathD}
      fill="none"
      stroke="url(#stroke-gradient-glass)"
      strokeWidth="3"
      strokeLinecap="round"
      className="transition-all duration-500"
    />
  </motion.svg>
);


const MoodChart = () => {
  const [activePeriod, setActivePeriod] = useState('week');

  const getButtonClass = (period) => {
    // Shared base classes
    const base = "text-xs py-1 px-3 rounded-md transition duration-300 font-medium";
    
    // Active/Inactive styles
    if (activePeriod === period) {
      // Active style: Background color, text color, and shadow
      return `bg-indigo-600/20 text-indigo-600 dark:text-indigo-400 shadow-sm ${base}`;
    } else {
      // Inactive style: Transparent, subtle hover
      return `bg-transparent hover:bg-white/50 dark:hover:bg-slate-800/50 text-gray-600 dark:text-slate-400 ${base}`;
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2 sm:mb-0">Mood Over Time</h3>
        <div className="flex gap-2 p-1 bg-gray-100/50 dark:bg-gray-700/30 rounded-lg">
            
          {/* Week Button */}
          <button 
            onClick={() => setActivePeriod('week')}
            className={getButtonClass('week')}
          >
            Week
          </button>
            
          {/* Month Button */}
          <button 
            onClick={() => setActivePeriod('month')}
            className={getButtonClass('month')}
          >
            Month
          </button>
            
          {/* Year Button (Now functional) */}
          <button 
            onClick={() => setActivePeriod('year')}
            className={getButtonClass('year')}
          >
            Year
          </button>
        </div>
      </div>

      <div className="relative h-[220px]">
        {/* Y-axis labels (Mood Scale) */}
        <div className="absolute left-0 top-0 h-[180px] flex flex-col justify-between text-xs text-gray-600 dark:text-slate-400 py-1 font-medium">
          <div>Great</div>
          <div>Good</div>
          <div>Neutral</div>
          <div>Bad</div>
          <div>Awful</div>
        </div>

        {/* Horizontal dashed lines */}
        <div className="ml-12 h-[180px] flex flex-col justify-between">
          <div className="border-t border-dashed border-gray-300/50 dark:border-slate-700/50 w-full h-px"></div>
          <div className="border-t border-dashed border-gray-300/50 dark:border-slate-700/50 w-full h-px"></div>
          <div className="border-t border-dashed border-gray-300/50 dark:border-slate-700/50 w-full h-px"></div>
          <div className="border-t border-dashed border-gray-300/50 dark:border-slate-700/50 w-full h-px"></div>
          <div className="border-t border-dashed border-gray-300/50 dark:border-slate-700/50 w-full h-px"></div>
        </div>

        {/* Chart */}
        <div className="absolute top-0 left-12 right-0 h-[180px]">
          {/* Passes the path based on the active state */}
          <LineChartPlot pathD={CHART_PATHS[activePeriod] || CHART_PATHS.week} />
        </div>

        {/* X-axis labels (Dates/Days) */}
        <div className="ml-12 mt-3 flex justify-between text-xs text-gray-600 dark:text-slate-400 font-medium">
          {/* Dynamically renders labels based on the active state */}
          {(X_AXIS_LABELS[activePeriod] || X_AXIS_LABELS.week).map((label, index) => (
            <div key={index} className="text-xs">
              {label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MoodChart;