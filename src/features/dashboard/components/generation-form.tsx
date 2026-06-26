"use client";

import { motion } from "framer-motion";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { EmailLength, EmailTone } from "@/lib/ai/types";

export type GenerationFormValues = {
  topic: string;
  tone: EmailTone;
  length: EmailLength;
};

type GenerationFormProps = {
  error: string;
  isPending: boolean;
  onGenerate: () => void;
  onLengthChange: (value: EmailLength) => void;
  onToneChange: (value: EmailTone) => void;
  onTopicChange: (value: string) => void;
  value: GenerationFormValues;
};

const toneOptions: Array<{ label: string; value: EmailTone }> = [
  { label: "Professional", value: "professional" },
  { label: "Friendly", value: "friendly" },
  { label: "Urgent", value: "urgent" },
];

const lengthOptions: Array<{ label: string; value: EmailLength }> = [
  { label: "Short", value: "short" },
  { label: "Medium", value: "medium" },
  { label: "Long", value: "long" },
];

export function GenerationForm({
  error,
  isPending,
  onGenerate,
  onLengthChange,
  onToneChange,
  onTopicChange,
  value,
}: GenerationFormProps) {
  return (
    <Card className="flex h-full flex-col p-6 sm:p-8">
      <CardHeader>
        <Badge>Generator</Badge>
        <CardTitle>Create a polished email in seconds</CardTitle>
        <CardDescription>
          Pick the topic, tone, and length. Choose your options below to compose a high-quality draft tailored to your needs.
        </CardDescription>
      </CardHeader>
      <CardContent className="mt-6 flex flex-1 flex-col space-y-6">
        <div className="space-y-2">
          <Label htmlFor="topic">Topic</Label>
          <Input
            id="topic"
            value={value.topic}
            onChange={(event) => onTopicChange(event.target.value)}
            placeholder="Quarterly client follow-up"
          />
        </div>
        <div className="grid gap-5">
          <div className="space-y-3">
            <Label>Tone</Label>
            <Tabs value={value.tone} onValueChange={(nextValue) => onToneChange(nextValue as EmailTone)}>
              <TabsList>
                {toneOptions.map((option) => (
                  <TabsTrigger key={option.value} value={option.value}>
                    {value.tone === option.value ? (
                      <motion.span
                        layoutId="tone-indicator"
                        className="absolute inset-0 rounded-xl bg-emerald-300"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.45 }}
                      />
                    ) : null}
                    <span className="relative z-10">{option.label}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
          <div className="space-y-3">
            <Label>Length</Label>
            <Tabs value={value.length} onValueChange={(nextValue) => onLengthChange(nextValue as EmailLength)}>
              <TabsList>
                {lengthOptions.map((option) => (
                  <TabsTrigger key={option.value} value={option.value}>
                    {value.length === option.value ? (
                      <motion.span
                        layoutId="length-indicator"
                        className="absolute inset-0 rounded-xl bg-emerald-300"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.45 }}
                      />
                    ) : null}
                    <span className="relative z-10">{option.label}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </div>
        <div className="flex-1" />
        {error ? <p className="text-sm text-rose-300">{error}</p> : null}
        <motion.div whileTap={{ scale: 0.98 }}>
          <Button className="w-full sm:w-auto" onClick={onGenerate} disabled={isPending || value.topic.trim().length < 3}>
            {isPending ? "Generating..." : "Generate"}
          </Button>
        </motion.div>
      </CardContent>
    </Card>
  );
}
