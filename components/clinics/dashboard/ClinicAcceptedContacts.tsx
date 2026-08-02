import Link from "next/link";
import { Mail, Phone, UserRoundCheck } from "lucide-react";
import type { MatchWithCheckup } from "@/lib/types/database";

interface ClinicAcceptedContactsProps {
  leads: MatchWithCheckup[];
}

export default function ClinicAcceptedContacts({ leads }: ClinicAcceptedContactsProps) {
  return (
    <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-100 p-6">
        <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">Contatti acquisiti</p>
        <h2 className="mt-1 text-xl font-black text-gray-950">Lead accettati</h2>
        <p className="mt-1 text-sm text-gray-500">Sono contatti commerciali, non appuntamenti confermati.</p>
      </div>

      {leads.length > 0 ? (
        <div className="divide-y divide-gray-100">
          {leads.map((lead) => (
            <article key={lead.id} className="p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-700"><UserRoundCheck className="h-5 w-5" /></div>
                <div className="min-w-0">
                  <p className="truncate font-bold text-gray-950">{lead.checkups?.patient_name || "Paziente"}</p>
                  <p className="truncate text-sm text-gray-500">{lead.checkups?.treatment || "Richiesta odontoiatrica"}</p>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {lead.checkups?.patient_phone && (
                  <a href={`tel:${lead.checkups.patient_phone}`} className="inline-flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-xs font-bold text-gray-700 hover:bg-gray-200"><Phone className="h-3.5 w-3.5" />Chiama</a>
                )}
                {lead.checkups?.patient_email && (
                  <a href={`mailto:${lead.checkups.patient_email}`} className="inline-flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-xs font-bold text-gray-700 hover:bg-gray-200"><Mail className="h-3.5 w-3.5" />Email</a>
                )}
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="p-10 text-center text-sm text-gray-500">Nessun contatto accettato.</div>
      )}

      <div className="border-t border-gray-100 p-4">
        <Link href="/dashboard/clinic/leads" className="block text-center text-sm font-bold text-[#0D47A1]">Apri gestione lead</Link>
      </div>
    </section>
  );
}
