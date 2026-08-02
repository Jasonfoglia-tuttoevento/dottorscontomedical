"use client";

import { useState } from "react";
import { MapPin, Save } from "lucide-react";
import ProfileSaveMessage, { type ProfileSaveState } from "@/components/clinics/profile/ProfileSaveMessage";
import { createClient } from "@/lib/supabase/client";
import type { Clinic } from "@/lib/types/database";

export default function LocationSection({ clinic }: { clinic: Clinic }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<ProfileSaveState | null>(null);
  const [formData, setFormData] = useState({
    address: clinic.address || "",
    city: clinic.city || "",
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
        ? { kind: "error", text: error?.message || "Nessuna posizione aggiornata." }
        : { kind: "success", text: "Indirizzo aggiornato." },
    );
    setLoading(false);
  };

  return (
    <section id="location" className="scroll-mt-24 rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-200 p-4 sm:p-6">
        <h2 className="text-xl font-bold text-gray-900">Indirizzo e posizione</h2>
        <p className="mt-1 text-sm text-gray-600">Dove si trova la clinica.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 p-4 sm:space-y-6 sm:p-6">
        <div>
          <label htmlFor="clinic-city" className="mb-2 block text-sm font-semibold text-gray-700">Città *</label>
          <div className="relative">
            <MapPin className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              id="clinic-city"
              type="text"
              value={formData.city}
              onChange={(event) => setFormData({ ...formData, city: event.target.value })}
              className="pl-12"
              placeholder="Es. Tirana"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="clinic-address" className="mb-2 block text-sm font-semibold text-gray-700">Indirizzo completo *</label>
          <div className="relative">
            <MapPin className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              id="clinic-address"
              type="text"
              value={formData.address}
              onChange={(event) => setFormData({ ...formData, address: event.target.value })}
              className="pl-12"
              placeholder="Es. Rruga e Durrësit 100"
              required
            />
          </div>
        </div>

        {formData.city && formData.address && (
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Anteprima posizione</p>
            <p className="mt-2 break-words font-semibold text-gray-800">{formData.address}, {formData.city}</p>
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
            {loading ? "Salvataggio..." : "Salva indirizzo"}
          </button>
        </div>
      </form>
    </section>
  );
}
