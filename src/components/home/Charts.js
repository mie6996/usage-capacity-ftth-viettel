import { memo } from 'react';
import BarChart from './BarChart';

const Charts = memo(({ data }) => {
  return (
    <>
      <div className="sm:p-8 w-full shadow-xl p-8 m-2 rounded-xl">
        <div className="text-center p-2 text-lg font-bold">
          Dung lượng sử dụng hàng 3 tháng gần nhất
        </div>
        <BarChart data={data} />
      </div>
    </>
  );
});

Charts.displayName = 'Charts';

export default Charts;
