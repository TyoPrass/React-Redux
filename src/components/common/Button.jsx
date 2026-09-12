import PropTypes from 'prop-types';
import { Loader2 } from 'lucide-react';

const Button = ({
  children,
  type = 'button',
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  onClick,
  icon: Icon,
  className = '',
  ...rest
}) => {
  const baseClasses = 'btn';
  const variantClass = `btn-${variant}`;
  const sizeClass = `btn-${size}`;

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={`${baseClasses} ${variantClass} ${sizeClass} ${className}`.trim()}
      {...rest}
    >
      {isLoading ? (
        <span className="btn-loading-wrapper">
          <Loader2 className="btn-spinner animate-spin" size={size === 'sm' ? 14 : 18} />
          <span>Memuat...</span>
        </span>
      ) : (
        <>
          {Icon && <Icon className="btn-icon" size={size === 'sm' ? 14 : 18} />}
          <span>{children}</span>
        </>
      )}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline', 'danger', 'ghost']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  isLoading: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  icon: PropTypes.elementType,
  className: PropTypes.string,
};

export default Button;
