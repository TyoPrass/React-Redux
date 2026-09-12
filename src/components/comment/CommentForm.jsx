import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Send, LogIn } from 'lucide-react';
import Button from '../common/Button';

const CommentForm = ({ onSubmit, isLoading = false, isLoggedIn = false }) => {
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  if (!isLoggedIn) {
    return (
      <div className="comment-login-prompt">
        <p className="login-prompt-text">
          Ingin ikut berdiskusi dan memberikan balasan?
        </p>
        <Link to="/login">
          <Button variant="primary" size="sm" icon={LogIn}>
            Masuk untuk Membalas
          </Button>
        </Link>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) {
      setError('Komentar tidak boleh kosong.');
      return;
    }
    setError('');
    onSubmit(content.trim());
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} className="comment-form-card">
      <h4 className="comment-form-title">Tulis Balasan</h4>
      {error && <div className="form-validation-error">{error}</div>}

      <div className="form-group">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Tulis tanggapan atau solusi kamu dengan sopan dan jelas..."
          rows={4}
          className="form-textarea"
          disabled={isLoading}
          required
        />
      </div>

      <div className="comment-form-actions">
        <Button
          type="submit"
          variant="primary"
          size="md"
          isLoading={isLoading}
          icon={Send}
        >
          Kirim Balasan
        </Button>
      </div>
    </form>
  );
};

CommentForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  isLoggedIn: PropTypes.bool,
};

export default CommentForm;
