import { generateApiResponseSchema } from "@/lib/ai/schema";
import type {
  GenerateApiErrorCode,
  GenerateApiErrorResponse,
  GenerateApiResponse,
  GenerateApiSuccessResponse,
  GenerateEmailResult,
} from "@/lib/ai/types";

export function createGenerateApiSuccessResponse(data: GenerateEmailResult): GenerateApiSuccessResponse {
  return {
    ok: true,
    data,
  };
}

export function createGenerateApiErrorResponse(
  code: GenerateApiErrorCode,
  message: string,
): GenerateApiErrorResponse {
  return {
    ok: false,
    error: {
      code,
      message,
    },
  };
}

export function parseGenerateApiResponse(value: unknown): GenerateApiResponse | null {
  const parsed = generateApiResponseSchema.safeParse(value);

  if (!parsed.success) {
    return null;
  }

  return parsed.data;
}
