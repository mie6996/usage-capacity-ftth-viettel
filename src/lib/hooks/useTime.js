import { useState } from 'react';
import { useAppSelector } from '../../store/store';
import { selectToken } from '../../store/auth';

const useTime = () => {
  const token = useAppSelector(selectToken);
  const currentDate = new Date();

  // get 3 months before current month
  let currentMonth = currentDate.getMonth() + 1;
  let currentYear = currentDate.getFullYear();
  let months = [];
  let years = [];

  for (let i = 0; i < 4; i++) {
    months.push(currentMonth);
    years.push(currentYear);
    currentMonth--;
    if (currentMonth === 0) {
      currentMonth = 12;
      currentYear--;
    }
  }

  const [timeState, setTimeState] = useState({
    token: token,
    month: currentDate.getMonth() + 1,
    year: currentDate.getFullYear(),
  });

  return {
    months,
    years,
    timeState,
    setTimeState,
  };
};

export default useTime;
