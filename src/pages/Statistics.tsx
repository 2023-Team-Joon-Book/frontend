import React, { useState } from 'react'
import '../scss/MyShelf.scss'
import Header from '../components/statistics/Header'
import StatisticsToolbar from '../components/statistics/StatisticsToolbar'
import BarChart from '../components/statistics/BarChart'
import LineChart from '../components/statistics/LineChart'

export default function Statistics() {
  const [activeTab, setActiveTab] = useState('stack')

  const handleTabToggle = (tab: React.SetStateAction<string>) => {
    setActiveTab(tab)
  }

  return (
    <div className="flex flex-col h-screen">
      <div>
        <Header />
      </div>
      <div className="mt-32">
        <StatisticsToolbar onTabToggle={handleTabToggle} />
      </div>
      <div className="flex-grow relative">
        {activeTab === 'stack' ? ( // activeTab 값에 따라 컴포넌트를 렌더링
          <div className="bookstack-container h-full">
            <BarChart />
          </div>
        ) : (
          <div className="booktrend-container h-full">
            <LineChart />
          </div>
        )}
      </div>
    </div>
  )
}
