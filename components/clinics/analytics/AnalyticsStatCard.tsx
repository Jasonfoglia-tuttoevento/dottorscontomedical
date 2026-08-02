import type { LucideIcon } from "lucide-react";
import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";

interface AnalyticsStatCardProps {
  label: string;
  value: string;
  detail: string;
  trend: number | null;
  icon: LucideIcon;
}

export default function AnalyticsStatCard({
  label,
  value,
  detail,
  trend,
  icon: Icon,
}: AnalyticsStatCardProps) {
  const TrendIcon = trend === null ? Minus : trend >= 0 ? ArrowUpRight : ArrowDownRight;
  const trendLabel = trend === null ? "Primo periodo" : `${trend > 0 ? "+" : ""}${trend}%`;

  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">{label}</p>
          <p className="mt-3 text-3xl font-black tracking-tight text-slate-950">{value}</p>
        </div>
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-[#0D47A1]">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
      </div>
      <div className="mt-4 flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
        <p className="text-xs leading-relaxed text-slate-500">{detail}</p>
        <span className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-xs font-black ${
          trend !== null && trend < 0
            ? "bg-rose-50 text-rose-700"
            : "bg-emerald-50 text-emerald-700"
        }`}>
          <TrendIcon className="h-3.5 w-3.5" aria-hidden="true" />
          {trendLabel}
        </span>
      </div>
    </article>
  );
}
