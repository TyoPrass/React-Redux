import { describe, it, expect } from 'vitest';
import authReducer, {
  setUser,
  setToken,
  unsetAuthUser,
  setError,
  clearError,
  setLoading,
} from '../authSlice';

/**
 * test scenario for authReducer
 *
 * - authReducer function
 *  - should return initial state when given unknown action
 *  - should handle setUser action correctly
 *  - should handle setToken action correctly
 *  - should handle unsetAuthUser action correctly
 *  - should handle setError and clearError actions correctly
 *  - should handle setLoading action correctly
 */

describe('authReducer', () => {
  const initialState = {
    user: null,
    token: null,
    isLoading: false,
    isPreload: true,
    error: null,
  };

  it('should return initial state when given unknown action', () => {
    const nextState = authReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(nextState.user).toBeNull();
    expect(nextState.isLoading).toBe(false);
    expect(nextState.error).toBeNull();
  });

  it('should handle setUser action correctly', () => {
    const fakeUser = {
      id: 'user-1',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://example.com/avatar.jpg',
    };
    const nextState = authReducer(initialState, setUser(fakeUser));
    expect(nextState.user).toEqual(fakeUser);
  });

  it('should handle setToken action correctly', () => {
    const fakeToken = 'sample-jwt-token-12345';
    const nextState = authReducer(initialState, setToken(fakeToken));
    expect(nextState.token).toBe(fakeToken);
  });

  it('should handle unsetAuthUser action correctly', () => {
    const loggedInState = {
      ...initialState,
      user: { id: 'user-1', name: 'John Doe' },
      token: 'sample-jwt-token',
    };
    const nextState = authReducer(loggedInState, unsetAuthUser());
    expect(nextState.user).toBeNull();
    expect(nextState.token).toBeNull();
  });

  it('should handle setError and clearError actions correctly', () => {
    const stateWithError = authReducer(initialState, setError('Email atau password salah.'));
    expect(stateWithError.error).toBe('Email atau password salah.');

    const stateCleared = authReducer(stateWithError, clearError());
    expect(stateCleared.error).toBeNull();
  });

  it('should handle setLoading action correctly', () => {
    const nextState = authReducer(initialState, setLoading(true));
    expect(nextState.isLoading).toBe(true);
  });
});
