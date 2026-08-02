import PlanComparison from "@/components/billing/PlanComparison";

export default function ClinicPlansPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div>
        <p className="text-xs font-black uppercase tracking-[0.16em] text-[#0D47A1]">
          Visibilità e acquisizione
        </p>

        <h2 className="mt-1 text-2xl font-black text-slate-950 sm:text-3xl">
          Scegli il livello di crescita della clinica
        </h2>

        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600 sm:text-base">
          Free offre una presenza digitale essenziale. Plus è un servizio
          gestito che combina tecnologia, posizionamento, analitiche,
          ottimizzazione multilingua e supporto commerciale dedicato.
        </p>
      </div>

      <PlanComparison audience="clinic" />
    </div>
  );
}
