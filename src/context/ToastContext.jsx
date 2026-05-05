// src/context/ToastContext.jsx
import { createContext, useState, useCallback } from 'react';

export const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  const removeToast = (id) => setToasts((prev) => prev.filter((t) => t.id !== id));

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}

      {/* Toast Container */}
      <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`flex items-center gap-3 px-5 py-3 rounded-xl shadow-2xl text-white text-sm font-semibold
              pointer-events-auto animate-slide-in min-w-[260px] max-w-sm
              ${toast.type === 'success' ? 'bg-primary-600' : ''}
              ${toast.type === 'error'   ? 'bg-red-500' : ''}
              ${toast.type === 'info'    ? 'bg-blue-500' : ''}
              ${toast.type === 'wish'    ? 'bg-pink-500' : ''}
            `}
          >
            {/* Icon */}
            <span className="text-lg shrink-0">
              {toast.type === 'success' && '🛒'}
              {toast.type === 'error'   && '❌'}
              {toast.type === 'info'    && 'ℹ️'}
              {toast.type === 'wish'    && '💜'}
            </span>
            <span className="flex-1">{toast.message}</span>
            <button
              onClick={() => removeToast(toast.id)}
              className="ml-2 opacity-70 hover:opacity-100 text-white font-bold text-base"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
