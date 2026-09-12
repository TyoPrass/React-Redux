import { describe, it, expect } from 'vitest';
import threadsReducer, {
  setThreads,
  setUsers,
  setSelectedCategory,
  addThread,
  optimisticVoteThread,
  revertVoteThread,
  setError,
  clearError,
} from '../threadsSlice';

/**
 * test scenario for threadsReducer
 *
 * - threadsReducer function
 *  - should return initial state when given unknown action
 *  - should handle setThreads action correctly
 *  - should handle setUsers action correctly
 *  - should handle setSelectedCategory action correctly
 *  - should handle addThread action correctly
 *  - should handle optimisticVoteThread action for upvote correctly
 *  - should handle optimisticVoteThread action for downvote correctly
 *  - should handle revertVoteThread action on error rollback correctly
 *  - should handle setError and clearError actions correctly
 */

describe('threadsReducer', () => {
  const initialState = {
    data: [],
    users: [],
    selectedCategory: 'all',
    isLoading: false,
    error: null,
  };

  it('should return initial state when given unknown action', () => {
    const nextState = threadsReducer(undefined, { type: 'UNKNOWN' });
    expect(nextState.data).toEqual([]);
    expect(nextState.selectedCategory).toBe('all');
    expect(nextState.error).toBeNull();
  });

  it('should handle setThreads action correctly', () => {
    const fakeThreads = [
      { id: 'thread-1', title: 'Judul 1', upVotesBy: [], downVotesBy: [] },
      { id: 'thread-2', title: 'Judul 2', upVotesBy: [], downVotesBy: [] },
    ];
    const nextState = threadsReducer(initialState, setThreads(fakeThreads));
    expect(nextState.data).toEqual(fakeThreads);
  });

  it('should handle setUsers action correctly', () => {
    const fakeUsers = [{ id: 'user-1', name: 'Alice' }];
    const nextState = threadsReducer(initialState, setUsers(fakeUsers));
    expect(nextState.users).toEqual(fakeUsers);
  });

  it('should handle setSelectedCategory action correctly', () => {
    const nextState = threadsReducer(initialState, setSelectedCategory('react'));
    expect(nextState.selectedCategory).toBe('react');
  });

  it('should handle addThread action correctly', () => {
    const existingThread = { id: 'thread-1', title: 'Diskusi Lama' };
    const stateWithOneThread = { ...initialState, data: [existingThread] };

    const newThread = { id: 'thread-2', title: 'Diskusi Baru' };
    const nextState = threadsReducer(stateWithOneThread, addThread(newThread));

    expect(nextState.data).toHaveLength(2);
    expect(nextState.data[0]).toEqual(newThread); // should be unshifted to the beginning
  });

  it('should handle optimisticVoteThread action for upvote correctly', () => {
    const stateWithThread = {
      ...initialState,
      data: [
        {
          id: 'thread-1',
          title: 'Thread 1',
          upVotesBy: [],
          downVotesBy: ['user-1'], // user previously downvoted
        },
      ],
    };

    const nextState = threadsReducer(
      stateWithThread,
      optimisticVoteThread({ threadId: 'thread-1', userId: 'user-1', voteType: 'up' })
    );

    const updatedThread = nextState.data.find((t) => t.id === 'thread-1');
    expect(updatedThread.upVotesBy).toContain('user-1');
    expect(updatedThread.downVotesBy).not.toContain('user-1');
  });

  it('should handle optimisticVoteThread action for downvote correctly', () => {
    const stateWithThread = {
      ...initialState,
      data: [
        {
          id: 'thread-1',
          title: 'Thread 1',
          upVotesBy: ['user-1'],
          downVotesBy: [],
        },
      ],
    };

    const nextState = threadsReducer(
      stateWithThread,
      optimisticVoteThread({ threadId: 'thread-1', userId: 'user-1', voteType: 'down' })
    );

    const updatedThread = nextState.data.find((t) => t.id === 'thread-1');
    expect(updatedThread.downVotesBy).toContain('user-1');
    expect(updatedThread.upVotesBy).not.toContain('user-1');
  });

  it('should handle revertVoteThread action on error rollback correctly', () => {
    const stateWithVotedThread = {
      ...initialState,
      data: [
        {
          id: 'thread-1',
          title: 'Thread 1',
          upVotesBy: ['user-1'],
          downVotesBy: [],
        },
      ],
    };

    const nextState = threadsReducer(
      stateWithVotedThread,
      revertVoteThread({
        threadId: 'thread-1',
        upVotesBy: [],
        downVotesBy: [],
      })
    );

    const thread = nextState.data.find((t) => t.id === 'thread-1');
    expect(thread.upVotesBy).toEqual([]);
    expect(thread.downVotesBy).toEqual([]);
  });

  it('should handle setError and clearError actions correctly', () => {
    const stateWithError = threadsReducer(initialState, setError('Gagal memuat threads'));
    expect(stateWithError.error).toBe('Gagal memuat threads');

    const stateCleared = threadsReducer(stateWithError, clearError());
    expect(stateCleared.error).toBeNull();
  });
});
