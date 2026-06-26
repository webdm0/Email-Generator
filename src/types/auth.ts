import type { Route } from "next";

export type AuthFormState = {
  success: boolean;
  message: string;
  redirectTo?: Route;
  fieldErrors?: {
    email?: string;
    password?: string;
  };
};
