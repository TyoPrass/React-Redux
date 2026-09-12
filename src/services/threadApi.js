import api from './api';

export const getAllThreads = async () => {
  const response = await api.get('/threads');
  return response.data.data.threads;
};

export const getThreadDetail = async (threadId) => {
  const response = await api.get(`/threads/${threadId}`);
  return response.data.data.detailThread;
};

export const createThread = async ({ title, body, category = '' }) => {
  const response = await api.post('/threads', {
    title,
    body,
    category: category.trim(),
  });
  return response.data.data.thread;
};

export const upVoteThread = async (threadId) => {
  const response = await api.post(`/threads/${threadId}/up-vote`);
  return response.data.data.vote;
};

export const downVoteThread = async (threadId) => {
  const response = await api.post(`/threads/${threadId}/down-vote`);
  return response.data.data.vote;
};

export const neutralVoteThread = async (threadId) => {
  const response = await api.post(`/threads/${threadId}/neutral-vote`);
  return response.data.data.vote;
};
