import React, { useState } from 'react'

interface StatisticsToolbarProps {
  onTabToggle: (tab: string) => void
}

const StatisticsToolbar: React.FC<StatisticsToolbarProps> = ({ onTabToggle }) => {
  const [activeTab, setActiveTab] = useState('stack')

  const handleTabToggle = (tab: string) => {
    setActiveTab(tab)
    onTabToggle(tab)
  }

  return (
    <div className="flex items-center justify-center py-4 px-8">
      <div className="flex w-80 rounded-full overflow-hidden">
        <button
          className={`${
            activeTab === 'stack'
              ? 'bg-bfc66a text-white rounded-full'
              : 'bg-white text-bfc66a rounded-full'
          } font-bold px-4 w-1/2 flex items-center justify-center focus:outline-none transition-colors duration-300`}
          onClick={() => handleTabToggle('stack')}>
          막대
        </button>
        <button
          className={`${
            activeTab === 'trend'
              ? 'bg-bfc66a text-white rounded-full'
              : 'bg-white text-bfc66a rounded-full'
          } font-bold py-2 px-4 w-1/2 flex items-center justify-center focus:outline-none transition-colors duration-300`}
          onClick={() => handleTabToggle('trend')}>
          꺾은선
        </button>
      </div>
    </div>
  )
}

export default StatisticsToolbar
