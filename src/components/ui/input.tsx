import * as React from "react";

import { cn } from "@/lib/utils";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  function Input({ className, ...props }, ref) {
    return (
      <input
        ref={ref}
        className={cn(
          "flex h-12 w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 text-sm text-white shadow-inner shadow-black/20 outline-none transition placeholder:text-slate-500 focus:border-emerald-400/70 focus:ring-4 focus:ring-emerald-400/10 disabled:cursor-not-allowed disabled:opacity-70",
          className,
        )}
        {...props}
      />
    );
  },
);
