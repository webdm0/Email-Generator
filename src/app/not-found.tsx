import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[calc(100vh-16rem)] w-full max-w-7xl items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
      <Card className="w-full max-w-2xl p-8 text-center sm:p-10">
        <Badge className="mx-auto">404 Error</Badge>
        <h1 className="mt-5 text-3xl font-semibold text-white sm:text-4xl">Page not found</h1>
        <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base">
          The page you are looking for does not exist, may have moved, or is no longer available.
        </p>
        <Button asChild className="mt-8 w-full sm:w-auto">
          <Link href="/">Back home</Link>
        </Button>
      </Card>
    </div>
  );
}
