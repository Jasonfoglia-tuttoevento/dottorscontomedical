"use client";

import { AlertTriangle, RotateCcw } from "lucide-react";

export default function AdminDashboardError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto flex min-h-[55vh] max-w-2xl items-center justify-center">
      <div className="w-full rounded-3xl border border-rose-200 bg-white p-8 text-center shadow-sm">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 text-rose-700">
          <AlertTriangle className="h-7 w-7" />
        </span>
        <h2 className="mt-5 text-2xl font-black text-slate-950">
          Dashboard temporaneamente non disponibile
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Si è verificato un problema nel caricamento dei dati amministrativi.
        </p>
        <button
          type="button"
          onClick={reset}
          className="mx-auto mt-6 flex items-center gap-2 rounded-xl bg-[#0D47A1] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#0B3B86]"
        >
          <RotateCcw className="h-4 w-4" />
          Riprova
        </button>
      </div>
    </div>
  );
}
