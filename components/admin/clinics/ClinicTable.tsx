import Link from "next/link";
import { Building2, ExternalLink, Mail, MapPin } from "lucide-react";
import ClinicVerificationButton from "@/components/admin/clinics/ClinicVerificationButton";
import AdminEmptyState from "@/components/admin/shared/AdminEmptyState";
import type { AdminClinicListItem } from "@/lib/admin/clinics/types";

function formatDate(value: string): string {
  return new Intl.DateTimeFormat("it-IT", { dateStyle: "medium" }).format(
    new Date(value),
  );
}

function PublicProfileLink({ clinicId }: { clinicId: string }) {
  return (
    <Link
      href={`/cliniche/${clinicId}`}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-xl border border-slate-200 px-3 py-2 text-xs font-black text-slate-700 transition hover:border-[#0D47A1] hover:text-[#0D47A1]"
    >
      Profilo
      <ExternalLink className="h-3.5 w-3.5" />
    </Link>
  );
}

function VerificationBadge({ verified }: { verified: boolean }) {
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-black ${
        verified
          ? "bg-emerald-50 text-emerald-700"
          : "bg-amber-50 text-amber-700"
      }`}
    >
      {verified ? "Verificata" : "Da verificare"}
    </span>
  );
}

export default function ClinicTable({
  clinics,
}: {
  clinics: AdminClinicListItem[];
}) {
  if (clinics.length === 0) {
    return (
      <AdminEmptyState
        icon={Building2}
        title="Nessuna clinica trovata"
        description="Modifica i filtri oppure attendi una nuova registrazione alla piattaforma."
      />
    );
  }

  return (
    <>
      <div className="space-y-4 md:hidden">
        {clinics.map((clinic) => (
          <article key={clinic.id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="break-words font-black text-slate-900">{clinic.name}</p>
                <p className="mt-1 text-xs font-semibold text-slate-500">
                  {clinic.category ?? "Categoria non inserita"}
                </p>
              </div>
              <VerificationBadge verified={clinic.verified} />
            </div>

            <dl className="mt-4 space-y-3 border-y border-slate-100 py-4 text-sm">
              <div className="flex items-start gap-2 text-slate-600">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
                <span>{clinic.city ?? "Località non indicata"}</span>
              </div>
              <div className="flex items-start gap-2 text-slate-600">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
                <span className="min-w-0 break-all">{clinic.email ?? "Email non indicata"}</span>
              </div>
              <div className="text-xs font-semibold text-slate-500">
                Registrata il {formatDate(clinic.createdAt)}
              </div>
              <div className="break-all font-mono text-[10px] text-slate-400">{clinic.id}</div>
            </dl>

            <div className="mt-4 flex flex-wrap items-start gap-2">
              <PublicProfileLink clinicId={clinic.id} />
              <ClinicVerificationButton clinicId={clinic.id} verified={clinic.verified} />
            </div>
          </article>
        ))}
      </div>

      <div className="hidden overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm md:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[880px] text-left">
            <thead className="bg-slate-50 text-[11px] font-black uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-5 py-4">Clinica</th>
                <th className="px-5 py-4">Località</th>
                <th className="px-5 py-4">Contatto</th>
                <th className="px-5 py-4">Registrazione</th>
                <th className="px-5 py-4">Stato</th>
                <th className="px-5 py-4 text-right">Azioni</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {clinics.map((clinic) => (
                <tr key={clinic.id} className="align-top transition hover:bg-slate-50/70">
                  <td className="px-5 py-4">
                    <p className="font-black text-slate-900">{clinic.name}</p>
                    <p className="mt-1 text-xs font-semibold text-slate-500">
                      {clinic.category ?? "Categoria non inserita"}
                    </p>
                    <p className="mt-1 font-mono text-[10px] text-slate-400">{clinic.id}</p>
                  </td>
                  <td className="px-5 py-4 text-sm font-semibold text-slate-600">
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="h-4 w-4 text-slate-400" />
                      {clinic.city ?? "Non indicata"}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-sm font-semibold text-slate-600">
                    <span className="inline-flex items-center gap-1.5">
                      <Mail className="h-4 w-4 text-slate-400" />
                      {clinic.email ?? "Non indicata"}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-sm font-semibold text-slate-600">{formatDate(clinic.createdAt)}</td>
                  <td className="px-5 py-4"><VerificationBadge verified={clinic.verified} /></td>
                  <td className="px-5 py-4">
                    <div className="flex items-start justify-end gap-2">
                      <PublicProfileLink clinicId={clinic.id} />
                      <ClinicVerificationButton clinicId={clinic.id} verified={clinic.verified} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
