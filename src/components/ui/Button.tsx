import React from 'react';
import { motion } from 'framer-motion';
import Spinner from './Spinner';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  icon,
  className = '',
  ...props
}) => {
  const baseClasses = 'font-medium rounded-lg inline-flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantClasses = {
    primary: 'bg-primary hover:bg-blue-900 text-white focus:ring-blue-600',
    secondary: 'bg-amber-500 hover:bg-amber-600 text-white focus:ring-amber-400',
    outline: 'bg-transparent border-2 border-blue-800 text-blue-800 hover:bg-blue-50 focus:ring-blue-600',
    danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500'
  };
  
  const sizeClasses = {
    sm: 'text-sm px-3 py-1.5',
    md: 'text-base px-4 py-2',
    lg: 'text-lg px-6 py-3'
  };
  
  const disabledClasses = 'opacity-50 cursor-not-allowed';
  
  const buttonClasses = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${props.disabled || isLoading ? disabledClasses : ''}
    ${className}
  `;

  return (
    <motion.button
      className={buttonClasses}
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.02 }}
      disabled={props.disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <Spinner size="sm" color="white" />
          <span className="ml-2">{children}</span>
        </>
      ) : (
        <>
          {icon && <span className="mr-2">{icon}</span>}
          {children}
        </>
      )}
    </motion.button>
  );
};

export default Button;