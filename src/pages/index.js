import axios from 'axios';
import { toast } from 'react-hot-toast';
import Charts from '../components/home/Charts.js';
import useTime from '../lib/hooks/useTime.js';
import { useEffect } from 'react';

export default function Home() {
  const { months, years, timeState, dataState, setTimeState, setDataState } =
    useTime();

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
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeState]);

  const handleChangeMonth = (e) => {
    setTimeState({
      ...timeState,
      month: e.target.value,
    });
  };

  const handleChangeYear = (e) => {
    setTimeState({
      ...timeState,
      year: e.target.value,
    });
  };

  return (
    <>
      <div className="flex flex-col justify-center">
        <div className="flex p-4 justify-center">
          <div className="p-4">
            <label
              htmlFor="months"
              className="mb-2 text-black bg-white font-bold text-lg"
            >
              Chọn tháng
            </label>
            <select
              id="months"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={handleChangeMonth}
              defaultValue={timeState.month}
            >
              {months.map((month, index) => (
                <option key={index} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </div>
          <div className="p-4">
            <label
              htmlFor="years"
              className="mb-2 text-black bg-white font-bold text-lg"
            >
              Chọn năm
            </label>
            <select
              id="years"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={handleChangeYear}
              defaultValue={timeState.year}
            >
              {years.map((year, index) => (
                <option key={index} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>
        <Charts data={dataState} />
      </div>
    </>
  );
}
