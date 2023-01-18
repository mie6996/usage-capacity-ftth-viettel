import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import authReducer from './auth';

const store = configureStore({
  reducer: {
    auth: authReducer,
    // traffic: trafficReducer,
  },
});

export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;

export default store;
