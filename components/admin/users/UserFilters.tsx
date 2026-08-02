import { Search } from "lucide-react";
import type { AdminUserFilters } from "@/lib/admin/users/types";

export default function UserFilters({ filters }: { filters: AdminUserFilters }) {
  return (
    <form className="grid gap-3 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-[minmax(0,1fr)_200px_auto]">
      <label className="relative">
        <span className="sr-only">Cerca utente</span>
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          name="q"
          defaultValue={filters.query}
          placeholder="UUID esatto o nome clinica"
          className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-3 text-sm font-semibold text-slate-800 outline-none transition focus:border-[#0D47A1] focus:bg-white"
        />
      </label>
      <select
        name="role"
        defaultValue={filters.role}
        className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-semibold text-slate-800 outline-none transition focus:border-[#0D47A1] focus:bg-white"
      >
        <option value="all">Tutti i ruoli</option>
        <option value="patient">Pazienti</option>
        <option value="clinic">Cliniche</option>
        <option value="admin">Amministratori</option>
      </select>
      <button type="submit" className="h-11 rounded-xl bg-slate-950 px-5 text-sm font-black text-white transition hover:bg-[#0D47A1]">
        Applica filtri
      </button>
    </form>
  );
}
