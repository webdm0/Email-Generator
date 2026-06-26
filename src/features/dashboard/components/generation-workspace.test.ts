import { describe, expect, it } from "vitest";

import { parseGenerateResponse } from "@/features/dashboard/components/generation-workspace";

describe("parseGenerateResponse", () => {
  it("returns null for malformed JSON", async () => {
    const response = new Response("{not-json");

    await expect(parseGenerateResponse(response)).resolves.toBeNull();
  });

  it("returns null for JSON that does not match the API contract", async () => {
    const response = new Response(JSON.stringify({ email: "missing wrapper" }));

    await expect(parseGenerateResponse(response)).resolves.toBeNull();
  });

  it("parses valid success responses", async () => {
    const response = new Response(
      JSON.stringify({
        ok: true,
        data: {
          email: "Subject: Hello",
          mode: "mock",
          savedGenerationId: "550e8400-e29b-41d4-a716-446655440000",
        },
      }),
    );

    await expect(parseGenerateResponse(response)).resolves.toEqual({
      ok: true,
      data: {
        email: "Subject: Hello",
        mode: "mock",
        savedGenerationId: "550e8400-e29b-41d4-a716-446655440000",
      },
    });
  });
});
