import React from 'react';
import { Bar } from 'react-chartjs-2';

const BarChart = ({ data }) => {
  let barChartData = data?.data || [];

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || '';

            if (label) {
              label += ': ';
            }
            if (context.raw !== null) {
              label += context.raw + ' MB';
            }
            return label;
          },
        },
      },
    },
  };

  const labels = barChartData?.map((_) => _.month);
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Tổng',
        data: barChartData?.map((_) => _.sumTotal),
        backgroundColor: 'rgba(255, 205, 86)',
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
