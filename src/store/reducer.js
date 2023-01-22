import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './auth/index.js';

export const rootReducer = combineReducers({
  auth: authReducer,
});
