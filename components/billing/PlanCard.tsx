import { Check, Sparkles } from "lucide-react";
import type { SaasPlan } from "@/lib/billing/plans";

function formatPrice(value: number): string {
  return new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function PlanCard({ plan }: { plan: SaasPlan }) {
  return (
    <article
      className={`relative flex h-full flex-col rounded-3xl border p-5 shadow-sm sm:p-7 ${
        plan.highlighted
          ? "border-[#0D47A1] bg-[#0D47A1] text-white shadow-blue-950/15"
          : "border-slate-200 bg-white text-slate-950"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p
            className={`text-xs font-black uppercase tracking-[0.18em] ${
              plan.highlighted ? "text-cyan-200" : "text-[#0D47A1]"
            }`}
          >
            {plan.badge}
          </p>
          <h2 className="mt-2 text-2xl font-black">{plan.name}</h2>
        </div>
        {plan.highlighted && (
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10">
            <Sparkles className="h-5 w-5" />
          </span>
        )}
      </div>

      <p className={`mt-4 text-sm leading-6 ${plan.highlighted ? "text-blue-100" : "text-slate-600"}`}>
        {plan.description}
      </p>

      <div className="mt-6">
        <div className="flex items-end gap-2">
          <span className="text-4xl font-black">{formatPrice(plan.monthlyPrice)}</span>
          <span className={`pb-1 text-sm ${plan.highlighted ? "text-blue-100" : "text-slate-500"}`}>/mese</span>
        </div>
        <p className={`mt-1 text-xs font-semibold ${plan.highlighted ? "text-cyan-100" : "text-slate-500"}`}>
          {plan.annualPrice > 0 ? `${formatPrice(plan.annualPrice)} con pagamento annuale` : "Nessun costo mensile"}
        </p>
      </div>

      <div className={`my-6 h-px ${plan.highlighted ? "bg-white/15" : "bg-slate-200"}`} />

      <ul className="space-y-3">
        {plan.features.map((feature) => (
          <li key={feature} className="flex gap-3 text-sm leading-5">
            <span
              className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                plan.highlighted ? "bg-emerald-300 text-emerald-950" : "bg-emerald-50 text-emerald-700"
              }`}
            >
              <Check className="h-3.5 w-3.5" />
            </span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <div className={`mt-6 rounded-2xl p-4 ${plan.highlighted ? "bg-white/10" : "bg-slate-50"}`}>
        <p className="text-xs font-black uppercase tracking-wider">Condizioni beta</p>
        <ul className={`mt-2 space-y-1.5 text-xs leading-5 ${plan.highlighted ? "text-blue-100" : "text-slate-600"}`}>
          {plan.limits.map((limit) => (
            <li key={limit}>• {limit}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}
