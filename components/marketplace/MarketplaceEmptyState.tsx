import Link from "next/link";
import { SearchX } from "lucide-react";

export default function MarketplaceEmptyState() {
  return (
    <div className="rounded-3xl border border-gray-200 bg-white px-6 py-16 text-center">
      <SearchX className="mx-auto h-12 w-12 text-[#00B39A]" aria-hidden="true" />
      <h2 className="mt-5 text-2xl font-black text-[#0B1D3A]">Nessuna clinica trovata</h2>
      <p className="mx-auto mt-3 max-w-lg text-gray-600">
        Prova a modificare la ricerca oppure azzera i filtri applicati.
      </p>
      <Link
        href="/cliniche"
        className="mt-7 inline-flex rounded-xl bg-[#0D47A1] px-6 py-3 font-bold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B39A] focus-visible:ring-offset-2"
      >
        Azzera i filtri
      </Link>
    </div>
  );
}
