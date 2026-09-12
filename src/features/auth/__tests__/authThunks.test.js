import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { asyncLogin } from '../authThunks';
import * as authApi from '../../../services/authApi';
import * as storage from '../../../utils/storage';
import { setLoading, clearError, setToken, setUser, setError } from '../authSlice';

/**
 * test scenario for authThunks
 *
 * - asyncLogin thunk
 *  - should dispatch action correctly when login success
 *  - should dispatch action correctly when login fails
 */

describe('asyncLogin thunk', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should dispatch action correctly when login success', async () => {
    // Arrange
    const fakeToken = 'sample-auth-token-xyz';
    const fakeUser = {
      id: 'user-123',
      name: 'Budi Santoso',
      email: 'budi@example.com',
    };

    const loginSpy = vi.spyOn(authApi, 'login').mockResolvedValue(fakeToken);
    const getProfileSpy = vi.spyOn(authApi, 'getOwnProfile').mockResolvedValue(fakeUser);
    const putTokenSpy = vi.spyOn(storage, 'putAccessToken').mockImplementation(() => {});

    const dispatch = vi.fn();

    // Act
    const result = await asyncLogin({ email: 'budi@example.com', password: 'password123' })(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(setLoading(true));
    expect(dispatch).toHaveBeenCalledWith(clearError());
    expect(loginSpy).toHaveBeenCalledWith({
      email: 'budi@example.com',
      password: 'password123',
    });
    expect(putTokenSpy).toHaveBeenCalledWith(fakeToken);
    expect(dispatch).toHaveBeenCalledWith(setToken(fakeToken));
    expect(getProfileSpy).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(setUser(fakeUser));
    expect(dispatch).toHaveBeenCalledWith(setLoading(false));
    expect(result).toEqual({ success: true });
  });

  it('should dispatch action correctly when login fails', async () => {
    // Arrange
    const fakeErrorMessage = 'Email atau password salah';
    vi.spyOn(authApi, 'login').mockRejectedValue(new Error(fakeErrorMessage));

    const dispatch = vi.fn();

    // Act
    const result = await asyncLogin({ email: 'wrong@example.com', password: 'wrong' })(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(setLoading(true));
    expect(dispatch).toHaveBeenCalledWith(clearError());
    expect(dispatch).toHaveBeenCalledWith(setError(fakeErrorMessage));
    expect(dispatch).toHaveBeenCalledWith(setLoading(false));
    expect(result).toEqual({ success: false, message: fakeErrorMessage });
  });
});
