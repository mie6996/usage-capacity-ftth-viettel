import axios from 'axios';
import React, { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import useTime from '../../lib/hooks/useTime';
import { useAppDispatch } from '../../store/store';
import { useRouter } from 'next/router';
import { logoutAsync } from '../../store/auth';

const Filter = ({ dataState, setDataState }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { months, years, timeState, setTimeState } = useTime();

  const getData = () => {
    try {
      const response = axios.post('/api/traffic', timeState);

      toast.promise(response, {
        loading: 'Đang tải data...',
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
              return 'Lấy data thành công';
            }
            return data.data.message;
          }
          // handle logout
          if (
            data.data.message ===
            'Tài khoản của quý khách đã đăng nhập nơi khác. Vui lòng đăng nhập lại để tiếp tục sử dụng.'
          ) {
            dispatch(logoutAsync());
            router.push('/login');
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

  const handleSelectTime = (e) => {
    const [month, year] = e.target.value.split('-');
    setTimeState({
      ...timeState,
      month: month,
      year: year,
    });
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeState]);

  return (
    <div className="flex p-4 justify-center shadow-xl mx-auto rounded border-slate-900">
      <label className="text-black font-bold text-lg m-auto pr-2">Tháng:</label>
      <select
        id="time"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onChange={handleSelectTime}
      >
        {months.map((month, index) => {
          return (
            <option key={index} value={`${month}-${years.at(index)}`}>
              Tháng {month}/{years.at(index)}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Filter;
