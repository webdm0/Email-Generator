import { describe, expect, it } from "vitest";

import { createGenerateApiErrorResponse, createGenerateApiSuccessResponse, parseGenerateApiResponse } from "@/lib/ai/api";

describe("parseGenerateApiResponse", () => {
  it("accepts a valid success response", () => {
    const response = createGenerateApiSuccessResponse({
      email: "Subject: Launch update",
      mode: "gemini",
      savedGenerationId: "550e8400-e29b-41d4-a716-446655440000",
    });

    expect(parseGenerateApiResponse(response)).toEqual(response);
  });

  it("accepts a valid error response", () => {
    const response = createGenerateApiErrorResponse("INVALID_INPUT", "Topic must be at least 3 characters.");

    expect(parseGenerateApiResponse(response)).toEqual(response);
  });

  it("rejects malformed response shapes", () => {
    expect(parseGenerateApiResponse({ ok: true, email: "missing data wrapper" })).toBeNull();
    expect(parseGenerateApiResponse({ ok: false, error: { code: "NOPE", message: "bad" } })).toBeNull();
  });
});
