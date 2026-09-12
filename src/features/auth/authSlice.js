import { createSlice } from '@reduxjs/toolkit';
import { getAccessToken, removeAccessToken } from '../../utils/storage';

const initialState = {
  user: null,
  token: getAccessToken() || null,
  isLoading: false,
  isPreload: true,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
    setToken(state, action) {
      state.token = action.payload;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
    setIsPreload(state, action) {
      state.isPreload = action.payload;
    },
    unsetAuthUser(state) {
      state.user = null;
      state.token = null;
      removeAccessToken();
    },
  },
});

export const {
  setLoading,
  setError,
  clearError,
  setToken,
  setUser,
  setIsPreload,
  unsetAuthUser,
} = authSlice.actions;

export default authSlice.reducer;
