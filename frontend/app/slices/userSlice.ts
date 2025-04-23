// filepath: d:\Projects\quickbite\QuickBite\frontend\store\userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  role: 'admin' | 'user' | 'restaurant' | 'driver'| null;
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  addresses: [{
      label: string;
      area: string;
      street: string;
      building: string;
      floor: string;
      apartment: string;
      isDefault: boolean;
  }];

}

const initialState: UserState = {
  role: null,
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
    setRole: (state, action: PayloadAction<'admin' | 'user' | 'restaurant' | 'driver'>) => {
      state.role = action.payload;
    },
    setUserDetails: (state, action: PayloadAction<UserState>) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.phone = action.payload.phone;
      state.password = action.payload.password;
      state.confirmPassword = action.payload.confirmPassword;
      state.addresses = action.payload.addresses;
    },
    logout: (state) => {
      state.role = null;
    },
  },
});

export const { setRole, logout, setUserDetails } = userSlice.actions;
export default userSlice.reducer;