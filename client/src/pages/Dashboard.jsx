import React from 'react';

import {
  Header,
  OverallMood,
  MoodTrend,
  LastAnalysis,
  TotalEntries,
  MoodChart,
  RecentActivity,  
  ActionButtons
} from '../components';

const Dashboard = () => {
  return (
    <div className="font-sans w-full text-gray-200 bg-[#0f172a] min-h-screen">
      <Header />
      <main className="w-full px-0">
        {/* Top Section - Stats Grid */}
        <div className="w-full px-4 md:px-6 py-4 bg-[#0f172a]/90">
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <OverallMood />
            <MoodTrend />
            <LastAnalysis />
            <TotalEntries />
          </div>
        </div>

        {/* Middle Section - Chart */}
        <div className="w-full px-4 md:px-6 py-4">
          <MoodChart />
        </div>

        {/* Bottom Section - Activity and Actions */}
        <div className="w-full px-4 md:px-6 py-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <RecentActivity />
          </div>
          <div className="lg:col-span-1">
            <ActionButtons />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
