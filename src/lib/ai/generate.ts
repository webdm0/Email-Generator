import { getConfiguredProviderMode } from "@/lib/ai/provider";
import { generateMockEmail } from "@/lib/ai/mock";
import { generateGeminiEmail } from "@/lib/ai/gemini";
import type { GenerateEmailDraft, GenerateEmailInput } from "@/lib/ai/types";

export async function generateEmail(input: GenerateEmailInput): Promise<GenerateEmailDraft> {
  if (getConfiguredProviderMode() === "gemini") {
    const geminiEmail = await generateGeminiEmail(input);

    return {
      email: geminiEmail,
      mode: "gemini",
    };
  }

  const email = await generateMockEmail(input);

  return {
    email,
    mode: "mock",
  };
}
