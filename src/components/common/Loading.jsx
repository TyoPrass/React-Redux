import PropTypes from 'prop-types';
import { Loader2 } from 'lucide-react';

const Loading = ({ text = 'Memuat data...', fullPage = false, size = 'md' }) => {
  const iconSizes = {
    sm: 24,
    md: 36,
    lg: 48,
  };

  const content = (
    <div className={`loading-wrapper ${fullPage ? 'loading-fullpage' : ''}`}>
      <div className="loading-spinner-box">
        <Loader2 className="animate-spin text-primary" size={iconSizes[size] || 36} />
        {text && <p className="loading-text">{text}</p>}
      </div>
    </div>
  );

  return content;
};

Loading.propTypes = {
  text: PropTypes.string,
  fullPage: PropTypes.bool,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
};

export default Loading;
