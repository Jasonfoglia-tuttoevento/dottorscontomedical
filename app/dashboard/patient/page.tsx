import Link from "next/link";
import { ArrowRight, ClipboardList, PlusCircle } from "lucide-react";
import PatientRequestList from "@/components/patient/PatientRequestList";
import PatientStatsGrid from "@/components/patient/PatientStatsGrid";
import { requireUserRole } from "@/lib/auth/get-user-context";
import { getCheckupsByPatientEmail } from "@/lib/data/checkups";

export default async function PatientDashboard() {
  const context = await requireUserRole("patient");
  const checkups = await getCheckupsByPatientEmail(context.user.email ?? "");
  const latest = checkups.slice(0, 3);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-black uppercase tracking-[0.16em] text-[#0D47A1]">Area paziente</p>
        <h1 className="mt-1 text-2xl font-black text-slate-950 sm:text-3xl">La tua panoramica</h1>
        <p className="mt-2 text-sm text-slate-600">Riepilogo e ultime richieste, senza una pagina infinita.</p>
      </div>

      <PatientStatsGrid checkups={checkups} />

      <section className="grid gap-4 sm:grid-cols-2">
        <Link href="/dashboard/patient/requests" className="group rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-blue-200 hover:shadow-md">
          <ClipboardList className="h-7 w-7 text-[#0D47A1]" />
          <h2 className="mt-4 font-black text-slate-950">Tutte le richieste</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">Apri l&apos;archivio paginato e controlla lo stato di ogni richiesta.</p>
          <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-[#0D47A1]">Apri archivio <ArrowRight className="h-4 w-4" /></span>
        </Link>
        <Link href="/check-up" className="group rounded-3xl bg-[#0D47A1] p-5 text-white shadow-sm transition hover:bg-[#0B3B86]">
          <PlusCircle className="h-7 w-7 text-cyan-200" />
          <h2 className="mt-4 font-black">Nuova richiesta</h2>
          <p className="mt-2 text-sm leading-6 text-blue-100">Invia una nuova esigenza e ricevi orientamento dalle cliniche.</p>
          <span className="mt-4 inline-flex items-center gap-2 text-sm font-black">Inizia <ArrowRight className="h-4 w-4" /></span>
        </Link>
      </section>

      <section className="space-y-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-black text-[#0D47A1]">Aggiornamenti</p>
            <h2 className="text-xl font-black text-slate-950">Ultime richieste</h2>
          </div>
          {checkups.length > 3 && <Link href="/dashboard/patient/requests" className="text-sm font-black text-[#0D47A1]">Vedi tutte</Link>}
        </div>
        <PatientRequestList checkups={latest} compact />
      </section>
    </div>
  );
}
