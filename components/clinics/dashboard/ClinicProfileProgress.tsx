import Link from "next/link";
import { CheckCircle2, ListChecks, Stethoscope } from "lucide-react";
import type { ClinicProfileCompleteness } from "@/lib/clinics/profile-completeness";

interface ClinicProfileProgressProps {
  profile: ClinicProfileCompleteness;
  servicesCount: number;
  verified: boolean;
}

export default function ClinicProfileProgress({ profile, servicesCount, verified }: ClinicProfileProgressProps) {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-[#0D47A1]">Visibilità</p>
          <h2 className="mt-1 text-xl font-black text-gray-950">Qualità del profilo</h2>
        </div>
        <span className="text-3xl font-black text-[#0D47A1]">{profile.percentage}%</span>
      </div>

      <div className="mt-5 h-3 overflow-hidden rounded-full bg-gray-100">
        <div className="h-full rounded-full bg-gradient-to-r from-[#0D47A1] to-[#00A98F]" style={{ width: `${profile.percentage}%` }} />
      </div>
      <p className="mt-2 text-xs text-gray-500">{profile.completed} di {profile.total} informazioni principali completate.</p>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        <div className="rounded-xl bg-gray-50 p-4">
          <Stethoscope className="h-5 w-5 text-[#0D47A1]" />
          <p className="mt-2 text-2xl font-black text-gray-950">{servicesCount}</p>
          <p className="text-xs font-semibold text-gray-500">Servizi pubblicati</p>
        </div>
        <div className="rounded-xl bg-gray-50 p-4">
          <CheckCircle2 className={`h-5 w-5 ${verified ? "text-emerald-600" : "text-amber-600"}`} />
          <p className="mt-2 text-sm font-black text-gray-950">{verified ? "Verificata" : "Da verificare"}</p>
          <p className="text-xs font-semibold text-gray-500">Stato pubblicazione</p>
        </div>
      </div>

      {profile.missing.length > 0 ? (
        <div className="mt-6 rounded-xl border border-amber-100 bg-amber-50 p-4">
          <div className="flex items-center gap-2 text-sm font-bold text-amber-900"><ListChecks className="h-4 w-4" />Prossimi elementi</div>
          <p className="mt-2 text-sm leading-6 text-amber-800">Aggiungi {profile.missing.slice(0, 3).join(", ")}.</p>
        </div>
      ) : (
        <div className="mt-6 rounded-xl border border-emerald-100 bg-emerald-50 p-4 text-sm font-semibold text-emerald-800">
          Profilo completo: mantieni aggiornati servizi, prezzi e contatti.
        </div>
      )}

      <Link href="/dashboard/clinic/profile/general" className="mt-5 flex w-full items-center justify-center rounded-xl bg-[#0D47A1] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#0B3B86]">
        Gestisci profilo e servizi
      </Link>
    </section>
  );
}
