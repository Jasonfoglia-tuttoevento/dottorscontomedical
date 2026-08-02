import Link from "next/link";
import { Filter, Search, X } from "lucide-react";

export interface LeadFilterValues {
  q: string;
  status: string;
  from: string;
  to: string;
}

export default function LeadFilters({ values }: { values: LeadFilterValues }) {
  const hasFilters = Boolean(values.q || values.status || values.from || values.to);

  return (
    <form action="/dashboard/clinic/leads" method="get" className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-2 text-sm font-black text-gray-950">
        <Filter className="h-4 w-4 text-[#0D47A1]" />
        Filtra i lead
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(240px,1.4fr)_minmax(170px,0.6fr)_minmax(150px,0.5fr)_minmax(150px,0.5fr)_auto] lg:items-end">
        <label className="block">
          <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-gray-500">Ricerca</span>
          <span className="relative block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="search"
              name="q"
              defaultValue={values.q}
              placeholder="Nome, città o trattamento"
              className="w-full rounded-xl border border-gray-200 py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-[#0D47A1] focus:ring-2 focus:ring-blue-100"
            />
          </span>
        </label>

        <label className="block">
          <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-gray-500">Stato</span>
          <select name="status" defaultValue={values.status} className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none transition focus:border-[#0D47A1] focus:ring-2 focus:ring-blue-100">
            <option value="">Tutti</option>
            <option value="pending">Da gestire</option>
            <option value="accepted">Accettati</option>
            <option value="rejected">Rifiutati</option>
          </select>
        </label>

        <label className="block">
          <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-gray-500">Dal</span>
          <input type="date" name="from" defaultValue={values.from} className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none transition focus:border-[#0D47A1] focus:ring-2 focus:ring-blue-100" />
        </label>

        <label className="block">
          <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-gray-500">Al</span>
          <input type="date" name="to" defaultValue={values.to} className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none transition focus:border-[#0D47A1] focus:ring-2 focus:ring-blue-100" />
        </label>

        <div className="flex gap-2">
          <button type="submit" className="inline-flex min-h-11 flex-1 items-center justify-center rounded-xl bg-[#0D47A1] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#0B3B86] lg:flex-none">
            Applica
          </button>
          {hasFilters && (
            <Link href="/dashboard/clinic/leads" aria-label="Azzera filtri" className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl border border-gray-200 px-3 py-2.5 text-gray-600 transition hover:border-red-200 hover:text-red-600">
              <X className="h-4 w-4" />
            </Link>
          )}
        </div>
      </div>
    </form>
  );
}
