import React from 'react';

export default function FormField({
    label,
    name,
    type = 'text',
    value,
    onChange,
    error,
    required = false,
    placeholder,
    helpText,
    as = 'input',
    rows = 3,
    ...props
}) {
    const inputClasses = `
    w-full px-4 py-2 rounded-lg border
    ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-primary'}
    focus:outline-none focus:ring-2
    transition
  `;

    const Component = as;

    return (
        <div className="mb-4">
            {label && (
                <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}

            <Component
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={inputClasses}
                rows={as === 'textarea' ? rows : undefined}
                aria-invalid={error ? 'true' : 'false'}
                aria-describedby={error ? `${name}-error` : helpText ? `${name}-help` : undefined}
                {...props}
            />

            {error && (
                <p id={`${name}-error`} className="mt-1 text-sm text-red-600">
                    {error}
                </p>
            )}

            {!error && helpText && (
                <p id={`${name}-help`} className="mt-1 text-sm text-gray-500">
                    {helpText}
                </p>
            )}
        </div>
    );
}
