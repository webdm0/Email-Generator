import type { Route } from "next";
import type { User } from "@supabase/supabase-js";
import Link from "next/link";

import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/" as Route, label: "Home" },
  { href: "/pricing" as Route, label: "Pricing" },
];

export function SiteHeader({ user }: { user: User | null }) {
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/85 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-base font-semibold tracking-[0.2em] text-white uppercase sm:text-lg">
          EmailForge AI
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-white">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Link href="/dashboard" className="hidden text-sm text-slate-300 transition hover:text-white sm:block">
                Dashboard
              </Link>
              <Button
                asChild
                variant="secondary"
                size="sm"
                className="sm:min-h-11 sm:px-5 sm:py-2.5 sm:text-sm"
              >
                <Link href="/profile">Profile</Link>
              </Button>
            </>
          ) : (
            <>
              <Link href="/login" className="hidden text-sm text-slate-300 transition hover:text-white sm:block">
                Sign in
              </Link>
              <Button asChild size="sm" className="sm:min-h-11 sm:px-5 sm:py-2.5 sm:text-sm">
                <Link href="/register">Start free</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
