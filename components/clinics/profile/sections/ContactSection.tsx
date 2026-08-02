"use client";

import { useState } from "react";
import { Globe, Mail, Phone, Save } from "lucide-react";
import ProfileSaveMessage, { type ProfileSaveState } from "@/components/clinics/profile/ProfileSaveMessage";
import { createClient } from "@/lib/supabase/client";
import type { Clinic } from "@/lib/types/database";

function safePreviewUrl(value: string): string | null {
  if (!value) return null;
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:" ? url.toString() : null;
  } catch {
    return null;
  }
}

export default function ContactSection({ clinic }: { clinic: Clinic }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<ProfileSaveState | null>(null);
  const [formData, setFormData] = useState({
    phone: clinic.phone || "",
    email: clinic.email || "",
    website: clinic.website || "",
  });
  const supabase = createClient();
  const previewUrl = safePreviewUrl(formData.website);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setMessage(null);

    const { data, error } = await supabase
      .from("clinics")
      .update({
        phone: formData.phone.trim(),
        email: formData.email.trim().toLowerCase(),
        website: formData.website.trim() || null,
      })
      .eq("id", clinic.id)
      .select("id")
      .maybeSingle();

    setMessage(
      error || !data
        ? { kind: "error", text: error?.message || "Nessun contatto aggiornato." }
        : { kind: "success", text: "Contatti aggiornati." },
    );
    setLoading(false);
  };

  return (
    <section id="contact" className="scroll-mt-24 rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-200 p-4 sm:p-6">
        <h2 className="text-xl font-bold text-gray-900">Contatti</h2>
        <p className="mt-1 text-sm text-gray-600">Recapiti pubblici della struttura.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 p-4 sm:space-y-6 sm:p-6">
        <div>
          <label htmlFor="clinic-phone" className="mb-2 block text-sm font-semibold text-gray-700">Telefono *</label>
          <div className="relative">
            <Phone className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              id="clinic-phone"
              type="tel"
              value={formData.phone}
              onChange={(event) => setFormData({ ...formData, phone: event.target.value })}
              className="pl-12"
              placeholder="Es. +355 4 123 4567"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="clinic-email" className="mb-2 block text-sm font-semibold text-gray-700">Email *</label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              id="clinic-email"
              type="email"
              value={formData.email}
              onChange={(event) => setFormData({ ...formData, email: event.target.value })}
              className="pl-12"
              placeholder="Es. info@clinica.al"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="clinic-website" className="mb-2 block text-sm font-semibold text-gray-700">Sito web</label>
          <div className="relative">
            <Globe className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              id="clinic-website"
              type="url"
              value={formData.website}
              onChange={(event) => setFormData({ ...formData, website: event.target.value })}
              className="pl-12"
              placeholder="https://www.clinica.al"
            />
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
          <h3 className="text-sm font-bold text-gray-800">Anteprima contatti pubblici</h3>
          <div className="mt-3 space-y-2 text-sm text-gray-700">
            {formData.phone && <p className="break-all">Telefono: {formData.phone}</p>}
            {formData.email && <p className="break-all">Email: {formData.email}</p>}
            {previewUrl && (
              <a href={previewUrl} target="_blank" rel="noopener noreferrer" className="block break-all font-semibold text-[#0D47A1] hover:underline">
                {previewUrl}
              </a>
            )}
          </div>
        </div>

        <ProfileSaveMessage state={message} />

        <div className="flex border-t border-gray-200 pt-4 sm:justify-end">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#0D47A1] px-6 py-3 font-semibold text-white transition hover:bg-[#0B3B86] disabled:cursor-wait disabled:opacity-50 sm:w-auto"
          >
            <Save className="h-5 w-5" />
            {loading ? "Salvataggio..." : "Salva contatti"}
          </button>
        </div>
      </form>
    </section>
  );
}
