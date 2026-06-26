import type { EmailLength, EmailTone, ProviderMode } from "@/lib/ai/types";

export type EmailGenerationRecord = {
  id: string;
  user_id: string;
  topic: string;
  tone: EmailTone;
  length: EmailLength;
  output: string;
  provider: ProviderMode;
  created_at: string;
  updated_at: string;
};
