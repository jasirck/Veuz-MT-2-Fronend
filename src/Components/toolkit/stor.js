import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../toolkit/Slice';

const store = configureStore({
  reducer: {
    authReducer: authSlice,
  },
});

export default store;
