import React from 'react';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

const MoodTrend = () => {
  const trendPercentage = 12;
  const trendDirection = 'up';
  const daysCount = 7;
  const data = [65, 55, 68, 72, 78, 83, 82]; // Mood scores for the last 7 days
  
  const TrendIcon = trendDirection === 'up' ? TrendingUp : TrendingDown;
  const trendColor = trendDirection === 'up' ? 'text-emerald-500' : 'text-red-500';

  return (
    <div className="flex flex-col h-full justify-between">
      <div className="flex items-center gap-2 mb-4 text-sm font-semibold text-indigo-500 dark:text-indigo-400">
        <Activity className="w-5 h-5" />
        Mood Trend
      </div>
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <div className={`flex items-center gap-1 ${trendColor}`}>
            <TrendIcon className="w-6 h-6" />
            <span className="text-3xl font-bold">{trendPercentage}%</span>
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {trendDirection === 'up' ? 'Increase' : 'Decrease'} last {daysCount} days
          </div>
        </div>
        
        {/* Trend Bar Visualization */}
        <div className="flex items-end h-16 w-1/3 gap-1">
          {data.map((value, index) => (
            <motion.div 
              key={index} 
              initial={{ height: 0 }}
              animate={{ height: `${value}%` }}
              transition={{ delay: index * 0.05, type: 'spring', stiffness: 100 }}
              className="w-full rounded-t-sm"
              style={{ 
                background: `linear-gradient(to top, #6366f1, #a855f7)`,
                minHeight: '4px' // Ensure even 0% is visible
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MoodTrend;