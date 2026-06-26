"use client";

import type { Route } from "next";
import Link from "next/link";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

import { useToast } from "@/components/providers/toast-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type FreePlan = {
  name: string;
  price: string;
  description: string;
  features: string[];
  cta: string;
  href: Route;
  featured?: false;
};

type ProPlan = {
  name: string;
  price: string;
  description: string;
  features: string[];
  cta: string;
  href: string;
  featured: true;
};

const plans: Array<FreePlan | ProPlan> = [
  {
    name: "Free",
    price: "$0",
    description: "For trying the workflow and validating the MVP.",
    features: ["Basic dashboard access", "Limited Mock / Gemini preview", "Supabase-authenticated workspace"],
    cta: "Start free",
    href: "/register",
  },
  {
    name: "Pro",
    price: "$19",
    description: "Prepared for future premium AI and billing flows.",
    features: ["Unlimited Live Gemini generation", "Saved generation history", "Stripe-ready upgrade path"],
    cta: "Upgrade",
    href: "/api/billing/checkout",
    featured: true,
  },
];

export function PricingGrid({ showUpgradeNotice }: { showUpgradeNotice: boolean }) {
  const { toast } = useToast();

  useEffect(() => {
    if (!showUpgradeNotice) {
      return;
    }

    toast({
      title: "Upgrade flow is ready",
      description: "The Stripe stub responded successfully. Wiring checkout is the next step.",
      variant: "success",
    });
  }, [showUpgradeNotice, toast]);

  return (
    <div className="mt-12 grid items-stretch gap-6 lg:grid-cols-2">
      {plans.map((plan, index) => (
        <motion.div
          key={plan.name}
          className="h-full"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: index * 0.08 }}
          whileHover={{ y: -6 }}
        >
          <Card className={plan.featured ? "flex h-full flex-col border-emerald-400/30 bg-emerald-400/10 p-6 sm:p-8" : "flex h-full flex-col p-6 sm:p-8"}>
            <CardHeader className="flex-col items-start justify-between gap-4 sm:flex-row">
              <div>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </div>
              {plan.featured ? <Badge>Stripe-ready stub</Badge> : null}
            </CardHeader>
            <CardContent className="mt-8 flex-1">
              <p className="text-4xl font-semibold text-white sm:text-5xl">{plan.price}</p>
              <p className="mt-1 text-sm text-slate-400">per month</p>
              <ul className="mt-8 space-y-3 text-sm text-slate-200">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <Sparkles className="h-4 w-4 text-emerald-300" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="mt-8">
              {plan.featured ? (
                <form action={plan.href} method="post" className="w-full">
                  <motion.div whileTap={{ scale: 0.98 }}>
                    <Button type="submit" variant="primary" className="w-full">
                      {plan.cta}
                    </Button>
                  </motion.div>
                </form>
              ) : (
                <Button asChild variant="secondary" className="w-full">
                  <Link href={plan.href}>{plan.cta}</Link>
                </Button>
              )}
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
