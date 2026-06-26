import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
  variant?: "primary" | "secondary" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
};

const variantClasses: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "bg-emerald-400 text-slate-950 shadow-[0_16px_35px_rgba(52,211,153,0.28)] hover:bg-emerald-300 disabled:bg-emerald-400/60",
  secondary:
    "border border-white/15 bg-white/5 text-white hover:border-emerald-400/40 hover:bg-emerald-400/10",
  ghost: "bg-transparent text-white hover:bg-white/10",
};

const sizeClasses: Record<NonNullable<ButtonProps["size"]>, string> = {
  default: "min-h-11 px-5 py-2.5 text-sm",
  sm: "min-h-9 px-4 py-2 text-xs",
  lg: "min-h-12 px-6 py-3 text-sm",
  icon: "h-11 w-11",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { asChild = false, className, size = "default", variant = "primary", type = "button", ...props },
  ref,
) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      ref={ref}
      type={type}
      className={cn(
        "inline-flex cursor-pointer items-center justify-center gap-2 rounded-full font-semibold transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 disabled:cursor-not-allowed disabled:opacity-70 active:scale-[0.98]",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    />
  );
});
