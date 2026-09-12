import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
  users: [],
  selectedCategory: 'all',
  isLoading: false,
  error: null,
};

const threadsSlice = createSlice({
  name: 'threads',
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
    setThreads(state, action) {
      state.data = action.payload;
    },
    setUsers(state, action) {
      state.users = action.payload;
    },
    setSelectedCategory(state, action) {
      state.selectedCategory = action.payload;
    },
    addThread(state, action) {
      state.data.unshift(action.payload);
    },
    optimisticVoteThread(state, action) {
      const { threadId, userId, voteType } = action.payload;
      const thread = state.data.find((item) => item.id === threadId);
      if (thread) {
        // Remove existing votes by this user
        thread.upVotesBy = thread.upVotesBy.filter((id) => id !== userId);
        thread.downVotesBy = thread.downVotesBy.filter((id) => id !== userId);

        if (voteType === 'up') {
          thread.upVotesBy.push(userId);
        } else if (voteType === 'down') {
          thread.downVotesBy.push(userId);
        }
      }
    },
    revertVoteThread(state, action) {
      const { threadId, upVotesBy, downVotesBy } = action.payload;
      const thread = state.data.find((item) => item.id === threadId);
      if (thread) {
        thread.upVotesBy = upVotesBy;
        thread.downVotesBy = downVotesBy;
      }
    },
  },
});

export const {
  setLoading,
  setError,
  clearError,
  setThreads,
  setUsers,
  setSelectedCategory,
  addThread,
  optimisticVoteThread,
  revertVoteThread,
} = threadsSlice.actions;

export default threadsSlice.reducer;
