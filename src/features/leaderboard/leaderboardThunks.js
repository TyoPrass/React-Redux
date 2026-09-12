import * as leaderboardApi from '../../services/leaderboardApi';
import {
  setLoading,
  setError,
  clearError,
  setLeaderboards,
} from './leaderboardSlice';

export const asyncReceiveLeaderboards = () => async (dispatch) => {
  dispatch(setLoading(true));
  dispatch(clearError());
  try {
    const leaderboards = await leaderboardApi.getLeaderboards();
    dispatch(setLeaderboards(leaderboards));
  } catch (error) {
    dispatch(setError(error.message || 'Gagal memuat papan peringkat.'));
  } finally {
    dispatch(setLoading(false));
  }
};
