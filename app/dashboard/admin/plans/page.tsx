import PlanComparison from "@/components/billing/PlanComparison";

export default function AdminPlansPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div>
        <p className="text-xs font-black uppercase tracking-[0.16em] text-[#0D47A1]">Strategia commerciale</p>
        <h2 className="mt-1 text-2xl font-black text-slate-950 sm:text-3xl">Piani Free e Plus</h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600 sm:text-base">
          Questa è la proposta beta da presentare alle cliniche. Costi e funzioni sono centralizzati in un unico file per poterli modificare senza toccare le pagine.
        </p>
      </div>
      <PlanComparison audience="admin" />
    </div>
  );
}
