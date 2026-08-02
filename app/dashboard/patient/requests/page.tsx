import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PatientRequestList from "@/components/patient/PatientRequestList";
import PatientStatsGrid from "@/components/patient/PatientStatsGrid";
import { requireUserRole } from "@/lib/auth/get-user-context";
import { getCheckupsByPatientEmail } from "@/lib/data/checkups";

const PAGE_SIZE = 8;

export default async function PatientRequestsPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const context = await requireUserRole("patient");
  const checkups = await getCheckupsByPatientEmail(context.user.email ?? "");
  const params = await searchParams;
  const requestedPage = Number.parseInt(params.page ?? "1", 10);
  const totalPages = Math.max(1, Math.ceil(checkups.length / PAGE_SIZE));
  const page = Number.isFinite(requestedPage) ? Math.min(Math.max(requestedPage, 1), totalPages) : 1;
  const visible = checkups.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-black uppercase tracking-[0.16em] text-[#0D47A1]">Archivio personale</p>
        <h1 className="mt-1 text-2xl font-black text-slate-950 sm:text-3xl">Tutte le richieste</h1>
        <p className="mt-2 text-sm text-slate-600">Massimo {PAGE_SIZE} elementi per pagina per una consultazione semplice anche da mobile.</p>
      </div>
      <PatientStatsGrid checkups={checkups} />
      <PatientRequestList checkups={visible} />
      {totalPages > 1 && (
        <nav className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-3" aria-label="Paginazione richieste">
          <Link href={`/dashboard/patient/requests?page=${Math.max(1, page - 1)}`} aria-disabled={page === 1} className={`inline-flex min-h-11 items-center gap-2 rounded-xl px-4 py-2 text-sm font-black ${page === 1 ? "pointer-events-none text-slate-300" : "text-slate-700 hover:bg-slate-100"}`}><ChevronLeft className="h-4 w-4" />Precedente</Link>
          <span className="text-sm font-black text-slate-600">{page} / {totalPages}</span>
          <Link href={`/dashboard/patient/requests?page=${Math.min(totalPages, page + 1)}`} aria-disabled={page === totalPages} className={`inline-flex min-h-11 items-center gap-2 rounded-xl px-4 py-2 text-sm font-black ${page === totalPages ? "pointer-events-none text-slate-300" : "text-slate-700 hover:bg-slate-100"}`}>Successiva<ChevronRight className="h-4 w-4" /></Link>
        </nav>
      )}
    </div>
  );
}
