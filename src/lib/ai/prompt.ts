import type { GenerateEmailInput } from "@/lib/ai/types";

export const emailSystemInstruction = [
  "You are an expert business email writer for a product called EmailForge AI.",
  "Generate one complete email based on the provided topic, tone, and requested length.",
  "The input topic may be in English or Russian, and you must respond in the same language as the topic unless the topic clearly requests another language.",
  "Return only the finished email text.",
  "Always include a clear subject line on the first line in the same language as the email.",
  "Do not include explanations, bullet points, JSON, markdown fences, or commentary about your process.",
  "Match the requested tone exactly: professional, friendly, or urgent.",
  "Match the requested length exactly: short means concise, medium means balanced, long means detailed but still readable.",
  "Write natural, polished email copy with a greeting, body, and sign-off.",
].join(" ");

const toneGuidance: Record<GenerateEmailInput["tone"], string> = {
  professional: "Polished, confident, clear, and business-appropriate.",
  friendly: "Warm, approachable, and conversational while staying useful.",
  urgent: "Direct, time-sensitive, and action-oriented without sounding rude.",
};

const lengthGuidance: Record<GenerateEmailInput["length"], string> = {
  short: "Roughly 80-120 words.",
  medium: "Roughly 140-220 words.",
  long: "Roughly 240-360 words.",
};

export function buildEmailPrompt(input: GenerateEmailInput) {
  return [
    "Write a complete email using the instructions below.",
    `Topic: ${input.topic}`,
    `Tone: ${input.tone} (${toneGuidance[input.tone]})`,
    `Length: ${input.length} (${lengthGuidance[input.length]})`,
    "Output requirements:",
    "- Keep the response in the same language as the topic when possible.",
    "- Start with a subject line.",
    "- Include a greeting, focused body, and sign-off.",
    "- Return only the final email.",
  ].join("\n");
}
