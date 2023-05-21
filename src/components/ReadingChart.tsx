import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Title, Legend, ChartConfiguration } from 'chart.js';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Title, Legend);

const ReadingChart: React.FC = () => {
  const data = {
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
        <Line {...options} />
      </div>
    </div>
  );
};

export default ReadingChart;
