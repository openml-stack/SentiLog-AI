import React from 'react';

const MoodChart = () => {
  return (
    <div className="bg-slate-900/50 backdrop-blur-lg border border-white/5 rounded-lg p-4 shadow-md">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-medium text-slate-200">Mood Over Time</h3>
        </div>
        <div className="flex gap-2">
          <button className="bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-400 text-xs py-1 px-3 rounded-sm">Week</button>
          <button className="bg-transparent hover:bg-slate-800/30 text-slate-400 text-xs py-1 px-3 rounded-sm">Month</button>
          <button className="bg-transparent hover:bg-slate-800/30 text-slate-400 text-xs py-1 px-3 rounded-sm">Year</button>
        </div>
      </div>
      <div className="relative h-[220px]">
        <div className="absolute left-0 top-0 h-[180px] flex flex-col justify-between text-xs text-slate-400 py-1">
          <div>Great</div>
          <div>Good</div>
          <div>Neutral</div>
          <div>Bad</div>
          <div>Awful</div>
        </div>
        <div className="ml-10 h-[180px] flex flex-col justify-between">
          <div className="border-t border-dashed border-slate-700/20 w-full h-px"></div>
          <div className="border-t border-dashed border-slate-700/20 w-full h-px"></div>
          <div className="border-t border-dashed border-slate-700/20 w-full h-px"></div>
          <div className="border-t border-dashed border-slate-700/20 w-full h-px"></div>
          <div className="border-t border-dashed border-slate-700/20 w-full h-px"></div>
        </div>
        <div className="absolute top-0 left-10 right-0 h-[180px]">
          <svg className="w-full h-full" preserveAspectRatio="none">
            <defs>
              <linearGradient id="gradient1" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#a855f7" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#6366f1" stopOpacity="0.05" />
              </linearGradient>
            </defs>
            <path 
              d="M0,120 C20,100 40,140 60,90 C80,40 100,80 120,60 C140,40 160,70 180,30 C200,50 220,20 240,10 C260,30 280,5 300,15 C320,25 340,5 360,25 C380,45 400,15 420,45 L420,180 L0,180 Z" 
              fill="url(#gradient1)" 
              className="transition-all duration-500"
            />
            <path 
              d="M0,120 C20,100 40,140 60,90 C80,40 100,80 120,60 C140,40 160,70 180,30 C200,50 220,20 240,10 C260,30 280,5 300,15 C320,25 340,5 360,25 C380,45 400,15 420,45" 
              fill="none" 
              stroke="url(#gradient)" 
              strokeWidth="2"
              strokeLinecap="round"
              className="transition-all duration-500"
            />
          </svg>
        </div>
        <div className="ml-10 mt-1 flex justify-between text-xs text-slate-400">
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
          <div>Sun</div>
        </div>
      </div>
    </div>
  );
};

export default MoodChart;