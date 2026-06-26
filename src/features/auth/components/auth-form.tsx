"use client";

import type { Route } from "next";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { AuthFormState } from "@/types/auth";

const initialState: AuthFormState = {
  success: false,
  message: "",
};

type AuthFormProps = {
  action: (state: AuthFormState, formData: FormData) => Promise<AuthFormState>;
  title: string;
  description: string;
  submitLabel: string;
  alternateHref: Route;
  alternateLabel: string;
  alternateText: string;
};

export function AuthForm(props: AuthFormProps) {
  const router = useRouter();
  const [state, formAction] = useActionState(props.action, initialState);

  useEffect(() => {
    if (state.success && state.redirectTo) {
      router.push(state.redirectTo);
      router.refresh();
    }
  }, [router, state.redirectTo, state.success]);

  return (
    <Card className="w-full max-w-md p-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold text-white">{props.title}</h1>
        <p className="text-sm text-slate-300">{props.description}</p>
      </div>
      <form action={formAction} className="mt-8 space-y-5">
        <label className="block space-y-2">
          <span className="text-sm text-slate-200">Email</span>
          <Input name="email" type="email" autoComplete="email" placeholder="you@company.com" required />
          {state.fieldErrors?.email ? <p className="text-sm text-rose-300">{state.fieldErrors.email}</p> : null}
        </label>
        <label className="block space-y-2">
          <span className="text-sm text-slate-200">Password</span>
          <Input
            name="password"
            type="password"
            autoComplete={props.submitLabel === "Create account" ? "new-password" : "current-password"}
            placeholder="Minimum 8 characters"
            required
          />
          {state.fieldErrors?.password ? <p className="text-sm text-rose-300">{state.fieldErrors.password}</p> : null}
        </label>
        {state.message ? (
          <p className={state.success ? "text-sm text-emerald-300" : "text-sm text-rose-300"}>{state.message}</p>
        ) : null}
        <SubmitButton label={props.submitLabel} />
      </form>
      <p className="mt-6 text-sm text-slate-400">
        {props.alternateText}{" "}
        <Link href={props.alternateHref} className="text-emerald-300 transition hover:text-emerald-200">
          {props.alternateLabel}
        </Link>
      </p>
    </Card>
  );
}

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? "Please wait..." : label}
    </Button>
  );
}
