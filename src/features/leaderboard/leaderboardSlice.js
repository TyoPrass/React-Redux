import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
  isLoading: false,
  error: null,
};

const leaderboardSlice = createSlice({
  name: 'leaderboard',
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
    setLeaderboards(state, action) {
      state.data = action.payload;
    },
  },
});

export const { setLoading, setError, clearError, setLeaderboards } =
  leaderboardSlice.actions;

export default leaderboardSlice.reducer;
