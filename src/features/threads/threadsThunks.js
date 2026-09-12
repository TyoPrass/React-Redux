import * as threadApi from '../../services/threadApi';
import * as authApi from '../../services/authApi';
import {
  setLoading,
  setError,
  clearError,
  setThreads,
  setUsers,
  addThread,
  optimisticVoteThread,
  revertVoteThread,
} from './threadsSlice';

export const asyncPopulateUsersAndThreads = () => async (dispatch) => {
  dispatch(setLoading(true));
  dispatch(clearError());
  try {
    const [users, threads] = await Promise.all([
      authApi.getAllUsers(),
      threadApi.getAllThreads(),
    ]);

    dispatch(setUsers(users));

    const threadsWithOwners = threads.map((thread) => ({
      ...thread,
      owner: users.find((user) => user.id === thread.ownerId) || {
        id: thread.ownerId,
        name: 'Pengguna',
        avatar: 'https://ui-avatars.com/api/?name=User&background=random',
      },
    }));

    dispatch(setThreads(threadsWithOwners));
  } catch (error) {
    dispatch(setError(error.message || 'Gagal memuat daftar diskusi.'));
  } finally {
    dispatch(setLoading(false));
  }
};

export const asyncCreateThread = ({ title, body, category }) => async (dispatch, getState) => {
  dispatch(setLoading(true));
  dispatch(clearError());
  try {
    const newThread = await threadApi.createThread({ title, body, category });
    const { auth } = getState();

    const threadWithOwner = {
      ...newThread,
      owner: auth.user || {
        id: newThread.ownerId,
        name: 'Saya',
        avatar: '',
      },
    };

    dispatch(addThread(threadWithOwner));
    return { success: true, threadId: newThread.id };
  } catch (error) {
    const message = error.message || 'Gagal membuat thread baru.';
    dispatch(setError(message));
    return { success: false, message };
  } finally {
    dispatch(setLoading(false));
  }
};

export const asyncToggleVoteThread = ({ threadId, voteType }) => async (dispatch, getState) => {
  const { auth, threads } = getState();
  const userId = auth.user?.id;

  if (!userId) {
    dispatch(setError('Silakan login terlebih dahulu untuk melakukan vote.'));
    return;
  }

  const thread = threads.data.find((item) => item.id === threadId);
  if (!thread) return;

  const previousUpVotes = [...thread.upVotesBy];
  const previousDownVotes = [...thread.downVotesBy];

  // Determine actual target vote
  let targetVote = voteType;
  if (voteType === 'up' && thread.upVotesBy.includes(userId)) {
    targetVote = 'neutral';
  } else if (voteType === 'down' && thread.downVotesBy.includes(userId)) {
    targetVote = 'neutral';
  }

  // 1. Optimistic update
  dispatch(optimisticVoteThread({ threadId, userId, voteType: targetVote }));

  // 2. Network call with rollback
  try {
    if (targetVote === 'up') {
      await threadApi.upVoteThread(threadId);
    } else if (targetVote === 'down') {
      await threadApi.downVoteThread(threadId);
    } else {
      await threadApi.neutralVoteThread(threadId);
    }
  } catch (error) {
    // 3. Rollback on failure
    dispatch(
      revertVoteThread({
        threadId,
        upVotesBy: previousUpVotes,
        downVotesBy: previousDownVotes,
      })
    );
    dispatch(setError(error.message || 'Gagal mengirim suara. Perubahan dibatalkan.'));
  }
};
