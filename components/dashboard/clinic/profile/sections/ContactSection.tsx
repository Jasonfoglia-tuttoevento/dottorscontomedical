"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Save, Phone, Mail, Globe } from "lucide-react";

interface Clinic {
  id: string;
  phone: string | null;
  email: string | null;
  website: string | null;
}

export default function ContactSection({ clinic }: { clinic: Clinic }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    phone: clinic.phone || "",
    email: clinic.email || "",
    website: clinic.website || "",
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
      alert("Contatti aggiornati con successo!");
    }

    setLoading(false);
  };

  return (
    <section id="contact" className="bg-white rounded-xl border border-gray-200 shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-900">Contatti</h2>
        <p className="text-sm text-gray-600 mt-1">
          Come i pazienti possono contattarti
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Telefono */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Telefono *
          </label>
          <div className="relative">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              style={{ paddingLeft: '3.5rem' }}
              className="w-full pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent text-base"
              placeholder="Es. +39 02 1234567"
              required
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Email *
          </label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              style={{ paddingLeft: '3.5rem' }}
              className="w-full pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent text-base"
              placeholder="Es. info@clinica.it"
              required
            />
          </div>
        </div>

        {/* Sito Web */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Sito Web
          </label>
          <div className="relative">
            <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="url"
              value={formData.website}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              style={{ paddingLeft: '3.5rem' }}
              className="w-full pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent text-base"
              placeholder="Es. https://www.clinica.it"
            />
          </div>
        </div>

        {/* Preview Contatti */}
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Anteprima contatti pubblici:</h4>
          <div className="space-y-2">
            {formData.phone && (
              <div className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4 text-red-600" />
                <span className="text-gray-700">{formData.phone}</span>
              </div>
            )}
            {formData.email && (
              <div className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4 text-red-600" />
                <span className="text-gray-700">{formData.email}</span>
              </div>
            )}
            {formData.website && (
              <div className="flex items-center gap-2 text-sm">
                <Globe className="w-4 h-4 text-red-600" />
                <a href={formData.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  {formData.website}
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end pt-4 border-t border-gray-200">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition disabled:opacity-50"
          >
            <Save className="w-5 h-5" />
            {loading ? "Salvataggio..." : "Salva Contatti"}
          </button>
        </div>
      </form>
    </section>
  );
}