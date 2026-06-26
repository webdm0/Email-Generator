import { redirectIfAuthenticated } from "@/lib/supabase/auth";
import { AuthForm } from "@/features/auth/components/auth-form";
import { signInAction } from "@/features/auth/actions";

export default async function LoginPage() {
  await redirectIfAuthenticated();

  return (
    <div className="mx-auto flex min-h-[calc(100vh-13rem)] max-w-7xl items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
      <AuthForm
        action={signInAction}
        title="Welcome back"
        description="Sign in to access your AI email dashboard."
        submitLabel="Sign in"
        alternateHref="/register"
        alternateLabel="Create an account"
        alternateText="New here?"
      />
    </div>
  );
}
