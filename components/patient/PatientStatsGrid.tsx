import type { Checkup } from "@/lib/types/database";

export default function PatientStatsGrid({ checkups }: { checkups: Checkup[] }) {
  const stats = [
    { label: "Totale", value: checkups.length, className: "text-slate-950" },
    { label: "In attesa", value: checkups.filter((item) => item.status === "new").length, className: "text-blue-700" },
    { label: "Contattati", value: checkups.filter((item) => item.status === "contacted").length, className: "text-amber-700" },
    { label: "Completati", value: checkups.filter((item) => item.status === "converted").length, className: "text-emerald-700" },
  ];

  return (
    <section className="grid grid-cols-2 gap-3 md:grid-cols-4" aria-label="Riepilogo richieste">
      {stats.map((stat) => (
        <article key={stat.label} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 sm:text-xs">{stat.label}</p>
          <p className={`mt-2 text-2xl font-black sm:text-3xl ${stat.className}`}>{stat.value}</p>
        </article>
      ))}
    </section>
  );
}
