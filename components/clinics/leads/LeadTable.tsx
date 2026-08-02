import { CheckCircle2, Clock3, LockKeyhole, Mail, MapPin, Phone, XCircle } from "lucide-react";
import AcceptLeadButton from "./AcceptLeadButton";
import RejectLeadButton from "./RejectLeadButton";
import type { MatchWithCheckup } from "@/lib/types/database";

interface LeadTableProps {
  matches: MatchWithCheckup[];
}

const statusConfig = {
  pending: { label: "Da gestire", icon: Clock3, className: "bg-amber-50 text-amber-700" },
  accepted: { label: "Accettato", icon: CheckCircle2, className: "bg-emerald-50 text-emerald-700" },
  rejected: { label: "Rifiutato", icon: XCircle, className: "bg-gray-100 text-gray-600" },
} as const;

function StatusBadge({ status }: { status: MatchWithCheckup["status"] }) {
  const config = statusConfig[status];

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${config.className}`}>
      <config.icon className="h-3.5 w-3.5" />
      {config.label}
    </span>
  );
}

function LeadActions({ match }: { match: MatchWithCheckup }) {
  if (match.status === "pending") {
    return (
      <div className="flex items-center justify-end gap-1 rounded-lg border border-gray-200 bg-white">
        <AcceptLeadButton matchId={match.id} />
        <span className="h-5 w-px bg-gray-200" />
        <RejectLeadButton matchId={match.id} />
      </div>
    );
  }

  return <span className="text-xs font-semibold text-gray-400">Decisione registrata</span>;
}

function ContactDetails({ match }: { match: MatchWithCheckup }) {
  const checkup = match.checkups;

  if (match.status !== "accepted") {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-400">
        <LockKeyhole className="h-3.5 w-3.5" /> Contatti dopo l’accettazione
      </span>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      {checkup?.patient_phone && (
        <a href={`tel:${checkup.patient_phone}`} className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-50 px-2.5 py-1.5 text-xs font-bold text-emerald-700 hover:bg-emerald-100">
          <Phone className="h-3.5 w-3.5" /> Chiama
        </a>
      )}
      {checkup?.patient_email && (
        <a href={`mailto:${checkup.patient_email}`} className="inline-flex items-center gap-1.5 rounded-lg bg-blue-50 px-2.5 py-1.5 text-xs font-bold text-blue-700 hover:bg-blue-100">
          <Mail className="h-3.5 w-3.5" /> Email
        </a>
      )}
      {!checkup?.patient_phone && !checkup?.patient_email && <span className="text-xs text-gray-400">Contatto non disponibile</span>}
    </div>
  );
}

export default function LeadTable({ matches }: LeadTableProps) {
  if (matches.length === 0) {
    return (
      <section className="rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center shadow-sm">
        <p className="font-black text-gray-800">Nessun lead corrisponde ai filtri</p>
        <p className="mt-2 text-sm text-gray-500">Modifica i criteri di ricerca oppure attendi nuove richieste.</p>
      </section>
    );
  }

  return (
    <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full">
          <thead className="border-b border-gray-200 bg-gray-50">
            <tr>
              <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-600">Paziente e richiesta</th>
              <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-600">Città</th>
              <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-600">Data</th>
              <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-600">Stato</th>
              <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-600">Contatti</th>
              <th className="px-5 py-4 text-right text-xs font-bold uppercase tracking-wider text-gray-600">Azioni</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {matches.map((match) => {
              const checkup = match.checkups;

              return (
                <tr key={match.id} className="transition hover:bg-gray-50">
                  <td className="px-5 py-4">
                    <p className="font-bold text-gray-950">{checkup?.patient_name || "Paziente"}</p>
                    <p className="mt-1 max-w-xs text-sm text-gray-600">{checkup?.treatment || checkup?.category || "Richiesta odontoiatrica"}</p>
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-700">
                    {checkup?.city ? <span className="inline-flex items-center gap-1.5"><MapPin className="h-4 w-4 text-gray-400" />{checkup.city}</span> : "—"}
                  </td>
                  <td className="px-5 py-4">
                    <p className="text-sm font-semibold text-gray-700">{new Date(match.created_at).toLocaleDateString("it-IT")}</p>
                    <p className="mt-0.5 text-xs text-gray-400">{new Date(match.created_at).toLocaleTimeString("it-IT", { hour: "2-digit", minute: "2-digit" })}</p>
                  </td>
                  <td className="px-5 py-4"><StatusBadge status={match.status} /></td>
                  <td className="px-5 py-4"><ContactDetails match={match} /></td>
                  <td className="px-5 py-4"><LeadActions match={match} /></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="divide-y divide-gray-100 md:hidden">
        {matches.map((match) => {
          const checkup = match.checkups;

          return (
            <article key={match.id} className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate font-black text-gray-950">{checkup?.patient_name || "Paziente"}</p>
                  <p className="mt-1 text-sm text-gray-600">{checkup?.treatment || checkup?.category || "Richiesta odontoiatrica"}</p>
                </div>
                <StatusBadge status={match.status} />
              </div>
              <div className="mt-4 flex flex-wrap gap-3 text-xs text-gray-500">
                {checkup?.city && <span className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{checkup.city}</span>}
                <span>{new Date(match.created_at).toLocaleDateString("it-IT")}</span>
              </div>
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 pt-4">
                <ContactDetails match={match} />
                <LeadActions match={match} />
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
