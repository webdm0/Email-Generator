import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SignOutButton } from "@/features/profile/components/sign-out-button";

export function ProfileSummaryCard({ email }: { email: string | null | undefined }) {
  return (
    <Card className="mt-8 p-8">
      <CardHeader>
        <Badge>Account</Badge>
        <CardTitle>Your workspace identity</CardTitle>
        <CardDescription>
          This profile is pulled from the active Supabase session on the server.
        </CardDescription>
      </CardHeader>
      <CardContent className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-2">
          <p className="text-sm uppercase tracking-[0.22em] text-emerald-300">Email</p>
          <p className="text-lg text-white">{email ?? "No email available"}</p>
        </div>
        <SignOutButton />
      </CardContent>
    </Card>
  );
}
