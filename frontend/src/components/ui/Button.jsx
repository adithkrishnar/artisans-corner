import React from 'react';
import { motion } from 'framer-motion';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  isLoading = false,
  icon: Icon,
  iconPosition = 'left',
  onClick,
  className = '',
  ...props
}) => {
  const baseStyles = 'font-semibold rounded-[10px] transition-all duration-250 flex items-center justify-center gap-2 cursor-pointer border-none outline-none';
  
  const variants = {
    primary: 'bg-secondary text-white hover:bg-secondary-dark shadow-md hover:shadow-lg hover:-translate-y-0.5',
    secondary: 'bg-transparent text-secondary border-1.5 border-secondary hover:bg-secondary hover:text-white shadow-sm hover:shadow-md',
    ghost: 'bg-cream-dark text-text-secondary border-1.5 border-border hover:bg-beige hover:border-secondary',
    outline: 'bg-transparent text-text-primary border-1.5 border-border hover:bg-secondary/5 hover:border-secondary',
    danger: 'bg-error text-white hover:bg-red-600 shadow-md hover:shadow-lg',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-7 py-2.5 text-sm',
    lg: 'px-9 py-3 text-base',
  };

  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : '';
  const fullWidthStyles = fullWidth ? 'w-full' : '';

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled || isLoading}
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${disabledStyles}
        ${fullWidthStyles}
        ${className}
      `}
      {...props}
    >
      {isLoading ? (
        <>
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          Loading...
        </>
      ) : (
        <>
          {Icon && iconPosition === 'left' && <Icon size={18} />}
          {children}
          {Icon && iconPosition === 'right' && <Icon size={18} />}
        </>
      )}
    </motion.button>
  );
};

export const IconButton = ({ icon: Icon, variant = 'ghost', size = 'md', onClick, disabled = false, className = '', ...props }) => {
  const baseStyles = 'w-11 h-11 flex items-center justify-center rounded-[10px] transition-all duration-200 border-none outline-none cursor-pointer';
  
  const variants = {
    ghost: 'bg-cream-dark text-text-secondary hover:bg-beige hover:text-secondary',
    primary: 'bg-secondary text-white hover:bg-secondary-dark',
    outline: 'bg-transparent text-text-primary border-1.5 border-border hover:border-secondary hover:text-secondary',
  };

  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : '';

  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${disabledStyles}
        ${className}
      `}
      {...props}
    >
      {Icon && <Icon size={20} />}
    </motion.button>
  );
};

export default Button;
