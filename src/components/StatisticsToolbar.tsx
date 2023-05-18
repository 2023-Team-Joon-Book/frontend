import React, { useState } from 'react';

const StatisticsToolbar = () => {
  const [activeTab, setActiveTab] = useState('stack');

  const handleTabToggle = (tab: React.SetStateAction<string>) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex items-center justify-center py-4 px-8 rounded-full ">
      <button
        className={`${
          activeTab === 'stack' ? 'bg-blue-500' : 'bg-gray-300'
        } hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-l focus:outline-none`}
        onClick={() => handleTabToggle('stack')}
      >
        쌓아보기
      </button>
      <button
        className={`${
          activeTab === 'trend' ? 'bg-blue-500' : 'bg-gray-300'
        } hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-r focus:outline-none`}
        onClick={() => handleTabToggle('trend')}
      >
        독서 추세
      </button>
    </div>
  );
};

export default StatisticsToolbar;
