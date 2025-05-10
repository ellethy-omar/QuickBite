// filepath: d:\Projects\quickbite\QuickBite\frontend\store\store.ts
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import driverReducer from './slices/driverSlice';
import adminReducer from './slices/adminSlice';

const store = configureStore({
  reducer: {
    user: userReducer, // Add your reducers here
    driver: driverReducer, // Add your reducers here
    admin: adminReducer, // Add your reducers here
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;