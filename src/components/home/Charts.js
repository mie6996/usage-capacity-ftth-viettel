import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js/auto';
import { memo } from 'react';
import PieChart from './DoughnutChart';
import LineChart from './LineChart';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Charts = memo(({ data }) => {
  const { sumDownload, sumUpload, sumTotalUse, trafficMonths } = data;
  return (
    <>
      <div className="flex justify-center flex-col items-center w-full">
        <div className="shadow-xl p-8 m-2 rounded-xl">
          <PieChart
            sumDownload={sumDownload}
            sumUpload={sumUpload}
            sumTotalUse={sumTotalUse}
          />
        </div>
        <div className="sm:p-8 w-full shadow-xl p-8 m-2 rounded-xl">
          <LineChart trafficMonths={trafficMonths} />
        </div>
      </div>
    </>
  );
});

Charts.displayName = 'Charts';

export default Charts;
