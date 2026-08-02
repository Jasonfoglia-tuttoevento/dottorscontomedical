import { Eye, MousePointerClick, Percent, Users } from "lucide-react";
import AnalyticsStatCard from "@/components/clinics/analytics/AnalyticsStatCard";
import ClinicAnalyticsBreakdown from "@/components/clinics/analytics/ClinicAnalyticsBreakdown";
import ClinicAnalyticsChart from "@/components/clinics/analytics/ClinicAnalyticsChart";
import type { ClinicAnalyticsData } from "@/lib/types/analytics";

interface ClinicVisibilityAnalyticsProps {
  data: ClinicAnalyticsData;
}

const DATE_FORMATTER = new Intl.DateTimeFormat("it-IT", {
  day: "2-digit",
  month: "long",
  year: "numeric",
});

export default function ClinicVisibilityAnalytics({ data }: ClinicVisibilityAnalyticsProps) {
  if (!data.available) {
    return (
      <section className="rounded-3xl border border-amber-200 bg-amber-50 p-6">
        <p className="text-xs font-black uppercase tracking-[0.14em] text-amber-800">Analitiche in attivazione</p>
        <h3 className="mt-2 text-xl font-black text-amber-950">Completa la migration Supabase</h3>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-amber-900/80">
          La dashboard è pronta, ma il database deve ancora ricevere la tabella eventi e le funzioni protette.
        </p>
      </section>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.16em] text-[#0D47A1]">Visibilità marketplace</p>
          <h2 className="mt-1 text-2xl font-black text-slate-950 sm:text-3xl">Interesse generato dal profilo</h2>
          <p className="mt-2 text-sm text-slate-600">
            Dati reali degli ultimi {data.days} giorni. I conteggi iniziano dal momento dell&apos;attivazione.
          </p>
        </div>
        {data.trackingSince && (
          <p className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600">
            Raccolta attiva dal {DATE_FORMATTER.format(new Date(data.trackingSince))}
          </p>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <AnalyticsStatCard
          label="Visualizzazioni"
          value={data.views.toLocaleString("it-IT")}
          detail="Aperture del profilo pubblico"
          trend={data.viewsTrend}
          icon={Eye}
        />
        <AnalyticsStatCard
          label="Visitatori unici"
          value={data.uniqueVisitors.toLocaleString("it-IT")}
          detail="Persone distinte stimate"
          trend={data.visitorsTrend}
          icon={Users}
        />
        <AnalyticsStatCard
          label="Azioni di contatto"
          value={data.clicks.toLocaleString("it-IT")}
          detail="Telefono, email, sito e richieste"
          trend={data.clicksTrend}
          icon={MousePointerClick}
        />
        <AnalyticsStatCard
          label="Tasso di interazione"
          value={`${data.clickThroughRate.toLocaleString("it-IT")}%`}
          detail="Azioni rispetto alle visualizzazioni"
          trend={null}
          icon={Percent}
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.55fr)]">
        <ClinicAnalyticsChart days={data.daily} />
        <ClinicAnalyticsBreakdown data={data} />
      </div>

      <p className="text-xs leading-relaxed text-slate-500">
        Il sistema usa identificativi pseudonimi nel browser per stimare visitatori e sessioni. Non registra nome, email, IP o dati sanitari.
      </p>
    </div>
  );
}
