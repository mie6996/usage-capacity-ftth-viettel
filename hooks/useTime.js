import { useState } from 'react';

const useTime = () => {
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
