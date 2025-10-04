import React from 'react';
import { motion } from 'framer-motion';
import ActionButtons from '../components/dashboard/ActionButtons';
import LastAnalysis from '../components/dashboard/LastAnalysis';
import MoodChart from '../components/dashboard/MoodChart';
import MoodTrend from '../components/dashboard/MoodTrend';
import OverallMood from '../components/dashboard/OverallMood';
import RecentActivity from '../components/dashboard/RecentActivity';
import TotalEntries from '../components/dashboard/TotalEntries';
import BacktoTopButton from "../components/BackToTop";


const GLASS_CARD_STYLE = `
  bg-white/50 border border-gray-300/30 text-black
  dark:bg-slate-900/50 dark:border-gray-700/30 dark:text-gray-200
  p-5 rounded-3xl shadow-xl backdrop-blur-lg
`;

const Dashboard = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', damping: 12, stiffness: 100 }
    },
    hover: {
      // Subtle glow and lifted effect on hover
      scale: 1.02,
      boxShadow: '0 15px 30px -5px rgba(0, 0, 0, 0.2), 0 0 15px rgba(100, 100, 255, 0.1)',
      borderColor: 'rgba(99, 102, 241, 0.5)' // Subtle indigo border highlight
    }
  };

  const chartVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.7, ease: 'easeOut' }
    }
  };

  return (
    <div
      className="
        font-sans w-full min-h-screen
        // Enhanced background for Glassmorphism effect visibility
        bg-gradient-to-br from-indigo-50 to-purple-100 text-black
        dark:from-[#081229] dark:to-[#171e35] dark:text-gray-200
      "
    >
      <main className="w-full px-0">
        {/* Top Section - Stat Cards */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="w-full px-4 md:px-8 py-8"
        >
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[OverallMood, MoodTrend, LastAnalysis, TotalEntries].map(
              (Component, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  whileHover="hover"
                  className={GLASS_CARD_STYLE}
                >
                  {/* The icon color is defined in the component, but we ensure text contrast */}
                  <div className="text-blue-700 dark:text-blue-400">
                    <Component />
                  </div>
                </motion.div>
              )
            )}
          </div>
        </motion.div>

        {/* Middle Section - Chart */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={chartVariants}
          className="w-full px-4 md:px-8 py-5"
        >
          <div className={GLASS_CARD_STYLE}>
            <MoodChart />
          </div>
        </motion.div>

        {/* Bottom Section - Activity and Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="w-full px-4 md:px-8 py-5 grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          <div className="lg:col-span-2">
            <motion.div
              whileHover="hover"
              variants={cardVariants}
              className={GLASS_CARD_STYLE}
            >
              <RecentActivity />
            </motion.div>
          </div>
          <div className="lg:col-span-1 flex flex-col gap-6">
            <motion.div
              whileHover="hover"
              variants={cardVariants}
              className={GLASS_CARD_STYLE}
            >
              <ActionButtons />
            </motion.div>
            <BacktoTopButton />
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard;