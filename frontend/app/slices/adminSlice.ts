// filepath: d:\Projects\quickbite\QuickBite\frontend\store\userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AdminData } from '../types/admin';

const initialState: AdminData = {
  name: '',
  email: '',
  image: '',
  phone: '',
  id: '',
  handledRequests: 0
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setAdminDetails: (state, action: PayloadAction<AdminData>) => {
        state.name = action.payload.name;
        state.email = action.payload.email;
        state.phone = action.payload.phone;
        state.id = action.payload.id;
        state.image = action.payload.image;
        state.handledRequests = action.payload.handledRequests;
    },
  },
});

export const { setAdminDetails } = adminSlice.actions;
export default adminSlice.reducer;