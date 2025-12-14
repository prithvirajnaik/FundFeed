import React from 'react';

export default function LoadingSpinner({ size = 'md', color = 'primary', centered = false }) {
    const sizeClasses = {
        sm: 'w-4 h-4 border-2',
        md: 'w-8 h-8 border-3',
        lg: 'w-12 h-12 border-4'
    };

    const colorClasses = {
        primary: 'border-primary border-t-transparent',
        white: 'border-white border-t-transparent',
        gray: 'border-gray-400 border-t-transparent'
    };

    const spinnerClasses = `
    ${sizeClasses[size]}
    ${colorClasses[color]}
    rounded-full
    animate-spin
  `;

    if (centered) {
        return (
            <div className="flex justify-center items-center w-full h-full min-h-[200px]">
                <div className={spinnerClasses}></div>
            </div>
        );
    }

    return <div className={spinnerClasses}></div>;
}
