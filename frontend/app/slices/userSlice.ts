// filepath: d:\Projects\quickbite\QuickBite\frontend\store\userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  name: string;
  email: string;
  phone: string;
  password?: string;
  confirmPassword?: string;
  addresses: {
      label: string;
      area: string;
      street: string;
      building: string;
      floor: string;
      apartment: string;
      isDefault: boolean;
  }[];

}

const initialState: UserState = {
  name: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  addresses: [{
      area: '',
      street: '',
      building: '',
      floor: '',
      apartment: '',
      label: '',
      isDefault: true,
  }],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserDetails: (state, action: PayloadAction<UserState>) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.phone = action.payload.phone;
      state.password = action.payload.password;
      state.confirmPassword = action.payload.confirmPassword;
      state.addresses = action.payload.addresses;
    },
  }
});

export const { setUserDetails } = userSlice.actions;
export default userSlice.reducer;