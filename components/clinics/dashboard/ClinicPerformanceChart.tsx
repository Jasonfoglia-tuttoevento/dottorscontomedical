import type { ClinicMonthlyPerformance } from "@/lib/data/clinic-dashboard";

interface ClinicPerformanceChartProps {
  data: ClinicMonthlyPerformance[];
  responseRate: number;
}

export default function ClinicPerformanceChart({ data, responseRate }: ClinicPerformanceChartProps) {
  const maxLeads = Math.max(...data.map((item) => item.leads), 1);

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-3 border-b border-gray-100 pb-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-[#0D47A1]">Performance</p>
          <h2 className="mt-1 text-xl font-black text-gray-950">Andamento degli ultimi 6 mesi</h2>
          <p className="mt-1 text-sm text-gray-500">Dati reali dei lead assegnati alla clinica.</p>
        </div>
        <div className="rounded-xl bg-emerald-50 px-4 py-3 text-right">
          <p className="text-xs font-semibold text-emerald-700">Tasso di risposta</p>
          <p className="text-2xl font-black text-emerald-800">{responseRate}%</p>
        </div>
      </div>

      <div className="mt-6 space-y-5">
        {data.map((item) => {
          const leadWidth = item.leads > 0 ? Math.max((item.leads / maxLeads) * 100, 8) : 0;
          const acceptedWidth = item.leads > 0 ? (item.accepted / item.leads) * leadWidth : 0;

          return (
            <div key={item.key}>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="font-bold text-gray-700">{item.label}</span>
                <span className="text-gray-500">{item.leads} lead · {item.accepted} accettati</span>
              </div>
              <div className="relative h-8 overflow-hidden rounded-lg bg-gray-100">
                <div className="absolute inset-y-0 left-0 rounded-lg bg-blue-200 transition-all" style={{ width: `${leadWidth}%` }} />
                <div className="absolute inset-y-0 left-0 rounded-lg bg-gradient-to-r from-[#0D47A1] to-[#00A98F] transition-all" style={{ width: `${acceptedWidth}%` }} />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex flex-wrap gap-5 border-t border-gray-100 pt-4 text-xs font-semibold text-gray-500">
        <span className="inline-flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-blue-200" />Lead ricevuti</span>
        <span className="inline-flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-[#00A98F]" />Lead accettati</span>
      </div>
    </section>
  );
}
