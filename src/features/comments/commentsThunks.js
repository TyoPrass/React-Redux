import * as threadApi from '../../services/threadApi';
import * as commentApi from '../../services/commentApi';
import {
  setLoading,
  setError,
  clearError,
  setSelectedThread,
  addComment,
  optimisticVoteDetailThread,
  revertVoteDetailThread,
  optimisticVoteComment,
  revertVoteComment,
} from './commentsSlice';

export const asyncReceiveThreadDetail = (threadId) => async (dispatch) => {
  dispatch(setLoading(true));
  dispatch(clearError());
  try {
    const threadDetail = await threadApi.getThreadDetail(threadId);
    dispatch(setSelectedThread(threadDetail));
  } catch (error) {
    dispatch(setError(error.message || 'Gagal memuat detail diskusi.'));
  } finally {
    dispatch(setLoading(false));
  }
};

export const asyncAddComment = ({ threadId, content }) => async (dispatch) => {
  dispatch(setLoading(true));
  dispatch(clearError());
  try {
    const newComment = await commentApi.createComment({ threadId, content });
    dispatch(addComment(newComment));
    return { success: true };
  } catch (error) {
    const message = error.message || 'Gagal menambahkan komentar.';
    dispatch(setError(message));
    return { success: false, message };
  } finally {
    dispatch(setLoading(false));
  }
};

export const asyncToggleVoteDetailThread = ({ threadId, voteType }) => async (
  dispatch,
  getState
) => {
  const { auth, comments } = getState();
  const userId = auth.user?.id;

  if (!userId) {
    dispatch(setError('Silakan login terlebih dahulu untuk melakukan vote.'));
    return;
  }

  const thread = comments.selectedThread;
  if (!thread) return;

  const previousUpVotes = [...thread.upVotesBy];
  const previousDownVotes = [...thread.downVotesBy];

  let targetVote = voteType;
  if (voteType === 'up' && thread.upVotesBy.includes(userId)) {
    targetVote = 'neutral';
  } else if (voteType === 'down' && thread.downVotesBy.includes(userId)) {
    targetVote = 'neutral';
  }

  // 1. Optimistic Update
  dispatch(optimisticVoteDetailThread({ userId, voteType: targetVote }));

  // 2. Network Request
  try {
    if (targetVote === 'up') {
      await threadApi.upVoteThread(threadId);
    } else if (targetVote === 'down') {
      await threadApi.downVoteThread(threadId);
    } else {
      await threadApi.neutralVoteThread(threadId);
    }
  } catch (error) {
    // 3. Rollback on Failure
    dispatch(
      revertVoteDetailThread({
        upVotesBy: previousUpVotes,
        downVotesBy: previousDownVotes,
      })
    );
    dispatch(setError(error.message || 'Gagal mengubah vote thread.'));
  }
};

export const asyncToggleVoteComment = ({ threadId, commentId, voteType }) => async (
  dispatch,
  getState
) => {
  const { auth, comments } = getState();
  const userId = auth.user?.id;

  if (!userId) {
    dispatch(setError('Silakan login terlebih dahulu untuk memberikan suara.'));
    return;
  }

  const comment = comments.selectedThread?.comments?.find((c) => c.id === commentId);
  if (!comment) return;

  const previousUpVotes = [...comment.upVotesBy];
  const previousDownVotes = [...comment.downVotesBy];

  let targetVote = voteType;
  if (voteType === 'up' && comment.upVotesBy.includes(userId)) {
    targetVote = 'neutral';
  } else if (voteType === 'down' && comment.downVotesBy.includes(userId)) {
    targetVote = 'neutral';
  }

  // 1. Optimistic Update
  dispatch(optimisticVoteComment({ commentId, userId, voteType: targetVote }));

  // 2. Network Request
  try {
    if (targetVote === 'up') {
      await commentApi.upVoteComment({ threadId, commentId });
    } else if (targetVote === 'down') {
      await commentApi.downVoteComment({ threadId, commentId });
    } else {
      await commentApi.neutralVoteComment({ threadId, commentId });
    }
  } catch (error) {
    // 3. Rollback on Failure
    dispatch(
      revertVoteComment({
        commentId,
        upVotesBy: previousUpVotes,
        downVotesBy: previousDownVotes,
      })
    );
    dispatch(setError(error.message || 'Gagal mengubah vote komentar.'));
  }
};
