import Link from "next/link";
import type { ParsedMarketplaceParams } from "@/lib/marketplace/search-params";

export default function MarketplaceFilters({ params }: { params: ParsedMarketplaceParams }) {
  return (
    <form
      action="/cliniche"
      method="GET"
      className="grid gap-4 rounded-3xl border border-gray-200 bg-white p-5 shadow-sm md:grid-cols-2 xl:grid-cols-6"
    >
      <div className="md:col-span-2 xl:col-span-2">
        <label htmlFor="marketplace-search" className="mb-1.5 block text-sm font-bold text-gray-700">
          Cerca
        </label>
        <input
          id="marketplace-search"
          name="q"
          type="search"
          defaultValue={params.searchQuery}
          maxLength={120}
          placeholder="Nome o descrizione"
          className="w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B39A]"
        />
      </div>

      <div>
        <label htmlFor="marketplace-category" className="mb-1.5 block text-sm font-bold text-gray-700">
          Categoria
        </label>
        <input
          id="marketplace-category"
          name="cat"
          defaultValue={params.category}
          maxLength={80}
          placeholder="Es. dentale"
          className="w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B39A]"
        />
      </div>

      <div>
        <label htmlFor="marketplace-city" className="mb-1.5 block text-sm font-bold text-gray-700">
          Città
        </label>
        <input
          id="marketplace-city"
          name="city"
          defaultValue={params.city}
          maxLength={80}
          placeholder="Es. Milano"
          className="w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B39A]"
        />
      </div>

      <div>
        <label htmlFor="marketplace-sort" className="mb-1.5 block text-sm font-bold text-gray-700">
          Ordina
        </label>
        <select
          id="marketplace-sort"
          name="sort"
          defaultValue={params.sort}
          className="w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B39A]"
        >
          <option value="newest">Più recenti</option>
          <option value="name-asc">Nome A–Z</option>
          <option value="name-desc">Nome Z–A</option>
        </select>
      </div>

      <div className="flex items-end">
        <label className="flex min-h-12 w-full cursor-pointer items-center gap-3 rounded-xl border border-gray-200 px-4 text-sm font-semibold text-gray-700 focus-within:ring-2 focus-within:ring-[#00B39A]">
          <input
            type="checkbox"
            name="verified"
            value="true"
            defaultChecked={params.verified}
            className="h-4 w-4"
          />
          In evidenza
        </label>
      </div>

      <div className="flex flex-col gap-3 md:col-span-2 md:flex-row xl:col-span-6 xl:justify-end">
        <Link
          href="/cliniche"
          className="rounded-xl border border-gray-200 px-5 py-3 text-center font-bold text-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B39A] focus-visible:ring-offset-2"
        >
          Azzera filtri
        </Link>
        <button
          type="submit"
          className="rounded-xl bg-[#0D47A1] px-6 py-3 font-bold text-white hover:bg-[#0B3B86] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B39A] focus-visible:ring-offset-2"
        >
          Applica filtri
        </button>
      </div>
    </form>
  );
}
