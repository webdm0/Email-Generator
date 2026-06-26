export type EmailTone = "professional" | "friendly" | "urgent";
export type EmailLength = "short" | "medium" | "long";
export type ProviderMode = "mock" | "gemini";
export type GenerateApiErrorCode =
  | "UNAUTHORIZED"
  | "INVALID_INPUT"
  | "AI_PROVIDER_ERROR"
  | "PERSISTENCE_ERROR"
  | "CONFIG_ERROR";

export type GenerateEmailInput = {
  topic: string;
  tone: EmailTone;
  length: EmailLength;
};

export type GenerateEmailDraft = {
  email: string;
  mode: ProviderMode;
};

export type GenerateEmailResult = GenerateEmailDraft & {
  savedGenerationId: string;
};

export type GenerateApiSuccessResponse = {
  ok: true;
  data: GenerateEmailResult;
};

export type GenerateApiErrorResponse = {
  ok: false;
  error: {
    code: GenerateApiErrorCode;
    message: string;
  };
};

export type GenerateApiResponse = GenerateApiSuccessResponse | GenerateApiErrorResponse;
