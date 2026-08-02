import Link from "next/link";
import { Activity, ArrowUpRight, Building2, Sparkles, Users } from "lucide-react";

const modules = [
  {
    title: "Gestione cliniche",
    description: "Verifica, ricerca e controlla le strutture presenti in piattaforma.",
    href: "/dashboard/admin/clinics",
    icon: Building2,
  },
  {
    title: "Gestione utenti",
    description: "Controlla ruoli, profili mancanti e collegamenti alle cliniche.",
    href: "/dashboard/admin/users",
    icon: Users,
  },
  {
    title: "Attività recente",
    description: "Consulta gli ultimi eventi senza appesantire la panoramica.",
    href: "/dashboard/admin/activity",
    icon: Activity,
  },
  {
    title: "Offerta SaaS",
    description: "Rivedi costi e differenze tra piano Free e piano Plus.",
    href: "/dashboard/admin/plans",
    icon: Sparkles,
  },
] as const;

export default function AdminModuleGrid() {
  return (
    <section>
      <div className="mb-4">
        <p className="text-sm font-black text-[#0D47A1]">Sezioni operative</p>
        <h2 className="text-xl font-black text-slate-950">Apri solo ciò che ti serve</h2>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {modules.map((module) => {
          const Icon = module.icon;
          return (
            <Link
              key={module.href}
              href={module.href}
              className="group flex min-h-40 flex-col rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-[#0D47A1]">
                  <Icon className="h-5 w-5" />
                </span>
                <ArrowUpRight className="h-5 w-5 text-slate-300 transition group-hover:text-[#0D47A1]" />
              </div>
              <h3 className="mt-5 font-black text-slate-950">{module.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{module.description}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
