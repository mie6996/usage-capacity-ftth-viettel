import { memo } from 'react';
import BarChart from './BarChart';
import PieChart from './DoughnutChart';

import Chart from 'chart.js/auto';

const Charts = memo(({ data }) => {
  const { sumDownload, sumUpload, sumTotalUse, trafficMonths } = data;
  return (
    <>
      <div className="flex justify-center flex-col items-center">
        <div className="shadow-xl p-8 m-2 rounded-xl">
          <PieChart
            sumDownload={sumDownload}
            sumUpload={sumUpload}
            sumTotalUse={sumTotalUse}
          />
        </div>
        <div className="sm:p-8 w-full shadow-xl p-8 m-2 rounded-xl">
          <div className="text-center p-2 text-lg font-bold">
            Dung lượng sử dụng hàng ngày
          </div>
          <BarChart trafficMonths={trafficMonths} />
        </div>
      </div>
    </>
  );
});

Charts.displayName = 'Charts';

export default Charts;
