import { Building2, ClipboardList } from "lucide-react";
import type { AdminActivity } from "@/lib/admin/types";

interface AdminRecentActivityProps {
  activities: AdminActivity[];
}

const statusLabels: Record<string, string> = {
  new: "Nuova",
  contacted: "Contattata",
  converted: "Completata",
};

function formatDate(value: string): string {
  return new Intl.DateTimeFormat("it-IT", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export default function AdminRecentActivity({ activities }: AdminRecentActivityProps) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-5">
        <p className="text-sm font-bold text-[#0D47A1]">Aggiornamenti</p>
        <h2 className="text-xl font-black text-slate-950">Attività recenti</h2>
      </div>

      {activities.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-5 py-10 text-center">
          <p className="font-bold text-slate-700">Nessuna attività disponibile</p>
          <p className="mt-1 text-sm text-slate-500">
            Le nuove registrazioni e richieste compariranno qui.
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {activities.map((activity) => {
            const Icon = activity.kind === "clinic" ? Building2 : ClipboardList;
            return (
              <article
                key={activity.id}
                className="flex items-start gap-4 rounded-2xl px-3 py-3 transition hover:bg-slate-50"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#0D47A1]">
                  <Icon className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h3 className="truncate text-sm font-black text-slate-900">
                        {activity.title}
                      </h3>
                      <p className="text-xs font-medium text-slate-500">
                        {activity.description}
                      </p>
                    </div>
                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-600">
                      {statusLabels[activity.status] ?? activity.status}
                    </span>
                  </div>
                  <time className="mt-2 block text-[11px] font-semibold text-slate-400">
                    {formatDate(activity.occurredAt)}
                  </time>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
