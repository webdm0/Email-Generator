import type { GenerateEmailInput } from "@/lib/ai/types";
import { sleep } from "@/lib/utils";

const openings: Record<GenerateEmailInput["tone"], string> = {
  professional: "I hope you're doing well.",
  friendly: "Hope your day is going great.",
  urgent: "I'm reaching out with an important update that needs prompt attention.",
};

const closings: Record<GenerateEmailInput["tone"], string> = {
  professional: "Please let me know if you would like to discuss this in more detail.",
  friendly: "Let me know what you think. Happy to help however I can.",
  urgent: "Please reply as soon as possible so we can move forward without delay.",
};

const bodyByLength: Record<GenerateEmailInput["length"], string[]> = {
  short: [
    "I'm writing regarding {{topic}}.",
    "I wanted to share the key context and align on the next best step.",
  ],
  medium: [
    "I'm writing regarding {{topic}}.",
    "After reviewing the situation, I believe we have a strong opportunity to move this forward efficiently if we align on priorities now.",
    "A quick response would help us confirm timing, expectations, and any support needed on your side.",
  ],
  long: [
    "I'm writing regarding {{topic}}.",
    "After reviewing the situation in detail, I believe this deserves a clear and coordinated response so that everyone involved understands the context, the expected outcome, and the immediate next step.",
    "There is a strong opportunity here to resolve open questions, improve momentum, and avoid unnecessary back-and-forth if we make a timely decision and communicate it clearly.",
    "If helpful, I can also prepare a more detailed follow-up with supporting points, timelines, or a recommended action plan tailored to the audience.",
  ],
};

export async function generateMockEmail(input: GenerateEmailInput) {
  await sleep(1500);

  const body = bodyByLength[input.length]
    .map((line) => line.replace("{{topic}}", input.topic))
    .join("\n\n");

  return `Subject: ${formatSubject(input.topic)}\n\nHi there,\n\n${openings[input.tone]}\n\n${body}\n\n${closings[input.tone]}\n\nBest regards,\nAI Email Generator`;
}

function formatSubject(topic: string) {
  return topic
    .trim()
    .replace(/\s+/g, " ")
    .replace(/^./, (value) => value.toUpperCase());
}
