import { Badge } from "@/components/ui/badge";
import { PricingGrid } from "@/features/pricing/components/pricing-grid";

type PricingPageProps = {
  searchParams?: Promise<{
    upgrade?: string;
  }>;
};

export default async function PricingPage({ searchParams }: PricingPageProps) {
  const params = await searchParams;
  const showUpgradeNotice = params?.upgrade === "coming-soon";

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <Badge className="mx-auto">Pricing</Badge>
        <h1 className="mt-5 text-4xl font-semibold text-white sm:text-5xl">Simple plans for a fast-moving MVP</h1>
        <p className="mt-4 text-lg leading-8 text-slate-300">
          Start free, then upgrade once billing is connected. The Pro flow is intentionally stubbed for future Stripe integration.
        </p>
        {showUpgradeNotice ? (
          <p className="mt-4 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200">
            Checkout is not live yet. The billing endpoint is in place and ready for Stripe wiring.
          </p>
        ) : null}
      </div>
      <PricingGrid showUpgradeNotice={showUpgradeNotice} />
    </div>
  );
}
