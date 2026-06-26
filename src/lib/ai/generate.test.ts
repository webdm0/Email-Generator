import { beforeEach, describe, expect, it, vi } from "vitest";

const generateGeminiEmailMock = vi.fn();
const generateMockEmailMock = vi.fn();
const getConfiguredProviderModeMock = vi.fn();

vi.mock("@/lib/ai/gemini", () => ({
  generateGeminiEmail: generateGeminiEmailMock,
}));

vi.mock("@/lib/ai/mock", () => ({
  generateMockEmail: generateMockEmailMock,
}));

vi.mock("@/lib/ai/provider", () => ({
  getConfiguredProviderMode: getConfiguredProviderModeMock,
}));

describe("generateEmail", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns Gemini output when Gemini succeeds", async () => {
    getConfiguredProviderModeMock.mockReturnValue("gemini");
    generateGeminiEmailMock.mockResolvedValue("Gemini email");

    const { generateEmail } = await import("@/lib/ai/generate");
    const result = await generateEmail({
      topic: "Launch update",
      tone: "professional",
      length: "medium",
    });

    expect(result).toEqual({
      email: "Gemini email",
      mode: "gemini",
    });
    expect(generateMockEmailMock).not.toHaveBeenCalled();
  });

  it("throws when Gemini fails in live mode", async () => {
    getConfiguredProviderModeMock.mockReturnValue("gemini");
    generateGeminiEmailMock.mockRejectedValue(new Error("Gemini unavailable"));

    const { generateEmail } = await import("@/lib/ai/generate");
    await expect(
      generateEmail({
        topic: "Launch update",
        tone: "professional",
        length: "medium",
      }),
    ).rejects.toThrow("Gemini unavailable");
    expect(generateMockEmailMock).not.toHaveBeenCalled();
  });

  it("uses mock output when mock mode is enabled", async () => {
    getConfiguredProviderModeMock.mockReturnValue("mock");
    generateMockEmailMock.mockResolvedValue("Mock only");

    const { generateEmail } = await import("@/lib/ai/generate");
    const result = await generateEmail({
      topic: "Launch update",
      tone: "professional",
      length: "medium",
    });

    expect(result).toEqual({
      email: "Mock only",
      mode: "mock",
    });
    expect(generateGeminiEmailMock).not.toHaveBeenCalled();
  });
});
