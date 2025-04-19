// filepath: d:\Projects\quickbite\QuickBite\frontend\store\userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  role: 'admin' | 'user' | null;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  role: null,
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setRole: (state, action: PayloadAction<'admin' | 'user'>) => {
      state.role = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.role = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setRole, logout } = userSlice.actions;
export default userSlice.reducer;