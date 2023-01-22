import React from 'react';
import { Bar } from 'react-chartjs-2';
import { parse2GB } from '../../lib/utils/parse2GB';

const BarChart = ({ trafficMonths }) => {
  const barChartData = trafficMonths || [];

  const options = {
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
        borderWidth: 1,
      },
      {
        label: 'Tải xuống',
        data: barChartData?.map((_) => parse2GB(_.upload)),
        backgroundColor: 'rgba(255, 99, 132)',
        borderWidth: 1,
      },
    ],
  };
  return (
    <>
      <Bar data={chartData} options={options} />
    </>
  );
};

export default BarChart;
