import axios from 'axios';
import { toast } from 'react-hot-toast';
import Charts from '../components/home/Charts.js';
import useTime from '../lib/hooks/useTime.js';
import { useEffect } from 'react';

export default function Home() {
  const { months, years, timeState, dataState, setTimeState, setDataState } =
    useTime();

  const getData = () => {
    try {
      const response = axios.post('/api/traffic', timeState);

      toast.promise(response, {
        loading: 'Đang tải dữ liệu...',
        success: (data) => {
          if (data.data.success) {
            if (data.data.data) {
              setDataState({
                ...dataState,
                trafficMonths: data.data.data.trafficMonths,
                sumDownload: data.data.data.sumDownload,
                sumUpload: data.data.data.sumUpload,
                sumTotalUse: data.data.data.sumTotalUse,
              });
              return 'Tải dữ liệu thành công';
            }
            return data.data.message;
          }
        },
        error: (error) => {
          console.log(error);
          return 'Đã có lỗi xảy ra';
        },
      });
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
