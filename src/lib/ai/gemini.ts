import { GoogleGenerativeAI } from "@google/generative-ai";

import { getGeminiApiKey } from "@/lib/env";
import { AiProviderError, ConfigError } from "@/lib/ai/errors";
import { buildEmailPrompt, emailSystemInstruction } from "@/lib/ai/prompt";
import type { GenerateEmailInput } from "@/lib/ai/types";

export async function generateGeminiEmail(input: GenerateEmailInput) {
  const apiKey = getGeminiApiKey();

  if (!apiKey) {
    throw new ConfigError("GEMINI_API_KEY is required when USE_MOCK is false.");
  }

  const client = new GoogleGenerativeAI(apiKey);
  const model = client.getGenerativeModel({
    model: "gemini-2.5-flash",
    systemInstruction: emailSystemInstruction,
  });

  let email = "";

  try {
    const result = await model.generateContent(buildEmailPrompt(input));
    email = result.response.text().trim();
  } catch (error) {
    const message = error instanceof Error ? error.message : "Gemini request failed.";

    throw new AiProviderError(message);
  }

  if (!email) {
    throw new AiProviderError("Gemini returned an empty response.");
  }

  return email;
}
