import Link from "next/link";
import { ArrowRight, BadgeCheck, CheckCircle2, Clock3, ListChecks } from "lucide-react";

interface ClinicPriorityPanelProps {
  pendingLeads: number;
  missingProfileItems: string[];
  verified: boolean;
}

export default function ClinicPriorityPanel({
  pendingLeads,
  missingProfileItems,
  verified,
}: ClinicPriorityPanelProps) {
  const priorities = [];

  if (pendingLeads > 0) {
    priorities.push({
      key: "leads",
      icon: Clock3,
      eyebrow: "Priorità alta",
      title: `${pendingLeads} ${pendingLeads === 1 ? "lead attende" : "lead attendono"} una risposta`,
      description: "Gestisci rapidamente le richieste per non perdere opportunità commerciali.",
      href: "/dashboard/clinic/leads?status=pending",
      cta: "Gestisci ora",
      className: "border-amber-200 bg-amber-50 text-amber-950",
      iconClassName: "bg-white text-amber-700",
    });
  }

  if (missingProfileItems.length > 0) {
    priorities.push({
      key: "profile",
      icon: ListChecks,
      eyebrow: "Visibilità",
      title: "Completa le informazioni del profilo",
      description: `Mancano ancora ${missingProfileItems.slice(0, 2).join(" e ")}.`,
      href: "/dashboard/clinic/profile/general",
      cta: "Completa profilo",
      className: "border-blue-200 bg-blue-50 text-blue-950",
      iconClassName: "bg-white text-[#0D47A1]",
    });
  }

  if (!verified) {
    priorities.push({
      key: "verification",
      icon: BadgeCheck,
      eyebrow: "Stato profilo",
      title: "Verifica amministrativa in attesa",
      description: "Mantieni i dati completi: lo staff controllerà la struttura prima della pubblicazione verificata.",
      href: "/dashboard/clinic/profile/general",
      cta: "Controlla i dati",
      className: "border-violet-200 bg-violet-50 text-violet-950",
      iconClassName: "bg-white text-violet-700",
    });
  }

  if (priorities.length === 0) {
    return (
      <section className="flex flex-col gap-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-emerald-700">
            <CheckCircle2 className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">Operatività in ordine</p>
            <h2 className="mt-1 font-black text-emerald-950">Non ci sono azioni urgenti</h2>
            <p className="mt-1 text-sm text-emerald-800">Continua a monitorare i nuovi lead e mantieni aggiornati servizi e contatti.</p>
          </div>
        </div>
        <Link href="/dashboard/clinic/leads" className="inline-flex shrink-0 items-center gap-2 text-sm font-bold text-emerald-800">
          Apri i lead <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    );
  }

  return (
    <section aria-labelledby="clinic-priorities-title">
      <div className="mb-3 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-[#0D47A1]">Centro azioni</p>
          <h2 id="clinic-priorities-title" className="mt-1 text-lg font-black text-gray-950">Priorità operative</h2>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        {priorities.slice(0, 3).map((priority) => (
          <article key={priority.key} className={`rounded-2xl border p-5 ${priority.className}`}>
            <div className="flex items-start gap-4">
              <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${priority.iconClassName}`}>
                <priority.icon className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-black uppercase tracking-[0.18em] opacity-70">{priority.eyebrow}</p>
                <h3 className="mt-1 font-black leading-snug">{priority.title}</h3>
                <p className="mt-2 text-sm leading-6 opacity-80">{priority.description}</p>
                <Link href={priority.href} className="mt-4 inline-flex items-center gap-2 text-sm font-black">
                  {priority.cta} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
