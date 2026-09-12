import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { User, Mail, Lock, UserPlus, Sparkles, CheckCircle2 } from 'lucide-react';
import { asyncRegister } from '../features/auth/authThunks';
import { clearError } from '../features/auth/authSlice';
import Button from '../components/common/Button';
import ErrorMessage from '../components/common/ErrorMessage';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

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
    if (!name.trim()) {
      setLocalError('Nama lengkap wajib diisi.');
      return;
    }
    if (!email.trim()) {
      setLocalError('Email wajib diisi.');
      return;
    }
    if (password.length < 6) {
      setLocalError('Password harus minimal 6 karakter.');
      return;
    }

    setLocalError('');
    const result = await dispatch(
      asyncRegister({ name: name.trim(), email: email.trim(), password })
    );

    if (result?.success) {
      setSuccessMessage('Akun berhasil didaftarkan! Mengalihkan ke halaman login...');
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    }
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo-badge">
            <Sparkles size={24} />
          </div>
          <h1 className="auth-title">Daftar Akun Baru</h1>
          <p className="auth-subtitle">
            Bergabung dengan ribuan developer di Dicoding Forum
          </p>
        </div>

        {successMessage && (
          <div className="success-alert">
            <CheckCircle2 size={20} className="success-icon" />
            <span>{successMessage}</span>
          </div>
        )}

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
            <label htmlFor="reg-name" className="form-label">
              <User size={16} />
              <span>Nama Lengkap</span>
            </label>
            <input
              id="reg-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Masukkan nama lengkap kamu"
              className="form-input"
              disabled={isLoading}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="reg-email" className="form-label">
              <Mail size={16} />
              <span>Email Pengguna</span>
            </label>
            <input
              id="reg-email"
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
            <label htmlFor="reg-password" className="form-label">
              <Lock size={16} />
              <span>Password (Min. 6 Karakter)</span>
            </label>
            <input
              id="reg-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Buat kata sandi minimal 6 karakter"
              className="form-input"
              disabled={isLoading}
              minLength={6}
              required
            />
            <span className="form-hint">Minimal 6 karakter kombinasi huruf & angka.</span>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isLoading}
            icon={UserPlus}
            className="w-full"
          >
            Daftarkan Akun
          </Button>
        </form>

        <div className="auth-footer">
          <p>
            Sudah memiliki akun?{' '}
            <Link to="/login" className="auth-link">
              Masuk di sini
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
