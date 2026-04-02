import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

interface User {
  id?: number;
  name?: string;
  email?: string;
  mobile?: string;
  qualification?: string;
  profile_image?: string;
}

interface AuthState {
  mobile: string;
  token: string | null;
  refreshToken: string | null;
  user: User | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  mobile: '',
  token: Cookies.get('access_token') || null,
  refreshToken: Cookies.get('refresh_token') || null,
  user: null,
  isAuthenticated: !!Cookies.get('access_token'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Called after send-otp — just saves the mobile number
    setMobile(state, action: PayloadAction<string>) {
      state.mobile = action.payload;
    },

    // Called after verify-otp or create-profile — saves tokens
    setCredentials(
      state,
      action: PayloadAction<{
        access_token: string;
        refresh_token: string;
        user?: User;
      }>
    ) {
      state.token = action.payload.access_token;
      state.refreshToken = action.payload.refresh_token;
      state.user = action.payload.user || null;
      state.isAuthenticated = true;

      // Persist tokens in cookies
      Cookies.set('access_token', action.payload.access_token);
      Cookies.set('refresh_token', action.payload.refresh_token);
    },

    // Called after create-profile — saves user details
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },

    // Called on logout
    logout(state) {
      state.mobile = '';
      state.token = null;
      state.refreshToken = null;
      state.user = null;
      state.isAuthenticated = false;

      Cookies.remove('access_token');
      Cookies.remove('refresh_token');
    },
  },
});

export const { setMobile, setCredentials, setUser, logout } = authSlice.actions;
export default authSlice.reducer;