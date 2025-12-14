import React from 'react';
import LoadingSpinner from './LoadingSpinner';

export default function LoadingButton({
    children,
    loading = false,
    disabled = false,
    className = '',
    onClick,
    type = 'button',
    ...props
}) {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={loading || disabled}
            className={`
        ${className}
        ${loading || disabled ? 'opacity-70 cursor-not-allowed' : ''}
        relative
      `}
            {...props}
        >
            {loading ? (
                <span className="flex items-center justify-center gap-2">
                    <LoadingSpinner size="sm" color="white" />
                    <span>{typeof children === 'string' ? children : 'Loading...'}</span>
                </span>
            ) : (
                children
            )}
        </button>
    );
}
