import axios from 'axios';
import { toast } from 'react-hot-toast';
import Charts from '../../components/home/Charts.js';
import useTime from '../../lib/hooks/useTime.js';
import { useEffect } from 'react';
import Filter from '../../components/filter/Filter.js';

export default function Traffic() {
  const { date, timeState, dataState, setTimeState, setDataState } = useTime();

  const getData = async () => {
    try {
      const response = await axios.post('/api/traffic', timeState);
      if (response.data.success) {
        if (response.data.data) {
          setDataState({
            ...dataState,
            trafficMonths: response.data.data.trafficMonths,
            sumDownload: response.data.data.sumDownload,
            sumUpload: response.data.data.sumUpload,
            sumTotalUse: response.data.data.sumTotalUse,
          });
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeState]);

  return (
    <>
      <div className="flex flex-col justify-center">
        <Filter />
        <Charts data={dataState} />
      </div>
    </>
  );
}
