import { ConfigError } from "@/lib/ai/errors";

function readEnv(
  name: "NEXT_PUBLIC_SUPABASE_URL" | "NEXT_PUBLIC_SUPABASE_ANON_KEY" | "GEMINI_API_KEY" | "USE_MOCK",
) {
  const value = process.env[name];

  if (!value) {
    return null;
  }

  const normalized = value.trim();

  if (!normalized) {
    return null;
  }

  return normalized;
}

export function getSupabaseEnv() {
  const url = readEnv("NEXT_PUBLIC_SUPABASE_URL");
  const anonKey = readEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY");

  if (!url || !anonKey) {
    throw new ConfigError("Missing Supabase environment variables.");
  }

  return { url, anonKey };
}

export function getGeminiApiKey() {
  return readEnv("GEMINI_API_KEY");
}

export function getUseMock() {
  const value = readEnv("USE_MOCK");

  if (!value) {
    throw new ConfigError('USE_MOCK must be explicitly set to "true" or "false".');
  }

  const normalized = value.toLowerCase();

  if (normalized === "true") {
    return true;
  }

  if (normalized === "false") {
    return false;
  }

  throw new ConfigError('USE_MOCK must be set to "true" or "false".');
}
