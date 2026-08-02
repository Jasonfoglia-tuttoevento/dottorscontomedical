import Link from "next/link";
import { ArrowRight, Clock3, MapPin } from "lucide-react";
import AcceptLeadButton from "@/components/clinics/leads/AcceptLeadButton";
import RejectLeadButton from "@/components/clinics/leads/RejectLeadButton";
import type { MatchWithCheckup } from "@/lib/types/database";

interface ClinicRecentLeadsProps {
  leads: MatchWithCheckup[];
}

const statusStyles = {
  pending: "bg-amber-50 text-amber-700",
  accepted: "bg-emerald-50 text-emerald-700",
  rejected: "bg-gray-100 text-gray-600",
} as const;

const statusLabels = {
  pending: "Da gestire",
  accepted: "Accettato",
  rejected: "Rifiutato",
} as const;

export default function ClinicRecentLeads({ leads }: ClinicRecentLeadsProps) {
  return (
    <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-gray-100 p-6">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-[#0D47A1]">Flusso operativo</p>
          <h2 className="mt-1 text-xl font-black text-gray-950">Ultimi lead ricevuti</h2>
          <p className="mt-1 text-sm text-gray-500">Le richieste più recenti, ordinate per data.</p>
        </div>
        <Link href="/dashboard/clinic/leads" className="hidden items-center gap-2 text-sm font-bold text-[#0D47A1] hover:text-[#0B3B86] sm:flex">
          Gestisci tutti <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {leads.length > 0 ? (
        <div className="divide-y divide-gray-100">
          {leads.map((lead) => {
            const checkup = lead.checkups;

            return (
              <article key={lead.id} className="p-5 transition hover:bg-gray-50">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <h3 className="truncate font-bold text-gray-950">{checkup?.patient_name || "Paziente"}</h3>
                    <p className="mt-1 text-sm text-gray-600">{checkup?.treatment || checkup?.category || "Richiesta odontoiatrica"}</p>
                    <div className="mt-3 flex flex-wrap gap-4 text-xs text-gray-500">
                      {checkup?.city && <span className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{checkup.city}</span>}
                      <span className="inline-flex items-center gap-1"><Clock3 className="h-3.5 w-3.5" />{new Date(lead.created_at).toLocaleDateString("it-IT", { day: "2-digit", month: "short", year: "numeric" })}</span>
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-2">
                    <span className={`rounded-full px-3 py-1 text-xs font-bold ${statusStyles[lead.status]}`}>{statusLabels[lead.status]}</span>
                    {lead.status === "pending" && (
                      <div className="flex items-center rounded-lg border border-gray-200 bg-white">
                        <AcceptLeadButton matchId={lead.id} />
                        <span className="h-5 w-px bg-gray-200" />
                        <RejectLeadButton matchId={lead.id} />
                      </div>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="p-10 text-center">
          <p className="font-bold text-gray-700">Nessun lead ricevuto</p>
          <p className="mt-2 text-sm text-gray-500">Le nuove richieste appariranno qui automaticamente.</p>
        </div>
      )}

      <div className="border-t border-gray-100 p-4 sm:hidden">
        <Link href="/dashboard/clinic/leads" className="flex items-center justify-center gap-2 text-sm font-bold text-[#0D47A1]">Gestisci tutti <ArrowRight className="h-4 w-4" /></Link>
      </div>
    </section>
  );
}
