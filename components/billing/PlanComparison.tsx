import PlanCard from "@/components/billing/PlanCard";
import { plansDisclaimer, saasPlans } from "@/lib/billing/plans";

interface PlanComparisonProps {
  audience?: "clinic" | "admin";
}

export default function PlanComparison({ audience = "clinic" }: PlanComparisonProps) {
  return (
    <div className="space-y-5">
      <div className="grid gap-5 lg:grid-cols-2">
        {saasPlans.map((plan) => (
          <PlanCard key={plan.id} plan={plan} />
        ))}
      </div>

      <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-900">
        <strong>{audience === "admin" ? "Nota operativa: " : "Versione beta: "}</strong>
        {plansDisclaimer}
      </div>
    </div>
  );
}
