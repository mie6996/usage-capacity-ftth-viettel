import { useState } from 'react';
import Charts from '../../components/home/Charts';
import Filter from '../../components/home/Filter';

export default function Home() {
  const [dataState, setDataState] = useState({
    trafficMonths: [],
    sumDownload: 0,
    sumUpload: 0,
    sumTotalUse: 0,
  });

  return (
    <>
      <div className="flex flex-col justify-center rounded-xl border-slate-900 p-6 m-8 shadow-2xl">
        <Filter dataState={dataState} setDataState={setDataState} />
        <Charts data={dataState} />
      </div>
    </>
  );
}
