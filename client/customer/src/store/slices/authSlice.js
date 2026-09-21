import { createSlice } from '@reduxjs/toolkit';

const storedUser = localStorage.getItem('customer_user')
  ? JSON.parse(localStorage.getItem('customer_user'))
  : null;

const storedToken = localStorage.getItem('customer_token') || null;

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: storedUser,
    token: storedToken,
    loading: false,
    error: null,
  },
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.token = action.payload.token;
      localStorage.setItem('customer_user', JSON.stringify(action.payload));
      localStorage.setItem('customer_token', action.payload.token);
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('customer_user');
      localStorage.removeItem('customer_token');
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;
