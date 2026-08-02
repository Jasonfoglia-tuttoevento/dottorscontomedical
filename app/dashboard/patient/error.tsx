"use client";

export default function PatientDashboardError({ reset }: { reset: () => void }) {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-16">
      <div className="mx-auto max-w-lg rounded-2xl border border-rose-200 bg-white p-6 text-center shadow-sm">
        <h1 className="text-xl font-black text-gray-950">Dashboard non disponibile</h1>
        <p className="mt-2 text-sm text-gray-600">Non è stato possibile caricare le richieste. Riprova tra pochi secondi.</p>
        <button type="button" onClick={reset} className="mt-6 inline-flex min-h-11 items-center justify-center rounded-xl bg-[#0D47A1] px-5 py-3 text-sm font-bold text-white hover:bg-[#0B3B86]">
          Riprova
        </button>
      </div>
    </div>
  );
}
