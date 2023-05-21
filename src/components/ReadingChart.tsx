import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, ChartConfiguration } from 'chart.js';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement);

const ReadingChart: React.FC = () => {
  const data = {
    labels: ['일', '월', '화', '수', '목', '금', '토'],
    datasets: [
      {
        label: '독서 통계',
        data: [12, 19, 3, 5, 2, 3, 10], // 임의의 데이터
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.2)',
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
      },
    },
  };

  return <Line {...options} />;
};

export default ReadingChart;
