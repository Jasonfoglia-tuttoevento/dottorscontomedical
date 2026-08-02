"use client";

import { AlertTriangle } from "lucide-react";

export default function ClinicDashboardError({ reset }: { reset: () => void }) {
  return (
    <div className="mx-auto max-w-2xl rounded-3xl border border-red-100 bg-white p-10 text-center shadow-sm">
      <AlertTriangle className="mx-auto h-10 w-10 text-red-500" />
      <h1 className="mt-5 text-2xl font-black text-gray-950">Dashboard temporaneamente non disponibile</h1>
      <p className="mt-2 text-gray-600">Non siamo riusciti a recuperare i dati della clinica. Riprova tra qualche secondo.</p>
      <button type="button" onClick={reset} className="mt-6 rounded-xl bg-[#0D47A1] px-5 py-3 text-sm font-bold text-white hover:bg-[#0B3B86]">Riprova</button>
    </div>
  );
}
