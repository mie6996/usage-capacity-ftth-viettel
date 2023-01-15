import { useState } from 'react';
import { useAppSelector } from '../../store/store';
import { selectToken } from '../../store/auth';

const useTime = () => {
  const token = useAppSelector(selectToken);
  const currentMonth = new Date().getMonth() + 1;
  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  const currentYear = new Date().getFullYear();
  const years = [currentYear - 1, currentYear, currentYear + 1];

  const [timeState, setTimeState] = useState({
    token: token,
    month: currentMonth,
    year: currentYear,
  });

  const [dataState, setDataState] = useState({
    trafficMonths: [],
    sumDownload: 0,
    sumUpload: 0,
    sumTotalUse: 0,
  });

  return {
    months,
    years,
    timeState,
    dataState,
    setTimeState,
    setDataState,
  };
};

export default useTime;
