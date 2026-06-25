"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Save, MapPin } from "lucide-react";

interface Clinic {
  id: string;
  address: string | null;
  city: string | null;
}

export default function LocationSection({ clinic }: { clinic: Clinic }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    address: clinic.address || "",
    city: clinic.city || "",
  });
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase
      .from("clinics")
      .update(formData)
      .eq("id", clinic.id);

    if (!error) {
      alert("Indirizzo aggiornato con successo!");
    }

    setLoading(false);
  };

  return (
    <section id="location" className="bg-white rounded-xl border border-gray-200 shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-900">Indirizzo e Posizione</h2>
        <p className="text-sm text-gray-600 mt-1">
          Dove si trova la tua clinica
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Città */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Città *
          </label>
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              style={{ paddingLeft: '3.5rem' }}
              className="w-full pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent text-base"
              placeholder="Es. Milano"
              required
            />
          </div>
        </div>

        {/* Indirizzo */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Indirizzo Completo *
          </label>
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              style={{ paddingLeft: '3.5rem' }}
              className="w-full pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent text-base"
              placeholder="Es. Via Roma 123, 20100"
              required
            />
          </div>
        </div>

        {/* Mappa Preview */}
        {formData.city && formData.address && (
          <div className="bg-gray-100 rounded-lg p-4 border border-gray-200">
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
              <MapPin className="w-4 h-4 text-red-600" />
              <span className="font-medium">Anteprima posizione:</span>
            </div>
            <div className="bg-gray-200 rounded-lg h-48 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <MapPin className="w-10 h-10 mx-auto mb-2 text-red-600" />
                <p className="font-medium text-gray-700">{formData.address}</p>
                <p className="text-sm">{formData.city}</p>
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-2">
              La mappa interattiva sarà disponibile con Google Maps API
            </p>
          </div>
        )}

        {/* Submit */}
        <div className="flex justify-end pt-4 border-t border-gray-200">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition disabled:opacity-50"
          >
            <Save className="w-5 h-5" />
            {loading ? "Salvataggio..." : "Salva Indirizzo"}
          </button>
        </div>
      </form>
    </section>
  );
}