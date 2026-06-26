"use client";

import { Button } from "@/components/ui/button";

type ErrorFallbackProps = {
  error?: Error & { digest?: string };
  reset?: () => void;
  fullScreen?: boolean;
};

export function ErrorFallback({ error, reset, fullScreen = false }: ErrorFallbackProps) {
  return (
    <div
      className={[
        "flex items-center justify-center px-6 py-16",
        fullScreen ? "min-h-screen bg-slate-950 text-white" : "min-h-[60vh]",
      ].join(" ")}
    >
      <div className="max-w-xl rounded-[28px] border border-white/10 bg-white/5 p-8 text-center text-white shadow-2xl backdrop-blur">
        <p className="text-sm uppercase tracking-[0.25em] text-emerald-300">Something went wrong</p>
        <h1 className="mt-4 text-3xl font-semibold">We hit an unexpected issue.</h1>
        <p className="mt-3 text-sm text-slate-300">
          {error?.message ?? "The page crashed unexpectedly. Please try again."}
        </p>
        {reset ? (
          <Button className="mt-6" onClick={reset}>
            Try again
          </Button>
        ) : null}
      </div>
    </div>
  );
}
