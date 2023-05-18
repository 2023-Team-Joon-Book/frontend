import React, { useState } from 'react';

  
const StatisticsToolbar = () => {
  const [activeTab, setActiveTab] = useState('stack');

  const handleTabToggle = (tab: React.SetStateAction<string>) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex items-center justify-center py-4 px-8">
      <div className="flex w-80 rounded-full overflow-hidden">
        <button
          className={`${
            activeTab === 'stack' ? 'bg-bfc66a text-white rounded-full' : 'bg-white text-bfc66a rounded-full'
          } font-bold px-4 w-1/2 flex items-center justify-center focus:outline-none transition-colors duration-300`}
          onClick={() => handleTabToggle('stack')}
        >
          쌓아보기
        </button>
        <button
          className={`${
            activeTab === 'trend' ? 'bg-bfc66a text-white rounded-full' : 'bg-white text-bfc66a rounded-full'
          } font-bold py-2 px-4 w-1/2 flex items-center justify-center focus:outline-none transition-colors duration-300`}
          onClick={() => handleTabToggle('trend')}
        >
          독서 추세
        </button>
      </div>
    </div>
  );
};

export default StatisticsToolbar;
