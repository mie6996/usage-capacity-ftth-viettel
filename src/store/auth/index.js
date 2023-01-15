import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const loginAsync = createAsyncThunk('auth/login', async (payload) => {
  const response = await axios.post('/api/auth/login', payload);
  return response.data;
});

export const logoutAsync = createAsyncThunk('auth/logout', async () => {
  const response = await axios.post('/api/auth/logout');
  return response.data;
});

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isLoading: false,
    token: null,
    isAuthenticating: false,
  },
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticating = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.token = action.payload.data.token;
        state.user = action.payload.data.user;
        state.isAuthenticating = true;
      })
      .addCase(loginAsync.rejected, (state) => {
        state.token = null;
        state.user = null;
        state.isAuthenticating = false;
      })
      .addCase(loginAsync.pending, (state) => {
        state.isLoading = true;
      });

    builder
      .addCase(logoutAsync.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticating = false;
      })
      .addCase(logoutAsync.rejected, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticating = false;
      })
      .addCase(logoutAsync.pending, (state) => {
        state.isLoading = true;
      });
  },
});

export const { logout } = authSlice.actions;

export const selectUser = (state) => state.auth.user;
export const selectAuthLoading = (state) => state.auth.isLoading;
export const selectIsAuthenticating = (state) => state.auth.isAuthenticating;
export const selectToken = (state) => state.auth.token;

export default authSlice.reducer;
