import { useState } from 'react';
import PropTypes from 'prop-types';
import { Send, Tag, Type, AlignLeft } from 'lucide-react';
import Button from '../common/Button';

const ThreadForm = ({ onSubmit, isLoading = false }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [body, setBody] = useState('');
  const [validationError, setValidationError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setValidationError('Judul diskusi wajib diisi.');
      return;
    }
    if (!body.trim()) {
      setValidationError('Isi konten diskusi wajib diisi.');
      return;
    }

    setValidationError('');
    onSubmit({
      title: title.trim(),
      category: category.trim().replace(/^#/, ''), // strip leading hash if typed
      body: body.trim(),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="thread-form-card">
      {validationError && (
        <div className="form-validation-error">{validationError}</div>
      )}

      <div className="form-group">
        <label htmlFor="thread-title" className="form-label">
          <Type size={16} />
          <span>Judul Diskusi</span>
        </label>
        <input
          id="thread-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Tulis judul diskusi yang jelas dan menarik..."
          className="form-input"
          disabled={isLoading}
          maxLength={150}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="thread-category" className="form-label">
          <Tag size={16} />
          <span>Kategori (Opsional)</span>
        </label>
        <input
          id="thread-category"
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="contoh: react, redux, tips, general"
          className="form-input"
          disabled={isLoading}
          maxLength={50}
        />
        <span className="form-hint">Gunakan satu kata kategori tanpa spasi.</span>
      </div>

      <div className="form-group">
        <label htmlFor="thread-body" className="form-label">
          <AlignLeft size={16} />
          <span>Konten Diskusi</span>
        </label>
        <textarea
          id="thread-body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Jelaskan pertanyaan, ide, atau topik yang ingin kamu diskusikan secara mendalam..."
          className="form-textarea"
          rows={7}
          disabled={isLoading}
          required
        />
      </div>

      <div className="form-actions">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          isLoading={isLoading}
          icon={Send}
        >
          Publikasikan Diskusi
        </Button>
      </div>
    </form>
  );
};

ThreadForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};

export default ThreadForm;
