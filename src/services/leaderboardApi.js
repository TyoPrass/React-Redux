import api from './api';

export const getLeaderboards = async () => {
  const response = await api.get('/leaderboards');
  return response.data.data.leaderboards;
};
