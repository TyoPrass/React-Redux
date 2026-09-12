import * as authApi from '../../services/authApi';
import { putAccessToken, removeAccessToken, getAccessToken } from '../../utils/storage';
import {
  setLoading,
  setError,
  clearError,
  setUser,
  setToken,
  setIsPreload,
  unsetAuthUser,
} from './authSlice';

export const asyncRegister = ({ name, email, password }) => async (dispatch) => {
  dispatch(setLoading(true));
  dispatch(clearError());
  try {
    await authApi.register({ name, email, password });
    return { success: true };
  } catch (error) {
    const errorMsg = error.message || 'Gagal melakukan pendaftaran.';
    dispatch(setError(errorMsg));
    return { success: false, message: errorMsg };
  } finally {
    dispatch(setLoading(false));
  }
};

export const asyncLogin = ({ email, password }) => async (dispatch) => {
  dispatch(setLoading(true));
  dispatch(clearError());
  try {
    const token = await authApi.login({ email, password });
    putAccessToken(token);
    dispatch(setToken(token));

    const user = await authApi.getOwnProfile();
    dispatch(setUser(user));
    return { success: true };
  } catch (error) {
    const errorMsg = error.message || 'Gagal login. Periksa email dan password.';
    dispatch(setError(errorMsg));
    return { success: false, message: errorMsg };
  } finally {
    dispatch(setLoading(false));
  }
};

export const asyncPreloadProcess = () => async (dispatch) => {
  const token = getAccessToken();
  if (token) {
    try {
      const user = await authApi.getOwnProfile();
      dispatch(setUser(user));
      dispatch(setToken(token));
    } catch {
      removeAccessToken();
      dispatch(unsetAuthUser());
    }
  }
  dispatch(setIsPreload(false));
};

export const asyncLogout = () => (dispatch) => {
  dispatch(unsetAuthUser());
};
