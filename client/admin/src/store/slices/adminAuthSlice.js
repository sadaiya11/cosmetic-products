import { createSlice } from '@reduxjs/toolkit';

const storedUser = localStorage.getItem('admin_user')
  ? JSON.parse(localStorage.getItem('admin_user'))
  : { id: 'admin-1', name: 'Master Admin', email: 'admin@aurora.com', role: 'ADMIN' };

const storedToken = localStorage.getItem('admin_token') || 'mock_admin_token';

const adminAuthSlice = createSlice({
  name: 'adminAuth',
  initialState: {
    user: storedUser,
    token: storedToken,
    isAuthenticated: !!storedToken,
  },
  reducers: {
    adminLogin: (state, action) => {
      state.user = action.payload;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      localStorage.setItem('admin_user', JSON.stringify(action.payload));
      localStorage.setItem('admin_token', action.payload.token);
    },
    adminLogout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('admin_user');
      localStorage.removeItem('admin_token');
    },
  },
});

export const { adminLogin, adminLogout } = adminAuthSlice.actions;
export default adminAuthSlice.reducer;
