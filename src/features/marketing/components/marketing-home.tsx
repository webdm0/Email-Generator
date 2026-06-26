"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { FadeIn } from "@/components/motion/fade-in";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const benefits = [
  "Cookie-based Supabase auth for secure App Router sessions",
  "Session-protected AI generation API with explicit mock or Gemini mode",
  "Production-ready modular foundation for billing and saved history",
];

const highlights = [
  {
    title: "Secure by default",
    body: "Protected routes and API handlers verify the Supabase session on the server before returning user data.",
  },
  {
    title: "Fast content workflows",
    body: "A focused dashboard lets users generate polished drafts by topic, tone, and length in a few clicks.",
  },
  {
    title: "Ready to extend",
    body: "Switch between explicit mock mode and live Gemini mode, add Stripe checkout, and persist generations without redesigning the app.",
  },
];

const faqs = [
  {
    question: "How does authentication work?",
    answer: "Auth runs through Supabase with SSR-safe HttpOnly cookies so server-rendered pages can verify sessions securely.",
  },
  {
    question: "Can I use a real AI model later?",
    answer: "Yes. The generation layer is isolated and can run either in explicit mock mode or directly against Gemini, depending on environment configuration.",
  },
  {
    question: "Are generated emails saved?",
    answer: "The data model and API are structured for persistence in Supabase, with the SQL schema included for the MVP.",
  },
];

export function MarketingHome() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <section className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <FadeIn>
          <Badge>AI Email Generator MVP</Badge>
          <h1 className="mt-6 max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Draft sharp, human-sounding emails with secure AI workflows.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
            EmailForge AI helps teams move faster with polished email drafts, protected dashboards, and a backend already
            prepared for live provider and billing integrations.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <motion.div whileTap={{ scale: 0.97 }}>
              <Button asChild className="w-full sm:w-auto">
                <Link href="/register">Start free</Link>
              </Button>
            </motion.div>
            <motion.div whileTap={{ scale: 0.97 }}>
              <Button asChild variant="secondary" className="w-full sm:w-auto">
                <Link href="/pricing">View pricing</Link>
              </Button>
            </motion.div>
          </div>
          <div className="mt-10 grid gap-3 sm:grid-cols-3 sm:items-stretch">
            {benefits.map((benefit, index) => (
              <FadeIn key={benefit} delay={index * 0.08}>
                <motion.div className="h-full" whileHover={{ y: -4 }}>
                  <Card className="flex h-full p-4 text-sm leading-6 text-slate-200">{benefit}</Card>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <motion.div className="h-full" whileHover={{ y: -4 }}>
            <Card className="relative flex h-full overflow-hidden p-6 sm:p-8">
              <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300/80 to-transparent" />
              <div className="grid flex-1 gap-5">
                <div className="rounded-[24px] border border-white/10 bg-slate-950/80 p-5">
                  <p className="text-xs uppercase tracking-[0.22em] text-emerald-300">Prompt Setup</p>
                  <p className="mt-3 text-sm leading-7 text-slate-200">
                    Topic: Renewal follow-up
                    <br />
                    Tone: Professional
                    <br />
                    Length: Medium
                  </p>
                </div>
                <div className="rounded-[24px] border border-emerald-400/20 bg-emerald-400/10 p-5">
                  <p className="text-xs uppercase tracking-[0.22em] text-emerald-200">Generated Output</p>
                  <p className="mt-3 text-sm leading-7 text-slate-100">
                    Subject: Renewal Follow-Up
                    <br />
                    <br />
                    Hi there,
                    <br />
                    <br />
                    I hope you&apos;re doing well. I&apos;m following up regarding your upcoming renewal and wanted to make
                    sure you have everything needed to review the next steps.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </FadeIn>
      </section>

      <section className="mt-24 grid items-stretch gap-6 lg:grid-cols-3">
        {highlights.map((item, index) => (
          <FadeIn key={item.title} delay={index * 0.08}>
            <motion.div className="h-full" whileHover={{ y: -6 }}>
              <Card className="h-full p-6">
                <CardHeader>
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription>{item.body}</CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          </FadeIn>
        ))}
      </section>

      <section className="mt-24">
        <div className="mb-8">
          <Badge>FAQ</Badge>
          <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">Everything needed for the MVP launch</h2>
        </div>
        <div className="grid items-stretch gap-6 lg:grid-cols-3">
          {faqs.map((faq, index) => (
            <FadeIn key={faq.question} delay={index * 0.08}>
              <motion.div className="h-full" whileHover={{ y: -4 }}>
                <Card className="h-full p-6">
                  <CardHeader>
                    <CardTitle className="text-xl">{faq.question}</CardTitle>
                    <CardDescription>{faq.answer}</CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </section>
    </div>
  );
}
