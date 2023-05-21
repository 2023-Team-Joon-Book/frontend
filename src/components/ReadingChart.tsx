import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, ChartConfiguration } from 'chart.js';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement);

const ReadingChart: React.FC = () => {
  const data = {
    labels: ['03.13', '03.14', '03.15', '03.16', '03.17', '03.18', '03.19'],
    datasets: [
      {
        label: '독서 통계',
        data: [12, 19, 3, 5, 2, 3, 10], // 임의의 데이터
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.2)',
        pointHoverBackgroundColor: 'rgba(75, 192, 192, 0.5)',
        pointHoverBorderColor: 'rgba(75, 192, 192, 0.8)',
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
        legend: {
          display: true,
          position: 'top',
        },
        title: {
          display: true,
          text: '일주일 독서 통계',
        },
        tooltip: {
          enabled: true,
          mode: 'nearest',
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
    <div className="absolute inset-0 flex items-center justify-center">
      <Line {...options} />
    </div>
  );
};

export default ReadingChart;
