import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ArrowLeft, PlusCircle } from 'lucide-react';
import { asyncCreateThread } from '../features/threads/threadsThunks';
import { clearError } from '../features/threads/threadsSlice';
import ThreadForm from '../components/thread/ThreadForm';
import ErrorMessage from '../components/common/ErrorMessage';

const CreateThreadPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, error } = useSelector((state) => state.threads);
  const { user } = useSelector((state) => state.auth);

  const handleCreateThread = async ({ title, body, category }) => {
    const result = await dispatch(asyncCreateThread({ title, body, category }));
    if (result?.success) {
      navigate(result.threadId ? `/threads/${result.threadId}` : '/');
    }
  };

  if (!user) {
    return (
      <div className="auth-required-box">
        <h2>Akses Terbatas</h2>
        <p>Kamu harus masuk terlebih dahulu untuk membuat diskusi baru.</p>
        <Link to="/login" className="btn btn-primary">
          Masuk ke Akun
        </Link>
      </div>
    );
  }

  return (
    <div className="create-thread-container">
      <div className="detail-navigation">
        <Link to="/" className="back-link">
          <ArrowLeft size={18} />
          <span>Kembali ke Beranda</span>
        </Link>
      </div>

      <div className="page-header-card">
        <div className="page-header-icon-box">
          <PlusCircle size={28} className="page-header-icon" />
        </div>
        <div>
          <h1 className="page-title">Buat Diskusi Baru</h1>
          <p className="page-subtitle">
            Bagikan pertanyaan teknis, diskusikan konsep baru, atau minta bantuan seputar pemrograman.
          </p>
        </div>
      </div>

      {error && (
        <ErrorMessage
          message={error}
          onDismiss={() => dispatch(clearError())}
        />
      )}

      <ThreadForm onSubmit={handleCreateThread} isLoading={isLoading} />
    </div>
  );
};

export default CreateThreadPage;
