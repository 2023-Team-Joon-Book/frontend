import React, { useState } from 'react'
import '../scss/MyShelf.scss'
import Toolbar from '../components/statistics/Toolbar'
import BarChart from '../components/statistics/BarChart'
import LineChart from '../components/statistics/LineChart'
import MyHeader from '../components/Header/MyHeader'

export default function Statistics() {
  const [activeTab, setActiveTab] = useState('bar')

  const handleTabToggle = (tab: React.SetStateAction<string>) => {
    setActiveTab(tab)
  }

  return (
    <div className="flex flex-col h-screen">
      <div>
        <MyHeader />
      </div>
      <div className="mt-32">
        <Toolbar onTabToggle={handleTabToggle} />
      </div>
      <div className="flex-grow relative">
        {activeTab === 'bar' ? ( // activeTab 값에 따라 컴포넌트를 렌더링
          <div className="h-screen w-fit">
            <BarChart />
          </div>
        ) : (
          <div className="h-screen w-fit">
            <LineChart />
          </div>
        )}
      </div>
    </div>
  )
}
