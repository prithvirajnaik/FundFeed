import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function EmptyState({
    icon: Icon,
    title,
    message,
    actionLabel,
    actionPath,
    onAction
}) {
    const navigate = useNavigate();

    const handleAction = () => {
        if (onAction) {
            onAction();
        } else if (actionPath) {
            navigate(actionPath);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
            {Icon && (
                <div className="mb-4 text-gray-300">
                    <Icon size={64} strokeWidth={1.5} />
                </div>
            )}

            <h3 className="text-xl font-semibold text-gray-700 mb-2">
                {title}
            </h3>

            <p className="text-gray-500 max-w-md mb-6">
                {message}
            </p>

            {actionLabel && (
                <button
                    onClick={handleAction}
                    className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition"
                >
                    {actionLabel}
                </button>
            )}
        </div>
    );
}
