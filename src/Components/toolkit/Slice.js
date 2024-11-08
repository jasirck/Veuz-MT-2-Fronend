// Slice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  is_admin: localStorage.getItem('is_admin') || false,
  user: localStorage.getItem('user') || null,
  token: localStorage.getItem('token') || null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      // Store values returned from login
      state.user = action.payload.user; // user (name)
      state.token = action.payload.token; 
      state.is_admin = action.payload.is_admin;

      // Save to localStorage
      localStorage.setItem('user', action.payload.user);
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('is_admin', action.payload.is_admin);
    },
    logout: (state) => {
      // Clear state and localStorage on logout
      state.user = null;
      state.token = null;
      state.is_admin = false;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('is_admin');
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
