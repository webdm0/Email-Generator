import { NextResponse } from "next/server";

import { createGenerateApiErrorResponse, createGenerateApiSuccessResponse } from "@/lib/ai/api";
import { AiProviderError, ConfigError } from "@/lib/ai/errors";
import { generateEmail } from "@/lib/ai/generate";
import { generateEmailSchema } from "@/lib/ai/schema";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(createGenerateApiErrorResponse("UNAUTHORIZED", "Unauthorized"), { status: 401 });
    }

    let body: unknown;

    try {
      body = await request.json();
    } catch {
      return NextResponse.json(createGenerateApiErrorResponse("INVALID_INPUT", "Request body must be valid JSON."), {
        status: 400,
      });
    }

    const parsed = generateEmailSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        createGenerateApiErrorResponse("INVALID_INPUT", parsed.error.issues[0]?.message ?? "Invalid request payload."),
        { status: 400 },
      );
    }

    const result = await generateEmail(parsed.data);
    const { data, error } = await supabase
      .from("email_generations")
      .insert({
        user_id: user.id,
        topic: parsed.data.topic,
        tone: parsed.data.tone,
        length: parsed.data.length,
        output: result.email,
        provider: result.mode,
      })
      .select("id")
      .single();

    if (error || !data?.id) {
      return NextResponse.json(
        createGenerateApiErrorResponse("PERSISTENCE_ERROR", "Failed to save the generated email."),
        { status: 500 },
      );
    }

    return NextResponse.json(
      createGenerateApiSuccessResponse({
        ...result,
        savedGenerationId: data.id,
      }),
    );
  } catch (error) {
    if (error instanceof ConfigError) {
      return NextResponse.json(createGenerateApiErrorResponse("CONFIG_ERROR", error.message), { status: 500 });
    }

    if (error instanceof AiProviderError) {
      return NextResponse.json(createGenerateApiErrorResponse("AI_PROVIDER_ERROR", error.message), { status: 502 });
    }

    const message = error instanceof Error ? error.message : "Failed to generate email.";

    return NextResponse.json(createGenerateApiErrorResponse("AI_PROVIDER_ERROR", message), { status: 500 });
  }
}
