import Link from "next/link";
import { ArrowUpRight, Building2, ListChecks, UsersRound } from "lucide-react";

interface ClinicQuickActionsProps {
  slug: string | null;
}

export default function ClinicQuickActions({ slug }: ClinicQuickActionsProps) {
  const actions = [
    { icon: UsersRound, label: "Gestisci i lead", description: "Accetta o rifiuta le richieste ricevute.", href: "/dashboard/clinic/leads" },
    { icon: Building2, label: "Aggiorna il profilo", description: "Contatti, immagini, orari e presentazione.", href: "/dashboard/clinic/profile/general" },
    { icon: ListChecks, label: "Gestisci i servizi", description: "Prezzi, durata e descrizione dei trattamenti.", href: "/dashboard/clinic/profile/services" },
  ];

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <p className="text-xs font-bold uppercase tracking-wider text-[#0D47A1]">Azioni rapide</p>
      <h2 className="mt-1 text-xl font-black text-gray-950">Cosa vuoi fare?</h2>

      <div className="mt-5 space-y-3">
        {actions.map((action) => (
          <Link key={action.href} href={action.href} className="group flex items-center gap-4 rounded-xl border border-gray-100 p-4 transition hover:border-blue-200 hover:bg-blue-50/50">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#0D47A1]"><action.icon className="h-5 w-5" /></div>
            <div className="min-w-0 flex-1">
              <p className="font-bold text-gray-900">{action.label}</p>
              <p className="mt-0.5 text-xs leading-5 text-gray-500">{action.description}</p>
            </div>
            <ArrowUpRight className="h-4 w-4 text-gray-300 transition group-hover:text-[#0D47A1]" />
          </Link>
        ))}

        {slug && (
          <Link href={`/cliniche/${slug}`} className="group flex items-center gap-4 rounded-xl border border-emerald-100 bg-emerald-50/60 p-4 transition hover:bg-emerald-50">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-emerald-700"><ArrowUpRight className="h-5 w-5" /></div>
            <div className="min-w-0 flex-1">
              <p className="font-bold text-emerald-900">Visualizza pagina pubblica</p>
              <p className="mt-0.5 text-xs text-emerald-700">Controlla ciò che vedranno i pazienti.</p>
            </div>
          </Link>
        )}
      </div>
    </section>
  );
}
