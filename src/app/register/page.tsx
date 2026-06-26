import { redirectIfAuthenticated } from "@/lib/supabase/auth";
import { AuthForm } from "@/features/auth/components/auth-form";
import { signUpAction } from "@/features/auth/actions";

export default async function RegisterPage() {
  await redirectIfAuthenticated();

  return (
    <div className="mx-auto flex min-h-[calc(100vh-13rem)] max-w-7xl items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
      <AuthForm
        action={signUpAction}
        title="Create your account"
        description="Start generating polished emails with your secure personal workspace."
        submitLabel="Create account"
        alternateHref="/login"
        alternateLabel="Sign in"
        alternateText="Already have an account?"
      />
    </div>
  );
}
