import { z } from "zod";

export const generateEmailSchema = z.object({
  topic: z.string().trim().min(3, "Topic must be at least 3 characters.").max(180, "Topic is too long."),
  tone: z.enum(["professional", "friendly", "urgent"]),
  length: z.enum(["short", "medium", "long"]),
});

export const generateApiErrorCodeSchema = z.enum([
  "UNAUTHORIZED",
  "INVALID_INPUT",
  "AI_PROVIDER_ERROR",
  "PERSISTENCE_ERROR",
  "CONFIG_ERROR",
]);

export const generateEmailResultSchema = z.object({
  email: z.string().min(1, "Generated email cannot be empty."),
  mode: z.enum(["mock", "gemini"]),
  savedGenerationId: z.uuid("Saved generation id must be a valid UUID."),
});

export const generateApiSuccessResponseSchema = z.object({
  ok: z.literal(true),
  data: generateEmailResultSchema,
});

export const generateApiErrorResponseSchema = z.object({
  ok: z.literal(false),
  error: z.object({
    code: generateApiErrorCodeSchema,
    message: z.string().min(1, "Error message is required."),
  }),
});

export const generateApiResponseSchema = z.union([generateApiSuccessResponseSchema, generateApiErrorResponseSchema]);
