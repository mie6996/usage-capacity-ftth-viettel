import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import Charts from '../../components/home/Charts';
import { selectToken } from '../../store/auth';
import { useAppSelector } from '../../store/store';
import Chart from 'chart.js/auto';

export default function Home() {
  const token = useAppSelector(selectToken);
  const [dataState, setDataState] = useState();

  const getData = () => {
    try {
      const response = axios.post('/api/traffic', {
        token,
      });

      toast.promise(response, {
        loading: 'Đang tải data...',
        success: (response) => {
          if (response.data.success) {
            if (response.data) {
              setDataState({
                ...dataState,
                data: response.data.data,
              });
              return 'Lấy data thành công';
            }
            return response.data.message;
          }
          // handle logout
          if (
            response.data.message ===
            'Tài khoản của quý khách đã đăng nhập nơi khác. Vui lòng đăng nhập lại để tiếp tục sử dụng.'
          ) {
            dispatch(logoutAsync());
            router.push('/login');
            return response.data.message;
          }
        },
        error: (error) => {
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
  }, []);

  return (
    <>
      <div className="flex flex-col justify-center rounded-xl border-slate-900 p-6 m-8 shadow-2xl">
        <div>
          <Charts data={dataState} redraw />
        </div>
      </div>
    </>
  );
}
