import React from "react";
import { Doughnut } from "react-chartjs-2";
import { parse2GB } from "../../common/helpers";

const PieChart = ({ sumDownload, sumUpload }) => {
  let pieChartData = [parse2GB(sumDownload), parse2GB(sumUpload)];

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Dung lượng sử dụng tháng này",
        font: {
          size: 14,
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || "";

            if (label) {
              label += ": ";
            }
            if (context.parsed !== null) {
              label += context.parsed + " GB";
            }
            return label;
          },
        },
      },
    },
  };

  const chartData = {
    labels: ["Tải lên", "Tải xuống"],
    datasets: [
      {
        label: "Dung lượng",
        data: pieChartData?.map((_) => _),
        backgroundColor: ["rgba(255, 206, 86, 0.5)", "rgba(255, 99, 132, 0.5)"],
        borderColor: ["rgba(255, 206, 86, 1)", "rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  };

  return <Doughnut data={chartData} options={options} />;
};

export default PieChart;
