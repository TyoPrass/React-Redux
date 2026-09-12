import { useState } from 'react';
import PropTypes from 'prop-types';

const Avatar = ({ src, name = 'User', size = 'md', className = '' }) => {
  const [hasError, setHasError] = useState(false);

  const getInitials = (text) => {
    if (!text) return 'U';
    const parts = text.trim().split(' ');
    if (parts.length > 1) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return text.substring(0, 2).toUpperCase();
  };

  const sizeDimensions = {
    sm: 'avatar-sm',
    md: 'avatar-md',
    lg: 'avatar-lg',
    xl: 'avatar-xl',
  };

  const dimensionClass = sizeDimensions[size] || 'avatar-md';

  return (
    <div className={`avatar-container ${dimensionClass} ${className}`.trim()}>
      {!hasError && src ? (
        <img
          src={src}
          alt={name}
          className="avatar-img"
          onError={() => setHasError(true)}
          loading="lazy"
        />
      ) : (
        <div className="avatar-fallback" title={name}>
          {getInitials(name)}
        </div>
      )}
    </div>
  );
};

Avatar.propTypes = {
  src: PropTypes.string,
  name: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
  className: PropTypes.string,
};

export default Avatar;
