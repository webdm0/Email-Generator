"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

import { Toast, ToastProvider, ToastViewport, type ToastItem, type ToastVariant } from "@/components/ui/toast";

type ToastInput = {
  title: string;
  description?: string;
  variant?: ToastVariant;
};

type ToastContextValue = {
  toast: (input: ToastInput) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export function AppToastProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);

  const toast = useCallback((input: ToastInput) => {
    setItems((current) => [
      ...current,
      {
        id: crypto.randomUUID(),
        ...input,
      },
    ]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setItems((current) => current.filter((item) => item.id !== id));
  }, []);

  const value = useMemo(() => ({ toast }), [toast]);

  return (
    <ToastContext.Provider value={value}>
      <ToastProvider>
        {children}
        {items.map((item) => (
          <Toast key={item.id} open onOpenChange={(open) => (!open ? removeToast(item.id) : undefined)} item={item} />
        ))}
        <ToastViewport />
      </ToastProvider>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within AppToastProvider.");
  }

  return context;
}
