import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { ProviderMode } from "@/lib/ai/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export function formatRelativeProviderLabel(mode?: ProviderMode | null) {
  if (!mode) {
    return "Awaiting generation";
  }

  return mode === "gemini" ? "Gemini Live" : "Mock Mode";
}
