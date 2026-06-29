"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { motion } from "framer-motion";

import {
  GenerationForm,
  type GenerationFormValues,
} from "@/features/dashboard/components/generation-form";
import { GenerationResult } from "@/features/dashboard/components/generation-result";
import { useToast } from "@/components/providers/toast-provider";
import { parseGenerateApiResponse } from "@/lib/ai/api";
import { generateEmailSchema } from "@/lib/ai/schema";
import type { GenerateApiResponse, GenerateEmailResult } from "@/lib/ai/types";

const initialFormState: GenerationFormValues = {
  topic: "",
  tone: "professional",
  length: "medium",
};

export async function parseGenerateResponse(response: Response): Promise<GenerateApiResponse | null> {
  const raw = await response.text();

  if (!raw) {
    return null;
  }

  try {
    return parseGenerateApiResponse(JSON.parse(raw));
  } catch {
    return null;
  }
}

export function GenerationWorkspace() {
  const { toast } = useToast();
  const [form, setForm] = useState<GenerationFormValues>(initialFormState);
  const [result, setResult] = useState<GenerateEmailResult | null>(null);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();
  const [resultMinHeight, setResultMinHeight] = useState<number | null>(null);
  const formColumnRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = formColumnRef.current;

    if (!node) {
      return;
    }

    const updateHeight = () => {
      setResultMinHeight(node.getBoundingClientRect().height);
    };

    updateHeight();

    const observer = new ResizeObserver(updateHeight);
    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  function handleGenerate() {
    const parsed = generateEmailSchema.safeParse(form);

    if (!parsed.success) {
      setResult(null);
      setError(parsed.error.issues[0]?.message ?? "Please fill out the form correctly.");
      return;
    }

    setError("");

    startTransition(async () => {
      try {
        const response = await fetch("/api/generate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        });

        const data = await parseGenerateResponse(response);

        if (!response.ok) {
          setResult(null);
          setError(!data || data.ok ? "Failed to generate email." : data.error.message);
          return;
        }

        if (!data || !data.ok) {
          setResult(null);
          setError("Unexpected response from the generation API.");
          return;
        }

        setResult(data.data);
        toast({
          title: "Email generated",
          description:
            data.data.mode === "gemini"
              ? "Fresh copy arrived from Gemini."
              : "Mock generation completed in explicit mock mode.",
          variant: "success",
        });
      } catch {
        setResult(null);
        setError("Unable to reach the generation API.");
      }
    });
  }

  return (
    <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
      <motion.div
        ref={formColumnRef}
        initial={{ opacity: 0, x: -18 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.45 }}
      >
        <GenerationForm
          error={error}
          isPending={isPending}
          onGenerate={handleGenerate}
          onLengthChange={(length) => setForm((current) => ({ ...current, length }))}
          onToneChange={(tone) => setForm((current) => ({ ...current, tone }))}
          onTopicChange={(topic) => setForm((current) => ({ ...current, topic }))}
          value={form}
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 18 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.45, delay: 0.05 }}
      >
        <GenerationResult isPending={isPending} minHeight={resultMinHeight} result={result} />
      </motion.div>
    </div>
  );
}
