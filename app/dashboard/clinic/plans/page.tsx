import PlanComparison from "@/components/billing/PlanComparison";

export default function ClinicPlansPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div>
        <p className="text-xs font-black uppercase tracking-[0.16em] text-[#0D47A1]">Offerta SaaS</p>
        <h2 className="mt-1 text-2xl font-black text-slate-950 sm:text-3xl">Scegli il livello di visibilità</h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600 sm:text-base">
          Il piano Free permette di entrare in piattaforma; il Plus è pensato per le cliniche che vogliono accelerare acquisizione e presenza commerciale.
        </p>
      </div>
      <PlanComparison audience="clinic" />
    </div>
  );
}
