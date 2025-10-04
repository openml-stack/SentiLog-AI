import React from 'react';
import { Edit3, CheckCircle, Smile, Zap } from 'lucide-react';

const ActivityItem = ({ icon: Icon, iconColor, time, title, date, details, sentimentIcon: SentimentIcon, sentiment }) => (
  <div className="flex gap-4 group">
    {/* Icon and Timeline Separator */}
    <div className="flex flex-col items-center w-12">
      <div className={`w-9 h-9 ${iconColor} rounded-full flex items-center justify-center mb-1 ring-4 ring-white/50 dark:ring-slate-900/50 shadow-md transition-all duration-300 group-hover:scale-110`}>
        <Icon className="w-5 h-5 text-white" />
      </div>
      <div className="flex-1 w-px bg-gray-300/50 dark:bg-slate-700/50"></div>
      <span className="text-xs text-gray-500 dark:text-slate-400 mt-2">{time}</span>
    </div>
    
    {/* Content */}
    <div className="flex-1 border-b border-gray-300/50 dark:border-slate-700/50 pb-6 pt-1">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-base font-semibold text-gray-800 dark:text-white">{title}</h4>
        <span className="text-xs text-indigo-500 dark:text-indigo-400 font-medium">{date}</span>
      </div>
      
      {/* Details/Description */}
      <div className="text-sm text-gray-700 dark:text-slate-300 mb-3">
        {details}
      </div>

      {/* Sentiment/Analysis Tags */}
      {sentiment && (
        <div className="flex gap-2 items-center text-sm font-medium bg-indigo-500/10 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 px-3 py-1 rounded-full w-fit">
          <SentimentIcon className="w-4 h-4" />
          <span>{sentiment}</span>
        </div>
      )}
    </div>
  </div>
);


const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      icon: Edit3,
      iconColor: 'bg-blue-500',
      time: '10:30',
      title: 'Journal Entry',
      date: 'Today',
      details: 'Had a productive meeting with the design team. We finalized the UI for the new feature...',
      sentimentIcon: Smile,
      sentiment: 'Positive'
    },
    {
      id: 2,
      icon: CheckCircle,
      iconColor: 'bg-purple-500',
      time: '9:15',
      title: 'Analysis Complete',
      date: 'Today',
      details: (
        <ul className="space-y-1">
          <li className="flex items-center gap-2 text-xs text-gray-700 dark:text-slate-300">
            <Zap className="w-3 h-3 text-purple-500" />
            Detected improved focus in morning hours
          </li>
          <li className="flex items-center gap-2 text-xs text-gray-700 dark:text-slate-300">
            <Zap className="w-3 h-3 text-purple-500" />
            Positive correlation with exercise days
          </li>
          <li className="flex items-center gap-2 text-xs text-gray-700 dark:text-slate-300">
            <Zap className="w-3 h-3 text-purple-500" />
            Recommendation: Continue morning routine
          </li>
        </ul>
      ),
      sentimentIcon: null,
      sentiment: null
    }
  ];

  return (
    <div>
      <h3 className="text-lg font-bold mb-6 text-gray-800 dark:text-white">Recent Activity</h3>
      <div className="flex flex-col gap-4">
        {activities.map(activity => (
          <ActivityItem key={activity.id} {...activity} />
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;