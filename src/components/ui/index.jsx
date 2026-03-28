import React from 'react';

/**
 * Utility function to merge class names
 * @param {...string} inputs - Class names to merge
 * @returns {string} Merged class names
 */
export const cn = (...inputs) => {
  return inputs.filter(Boolean).join(' ');
};

/**
 * Button Component
 * @param {Object} props
 * @param {'primary'|'secondary'|'outline'|'ghost'|'danger'} props.variant - Button style variant
 * @param {'sm'|'md'|'lg'|'xl'} props.size - Button size
 * @param {boolean} props.loading - Loading state
 * @param {boolean} props.disabled - Disabled state
 * @param {React.ReactNode} props.icon - Icon component
 * @param {React.ReactNode} props.children - Button content
 * @param {string} props.className - Additional CSS classes
 */
export const Button = ({ 
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  icon,
  children,
  className = '',
  ...props 
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-navy-900 text-white hover:bg-navy-800 focus:ring-navy-900/20',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500',
    outline: 'border-2 border-navy-200 text-navy-900 hover:bg-navy-50 focus:ring-navy-500',
    ghost: 'text-navy-900 hover:bg-navy-50 focus:ring-navy-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm rounded-lg gap-1.5',
    md: 'px-6 py-3 text-base rounded-xl gap-2',
    lg: 'px-8 py-4 text-lg rounded-2xl gap-2',
    xl: 'px-10 py-5 text-xl rounded-2xl gap-3',
  };

  return (
    <button
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        loading && 'cursor-wait',
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>Loading...</span>
        </>
      ) : (
        <>
          {icon && icon}
          {children}
        </>
      )}
    </button>
  );
};

/**
 * Card Component
 * @param {Object} props
 * @param {boolean} props.hover - Enable hover effect
 * @param {boolean} props.clickable - Make card clickable
 * @param {React.ReactNode} props.children - Card content
 * @param {string} props.className - Additional CSS classes
 */
export const Card = ({ hover = false, clickable = false, children, className = '', ...props }) => {
  const baseStyles = 'bg-white rounded-xl border border-gray-200 transition-all duration-200';
  const hoverStyles = hover || clickable ? 'hover:shadow-md hover:border-gray-300' : '';
  const clickableStyles = clickable ? 'cursor-pointer' : '';

  return (
    <div
      className={cn(baseStyles, hoverStyles, clickableStyles, className)}
      {...props}
    >
      {children}
    </div>
  );
};

/**
 * Input Component
 * @param {Object} props
 * @param {'text'|'email'|'password'|'number'|'url'} props.type - Input type
 * @param {'sm'|'md'|'lg'} props.size - Input size
 * @param {boolean} props.error - Error state
 * @param {string} props.helperText - Helper or error text
 * @param {React.ReactNode} props.leftIcon - Left icon component
 * @param {React.ReactNode} props.rightIcon - Right icon component
 * @param {string} props.label - Input label
 * @param {string} props.className - Additional CSS classes
 */
export const Input = ({ 
  type = 'text',
  size = 'md',
  error = false,
  helperText = '',
  leftIcon,
  rightIcon,
  label,
  className = '',
  ...props 
}) => {
  const baseStyles = 'w-full bg-white border-2 transition-all duration-200 focus:outline-none focus:ring-4';
  
  const errorStyles = error 
    ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
    : 'border-gray-200 focus:border-navy-900 focus:ring-navy-900/20';

  const sizes = {
    sm: 'px-3 py-2 text-sm rounded-lg',
    md: 'px-4 py-3 text-base rounded-xl',
    lg: 'px-6 py-4 text-lg rounded-2xl',
  };

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            {leftIcon}
          </div>
        )}
        <input
          type={type}
          className={cn(
            baseStyles,
            errorStyles,
            sizes[size],
            leftIcon && 'pl-12',
            rightIcon && 'pr-12',
            className
          )}
          {...props}
        />
        {rightIcon && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
            {rightIcon}
          </div>
        )}
      </div>
      {helperText && (
        <p className={`mt-2 text-sm ${error ? 'text-red-600' : 'text-gray-500 dark:text-gray-400'}`}>
          {helperText}
        </p>
      )}
    </div>
  );
};

/**
 * Badge Component
 * @param {Object} props
 * @param {'primary'|'success'|'warning'|'danger'|'gray'} props.variant - Badge color variant
 * @param {'sm'|'md'|'lg'} props.size - Badge size
 * @param {boolean} props.dot - Show dot indicator
 * @param {React.ReactNode} props.children - Badge content
 * @param {string} props.className - Additional CSS classes
 */
export const Badge = ({ 
  variant = 'primary',
  size = 'md',
  dot = false,
  children,
  className = '',
  ...props 
}) => {
  const baseStyles = 'inline-flex items-center font-semibold rounded-full whitespace-nowrap';
  
  const variants = {
    primary: 'bg-navy-100 text-navy-900',
    success: 'bg-green-100 text-green-700',
    warning: 'bg-yellow-100 text-yellow-700',
    danger: 'bg-red-100 text-red-700',
    gray: 'bg-gray-100 text-gray-700',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs gap-1',
    md: 'px-3 py-1 text-sm gap-1.5',
    lg: 'px-4 py-1.5 text-base gap-2',
  };

  return (
    <span className={cn(baseStyles, variants[variant], sizes[size], className)} {...props}>
      {dot && <span className="w-1.5 h-1.5 rounded-full bg-current" />}
      {children}
    </span>
  );
};

/**
 * Avatar Component
 * @param {Object} props
 * @param {string} props.src - Image source
 * @param {string} props.alt - Image alt text
 * @param {'xs'|'sm'|'md'|'lg'|'xl'|'2xl'} props.size - Avatar size
 * @param {string} props.initials - Fallback initials
 * @param {boolean} props.online - Online status indicator
 * @param {string} props.className - Additional CSS classes
 */
export const Avatar = ({ 
  src,
  alt = '',
  size = 'md',
  initials = '',
  online = false,
  className = '',
  ...props 
}) => {
  const sizes = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
    xl: 'w-16 h-16 text-xl',
    '2xl': 'w-24 h-24 text-3xl',
  };

  return (
    <div className={cn('relative inline-block', className)} {...props}>
      <div className={cn(
        'rounded-full overflow-hidden flex items-center justify-center bg-navy-900 text-white font-bold',
        sizes[size]
      )}>
        {src ? (
          <img src={src} alt={alt} className="w-full h-full object-cover" />
        ) : (
          <span>{initials}</span>
        )}
      </div>
      {online && (
        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
      )}
    </div>
  );
};

/**
 * Modal Component
 * @param {Object} props
 * @param {boolean} props.open - Modal open state
 * @param {Function} props.onClose - Close callback
 * @param {string} props.title - Modal title
 * @param {'sm'|'md'|'lg'|'xl'|'full'} props.size - Modal size
 * @param {React.ReactNode} props.children - Modal content
 * @param {React.ReactNode} props.footer - Modal footer content
 */
export const Modal = ({ 
  open,
  onClose,
  title,
  size = 'md',
  children,
  footer,
  ...props 
}) => {
  if (!open) return null;

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-7xl',
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" {...props}>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className={cn(
          'relative w-full bg-white rounded-3xl shadow-2xl transform transition-all',
          sizes[size]
        )}>
          {/* Header */}
          {title && (
            <div className="px-8 py-6 border-b border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900">
                {title}
              </h3>
            </div>
          )}

          {/* Content */}
          <div className="px-8 py-6">
            {children}
          </div>

          {/* Footer */}
          {footer && (
            <div className="px-8 py-6 border-t border-gray-200 flex justify-end space-x-3">
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/**
 * Tooltip Component
 * @param {Object} props
 * @param {string} props.content - Tooltip content
 * @param {'top'|'bottom'|'left'|'right'} props.placement - Tooltip placement
 * @param {React.ReactNode} props.children - Trigger element
 */
export const Tooltip = ({ content, placement = 'top', children }) => {
  const [show, setShow] = React.useState(false);

  const placements = {
    top: 'bottom-full left-1/2 -translate-x-1/2 -translate-y-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 translate-y-2',
    left: 'right-full top-1/2 -translate-y-1/2 -translate-x-2',
    right: 'left-full top-1/2 -translate-y-1/2 translate-x-2',
  };

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      {show && (
        <div className={cn(
          'absolute z-50 px-3 py-2 text-sm text-white bg-gray-900 rounded-lg shadow-lg whitespace-nowrap',
          placements[placement]
        )}>
          {content}
        </div>
      )}
    </div>
  );
};

/**
 * Spinner Component
 * @param {Object} props
 * @param {'sm'|'md'|'lg'} props.size - Spinner size
 * @param {string} props.className - Additional CSS classes
 */
export const Spinner = ({ size = 'md', className = '' }) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <svg 
      className={cn('animate-spin text-navy-900', sizes[size], className)}
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  );
};

/**
 * Alert Component
 * @param {Object} props
 * @param {'success'|'warning'|'error'|'info'} props.variant - Alert variant
 * @param {string} props.title - Alert title
 * @param {React.ReactNode} props.children - Alert content
 * @param {Function} props.onClose - Close callback
 */
export const Alert = ({ 
  variant = 'info',
  title,
  children,
  onClose,
  className = '',
  ...props 
}) => {
  const variants = {
    success: 'bg-green-50 border-green-200 text-green-900',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-900',
    error: 'bg-red-50 border-red-200 text-red-900',
    info: 'bg-blue-50 border-blue-200 text-blue-900',
  };

  return (
    <div 
      className={cn('p-4 rounded-xl border-2', variants[variant], className)}
      {...props}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          {title && <h4 className="font-bold mb-1">{title}</h4>}
          <div className="text-sm">{children}</div>
        </div>
        {onClose && (
          <button 
            onClick={onClose}
            className="ml-4 text-current hover:opacity-70 transition-opacity"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
};

export default {
  Button,
  Card,
  Input,
  Badge,
  Avatar,
  Modal,
  Tooltip,
  Spinner,
  Alert,
  cn,
};
