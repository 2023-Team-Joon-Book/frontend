import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Title,
  Legend,
  ChartConfiguration,
} from 'chart.js'
import 'chartjs-adapter-date-fns'
import { eachDayOfInterval, format } from 'date-fns'
import { IoMdArrowBack, IoMdArrowForward } from 'react-icons/io'
import { baseInstance } from '../../api/config'

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Title, Legend)

interface LineChartProps {
  startDate: Date
  endDate: Date
  handlePrevWeek: () => void
  handleNextWeek: () => void
}

const LineChart: React.FC<LineChartProps> = ({
  startDate,
  endDate,
  handlePrevWeek: propsHandlePrevWeek,
  handleNextWeek: propsHandleNextWeek,
}) => {
  console.log('LineChart 렌더링 -', startDate, endDate)

  const [isEmptyData, setIsEmptyData] = useState<boolean>(false)

  const [data, setData] = useState<any>({
    labels: [],
    datasets: [
      {
        label: '독서 통계',
        data: [],
        fill: false,
        backgroundColor: 'rgba(191, 198, 106, 1)',
        borderColor: 'rgba(191, 198, 106, 1)',
        pointHoverBackgroundColor: 'rgba(191, 198, 106, 1)',
        pointHoverBorderColor: 'rgba(191, 198, 106, 1)',
        pointBackgroundColor: 'rgba(191, 198, 106, 1)',
        borderWidth: 5,
        pointRadius: 6,
      },
    ],
  })

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

        // startDate부터 endDate까지의 모든 날짜를 포함하는 labels 배열 생성
        const dateRange = eachDayOfInterval({ start: startDate, end: endDate })
        const labels = dateRange.map((day) => format(day, 'yyyy.MM.dd'))

        // 모든 날짜에 대한 기본 데이터 값 설정 (여기서는 0으로 설정)
        const defaultData = new Array(labels.length).fill(0)

        // API에서 반환된 데이터가 있는 날짜를 찾아 해당 값으로 업데이트
        sortedData.forEach((entry: { date: number[]; page: number }) => {
          const entryDateStr = format(
            new Date(entry.date[0], entry.date[1] - 1, entry.date[2]),
            'yyyy.MM.dd',
          )
          const index = labels.indexOf(entryDateStr)
          if (index !== -1) {
            defaultData[index] = entry.page
          }
        })

        const hasData = defaultData.some((value) => value > 0)
        setIsEmptyData(!hasData)

        // 새로운 차트 데이터로 상태를 업데이트합니다.
        const newChartData = {
          labels,
          datasets: [
            {
              label: '독서 통계',
              data: defaultData,
              fill: false,
              backgroundColor: 'rgba(191, 198, 106, 1)',
              borderColor: 'rgba(191, 198, 106, 1)',
              pointHoverBackgroundColor: 'rgba(191, 198, 106, 1)',
              pointHoverBorderColor: 'rgba(191, 198, 106, 1)',
              pointBackgroundColor: 'rgba(191, 198, 106, 1)',
              borderWidth: 5,
              pointRadius: 6,
            },
          ],
        }

        setData(newChartData)

        // 로그 출력
        console.log(
          'API 요청 날짜:',
          format(startDate, 'yyyy-MM-dd'),
          format(endDate, 'yyyy-MM-dd'),
        )
        console.log('API 응답 데이터:', responseData.data)
        console.log('가공된 차트 데이터:', newChartData)
      } else {
        console.error('API 요청 실패:', response.status, response.statusText)
        setIsEmptyData(true) // API 요청 실패 시 데이터가 없는 것으로 간주
      }
    } catch (error) {
      console.error('API 요청 중 오류 발생:', error)
      setIsEmptyData(true) // 예외 발생 시 데이터가 없는 것으로 간주
    }
  }

  const movePrevWeek = () => {
    propsHandlePrevWeek()
  }

  const moveNextWeek = () => {
    propsHandleNextWeek()
  }

  const options: ChartConfiguration<'line'> = {
    type: 'line',
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
            label: (context) => `${context.parsed.y} 장`,
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
            className="flex items-center justify-center w-8 h-8 text-gray-500 rounded-full hover-bg-gray-200"
            onClick={movePrevWeek}>
            <IoMdArrowBack className="w-5 h-5" />
          </button>
          <span className="text-lg font-semibold whitespace-nowrap">
            {format(startDate, 'yyyy.MM.dd')} ~ {format(endDate, 'yyyy.MM.dd')}
          </span>
          <button
            className="flex items-center justify-center w-8 h-8 text-gray-500 rounded-full hover-bg-gray-200"
            onClick={moveNextWeek}>
            <IoMdArrowForward className="w-5 h-5" />
          </button>
        </div>
        <Line {...options} />
        {isEmptyData && (
          <div className="absolute inset-0 flex items-center justify-center bg-white opacity-70">
            <span className="text-xl font-bold">책을 읽지 않으셨네요!</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default LineChart
