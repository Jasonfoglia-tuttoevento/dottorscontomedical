import { Search } from "lucide-react";
import type { AdminClinicFilters } from "@/lib/admin/clinics/types";

export default function ClinicFilters({
  filters,
}: {
  filters: AdminClinicFilters;
}) {
  return (
    <form className="grid gap-3 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-[minmax(0,1fr)_220px_180px_auto]">
      <label className="relative">
        <span className="sr-only">Cerca clinica</span>
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          name="q"
          defaultValue={filters.query}
          placeholder="Nome, categoria o email"
          className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-3 text-sm font-semibold text-slate-800 outline-none transition focus:border-[#0D47A1] focus:bg-white"
        />
      </label>

      <input
        name="city"
        defaultValue={filters.city}
        placeholder="Città"
        className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-semibold text-slate-800 outline-none transition focus:border-[#0D47A1] focus:bg-white"
      />

      <select
        name="status"
        defaultValue={filters.status}
        className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-semibold text-slate-800 outline-none transition focus:border-[#0D47A1] focus:bg-white"
      >
        <option value="all">Tutti gli stati</option>
        <option value="verified">Verificate</option>
        <option value="pending">Da verificare</option>
      </select>

      <button type="submit" className="h-11 rounded-xl bg-slate-950 px-5 text-sm font-black text-white transition hover:bg-[#0D47A1]">
        Applica filtri
      </button>
    </form>
  );
}
