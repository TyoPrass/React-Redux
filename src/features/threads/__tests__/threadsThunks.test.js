import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { asyncPopulateUsersAndThreads } from '../threadsThunks';
import * as threadApi from '../../../services/threadApi';
import * as authApi from '../../../services/authApi';
import { setLoading, clearError, setUsers, setThreads, setError } from '../threadsSlice';

/**
 * test scenario for threadsThunks
 *
 * - asyncPopulateUsersAndThreads thunk
 *  - should dispatch actions correctly when data fetching success
 *  - should dispatch actions correctly when data fetching fails
 */

describe('asyncPopulateUsersAndThreads thunk', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should dispatch actions correctly when data fetching success', async () => {
    // Arrange
    const fakeUsers = [
      { id: 'user-1', name: 'User Satu', avatar: 'https://example.com/avatar1.jpg' },
      { id: 'user-2', name: 'User Dua', avatar: 'https://example.com/avatar2.jpg' },
    ];
    const fakeThreads = [
      {
        id: 'thread-1',
        title: 'Thread Satu',
        body: 'Konten thread satu',
        ownerId: 'user-1',
        upVotesBy: [],
        downVotesBy: [],
      },
    ];

    const getAllUsersSpy = vi.spyOn(authApi, 'getAllUsers').mockResolvedValue(fakeUsers);
    const getAllThreadsSpy = vi.spyOn(threadApi, 'getAllThreads').mockResolvedValue(fakeThreads);

    const dispatch = vi.fn();

    // Act
    await asyncPopulateUsersAndThreads()(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(setLoading(true));
    expect(dispatch).toHaveBeenCalledWith(clearError());
    expect(getAllUsersSpy).toHaveBeenCalled();
    expect(getAllThreadsSpy).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(setUsers(fakeUsers));

    const expectedThreads = [
      {
        ...fakeThreads[0],
        owner: fakeUsers[0],
      },
    ];
    expect(dispatch).toHaveBeenCalledWith(setThreads(expectedThreads));
    expect(dispatch).toHaveBeenCalledWith(setLoading(false));
  });

  it('should dispatch actions correctly when data fetching fails', async () => {
    // Arrange
    const fakeErrorMessage = 'Gagal memuat threads dan users';
    vi.spyOn(authApi, 'getAllUsers').mockRejectedValue(new Error(fakeErrorMessage));
    vi.spyOn(threadApi, 'getAllThreads').mockResolvedValue([]);

    const dispatch = vi.fn();

    // Act
    await asyncPopulateUsersAndThreads()(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(setLoading(true));
    expect(dispatch).toHaveBeenCalledWith(clearError());
    expect(dispatch).toHaveBeenCalledWith(setError(fakeErrorMessage));
    expect(dispatch).toHaveBeenCalledWith(setLoading(false));
  });
});
