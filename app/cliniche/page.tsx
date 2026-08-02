import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import BrandLogo from "@/components/brand/BrandLogo";
import ClinicGrid from "@/components/marketplace/ClinicGrid";
import MarketplaceFilters from "@/components/marketplace/MarketplaceFilters";
import MarketplacePagination from "@/components/marketplace/MarketplacePagination";
import { getPublicClinics } from "@/lib/data/clinics";
import {
  marketplaceHref,
  parseMarketplaceParams,
  type MarketplaceSearchParams,
} from "@/lib/marketplace/search-params";

export const metadata: Metadata = {
  title: "Cliniche e strutture sanitarie",
  description: "Cerca strutture sanitarie e consulta servizi e informazioni disponibili su Facile Medical.",
  alternates: { canonical: "/cliniche" },
};

export default async function ClinicsPage({
  searchParams,
}: {
  searchParams: Promise<MarketplaceSearchParams>;
}) {
  const params = parseMarketplaceParams(await searchParams);
  const result = await getPublicClinics(params);

  if (result.totalPages > 0 && params.page > result.totalPages) {
    redirect(marketplaceHref(params, { page: result.totalPages }));
  }

  return (
    <div className="min-h-screen bg-[#F2F4F7]">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
          <Link
            href="/"
            className="rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B39A]"
          >
            <BrandLogo iconClassName="h-10 w-10" textClassName="text-lg sm:text-xl" priority />
          </Link>
          <Link
            href="/dashboard"
            className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-bold text-[#0B1D3A] hover:border-[#00B39A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B39A]"
          >
            Area personale
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-widest text-[#00B39A]">Marketplace</p>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-[#0B1D3A] sm:text-5xl">
            Trova una struttura sanitaria
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-gray-600">
            Consulta le informazioni pubblicate dalle strutture e scopri i servizi disponibili.
          </p>
        </div>

        <div className="mt-8">
          <MarketplaceFilters params={params} />
        </div>

        <section className="mt-10" aria-labelledby="marketplace-results-title">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 id="marketplace-results-title" className="text-2xl font-black text-[#0B1D3A]">
                Strutture disponibili
              </h2>
              <p className="mt-1 text-sm text-gray-600" aria-live="polite">
                {result.total === 1 ? "1 risultato" : `${result.total} risultati`}
              </p>
            </div>
            {result.totalPages > 0 && (
              <p className="text-sm font-semibold text-gray-500">
                Pagina {result.page} di {result.totalPages}
              </p>
            )}
          </div>

          <ClinicGrid clinics={result.clinics} />
          <MarketplacePagination params={params} totalPages={result.totalPages} />
        </section>
      </main>
    </div>
  );
}
