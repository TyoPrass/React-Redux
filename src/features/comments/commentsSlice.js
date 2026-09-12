import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedThread: null,
  isLoading: false,
  error: null,
};

const commentsSlice = createSlice({
  name: 'comments',
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
    setSelectedThread(state, action) {
      state.selectedThread = action.payload;
    },
    clearSelectedThread(state) {
      state.selectedThread = null;
    },
    addComment(state, action) {
      if (state.selectedThread) {
        state.selectedThread.comments.unshift(action.payload);
      }
    },
    optimisticVoteDetailThread(state, action) {
      const { userId, voteType } = action.payload;
      if (!state.selectedThread) return;

      state.selectedThread.upVotesBy = state.selectedThread.upVotesBy.filter(
        (id) => id !== userId
      );
      state.selectedThread.downVotesBy = state.selectedThread.downVotesBy.filter(
        (id) => id !== userId
      );

      if (voteType === 'up') {
        state.selectedThread.upVotesBy.push(userId);
      } else if (voteType === 'down') {
        state.selectedThread.downVotesBy.push(userId);
      }
    },
    revertVoteDetailThread(state, action) {
      const { upVotesBy, downVotesBy } = action.payload;
      if (state.selectedThread) {
        state.selectedThread.upVotesBy = upVotesBy;
        state.selectedThread.downVotesBy = downVotesBy;
      }
    },
    optimisticVoteComment(state, action) {
      const { commentId, userId, voteType } = action.payload;
      if (!state.selectedThread?.comments) return;

      const comment = state.selectedThread.comments.find(
        (c) => c.id === commentId
      );
      if (comment) {
        comment.upVotesBy = comment.upVotesBy.filter((id) => id !== userId);
        comment.downVotesBy = comment.downVotesBy.filter((id) => id !== userId);

        if (voteType === 'up') {
          comment.upVotesBy.push(userId);
        } else if (voteType === 'down') {
          comment.downVotesBy.push(userId);
        }
      }
    },
    revertVoteComment(state, action) {
      const { commentId, upVotesBy, downVotesBy } = action.payload;
      if (!state.selectedThread?.comments) return;

      const comment = state.selectedThread.comments.find(
        (c) => c.id === commentId
      );
      if (comment) {
        comment.upVotesBy = upVotesBy;
        comment.downVotesBy = downVotesBy;
      }
    },
  },
});

export const {
  setLoading,
  setError,
  clearError,
  setSelectedThread,
  clearSelectedThread,
  addComment,
  optimisticVoteDetailThread,
  revertVoteDetailThread,
  optimisticVoteComment,
  revertVoteComment,
} = commentsSlice.actions;

export default commentsSlice.reducer;
