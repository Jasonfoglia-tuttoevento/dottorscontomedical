import { Globe, Mail, MousePointerClick, Phone, Stethoscope } from "lucide-react";
import type { ClinicAnalyticsData } from "@/lib/types/analytics";

interface ClinicAnalyticsBreakdownProps {
  data: ClinicAnalyticsData;
}

const ITEMS = [
  { key: "phoneClicks", label: "Click telefono", icon: Phone },
  { key: "emailClicks", label: "Click email", icon: Mail },
  { key: "websiteClicks", label: "Visite al sito", icon: Globe },
  { key: "requestClicks", label: "Avvio richiesta", icon: Stethoscope },
] as const;

export default function ClinicAnalyticsBreakdown({ data }: ClinicAnalyticsBreakdownProps) {
  const maxValue = Math.max(1, ...ITEMS.map((item) => data[item.key]));

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex items-center gap-3">
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-[#008F79]">
          <MousePointerClick className="h-5 w-5" aria-hidden="true" />
        </span>
        <div>
          <h3 className="text-xl font-black text-slate-950">Azioni generate</h3>
          <p className="text-sm text-slate-500">Dove gli utenti hanno mostrato interesse.</p>
        </div>
      </div>

      <div className="mt-6 space-y-5">
        {ITEMS.map(({ key, label, icon: Icon }) => {
          const value = data[key];
          const width = `${Math.max(value > 0 ? 7 : 0, (value / maxValue) * 100)}%`;

          return (
            <div key={key}>
              <div className="flex items-center justify-between gap-3 text-sm">
                <span className="inline-flex items-center gap-2 font-bold text-slate-700">
                  <Icon className="h-4 w-4 text-slate-400" aria-hidden="true" />
                  {label}
                </span>
                <span className="font-black text-slate-950">{value}</span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                <div className="h-full rounded-full bg-[#00A98F]" style={{ width }} />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
