import React from 'react';
import { BookOpen, ArrowUp } from 'lucide-react';

const TotalEntries = () => {
  const totalCount = 124;
  const weekCount = 7;
  
  return (
    <div className="flex flex-col h-full justify-between">
      <div className="flex items-center gap-2 mb-4 text-sm font-semibold text-indigo-500 dark:text-indigo-400">
        <BookOpen className="w-5 h-5" />
        Total Entries
      </div>
      <div className="flex items-end justify-between mt-auto">
        <div className="flex flex-col">
          <div className="text-5xl font-extrabold text-gray-800 dark:text-white">
            {totalCount}
          </div>
          <div className="flex items-center text-sm font-medium text-emerald-500 mt-1">
            <ArrowUp className="w-4 h-4" />
            <span className="ml-0.5">+{weekCount} this week</span>
          </div>
        </div>
        <BookOpen className="w-12 h-12 text-gray-300/50 dark:text-gray-700/50" />
      </div>
    </div>
  );
};

export default TotalEntries;