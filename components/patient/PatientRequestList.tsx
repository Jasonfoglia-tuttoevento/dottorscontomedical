import Link from "next/link";
import { ArrowRight, Clock, FileText, MapPin } from "lucide-react";
import PatientStatusBadge from "@/components/patient/PatientStatusBadge";
import type { Checkup } from "@/lib/types/database";

interface PatientRequestListProps {
  checkups: Checkup[];
  compact?: boolean;
}

export default function PatientRequestList({ checkups, compact = false }: PatientRequestListProps) {
  if (checkups.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-7 text-center sm:p-10">
        <FileText className="mx-auto h-9 w-9 text-slate-300" />
        <h2 className="mt-4 text-lg font-black text-slate-950">Nessuna richiesta trovata</h2>
        <p className="mt-2 text-sm text-slate-500">Invia la prima richiesta per iniziare.</p>
        <Link href="/check-up" className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#0D47A1] px-5 py-3 text-sm font-black text-white">
          Nuova richiesta <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="divide-y divide-slate-100 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      {checkups.map((checkup) => (
        <article key={checkup.id} className="p-4 sm:p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <h3 className="break-words font-black text-slate-950">{checkup.treatment}</h3>
              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-xs font-semibold text-slate-500">
                <span className="inline-flex items-center gap-1.5"><FileText className="h-3.5 w-3.5" />{checkup.category}</span>
                {checkup.city && <span className="inline-flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" />{checkup.city}</span>}
                <span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />{new Date(checkup.created_at).toLocaleDateString("it-IT")}</span>
              </div>
              {!compact && checkup.notes && (
                <p className="mt-3 break-words rounded-xl bg-slate-50 p-3 text-sm italic leading-6 text-slate-600">“{checkup.notes}”</p>
              )}
            </div>
            <PatientStatusBadge status={checkup.status} />
          </div>
        </article>
      ))}
    </div>
  );
}
