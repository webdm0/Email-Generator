"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@/lib/utils";

export function Tabs(props: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return <TabsPrimitive.Root {...props} />;
}

export function TabsList({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      className={cn("inline-grid w-full grid-cols-3 rounded-2xl border border-white/10 bg-white/5 p-1", className)}
      {...props}
    />
  );
}

export function TabsTrigger({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
      <TabsPrimitive.Trigger
        className={cn(
        "relative inline-flex min-h-11 cursor-pointer items-center justify-center rounded-xl px-3 py-2 text-sm font-medium text-slate-300 outline-none transition data-[state=active]:text-slate-950 focus-visible:ring-2 focus-visible:ring-emerald-300",
          className,
        )}
        {...props}
    />
  );
}
