import { Badge } from "@/components/ui/badge";
import { ProfileSummaryCard } from "@/features/profile/components/profile-summary-card";
import { requireUser } from "@/lib/supabase/auth";

export default async function ProfilePage() {
  const user = await requireUser();

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <Badge>Profile</Badge>
      <h1 className="mt-4 text-4xl font-semibold text-white">Your account</h1>
      <ProfileSummaryCard email={user.email} />
    </div>
  );
}
