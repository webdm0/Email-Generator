import { getGeminiApiKey, getUseMock } from "@/lib/env";
import { ConfigError } from "@/lib/ai/errors";
import type { ProviderMode } from "@/lib/ai/types";

export function resolveProviderMode(useMock: boolean): ProviderMode {
  return useMock ? "mock" : "gemini";
}

export function getConfiguredProviderMode(): ProviderMode {
  const useMock = getUseMock();

  if (!useMock && !getGeminiApiKey()) {
    throw new ConfigError("GEMINI_API_KEY is required when USE_MOCK is false.");
  }

  return resolveProviderMode(useMock);
}
