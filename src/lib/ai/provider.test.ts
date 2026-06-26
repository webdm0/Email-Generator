import { afterEach, describe, expect, it, vi } from "vitest";

import { resolveProviderMode } from "@/lib/ai/provider";

const originalEnv = { ...process.env };

afterEach(() => {
  process.env = { ...originalEnv };
  vi.resetModules();
});

describe("resolveProviderMode", () => {
  it("returns mock when USE_MOCK is true", () => {
    expect(resolveProviderMode(true)).toBe("mock");
  });

  it("returns gemini when USE_MOCK is false", () => {
    expect(resolveProviderMode(false)).toBe("gemini");
  });
});

describe("getConfiguredProviderMode", () => {
  it("throws when USE_MOCK is missing", async () => {
    delete process.env.USE_MOCK;

    const { getConfiguredProviderMode } = await import("@/lib/ai/provider");

    expect(() => getConfiguredProviderMode()).toThrow('USE_MOCK must be explicitly set to "true" or "false".');
  });

  it("throws when USE_MOCK is invalid", async () => {
    process.env.USE_MOCK = "sometimes";

    const { getConfiguredProviderMode } = await import("@/lib/ai/provider");

    expect(() => getConfiguredProviderMode()).toThrow('USE_MOCK must be set to "true" or "false".');
  });

  it("throws when live mode has no Gemini key", async () => {
    process.env.USE_MOCK = "false";
    delete process.env.GEMINI_API_KEY;

    const { getConfiguredProviderMode } = await import("@/lib/ai/provider");

    expect(() => getConfiguredProviderMode()).toThrow('GEMINI_API_KEY is required when USE_MOCK is false.');
  });

  it("returns mock in explicit mock mode", async () => {
    process.env.USE_MOCK = "true";
    delete process.env.GEMINI_API_KEY;

    const { getConfiguredProviderMode } = await import("@/lib/ai/provider");

    expect(getConfiguredProviderMode()).toBe("mock");
  });
});
