import React from 'react';
import { FileText, Tag, Clock } from 'lucide-react';

const LastAnalysis = () => {
  const lastEntry = {
    date: 'Jul 24, 2023',
    sentiment: 'Positive',
    mood: 'Excited',
    keywords: ['achievement', 'opportunity', 'progress']
  };

  const getSentimentStyle = (sentiment) => {
    switch (sentiment) {
      case 'Positive': return 'bg-emerald-500/20 text-emerald-600 border-emerald-500/50';
      case 'Negative': return 'bg-red-500/20 text-red-600 border-red-500/50';
      default: return 'bg-gray-500/20 text-gray-600 border-gray-500/50';
    }
  };
  
  return (
    <div className="flex flex-col h-full justify-between">
      <div className="flex items-center gap-2 mb-4 text-sm font-semibold text-indigo-500 dark:text-indigo-400">
        <FileText className="w-5 h-5" />
        Last Analysis
      </div>
      <div className="flex flex-col gap-3 mt-auto">
        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4 text-gray-500" />
            <span className="font-medium">{lastEntry.date}</span>
          </div>
          <span className={`px-2 py-0.5 text-xs font-semibold rounded-full border ${getSentimentStyle(lastEntry.sentiment)}`}>
            {lastEntry.sentiment}
          </span>
        </div>
        
        <p className="text-2xl font-bold text-gray-800 dark:text-white">
          Feeling: {lastEntry.mood}
        </p>

        <div className="flex flex-wrap gap-2 text-xs">
          <Tag className="w-4 h-4 text-purple-500 dark:text-purple-400" />
          {lastEntry.keywords.map((keyword, index) => (
            <span key={index} className="px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 font-medium">
              #{keyword}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LastAnalysis;