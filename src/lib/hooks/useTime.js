import { useState } from 'react';
import { useAppSelector } from '../../store/store';
import { selectToken } from '../../store/auth';

const useTime = () => {
  const token = useAppSelector(selectToken);
  const date = new Date(new Date().setMonth(new Date().getMonth() - 2));

  const [timeState, setTimeState] = useState({
    token: token,
    month: '',
    year: '',
  });

  const [dataState, setDataState] = useState({
    trafficMonths: [],
    sumDownload: 0,
    sumUpload: 0,
    sumTotalUse: 0,
  });

  return {
    date,
    timeState,
    dataState,
    setTimeState,
    setDataState,
  };
};

export default useTime;
