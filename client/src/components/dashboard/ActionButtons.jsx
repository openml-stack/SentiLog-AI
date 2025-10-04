import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, BarChart2, Lightbulb, Settings } from 'lucide-react';
import { motion } from 'framer-motion';

// Custom hook to navigate to a specific path
function useNavigateToPath() {
  const navigate = useNavigate();
  // Return a function that accepts the target path
  return (path) => {
    navigate(path); 
  };
}

const ActionButtons = () => {
  // Use the custom hook to get the navigation handler
  const navigateTo = useNavigateToPath();

  // Define specific handlers for clarity
  const handleNewEntry = () => navigateTo('/journal');
  const handleRunAnalysis = () => navigateTo('/analyze'); // Assuming path is /analysis
  const handleViewInsights = () => navigateTo('/news-listing'); // Assuming path is /insights
  const handleSettings = () => navigateTo('/about'); // Assuming path is /settings

  const primaryButtonClass = `
    flex items-center justify-center gap-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold 
    py-3 px-4 rounded-xl shadow-lg hover:shadow-xl hover:opacity-95 transition 
    transform hover:-translate-y-0.5
  `;

  const secondaryButtonClass = `
    flex items-center justify-start gap-3 w-full bg-white/20 dark:bg-slate-800/20 text-black dark:text-slate-200 
    font-medium py-3 px-4 rounded-xl border border-gray-300/30 dark:border-white/10 backdrop-blur-sm
    hover:bg-white/50 dark:hover:bg-slate-700/50 hover:shadow-md transition duration-300
  `;

  return (
    <div>
      <h3 className="text-lg font-bold mb-5 text-gray-800 dark:text-white">Quick Actions</h3>
      <div className="flex flex-col gap-4">

        {/* New Journal Entry Button (Primary) - Uses handleNewEntry */}
        <motion.button
          onClick={handleNewEntry}
          className={primaryButtonClass}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Plus className="w-5 h-5" />
          New Journal Entry
        </motion.button>

        {/* Run New Analysis - Uses handleRunAnalysis */}
        <motion.button 
          onClick={handleRunAnalysis}
          className={secondaryButtonClass}
          whileHover={{ x: 5 }}
        >
          <BarChart2 className="w-5 h-5 text-indigo-500" />
          Run New Analysis
        </motion.button>

        {/* View Insights - Uses handleViewInsights */}
        <motion.button 
          onClick={handleViewInsights}
          className={secondaryButtonClass}
          whileHover={{ x: 5 }}
        >
          <Lightbulb className="w-5 h-5 text-yellow-500" />
          View Insights
        </motion.button>

        {/* Settings - Uses handleSettings */}
        <motion.button 
          onClick={handleSettings}
          className={secondaryButtonClass}
          whileHover={{ x: 5 }}
        >
          <Settings className="w-5 h-5 text-gray-500" />
          About
        </motion.button>
      </div>
    </div>
  );
};

export default ActionButtons;