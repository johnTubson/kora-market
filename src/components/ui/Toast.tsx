"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { cn } from "@/lib/cn";

export type ToastVariant = "primary" | "secondary" | "ghost" | "destructive";

export type ToastItem = {
  id: string;
  title: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
};

type ToastContextValue = {
  toasts: ToastItem[];
  showToast: (toast: Omit<ToastItem, "id">) => void;
  dismissToast: (id: string) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

const variantStyles: Record<ToastVariant, string> = {
  primary: "border-primary/30 bg-primary text-primary-foreground",
  secondary:
    "border-secondary-foreground/20 bg-secondary text-secondary-foreground",
  ghost: "border-border bg-background text-foreground",
  destructive:
    "border-destructive/30 bg-destructive text-destructive-foreground",
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const dismissToast = useCallback((id: string) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback(
    (toast: Omit<ToastItem, "id">) => {
      const id = crypto.randomUUID();
      const duration = toast.duration ?? 4000;

      setToasts((current) => [...current, { ...toast, id }]);

      if (duration > 0) {
        window.setTimeout(() => dismissToast(id), duration);
      }
    },
    [dismissToast]
  );

  const value = useMemo(
    () => ({ toasts, showToast, dismissToast }),
    [toasts, showToast, dismissToast]
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastViewport toasts={toasts} onDismiss={dismissToast} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
}

type ToastViewportProps = {
  toasts: ToastItem[];
  onDismiss: (id: string) => void;
};

function ToastViewport({ toasts, onDismiss }: ToastViewportProps) {
  return (
    <div
      aria-live="polite"
      aria-relevant="additions"
      className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex flex-col items-center gap-2 p-4 sm:items-end"
    >
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  );
}

type ToastProps = {
  toast: ToastItem;
  onDismiss: (id: string) => void;
};

function Toast({ toast, onDismiss }: ToastProps) {
  const variant = toast.variant ?? "primary";

  return (
    <div
      role="status"
      className={cn(
        "focus-ring pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-lg border p-4 shadow-md",
        variantStyles[variant]
      )}
    >
      <div className="flex-1">
        <p className="text-sm font-semibold">{toast.title}</p>
        {toast.description ? (
          <p className="mt-1 text-sm opacity-90">{toast.description}</p>
        ) : null}
      </div>
      <button
        type="button"
        onClick={() => onDismiss(toast.id)}
        className="focus-ring min-h-touch min-w-touch shrink-0 rounded-md px-2 text-sm opacity-80 hover:opacity-100"
        aria-label={`Dismiss ${toast.title}`}
      >
        ✕
      </button>
    </div>
  );
}
