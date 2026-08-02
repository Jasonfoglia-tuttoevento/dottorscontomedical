import { Activity, Building2, CheckCircle2, ClipboardList, Users } from "lucide-react";

const modules = [
  {
    label: "Gestione cliniche",
    description: "Ricerca, filtri e verifica delle strutture.",
    icon: Building2,
    completed: true,
  },
  {
    label: "Gestione utenti",
    description: "Profili, ruoli e collegamenti alle cliniche.",
    icon: Users,
    completed: true,
  },
  {
    label: "Gestione check-up",
    description: "Controllo richieste, stati e assegnazioni.",
    icon: ClipboardList,
    completed: false,
  },
  {
    label: "Analytics",
    description: "Trend, conversioni e performance operative.",
    icon: Activity,
    completed: false,
  },
];

export default function AdminRoadmap() {
  return (
    <section className="rounded-3xl bg-slate-950 p-5 text-white shadow-sm sm:p-6">
      <p className="text-sm font-bold text-emerald-300">Avanzamento dashboard</p>
      <h2 className="mt-1 text-xl font-black">Moduli amministrativi</h2>
      <p className="mt-2 text-sm leading-6 text-slate-400">
        Cliniche e utenti sono operativi. Il prossimo blocco coprirà check-up, lead e analytics.
      </p>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
        {modules.map((module) => {
          const Icon = module.icon;
          return (
            <div key={module.label} className="flex gap-3 rounded-2xl border border-slate-800 bg-slate-900/80 p-3">
              <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                module.completed
                  ? "bg-emerald-400/10 text-emerald-300"
                  : "bg-slate-800 text-slate-400"
              }`}>
                {module.completed ? <CheckCircle2 className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
              </span>
              <div>
                <h3 className="text-sm font-black">{module.label}</h3>
                <p className="mt-1 text-xs leading-5 text-slate-400">{module.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
