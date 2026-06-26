"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { createClient } from "@/lib/supabase/server";
import type { AuthFormState } from "@/types/auth";

const authSchema = z.object({
  email: z.string().trim().email("Enter a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters."),
});

const initialState: AuthFormState = {
  success: false,
  message: "",
};

export async function signUpAction(_: AuthFormState, formData: FormData): Promise<AuthFormState> {
  const parsed = authSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    const issues = parsed.error.flatten().fieldErrors;

    return {
      ...initialState,
      message: "Please fix the highlighted fields.",
      fieldErrors: {
        email: issues.email?.[0],
        password: issues.password?.[0],
      },
    };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
  });

  if (error) {
    return {
      ...initialState,
      message: error.message,
    };
  }

  revalidatePath("/", "layout");

  return {
    success: true,
    message: "Account created successfully.",
    redirectTo: "/dashboard",
  };
}

export async function signInAction(_: AuthFormState, formData: FormData): Promise<AuthFormState> {
  const parsed = authSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    const issues = parsed.error.flatten().fieldErrors;

    return {
      ...initialState,
      message: "Please fix the highlighted fields.",
      fieldErrors: {
        email: issues.email?.[0],
        password: issues.password?.[0],
      },
    };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword(parsed.data);

  if (error) {
    return {
      ...initialState,
      message: error.message,
    };
  }

  revalidatePath("/", "layout");

  return {
    success: true,
    message: "Signed in successfully.",
    redirectTo: "/dashboard",
  };
}

export async function signOutAction() {
  const supabase = await createClient();

  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/login");
}
