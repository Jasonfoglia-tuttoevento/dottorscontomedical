import { AlertTriangle, CheckCircle2, Database } from "lucide-react";

interface AdminSystemStatusProps {
  unavailableSources: string[];
}

export default function AdminSystemStatus({
  unavailableSources,
}: AdminSystemStatusProps) {
  const healthy = unavailableSources.length === 0;

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-bold text-[#0D47A1]">Controllo dati</p>
          <h2 className="text-xl font-black text-slate-950">Stato connessioni</h2>
        </div>
        <span className={`flex h-11 w-11 items-center justify-center rounded-2xl ${
          healthy ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
        }`}>
          {healthy ? <CheckCircle2 className="h-5 w-5" /> : <AlertTriangle className="h-5 w-5" />}
        </span>
      </div>

      <div className={`mt-5 rounded-2xl border p-4 ${
        healthy
          ? "border-emerald-200 bg-emerald-50"
          : "border-amber-200 bg-amber-50"
      }`}>
        <div className="flex items-start gap-3">
          <Database className={`mt-0.5 h-5 w-5 shrink-0 ${
            healthy ? "text-emerald-700" : "text-amber-700"
          }`} />
          <div>
            <p className={`text-sm font-black ${
              healthy ? "text-emerald-900" : "text-amber-900"
            }`}>
              {healthy ? "Dati disponibili" : "Accesso dati parziale"}
            </p>
            <p className={`mt-1 text-xs font-medium leading-5 ${
              healthy ? "text-emerald-800" : "text-amber-800"
            }`}>
              {healthy
                ? "Le query amministrative hanno risposto correttamente."
                : `Verifica le policy RLS per: ${unavailableSources.join(", ")}.`}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
