import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { brand } from "@/lib/brand";
import ClinicList from "@/components/clinics/ClinicList";
import ClinicFilters from "@/components/clinics/ClinicFilters";
import {
  Search, SlidersHorizontal, ShieldCheck, Star, Clock,
  TrendingUp, Award, ChevronRight
} from "lucide-react";

interface SearchParams {
  cat?: string; city?: string; verified?: string;
  q?: string; minRating?: string; priceRange?: string; page?: string;
}

export default async function ClinicsPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const params = await searchParams;
  const category = params.cat || "all";
  const city = params.city || "";
  const isVerified = params.verified === "true";
  const searchQuery = params.q || "";

  const getCategoryLabel = () => category === "all" ? "Tutte le Cliniche" : category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* ==========================================
          HEADER ULTRA-COMPATTO E STICKY
         ========================================== */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between gap-4">

          {/* Sinistra: Logo + Breadcrumb */}
          <div className="flex items-center gap-4 md:gap-6 min-w-0">
            <Link href="/" className="flex-shrink-0">
              <Image src={brand.logoCompact} alt={brand.name} width={512} height={512} className="h-10 w-10 object-contain" priority />
            </Link>

            <nav className="hidden md:flex items-center text-sm font-medium text-gray-400 truncate">
              <Link href="/" className="hover:text-[#0D47A1] transition whitespace-nowrap">Home</Link>
              <ChevronRight className="w-3 h-3 mx-1.5 shrink-0" />
              <span className="text-gray-900 truncate">{getCategoryLabel()}</span>
            </nav>
          </div>

          {/* Centro/Destra: Search Bar Compatta + CTA */}
          <div className="flex items-center gap-3 flex-grow justify-end">
            <form action="/cliniche" method="GET" className="relative w-full max-w-md hidden sm:block">
              <input type="hidden" name="cat" value={category} />
              <input type="hidden" name="city" value={city} />
              <input type="hidden" name="verified" value={isVerified ? "true" : ""} />

              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              <input
                type="text" name="q" defaultValue={searchQuery}
                placeholder="Cerca clinica o trattamento..."
                className="w-full pl-9 pr-16 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#00B39A] focus:ring-1 focus:ring-[#00B39A]/20 transition-all"
              />
              <button type="submit" className="absolute right-1.5 top-1/2 -translate-y-1/2 px-3 py-1 bg-[#0D47A1] text-white text-xs font-bold rounded-md hover:bg-[#0B3B86] transition">
                Cerca
              </button>
            </form>

            <Link href="/dashboard/clinic" className="hidden lg:flex items-center gap-1.5 text-xs font-bold text-gray-600 hover:text-[#0D47A1] bg-gray-50 px-3 py-1.5 rounded-full border border-gray-200 transition shrink-0">
              <Award className="w-3.5 h-3.5" /> Area Cliniche
            </Link>
          </div>
        </div>
      </header>

      {/* ==========================================
          CONTENUTO PRINCIPALE OTTIMIZZATO
         ========================================== */}
      <main className="flex-grow max-w-7xl mx-auto px-4 md:px-6 py-6 w-full">

        {/* Titolo e Sottotitolo COMPATTI (Sopra la griglia) */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-black text-gray-900 mb-1 leading-tight">
            {getCategoryLabel()}
          </h1>
          <p className="text-sm text-gray-500">
            {searchQuery ? `Risultati per "${searchQuery}"` : "Strutture, servizi e opzioni confrontabili"}
          </p>
        </div>

        {/* Trust Signals MINI (Una sola riga compatta) */}
        {!searchQuery && (
          <section className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
            {[
              { icon: ShieldCheck, label: "Profili", sub: "Informazioni utili" },
              { icon: Star, label: "Recensioni", sub: "Pazienti reali" },
              { icon: Clock, label: "Rapide", sub: "Preventivi 24h" },
              { icon: TrendingUp, label: "Confronto", sub: "Opzioni disponibili" }
            ].map((item, i) => (
              <div key={i} className="bg-white p-2.5 rounded-lg border border-gray-100 flex items-center gap-2.5 shadow-sm">
                <div className="w-7 h-7 bg-[#E6FAF5] rounded-md flex items-center justify-center text-[#0D47A1] shrink-0">
                  <item.icon className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-gray-900 text-[11px] leading-tight">{item.label}</p>
                  <p className="text-[10px] text-gray-500 leading-tight truncate">{item.sub}</p>
                </div>
              </div>
            ))}
          </section>
        )}

        {/* Barra Filtri Attivi MINIMAL */}
        <div className="flex items-center justify-between gap-3 mb-6 bg-white p-2.5 rounded-lg border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 text-xs text-gray-600 overflow-x-auto hide-scrollbar flex-grow">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#0D47A1] shrink-0" />
            <span className="font-bold text-gray-900 shrink-0">Filtri:</span>

            <div className="flex gap-1.5">
              {category !== "all" && (
                <span className="px-2 py-1 bg-[#E6FAF5] text-[#0B3B86] border border-[#CCF3EC] rounded text-[10px] font-bold flex items-center gap-1 whitespace-nowrap">
                  {getCategoryLabel()}
                  <Link href={`/cliniche?city=${city}&verified=${isVerified}&q=${searchQuery}`} className="hover:text-[#0B1D3A] ml-0.5">×</Link>
                </span>
              )}
              {city && (
                <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-[10px] font-bold flex items-center gap-1 whitespace-nowrap">
                  {city}
                  <Link href={`/cliniche?cat=${category}&verified=${isVerified}&q=${searchQuery}`} className="hover:text-[#0D47A1] ml-0.5">×</Link>
                </span>
              )}
              {isVerified && (
                <span className="px-2 py-1 bg-green-50 text-green-700 rounded text-[10px] font-bold flex items-center gap-1 border border-green-100 whitespace-nowrap">
                  In evidenza
                  <Link href={`/cliniche?cat=${category}&city=${city}&q=${searchQuery}`} className="hover:text-[#0D47A1] ml-0.5">×</Link>
                </span>
              )}
              {(!city && !isVerified && category === "all") && (
                <span className="text-gray-400 italic text-[10px]">Nessun filtro attivo</span>
              )}
            </div>
          </div>
        </div>

        {/* Layout Griglia COMPATTO */}
        <div className="grid lg:grid-cols-12 gap-5 items-start">

          {/* Sidebar (3 col) */}
          <aside className="lg:col-span-3 sticky top-20 space-y-4">
            <ClinicFilters />
            <div className="bg-gray-900 p-4 rounded-xl text-white shadow-md">
              <h3 className="font-bold text-xs mb-1.5 uppercase tracking-wider opacity-80">Partner</h3>
              <p className="text-[11px] text-gray-300 mb-3 leading-snug">Ricevi pazienti qualificati ogni giorno.</p>
              <Link href="/register?role=clinic" className="block w-full py-2 bg-[#0D47A1] text-center rounded-lg font-bold text-[11px] hover:bg-[#0B3B86] transition">
                Diventa Partner
              </Link>
            </div>
          </aside>

          {/* Lista (9 col) */}
          <div className="lg:col-span-9">
            <Suspense fallback={<div className="grid md:grid-cols-2 gap-5">{[...Array(4)].map((_, i) => <div key={i} className="h-[300px] bg-white rounded-2xl animate-pulse"></div>)}</div>}>
              <ClinicList category={category} city={city} verified={isVerified} searchQuery={searchQuery} />
            </Suspense>
          </div>
        </div>
      </main>
    </div>
  );
}
