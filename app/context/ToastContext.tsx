"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

interface ToastState {
  id: number;
  message: string;
}

interface ToastContextValue {
  showToast: (message: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastState[]>([]);

  const showToast = useCallback((message: string) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div
        aria-live="polite"
        className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[200] flex flex-col items-center gap-2 pointer-events-none"
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            className="rounded-full bg-gray-900 dark:bg-gray-100 px-4 py-2.5 text-[13px] font-semibold text-white dark:text-gray-900 shadow-xl shadow-black/20 transition-all duration-300 animate-in fade-in slide-in-from-bottom-2"
          >
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
};
