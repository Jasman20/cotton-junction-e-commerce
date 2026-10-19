"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";

type ToastType = "success" | "error" | "info";

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: ToastType = "info") => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed top-4 right-4 left-4 z-50 flex flex-col items-center gap-2 pointer-events-none sm:left-auto sm:w-96">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            role="status"
            aria-live="polite"
            className={cn(
              "pointer-events-auto flex w-full items-center justify-between rounded-xl p-4 shadow-elevated transition-all duration-300 animate-in slide-in-from-top-4",
              toast.type === "success" && "bg-forest-800 text-white",
              toast.type === "error" && "bg-red-800 text-white",
              toast.type === "info" && "bg-charcoal-900 text-white"
            )}
          >
            <div className="flex items-center gap-3">
              {toast.type === "success" && <CheckCircle2 className="h-5 w-5 shrink-0 text-amber-400" />}
              {toast.type === "error" && <AlertCircle className="h-5 w-5 shrink-0 text-red-200" />}
              {toast.type === "info" && <Info className="h-5 w-5 shrink-0 text-amber-400" />}
              <span className="text-[15px] font-medium leading-snug">{toast.message}</span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="ml-3 p-1 rounded-full hover:bg-white/20 focus:outline-none"
              aria-label="Dismiss toast"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
