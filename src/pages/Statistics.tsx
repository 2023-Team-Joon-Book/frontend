import React, { useState } from 'react'
import '../scss/MyShelf.scss'
import Toolbar from '../components/statistics/Toolbar'
import BarChart from '../components/statistics/BarChart'
import LineChart from '../components/statistics/LineChart'
import MyHeader from '../components/Header/MyHeader'
import { addWeeks, endOfWeek, startOfWeek, subWeeks } from 'date-fns'

export default function Statistics() {
  const [activeTab, setActiveTab] = useState('bar')
  const [startDate, setStartDate] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }))
  const [endDate, setEndDate] = useState(endOfWeek(new Date(), { weekStartsOn: 1 }))

  const handleTabToggle = (tab: React.SetStateAction<string>) => {
    setActiveTab(tab)
  }

  const handlePrevWeek = () => {
    const prevStartDate = subWeeks(startDate, 1)
    const prevEndDate = subWeeks(endDate, 1)
    console.log('이전 주로 변경:', prevStartDate, prevEndDate)
    setStartDate(prevStartDate)
    setEndDate(prevEndDate)
  }

  const handleNextWeek = () => {
    const nextStartDate = addWeeks(startDate, 1)
    const nextEndDate = addWeeks(endDate, 1)
    console.log('다음 주로 변경:', nextStartDate, nextEndDate)
    setStartDate(nextStartDate)
    setEndDate(nextEndDate)
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
        {activeTab === 'bar' ? (
          <div className="h-screen w-fit">
            <BarChart
              key={`${startDate}-${endDate}`}
              startDate={startDate}
              endDate={endDate}
              handlePrevWeek={handlePrevWeek}
              handleNextWeek={handleNextWeek}
            />
          </div>
        ) : (
          <div className="h-screen w-fit">
            <LineChart
              key={`${startDate}-${endDate}`}
              startDate={startDate}
              endDate={endDate}
              handlePrevWeek={handlePrevWeek}
              handleNextWeek={handleNextWeek}
            />
          </div>
        )}
      </div>
    </div>
  )
}
