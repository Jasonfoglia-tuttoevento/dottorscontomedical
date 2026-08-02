"use client";

import { useState } from "react";
import { Save } from "lucide-react";
import ProfileSaveMessage, { type ProfileSaveState } from "@/components/clinics/profile/ProfileSaveMessage";
import { createClient } from "@/lib/supabase/client";
import type { Clinic } from "@/lib/types/database";

export default function GeneralInfoSection({ clinic }: { clinic: Clinic }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<ProfileSaveState | null>(null);
  const [formData, setFormData] = useState({
    name: clinic.name || "",
    category: clinic.category || "",
    description: clinic.description || "",
  });
  const supabase = createClient();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setMessage(null);

    const { data, error } = await supabase
      .from("clinics")
      .update(formData)
      .eq("id", clinic.id)
      .select("id")
      .maybeSingle();

    setMessage(
      error || !data
        ? { kind: "error", text: error?.message || "Nessuna clinica aggiornata. Verifica i permessi del profilo." }
        : { kind: "success", text: "Informazioni generali aggiornate." },
    );
    setLoading(false);
  };

  return (
    <section id="general" className="scroll-mt-24 rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-200 p-4 sm:p-6">
        <h2 className="text-xl font-bold text-gray-900">Informazioni generali</h2>
        <p className="mt-1 text-sm text-gray-600">Dati principali della clinica.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 p-4 sm:space-y-6 sm:p-6">
        <div>
          <label htmlFor="clinic-name" className="mb-2 block text-sm font-semibold text-gray-700">Nome clinica *</label>
          <input
            id="clinic-name"
            type="text"
            value={formData.name}
            onChange={(event) => setFormData({ ...formData, name: event.target.value })}
            placeholder="Es. Clinica Dentale Tirana"
            required
          />
        </div>

        <div>
          <label htmlFor="clinic-category" className="mb-2 block text-sm font-semibold text-gray-700">Categoria *</label>
          <select
            id="clinic-category"
            value={formData.category}
            onChange={(event) => setFormData({ ...formData, category: event.target.value })}
            required
          >
            <option value="">Seleziona categoria</option>
            <option value="dentali">Cliniche dentali</option>
          </select>
        </div>

        <div>
          <label htmlFor="clinic-description" className="mb-2 block text-sm font-semibold text-gray-700">Descrizione</label>
          <textarea
            id="clinic-description"
            value={formData.description}
            onChange={(event) => setFormData({ ...formData, description: event.target.value })}
            rows={5}
            placeholder="Descrivi specializzazioni, équipe e punti di forza."
          />
        </div>

        {clinic.verified && (
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
            <p className="font-bold">Profilo verificato</p>
            <p className="mt-1">La struttura è contrassegnata come verificata sulla piattaforma.</p>
          </div>
        )}

        <ProfileSaveMessage state={message} />

        <div className="flex border-t border-gray-200 pt-4 sm:justify-end">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#0D47A1] px-6 py-3 font-semibold text-white transition hover:bg-[#0B3B86] disabled:cursor-wait disabled:opacity-50 sm:w-auto"
          >
            <Save className="h-5 w-5" />
            {loading ? "Salvataggio..." : "Salva modifiche"}
          </button>
        </div>
      </form>
    </section>
  );
}
