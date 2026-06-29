"use client";

import { AnimatePresence, motion } from "framer-motion";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GenerationSkeleton } from "@/features/dashboard/components/generation-skeleton";
import type { GenerateEmailResult } from "@/lib/ai/types";
import { formatRelativeProviderLabel } from "@/lib/utils";

type GenerationResultProps = {
  isPending: boolean;
  minHeight: number | null;
  result: GenerateEmailResult | null;
};

export function GenerationResult({ isPending, minHeight, result }: GenerationResultProps) {
  return (
    <Card className="flex flex-col p-6 sm:p-8" style={minHeight ? { minHeight } : undefined}>
      <CardHeader className="flex-row items-start justify-between gap-4">
        <div>
          <Badge className="mb-3">{formatRelativeProviderLabel(result?.mode)}</Badge>
          <CardTitle>Generated email</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="mt-6 flex flex-1 rounded-[24px] border border-white/10 bg-slate-950/80 p-5">
        <AnimatePresence mode="wait">
          {isPending ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="w-full"
            >
              <GenerationSkeleton />
            </motion.div>
          ) : result ? (
            <motion.pre
              key="result"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="w-full overflow-x-auto whitespace-pre-wrap break-words text-sm leading-7 text-slate-200"
            >
              {result.email}
            </motion.pre>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="flex min-h-[280px] w-full items-center justify-center text-center text-sm text-slate-400"
            >
              Your generated email will appear here once you run a prompt.
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
