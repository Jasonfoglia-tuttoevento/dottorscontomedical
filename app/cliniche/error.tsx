"use client";

import MarketplaceErrorState from "@/components/marketplace/MarketplaceErrorState";

export default function ClinicsError({ reset }: { error: Error; reset: () => void }) {
  return (
    <main className="min-h-screen bg-[#F2F4F7] px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <MarketplaceErrorState onRetry={reset} />
      </div>
    </main>
  );
}
