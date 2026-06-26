import { beforeEach, describe, expect, it, vi } from "vitest";

import { AiProviderError } from "@/lib/ai/errors";

const getUserMock = vi.fn();
const fromMock = vi.fn();
const generateEmailMock = vi.fn();
const createClientMock = vi.fn();

vi.mock("@/lib/ai/generate", () => ({
  generateEmail: generateEmailMock,
}));

vi.mock("@/lib/supabase/server", () => ({
  createClient: createClientMock,
}));

function mockSupabaseInsert(result: { data: { id: string } | null; error: { message: string } | null }) {
  const singleMock = vi.fn().mockResolvedValue(result);
  const selectMock = vi.fn().mockReturnValue({ single: singleMock });
  const insertMock = vi.fn().mockReturnValue({ select: selectMock });

  fromMock.mockReturnValue({ insert: insertMock });

  return { insertMock, selectMock, singleMock };
}

describe("POST /api/generate", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    createClientMock.mockResolvedValue({
      auth: {
        getUser: getUserMock,
      },
      from: fromMock,
    });
  });

  it("returns INVALID_INPUT for invalid payloads", async () => {
    getUserMock.mockResolvedValue({ data: { user: { id: "user-1" } } });

    const { POST } = await import("@/app/api/generate/route");
    const response = await POST(
      new Request("http://localhost/api/generate", {
        method: "POST",
        body: JSON.stringify({ topic: "Hi", tone: "professional", length: "medium" }),
        headers: { "Content-Type": "application/json" },
      }),
    );

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({
      ok: false,
      error: {
        code: "INVALID_INPUT",
        message: "Topic must be at least 3 characters.",
      },
    });
    expect(generateEmailMock).not.toHaveBeenCalled();
  });

  it("returns UNAUTHORIZED when there is no active user", async () => {
    getUserMock.mockResolvedValue({ data: { user: null } });

    const { POST } = await import("@/app/api/generate/route");
    const response = await POST(
      new Request("http://localhost/api/generate", {
        method: "POST",
        body: JSON.stringify({ topic: "Launch update", tone: "professional", length: "medium" }),
        headers: { "Content-Type": "application/json" },
      }),
    );

    expect(response.status).toBe(401);
    await expect(response.json()).resolves.toEqual({
      ok: false,
      error: {
        code: "UNAUTHORIZED",
        message: "Unauthorized",
      },
    });
  });

  it("returns AI_PROVIDER_ERROR when Gemini generation fails", async () => {
    getUserMock.mockResolvedValue({ data: { user: { id: "user-1" } } });
    generateEmailMock.mockRejectedValue(new AiProviderError("Gemini unavailable"));

    const { POST } = await import("@/app/api/generate/route");
    const response = await POST(
      new Request("http://localhost/api/generate", {
        method: "POST",
        body: JSON.stringify({ topic: "Launch update", tone: "professional", length: "medium" }),
        headers: { "Content-Type": "application/json" },
      }),
    );

    expect(response.status).toBe(502);
    await expect(response.json()).resolves.toEqual({
      ok: false,
      error: {
        code: "AI_PROVIDER_ERROR",
        message: "Gemini unavailable",
      },
    });
    expect(fromMock).not.toHaveBeenCalled();
  });

  it("returns PERSISTENCE_ERROR when saving the generation fails", async () => {
    getUserMock.mockResolvedValue({ data: { user: { id: "user-1" } } });
    generateEmailMock.mockResolvedValue({
      email: "Subject: Launch update",
      mode: "gemini",
    });
    mockSupabaseInsert({
      data: null,
      error: { message: "insert failed" },
    });

    const { POST } = await import("@/app/api/generate/route");
    const response = await POST(
      new Request("http://localhost/api/generate", {
        method: "POST",
        body: JSON.stringify({ topic: "Launch update", tone: "professional", length: "medium" }),
        headers: { "Content-Type": "application/json" },
      }),
    );

    expect(response.status).toBe(500);
    await expect(response.json()).resolves.toEqual({
      ok: false,
      error: {
        code: "PERSISTENCE_ERROR",
        message: "Failed to save the generated email.",
      },
    });
  });
});
