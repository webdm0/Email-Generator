import { Badge } from "@/components/ui/badge";
import { GenerationWorkspace } from "@/features/dashboard/components/generation-workspace";
import { requireUser } from "@/lib/supabase/auth";

export default async function DashboardPage() {
  const user = await requireUser();

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-3">
        <Badge>Dashboard</Badge>
        <h1 className="text-3xl font-semibold text-white sm:text-4xl">Welcome back</h1>
        <p className="text-sm text-slate-300">Signed in as {user.email ?? "your account"}.</p>
      </div>
      <GenerationWorkspace />
    </div>
  );
}
