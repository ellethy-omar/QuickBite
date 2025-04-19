// filepath: d:\Projects\quickbite\QuickBite\frontend\store\userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  role: 'admin' | 'user' | null;
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  addresses: [{
      area: string;
      street: string;
      building: string;
      floor: string;
      apartment: string;
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
      apartment: ''
  }],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setRole: (state, action: PayloadAction<'admin' | 'user'>) => {
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