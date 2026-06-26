"use client";

import * as React from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";
import { CheckCircle2, Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";

export type ToastVariant = "success" | "info";

export type ToastItem = {
  id: string;
  title: string;
  description?: string;
  variant?: ToastVariant;
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  return <ToastPrimitives.Provider swipeDirection="right">{children}</ToastPrimitives.Provider>;
}

export const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(function ToastViewport({ className, ...props }, ref) {
  return (
    <ToastPrimitives.Viewport
      ref={ref}
      className={cn(
        "fixed top-4 right-4 z-[100] flex max-w-[calc(100vw-2rem)] flex-col gap-3 outline-none sm:max-w-sm",
        className,
      )}
      {...props}
    />
  );
});

export function Toast({
  open,
  onOpenChange,
  item,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: ToastItem;
}) {
  const Icon = item.variant === "success" ? CheckCircle2 : Sparkles;

  return (
    <ToastPrimitives.Root
      open={open}
      onOpenChange={onOpenChange}
      duration={2600}
      className="rounded-2xl border border-white/10 bg-slate-950/95 p-4 shadow-2xl backdrop-blur data-[state=open]:animate-in data-[state=closed]:animate-out"
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5 rounded-full border border-emerald-400/20 bg-emerald-400/10 p-2 text-emerald-300">
          <Icon className="h-4 w-4" />
        </div>
        <div className="space-y-1">
          <ToastPrimitives.Title className="text-sm font-semibold text-white">{item.title}</ToastPrimitives.Title>
          {item.description ? (
            <ToastPrimitives.Description className="text-sm leading-6 text-slate-300">
              {item.description}
            </ToastPrimitives.Description>
          ) : null}
        </div>
      </div>
    </ToastPrimitives.Root>
  );
}
