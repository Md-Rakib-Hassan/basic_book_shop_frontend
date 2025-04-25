import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className = '', ...props }, ref) => {
    const baseInputClasses = 'w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2';
    const stateClasses = error
      ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
      : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200';
    
    const inputClasses = `${baseInputClasses} ${stateClasses} ${className}`;
    
    return (
      <div className="mb-4">
        {label && (
          <label className="block mb-2 text-sm font-medium text-gray-900">{label}</label>
        )}
        <input ref={ref} className={inputClasses} {...props} />
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        {!error && helperText && <p className="mt-1 text-sm text-gray-500">{helperText}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;