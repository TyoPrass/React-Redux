import api from './api';

export const createComment = async ({ threadId, content }) => {
  const response = await api.post(`/threads/${threadId}/comments`, { content });
  return response.data.data.comment;
};

export const upVoteComment = async ({ threadId, commentId }) => {
  const response = await api.post(
    `/threads/${threadId}/comments/${commentId}/up-vote`
  );
  return response.data.data.vote;
};

export const downVoteComment = async ({ threadId, commentId }) => {
  const response = await api.post(
    `/threads/${threadId}/comments/${commentId}/down-vote`
  );
  return response.data.data.vote;
};

export const neutralVoteComment = async ({ threadId, commentId }) => {
  const response = await api.post(
    `/threads/${threadId}/comments/${commentId}/neutral-vote`
  );
  return response.data.data.vote;
};
