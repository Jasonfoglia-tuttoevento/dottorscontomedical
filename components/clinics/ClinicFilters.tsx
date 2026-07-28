"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { MapPin, CheckCircle2, SlidersHorizontal } from "lucide-react";

// Lista città hardcoded per ora (in futuro potremmo farle dinamiche da DB)
const CITIES = ["Milano", "Roma", "Napoli", "Torino", "Bologna", "Firenze"];

export default function ClinicFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCity = searchParams.get("city") || "";
  const currentVerified = searchParams.get("verified") === "true";

  // Funzione helper per aggiornare URL senza ricaricare la pagina
  const updateFilter = (key: string, value: string | boolean) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === "" || value === false) {
      params.delete(key);
    } else {
      params.set(key, String(value));
    }

    router.push(`/cliniche?${params.toString()}`);
  };

  return (
    <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm sticky top-28">

      {/* Header Filtri */}
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-50">
        <div className="w-10 h-10 bg-[#E6FAF5] rounded-xl flex items-center justify-center text-[#0D47A1]">
          <SlidersHorizontal className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-bold text-gray-900">Filtra Risultati</h3>
          <p className="text-xs text-gray-400">Affina la tua ricerca</p>
        </div>
      </div>

      {/* Filtro Città */}
      <div className="mb-8">
        <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
          <MapPin className="w-4 h-4 text-gray-400" /> Zona Geografica
        </label>
        <select
          value={currentCity}
          onChange={(e) => updateFilter("city", e.target.value)}
          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#00B39A]/20 focus:border-[#00B39A] transition-all appearance-none cursor-pointer"
        >
          <option value="">Tutte le città</option>
          {CITIES.map(city => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
      </div>

      {/* Filtro profili in evidenza; il campo tecnico `verified` resta invariato. */}
      <div className="mb-8">
        <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-gray-400" /> Profili in evidenza
        </label>

        <button
          onClick={() => updateFilter("verified", !currentVerified)}
          className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-all ${
            currentVerified
              ? "bg-green-50 border-green-200 text-green-700"
              : "bg-gray-50 border-gray-200 text-gray-500 hover:bg-gray-100"
          }`}
        >
          <span className="text-sm font-medium">Solo profili in evidenza</span>
          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
            currentVerified ? "bg-green-500 border-green-500" : "border-gray-300"
          }`}>
            {currentVerified && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
          </div>
        </button>
      </div>

      {/* Reset Filtri (appare solo se ci sono filtri attivi) */}
      {(currentCity || currentVerified) && (
        <button
          onClick={() => router.push("/cliniche")}
          className="w-full py-3 text-sm font-bold text-[#0D47A1] hover:bg-[#E6FAF5] rounded-xl transition-colors"
        >
          Resetta tutti i filtri
        </button>
      )}

    </div>
  );
}
