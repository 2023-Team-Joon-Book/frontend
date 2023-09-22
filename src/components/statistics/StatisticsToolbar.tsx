import React, { useState } from 'react'

interface StatisticsToolbarProps {
  onTabToggle: (tab: string) => void
}

const StatisticsToolbar: React.FC<StatisticsToolbarProps> = ({ onTabToggle }) => {
  const [activeTab, setActiveTab] = useState('bar')

  const handleTabToggle = (tab: string) => {
    setActiveTab(tab)
    onTabToggle(tab)
  }

  return (
    <div className="flex items-center justify-center py-4 px-8" style={{ fontFamily: 'bmfont' }}>
      <div className="flex w-80 rounded-full overflow-hidden">
        <button
          className={`${
            activeTab === 'bar'
              ? 'bg-bfc66a text-white rounded-full'
              : 'bg-white text-bfc66a rounded-full'
          } font-bold px-4 w-1/2 flex items-center justify-center focus:outline-none transition-colors duration-300 `}
          onClick={() => handleTabToggle('bar')}>
          막대
        </button>
        <button
          className={`${
            activeTab === 'line'
              ? 'bg-bfc66a text-white rounded-full'
              : 'bg-white text-bfc66a rounded-full'
          } font-bold py-2 px-4 w-1/2 flex items-center justify-center focus:outline-none transition-colors duration-300`}
          onClick={() => handleTabToggle('line')}>
          꺾은선
        </button>
      </div>
    </div>
  )
}

export default StatisticsToolbar
