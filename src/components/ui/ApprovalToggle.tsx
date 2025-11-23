import React from 'react';
import { Check, X } from 'lucide-react';

interface ApprovalToggleProps {
  isApproved: boolean;
  onToggle: () => void;
  size?: 'small' | 'medium' | 'large';
}

export function ApprovalToggle({ isApproved, onToggle, size = 'medium' }: ApprovalToggleProps) {
  const sizeClasses = {
    small: 'w-12 h-6',
    medium: 'w-14 h-7',
    large: 'w-16 h-8'
  };

  const iconSizes = {
    small: 'w-3 h-3',
    medium: 'w-4 h-4',
    large: 'w-5 h-5'
  };

  return (
    <button
      onClick={onToggle}
      className={`relative inline-flex items-center ${sizeClasses[size]} rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1b8bcb] ${
        isApproved 
          ? 'bg-green-500 hover:bg-green-600' 
          : 'bg-red-500 hover:bg-red-600'
      }`}
      title={isApproved ? 'Click to reject' : 'Click to approve'}
    >
      <span
        className={`inline-block w-5 h-5 bg-white rounded-full shadow-lg transform transition-transform duration-300 flex items-center justify-center ${
          isApproved ? 'translate-x-7' : 'translate-x-1'
        } ${size === 'large' ? 'w-6 h-6' : size === 'small' ? 'w-4 h-4' : 'w-5 h-5'}`}
      >
        {isApproved ? (
          <Check className={`${iconSizes[size]} text-green-500`} />
        ) : (
          <X className={`${iconSizes[size]} text-red-500`} />
        )}
      </span>
    </button>
  );
}