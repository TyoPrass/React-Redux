import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Mail, Lock, LogIn, Sparkles } from 'lucide-react';
import { asyncLogin } from '../features/auth/authThunks';
import { clearError } from '../features/auth/authSlice';
import Button from '../components/common/Button';
import ErrorMessage from '../components/common/ErrorMessage';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setLocalError('Email dan password wajib diisi.');
      return;
    }

    setLocalError('');
    const result = await dispatch(asyncLogin({ email: email.trim(), password }));
    if (result?.success) {
      navigate('/');
    }
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo-badge">
            <Sparkles size={24} />
          </div>
          <h1 className="auth-title">Selamat Datang Kembali</h1>
          <p className="auth-subtitle">
            Masuk untuk berdiskusi dan berinteraksi di Dicoding Forum
          </p>
        </div>

        {(localError || error) && (
          <ErrorMessage
            message={localError || error}
            onDismiss={() => {
              setLocalError('');
              dispatch(clearError());
            }}
          />
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="login-email" className="form-label">
              <Mail size={16} />
              <span>Email Pengguna</span>
            </label>
            <input
              id="login-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nama@email.com"
              className="form-input"
              disabled={isLoading}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="login-password" className="form-label">
              <Lock size={16} />
              <span>Password</span>
            </label>
            <input
              id="login-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan kata sandi kamu"
              className="form-input"
              disabled={isLoading}
              required
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isLoading}
            icon={LogIn}
            className="w-full"
          >
            Masuk ke Forum
          </Button>
        </form>

        <div className="auth-footer">
          <p>
            Belum memiliki akun?{' '}
            <Link to="/register" className="auth-link">
              Daftar sekarang
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
