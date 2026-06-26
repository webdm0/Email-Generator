import type { Metadata } from "next";

import { AppToastProvider } from "@/components/providers/toast-provider";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { getCurrentUser } from "@/lib/supabase/auth";

import "./globals.css";

export const metadata: Metadata = {
  title: "EmailForge AI",
  description: "Generate smarter emails with Supabase-authenticated AI workflows.",
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const user = await getCurrentUser();

  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-950 text-white antialiased">
        <AppToastProvider>
          <div className="relative min-h-screen overflow-hidden">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.2),transparent_28%),radial-gradient(circle_at_80%_10%,rgba(52,211,153,0.16),transparent_24%),linear-gradient(180deg,#020617_0%,#0f172a_55%,#020617_100%)]" />
            <div className="relative flex min-h-screen flex-col">
              <SiteHeader user={user} />
              <main className="flex-1">{children}</main>
              <SiteFooter />
            </div>
          </div>
        </AppToastProvider>
      </body>
    </html>
  );
}
