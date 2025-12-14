// Toast notification configuration
import toast from 'react-hot-toast';

// Success toast
export const showSuccess = (message) => {
    toast.success(message, {
        duration: 4000,
        position: 'top-right',
        style: {
            background: '#10B981',
            color: '#fff',
            padding: '16px',
            borderRadius: '8px',
        },
        iconTheme: {
            primary: '#fff',
            secondary: '#10B981',
        },
    });
};

// Error toast
export const showError = (message) => {
    toast.error(message, {
        duration: 5000,
        position: 'top-right',
        style: {
            background: '#EF4444',
            color: '#fff',
            padding: '16px',
            borderRadius: '8px',
        },
        iconTheme: {
            primary: '#fff',
            secondary: '#EF4444',
        },
    });
};

// Info toast
export const showInfo = (message) => {
    toast(message, {
        duration: 4000,
        position: 'top-right',
        icon: 'ℹ️',
        style: {
            background: '#3B82F6',
            color: '#fff',
            padding: '16px',
            borderRadius: '8px',
        },
    });
};

// Loading toast
export const showLoading = (message) => {
    return toast.loading(message, {
        position: 'top-right',
        style: {
            background: '#6B7280',
            color: '#fff',
            padding: '16px',
            borderRadius: '8px',
        },
    });
};

// Dismiss toast
export const dismissToast = (toastId) => {
    toast.dismiss(toastId);
};

// Promise toast (for async operations)
export const showPromise = (promise, messages) => {
    return toast.promise(
        promise,
        {
            loading: messages.loading || 'Loading...',
            success: messages.success || 'Success!',
            error: messages.error || 'Something went wrong',
        },
        {
            position: 'top-right',
            style: {
                padding: '16px',
                borderRadius: '8px',
            },
        }
    );
};
