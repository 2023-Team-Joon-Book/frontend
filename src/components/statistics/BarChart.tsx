import React, { useState, useEffect } from 'react'
import { Bar } from 'react-chartjs-2'
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Tooltip,
  Title,
  Legend,
  ChartConfiguration,
} from 'chart.js'
import 'chartjs-adapter-date-fns' // 날짜 형식을 지원하기 위한 Chart.js 어댑터
import { format } from 'date-fns' // 날짜와 시간 처리를 위한 라이브러리
import { IoMdArrowBack, IoMdArrowForward } from 'react-icons/io'
import { baseInstance } from '../../api/config'

Chart.register(CategoryScale, LinearScale, PointElement, BarElement, Tooltip, Title, Legend)

interface BarChartProps {
  startDate: Date
  endDate: Date
  handlePrevWeek: () => void
  handleNextWeek: () => void
}

const BarChart: React.FC<BarChartProps> = ({
  startDate,
  endDate,
  handlePrevWeek: propsHandlePrevWeek,
  handleNextWeek: propsHandleNextWeek,
}) => {
  console.log('BarChart 렌더링 -', startDate, endDate)

  // 차트 데이터와 날짜 상태를 초기화합니다.
  const [data, setData] = useState<any>({
    labels: [],
    datasets: [
      {
        label: '독서 통계',
        data: [],
        backgroundColor: 'rgba(191, 198, 106, 1)',
        borderColor: 'rgba(191, 198, 106, 1)',
        borderWidth: 1,
      },
    ],
  })

  const [isEmptyData, setIsEmptyData] = useState<boolean>(false)

  useEffect(() => {
    fetchData(endDate)
  }, [endDate])

  const fetchData = async (endDate: Date) => {
    try {
      const formattedEndDate = format(endDate, 'yyyy-MM-dd')
      const accessToken = localStorage.getItem('accessToken')

      // API로 데이터를 요청하고 응답을 받아옵니다.
      const response = await baseInstance.get(`/readingvolumes/${formattedEndDate}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })

      if (response.status === 200) {
        const responseData = response.data

        const sortedData = responseData.data.sort(
          (a: { date: number[] }, b: { date: number[] }) => {
            const dateA = new Date(a.date[0], a.date[1] - 1, a.date[2])
            const dateB = new Date(b.date[0], b.date[1] - 1, b.date[2])
            return dateA.getTime() - dateB.getTime()
          },
        )

        if (
          sortedData.length === 0 ||
          sortedData.every((entry: { page: number }) => entry.page === 0)
        ) {
          setIsEmptyData(true)
        } else {
          setIsEmptyData(false)

          // 응답 데이터를 차트 데이터 형식에 맞게 가공합니다.
          const labels = sortedData.map((entry: { date: number[] }) =>
            format(new Date(entry.date[0], entry.date[1] - 1, entry.date[2]), 'yyyy.MM.dd'),
          )

          const data = sortedData.map((entry: { page: number }) => entry.page)

          // 새로운 차트 데이터로 상태를 업데이트합니다.
          const newChartData = {
            labels,
            datasets: [
              {
                label: '독서 통계',
                data,
                backgroundColor: 'rgba(191, 198, 106, 1)',
                borderColor: 'rgba(191, 198, 106, 1)',
                borderWidth: 1,
              },
            ],
          }

          setData(newChartData)

          console.log(
            'API 요청 날짜:',
            format(startDate, 'yyyy-MM-dd'),
            format(endDate, 'yyyy-MM-dd'),
          )
          console.log('API 응답 데이터:', responseData.data)
          console.log('가공된 차트 데이터:', newChartData)
        }
      } else {
        console.error('API 요청 실패:', response.status, response.statusText)
      }
    } catch (error) {
      console.error('API 요청 중 오류 발생:', error)
    }
  }

  const movePrevWeek = () => {
    propsHandlePrevWeek() // props로 전달받은 함수 호출
  }

  const moveNextWeek = () => {
    propsHandleNextWeek() // props로 전달받은 함수 호출
  }

  const options: ChartConfiguration<'bar'> = {
    type: 'bar',
    data: data,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        tooltip: {
          enabled: true,
          mode: 'nearest',
          intersect: false,
          callbacks: {
            label: (context: any) => `${context.parsed.y} 회`,
          },
        },
        legend: {
          display: true,
          position: 'top',
        },
      },
      scales: {
        x: {
          display: true,
          grid: {
            display: false,
          },
          ticks: {
            font: {
              family: 'bmfont',
              size: 20,
              weight: 'bold',
            },
          },
        },
        y: {
          display: true,
          grid: {
            display: true,
          },
          ticks: {
            stepSize: 5,
            font: {
              family: 'bmfont',
              size: 25,
              weight: 'bold',
            },
          },
        },
      },
    },
  }

  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center bg-white mb-20 h-3/4 "
      style={{ fontFamily: 'bmfont' }}>
      <div className="w-10/12 sm:w-8/12 lg:w-9/12 h-3/4">
        <div className="flex z-10 items-center justify-between mb-4 border border-green-700 rounded-full p-2 absolute top-1 left-1/2 transform -translate-x-1/2">
          <button
            className="flex items-center justify-center w-8 h-8 text-gray-500 rounded-full hover:bg-gray-200"
            onClick={movePrevWeek}>
            <IoMdArrowBack className="w-5 h-5" />
          </button>
          <span className="text-lg font-semibold whitespace-nowrap">
            {format(startDate, 'yyyy.MM.dd')} ~ {format(endDate, 'yyyy.MM.dd')}
          </span>
          <button
            className="flex items-center justify-center w-8 h-8 text-gray-500 rounded-full hover.bg-gray-200"
            onClick={moveNextWeek}>
            <IoMdArrowForward className="w-5 h-5" />
          </button>
        </div>
        <Bar {...options} />
        {isEmptyData && (
          <div className="absolute inset-0 flex items-center justify-center bg-white opacity-70">
            <span className="text-xl font-bold">책을 읽지 않으셨네요!</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default BarChart
