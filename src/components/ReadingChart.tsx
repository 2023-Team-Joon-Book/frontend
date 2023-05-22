import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Title, Legend, ChartConfiguration } from 'chart.js';
import 'chartjs-adapter-date-fns';
import { add, format } from 'date-fns';
import { IoMdArrowBack, IoMdArrowForward } from 'react-icons/io';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Title, Legend);

const ReadingChart: React.FC = () => {
  const initialData = {
    labels: ['03.13', '03.14', '03.15', '03.16', '03.17', '03.18', '03.19'],
    datasets: [
      {
        label: '독서 통계',
        data: [12, 19, 3, 5, 2, 3, 10], // 임의의 데이터
        fill: false,
        backgroundColor: 'rgba(191, 198, 106, 1)',
        borderColor: 'rgba(191, 198, 106, 1)',
        pointHoverBackgroundColor: 'rgba(191, 198, 106, 1)',
        pointHoverBorderColor: 'rgba(191, 198, 106, 1)',
        pointBackgroundColor: 'rgba(191, 198, 106, 1)',
        borderWidth: 5,
        pointRadius: 8,
      },
    ],
  };

  const [data, setData] = useState(initialData);
  const [startDate, setStartDate] = useState(new Date('2023-03-13'));
  const [endDate, setEndDate] = useState(new Date('2023-03-19'));

  const handlePrevWeek = () => {
    const prevStartDate = add(startDate, { weeks: -1 });
    const prevEndDate = add(endDate, { weeks: -1 });

    // TODO: Fetch chart data for the previous week
    // Replace the sample data below with actual data fetching logic
    const prevWeekData = {
      labels: ['03.06', '03.07', '03.08', '03.09', '03.10', '03.11', '03.12'],
      datasets: [
        {
          label: '독서 통계',
          data: [8, 15, 6, 7, 4, 2, 9], // Sample data for the previous week
          fill: false,
          backgroundColor: 'rgba(191, 198, 106, 1)',
          borderColor: 'rgba(191, 198, 106, 1)',
          pointHoverBackgroundColor: 'rgba(191, 198, 106, 1)',
          pointHoverBorderColor: 'rgba(191, 198, 106, 1)',
          pointBackgroundColor: 'rgba(191, 198, 106, 1)',
          borderWidth: 5,
          pointRadius: 8,
        },
      ],
    };

    setData(prevWeekData);
    setStartDate(prevStartDate);
    setEndDate(prevEndDate);
  };

  const handleNextWeek = () => {
    const nextStartDate = add(startDate, { weeks: 1 });
    const nextEndDate = add(endDate, { weeks: 1 });

    // TODO: Fetch chart data for the next week
    // Replace the sample data below with actual data fetching logic
    const nextWeekData = {
      labels: ['03.20', '03.21', '03.22', '03.23', '03.24', '03.25', '03.26'],
      datasets: [
        {
          label: '독서 통계',
          data: [6, 9, 4, 3, 8, 11, 7], // Sample data for the next week
          fill: false,
          backgroundColor: 'rgba(191, 198, 106, 1)',
          borderColor: 'rgba(191, 198, 106, 1)',
          pointHoverBackgroundColor: 'rgba(191, 198, 106, 1)',
          pointHoverBorderColor: 'rgba(191, 198, 106, 1)',
          pointBackgroundColor: 'rgba(191, 198, 106, 1)',
          borderWidth: 5,
          pointRadius: 8,
        },
      ],
    };

    setData(nextWeekData);
    setStartDate(nextStartDate);
    setEndDate(nextEndDate);
  };

  const options: ChartConfiguration<'line'> = {
    type: 'line',
    data: data,
    options: {
      responsive: true,
      plugins: {
        tooltip: {
          enabled: true,
          mode: 'nearest',
          intersect: false,
          callbacks: {
            label: (context) => `${context.parsed.y} 회`,
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
              size: 15,
              weight: 'bold',
            },
          },
        },
        y: {
          display: false, // Y축 표시 안 함
          grid: {
            display: true,
            lineWidth: 10, // 가로 선의 두께 설정
          },
        },
      },
    },
  };

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-white mb-20">
      <div className="w-10/12 sm:w-8/12 md:w-6/12 lg:w-4/12">
        <div className="flex items-center justify-between mb-4 border border-green-700 rounded-full p-2 absolute top-5 left-1/2 transform -translate-x-1/2">
          <button
            className="flex items-center justify-center w-8 h-8 text-gray-500 rounded-full hover:bg-gray-200"
            onClick={handlePrevWeek}
          >
            <IoMdArrowBack className="w-5 h-5" />
          </button>
          <span className="text-lg font-semibold whitespace-nowrap">
            {format(startDate, 'yyyy.MM.dd')} ~ {format(endDate, 'yyyy.MM.dd')}
          </span>
          <button
            className="flex items-center justify-center w-8 h-8 text-gray-500 rounded-full hover:bg-gray-200"
            onClick={handleNextWeek}
          >
            <IoMdArrowForward className="w-5 h-5" />
          </button>
        </div>
        <Line {...options} />
      </div>
    </div>
  );
};

export default ReadingChart;
