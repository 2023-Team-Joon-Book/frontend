import React, { useState } from 'react';
import NavigationBar from '../components/NavigationBar';
import BookStack from '../components/statistics/BookStack';
import '../scss/MyShelf.scss';
import BookStackHeader from '../components/statistics/StatisticsHeader';
import StatisticsToolbar from '../components/statistics/StatisticsToolbar';
import ReadingChart from '../components/statistics/ReadingChart';

export default function Statistics() {
  const [activeTab, setActiveTab] = useState('stack');

  const handleTabToggle = (tab: React.SetStateAction<string>) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex flex-col h-screen">
      <div>
        <BookStackHeader />
      </div>
      <div>
        <StatisticsToolbar onTabToggle={handleTabToggle} />
      </div>
      <div className="flex-grow relative">
        {activeTab === 'stack' ? ( // activeTab 값에 따라 컴포넌트를 렌더링
          <div className="bookstack-container h-full">
            <BookStack />
          </div>
        ) : (
          <div className="booktrend-container h-full">
            <ReadingChart />
          </div>
        )}
      </div>
      <div className="navbar">
        <NavigationBar />
      </div>
    </div>
  );
}
