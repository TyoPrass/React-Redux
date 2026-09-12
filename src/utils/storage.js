const STORAGE_KEY = 'accessToken';

export const getAccessToken = () => {
  return localStorage.getItem(STORAGE_KEY);
};

export const putAccessToken = (token) => {
  localStorage.setItem(STORAGE_KEY, token);
};

export const removeAccessToken = () => {
  localStorage.removeItem(STORAGE_KEY);
};
