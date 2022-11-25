import axios from 'axios';
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js/auto';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import BarChart from '../components/home/BarChart';
import PieChart from '../components/home/PieChart';
import Toast from '../components/Toast';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Home() {
  const router = useRouter();

  const currentMonth = new Date().getMonth() + 1;
  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  const currentYear = new Date().getFullYear();
  const years = [currentYear - 1, currentYear, currentYear + 1];

  const [timeState, setTimeState] = useState({
    token: '',
    month: currentMonth,
    year: currentYear,
  });

  const [dataState, setDataState] = useState({
    trafficMonths: [],
    sumDownload: 0,
    sumUpload: 0,
    sumTotalUse: 0,
  });

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
        localStorage.removeItem('token');
        router.push('/login');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
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

  useEffect(() => {
    const token = localStorage.getItem('token');
    token ? router.push('/') : router.push('/login');
    setTimeState({
      ...timeState,
      token: token,
    });
  }, []);

  return (
    <>
      <Toast />
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
        <div className="flex justify-center flex-col items-center w-full">
          <div>
            <PieChart
              sumDownload={dataState.sumDownload}
              sumUpload={dataState.sumUpload}
              sumTotalUse={dataState.sumTotalUse}
            />
          </div>
          <div className="sm:p-8 w-full">
            <BarChart trafficMonths={dataState.trafficMonths} />
          </div>
        </div>
      </div>
    </>
  );
}
