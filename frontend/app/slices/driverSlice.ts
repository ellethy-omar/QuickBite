// filepath: d:\Projects\quickbite\QuickBite\frontend\store\userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DriverData } from '../types/driver';

const initialState: DriverData = {
  name: '',
  email: '',
  image: '',
  phone: '',
  _id: '',
  vehicle: {
      type: '',
      plateNumber: '',
      model: '',
  },
  rating: 0,
  deliveryStats: {
      completed: 0,
      avgDeliveryTime: 0,
  },
  isBanned: false
};

const driverSlice = createSlice({
  name: 'driver',
  initialState,
  reducers: {
    setDriverDetails: (state, action: PayloadAction<DriverData>) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.phone = action.payload.phone;
        state._id = action.payload._id;
        state.vehicle = action.payload.vehicle;
        state.rating = action.payload.rating;
        state.deliveryStats = action.payload.deliveryStats;
        state.isBanned = action.payload.isBanned;
    },
  },
});

export const { setDriverDetails } = driverSlice.actions;
export default driverSlice.reducer;