import { describe, expect, it } from "vitest";

import { generateEmailSchema } from "@/lib/ai/schema";

describe("generateEmailSchema", () => {
  it("accepts a valid payload", () => {
    const result = generateEmailSchema.safeParse({
      topic: "Follow up with design partner",
      tone: "professional",
      length: "medium",
    });

    expect(result.success).toBe(true);
  });

  it("rejects a topic that is too short", () => {
    const result = generateEmailSchema.safeParse({
      topic: "Hi",
      tone: "friendly",
      length: "short",
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.issues[0]?.message).toContain("at least 3 characters");
    }
  });
});
