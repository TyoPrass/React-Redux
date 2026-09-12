import PropTypes from 'prop-types';
import { AlertCircle, X, RotateCcw } from 'lucide-react';

const ErrorMessage = ({ message, onDismiss, onRetry, className = '' }) => {
  if (!message) return null;

  return (
    <div className={`error-alert ${className}`.trim()} role="alert">
      <div className="error-alert-content">
        <AlertCircle className="error-icon" size={20} />
        <span className="error-text">{message}</span>
      </div>
      <div className="error-actions">
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="error-retry-btn"
            title="Coba lagi"
          >
            <RotateCcw size={16} />
            <span>Coba lagi</span>
          </button>
        )}
        {onDismiss && (
          <button
            type="button"
            onClick={onDismiss}
            className="error-dismiss-btn"
            aria-label="Tutup pesan error"
          >
            <X size={16} />
          </button>
        )}
      </div>
    </div>
  );
};

ErrorMessage.propTypes = {
  message: PropTypes.string,
  onDismiss: PropTypes.func,
  onRetry: PropTypes.func,
  className: PropTypes.string,
};

export default ErrorMessage;
