"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Save } from "lucide-react";

interface Clinic {
  id: string;
  name: string;
  category: string;
  description: string;
  verified: boolean;
}

export default function GeneralInfoSection({ clinic }: { clinic: Clinic }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: clinic.name || "",
    category: clinic.category || "",
    description: clinic.description || "",
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
      alert("Informazioni aggiornate con successo!");
    }

    setLoading(false);
  };

  return (
    <section id="general" className="bg-white rounded-xl border border-gray-200 shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-900">Informazioni Generali</h2>
        <p className="text-sm text-gray-600 mt-1">
          Dati principali della tua clinica
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Nome Clinica */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Nome Clinica *
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
            placeholder="Es. Clinica Dentale Roma"
            required
          />
        </div>

        {/* Categoria */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Categoria *
          </label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
            required
          >
            <option value="">Seleziona categoria</option>
            <option value="dentali">Cliniche Dentali</option>
            <option value="capelli">Trapianto Capelli</option>
            <option value="estetica">Medicina Estetica</option>
          </select>
        </div>

        {/* Descrizione */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Descrizione
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={4}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
            placeholder="Descrivi la tua clinica, specializzazioni, punti di forza..."
          />
        </div>

        {/* Badge Verificata */}
        {clinic.verified && (
          <div className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">✓</span>
            </div>
            <div>
              <div className="font-semibold text-green-900">Clinica Verificata</div>
              <div className="text-sm text-green-700">
                La tua clinica è stata verificata dal nostro team
              </div>
            </div>
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
            {loading ? "Salvataggio..." : "Salva Modifiche"}
          </button>
        </div>
      </form>
    </section>
  );
}