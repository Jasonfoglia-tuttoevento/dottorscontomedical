import type { ClinicAnalyticsDay } from "@/lib/types/analytics";

interface ClinicAnalyticsChartProps {
  days: ClinicAnalyticsDay[];
}

export default function ClinicAnalyticsChart({ days }: ClinicAnalyticsChartProps) {
  const visibleDays = days.slice(-14);
  const maxValue = Math.max(1, ...visibleDays.flatMap((day) => [day.views, day.clicks]));

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div>
        <p className="text-xs font-black uppercase tracking-[0.14em] text-[#0D47A1]">Ultimi 14 giorni</p>
        <h3 className="mt-1 text-xl font-black text-slate-950">Visualizzazioni e azioni</h3>
        <p className="mt-2 text-sm text-slate-500">Blu: visite al profilo. Verde: click su contatti, sito o richiesta.</p>
      </div>

      {visibleDays.length === 0 ? (
        <div className="mt-6 rounded-2xl bg-slate-50 p-6 text-sm text-slate-600">
          I dati compariranno dopo le prime visite al profilo pubblico.
        </div>
      ) : (
        <div className="mt-7 overflow-x-auto pb-2">
          <div className="flex min-w-[680px] items-end gap-3" aria-label="Grafico analitiche giornaliere">
            {visibleDays.map((day) => (
              <div key={day.date} className="flex min-w-10 flex-1 flex-col items-center gap-2">
                <div className="flex h-44 w-full items-end justify-center gap-1.5 rounded-xl bg-slate-50 px-1.5 pt-3">
                  <div
                    className="w-3 rounded-t-md bg-[#0D47A1]"
                    style={{ height: `${Math.max(4, (day.views / maxValue) * 100)}%` }}
                    title={`${day.views} visualizzazioni`}
                  />
                  <div
                    className="w-3 rounded-t-md bg-[#00A98F]"
                    style={{ height: `${Math.max(4, (day.clicks / maxValue) * 100)}%` }}
                    title={`${day.clicks} azioni`}
                  />
                </div>
                <span className="text-[11px] font-bold text-slate-500">{day.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
