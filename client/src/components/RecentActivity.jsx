import React from 'react';

const RecentActivity = () => {
  return (
    <div className="bg-slate-900/50 backdrop-blur-lg border border-white/5 rounded-lg p-4 shadow-md">
      <h3 className="text-sm font-medium text-slate-200 mb-4">Recent Activity</h3>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <div className="flex flex-col items-center w-12">
            <div className="w-8 h-8 bg-slate-800/40 rounded-full flex items-center justify-center mb-2">
              <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <span className="text-xs text-slate-400">10:30</span>
          </div>
          <div className="flex-1 border-b border-slate-800/40 pb-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium text-slate-200">Journal Entry</h4>
              <span className="text-xs text-slate-400">Today</span>
            </div>
            <p className="text-sm text-slate-300 mb-2 line-clamp-2">Had a productive meeting with the design team. We finalized the UI for the new feature...</p>
            <div className="flex gap-2 mb-2">
              <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm text-slate-300">Positive</span>
            </div>
          </div>
        </div>
        
        <div className="flex gap-4">
          <div className="flex flex-col items-center w-12">
            <div className="w-8 h-8 bg-slate-800/40 rounded-full flex items-center justify-center mb-2">
              <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </div>
            <span className="text-xs text-slate-400">9:15</span>
          </div>
          <div className="flex-1 border-b border-slate-800/40 pb-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium text-slate-200">Analysis Complete</h4>
              <span className="text-xs text-slate-400">Today</span>
            </div>
            <div className="mt-2">
              <ul className="space-y-1">
                <li className="flex items-center gap-2 text-xs text-slate-300">
                  <svg className="w-3 h-3 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Detected improved focus in morning hours
                </li>
                <li className="flex items-center gap-2 text-xs text-slate-300">
                  <svg className="w-3 h-3 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Positive correlation with exercise days
                </li>
                <li className="flex items-center gap-2 text-xs text-slate-300">
                  <svg className="w-3 h-3 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Recommendation: Continue morning routine
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentActivity;