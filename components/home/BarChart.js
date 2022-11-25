import React from 'react';
import { Bar } from 'react-chartjs-2';
import { parse2GB } from '../../common/helpers';

const BarChart = ({ trafficMonths }) => {
  const barChartData = trafficMonths;

  const options = {
    // responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Dung lượng sử dụng hàng ngày',
        font: {
          size: 14,
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || '';

            if (label) {
              label += ': ';
            }
            if (context.raw !== null) {
              label += context.raw + ' GB';
            }
            return label;
          },
        },
      },
    },
  };

  const chartData = {
    labels: barChartData?.map((_) => _.date),
    datasets: [
      {
        label: 'Tải lên',
        data: barChartData?.map((_) => parse2GB(_.download)),
        backgroundColor: 'rgba(53, 162, 235)',
      },
      {
        label: 'Tải xuống',
        data: barChartData?.map((_) => parse2GB(_.upload)),
        backgroundColor: 'rgba(255, 99, 132)',
      },
      {
        label: 'Tổng',
        data: barChartData?.map((_) => parse2GB(_.totalUse)),
        backgroundColor: 'rgba(153, 102, 255)',
      },
    ],
  };
  return <Bar data={chartData} options={options} />;
};

export default BarChart;
