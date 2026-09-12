import api from './api';

export const register = async ({ name, email, password }) => {
  const response = await api.post('/register', { name, email, password });
  return response.data.data.user;
};

export const login = async ({ email, password }) => {
  const response = await api.post('/login', { email, password });
  return response.data.data.token;
};

export const getOwnProfile = async () => {
  const response = await api.get('/users/me');
  return response.data.data.user;
};

export const getAllUsers = async () => {
  const response = await api.get('/users');
  return response.data.data.users;
};
