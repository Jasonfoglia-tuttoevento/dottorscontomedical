"use client";

import { useState } from "react";
import { Check, Clock, Edit3, Euro, FileText, Plus, Trash2, X } from "lucide-react";
import ProfileSaveMessage, { type ProfileSaveState } from "@/components/clinics/profile/ProfileSaveMessage";
import { createClient } from "@/lib/supabase/client";
import type { Clinic, Service } from "@/lib/types/database";

interface ServicesSectionProps {
  clinic: Clinic;
  services: Service[];
}

const emptyForm = {
  name: "",
  description: "",
  price: "",
  duration_minutes: "",
};

function readNumber(value: string): number | null {
  if (!value.trim()) return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

export default function ServicesSection({ clinic, services: initialServices }: ServicesSectionProps) {
  const [services, setServices] = useState<Service[]>(initialServices);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [message, setMessage] = useState<ProfileSaveState | null>(null);
  const [formData, setFormData] = useState(emptyForm);
  const supabase = createClient();

  const resetForm = () => {
    setFormData(emptyForm);
    setShowForm(false);
    setEditingId(null);
  };

  const payload = () => ({
    name: formData.name.trim(),
    description: formData.description.trim() || null,
    price: readNumber(formData.price),
    duration_minutes: readNumber(formData.duration_minutes),
  });

  const handleAdd = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setMessage(null);

    const { data, error } = await supabase
      .from("services")
      .insert({ clinic_id: clinic.id, ...payload() })
      .select("id, clinic_id, name, description, price, duration_minutes, created_at")
      .single();

    if (error || !data) {
      setMessage({ kind: "error", text: error?.message || "Servizio non aggiunto." });
    } else {
      setServices((current) => [data as Service, ...current]);
      resetForm();
      setMessage({ kind: "success", text: "Servizio aggiunto." });
    }

    setLoading(false);
  };

  const handleUpdate = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!editingId) return;
    setLoading(true);
    setMessage(null);

    const next = payload();
    const { data, error } = await supabase
      .from("services")
      .update(next)
      .eq("id", editingId)
      .eq("clinic_id", clinic.id)
      .select("id")
      .maybeSingle();

    if (error || !data) {
      setMessage({ kind: "error", text: error?.message || "Servizio non aggiornato." });
    } else {
      setServices((current) => current.map((service) => (
        service.id === editingId ? { ...service, ...next } : service
      )));
      resetForm();
      setMessage({ kind: "success", text: "Servizio aggiornato." });
    }

    setLoading(false);
  };

  const handleDelete = async (serviceId: string) => {
    if (!window.confirm("Eliminare questo servizio?")) return;
    setDeletingId(serviceId);
    setMessage(null);

    const { data, error } = await supabase
      .from("services")
      .delete()
      .eq("id", serviceId)
      .eq("clinic_id", clinic.id)
      .select("id")
      .maybeSingle();

    if (error || !data) {
      setMessage({ kind: "error", text: error?.message || "Servizio non eliminato." });
    } else {
      setServices((current) => current.filter((service) => service.id !== serviceId));
      setMessage({ kind: "success", text: "Servizio eliminato." });
    }

    setDeletingId(null);
  };

  const startEdit = (service: Service) => {
    setEditingId(service.id);
    setFormData({
      name: service.name,
      description: service.description || "",
      price: service.price?.toString() || "",
      duration_minutes: service.duration_minutes?.toString() || "",
    });
    setShowForm(true);
    document.getElementById("service-editor")?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <section id="services" className="scroll-mt-24 rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-200 p-4 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Servizi offerti</h2>
            <p className="mt-1 text-sm text-gray-600">Trattamenti, durata e prezzo indicativo.</p>
          </div>
          {!showForm && (
            <button
              type="button"
              onClick={() => { setMessage(null); setShowForm(true); }}
              className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#0D47A1] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0B3B86] sm:w-auto"
            >
              <Plus className="h-4 w-4" />
              Nuovo servizio
            </button>
          )}
        </div>
      </div>

      <div className="space-y-6 p-4 sm:p-6">
        {showForm && (
          <div id="service-editor" className="scroll-mt-28 rounded-2xl border border-[#99E7DB] bg-[#E6FAF5] p-4 sm:p-6">
            <h3 className="font-bold text-gray-900">{editingId ? "Modifica servizio" : "Nuovo servizio"}</h3>
            <form onSubmit={editingId ? handleUpdate : handleAdd} className="mt-4 space-y-4">
              <div>
                <label htmlFor="service-name" className="mb-2 block text-sm font-semibold text-gray-700">Nome servizio *</label>
                <input
                  id="service-name"
                  type="text"
                  value={formData.name}
                  onChange={(event) => setFormData({ ...formData, name: event.target.value })}
                  placeholder="Es. Impianto dentale singolo"
                  required
                />
              </div>

              <div>
                <label htmlFor="service-description" className="mb-2 block text-sm font-semibold text-gray-700">Descrizione</label>
                <textarea
                  id="service-description"
                  value={formData.description}
                  onChange={(event) => setFormData({ ...formData, description: event.target.value })}
                  rows={3}
                  placeholder="Descrivi il trattamento."
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="service-price" className="mb-2 block text-sm font-semibold text-gray-700">Prezzo indicativo (€)</label>
                  <div className="relative">
                    <Euro className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                    <input
                      id="service-price"
                      type="number"
                      value={formData.price}
                      onChange={(event) => setFormData({ ...formData, price: event.target.value })}
                      className="pl-12"
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="service-duration" className="mb-2 block text-sm font-semibold text-gray-700">Durata (minuti)</label>
                  <div className="relative">
                    <Clock className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                    <input
                      id="service-duration"
                      type="number"
                      value={formData.duration_minutes}
                      onChange={(event) => setFormData({ ...formData, duration_minutes: event.target.value })}
                      className="pl-12"
                      min="1"
                      step="1"
                    />
                  </div>
                </div>
              </div>

              <div className="grid gap-3 pt-2 sm:flex sm:justify-end">
                <button
                  type="button"
                  onClick={resetForm}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium transition hover:bg-gray-50"
                >
                  <X className="h-4 w-4" />
                  Annulla
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#0D47A1] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0B3B86] disabled:cursor-wait disabled:opacity-50"
                >
                  <Check className="h-4 w-4" />
                  {loading ? "Salvataggio..." : editingId ? "Aggiorna" : "Aggiungi"}
                </button>
              </div>
            </form>
          </div>
        )}

        <ProfileSaveMessage state={message} />

        {services.length > 0 ? (
          <div className="space-y-3">
            {services.map((service) => (
              <article key={service.id} className="flex flex-col gap-4 rounded-xl border border-gray-200 p-4 transition hover:border-[#99E7DB] hover:shadow-sm sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0 flex-1">
                  <h3 className="break-words font-semibold text-gray-900">{service.name}</h3>
                  {service.description && <p className="mt-1 break-words text-sm text-gray-600">{service.description}</p>}
                  <div className="mt-3 flex flex-wrap items-center gap-4 text-sm">
                    {service.price !== null && (
                      <span className="inline-flex items-center gap-1 font-medium text-emerald-700"><Euro className="h-3.5 w-3.5" />{service.price.toLocaleString("it-IT")}</span>
                    )}
                    {service.duration_minutes !== null && (
                      <span className="inline-flex items-center gap-1 text-gray-500"><Clock className="h-3.5 w-3.5" />{service.duration_minutes} min</span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 sm:flex sm:shrink-0">
                  <button
                    type="button"
                    onClick={() => startEdit(service)}
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-gray-200 px-3 text-sm font-semibold text-gray-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                  >
                    <Edit3 className="h-4 w-4" />
                    <span className="sm:hidden">Modifica</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => void handleDelete(service.id)}
                    disabled={deletingId === service.id}
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-gray-200 px-3 text-sm font-semibold text-gray-600 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-700 disabled:cursor-wait disabled:opacity-50"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sm:hidden">Elimina</span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : !showForm ? (
          <div className="py-10 text-center">
            <FileText className="mx-auto h-12 w-12 text-gray-300" />
            <p className="mt-4 font-semibold text-gray-600">Nessun servizio aggiunto</p>
            <p className="mt-1 text-sm text-gray-400">Aggiungi i trattamenti disponibili nella clinica.</p>
            <button
              type="button"
              onClick={() => setShowForm(true)}
              className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#0D47A1] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0B3B86]"
            >
              <Plus className="h-4 w-4" />
              Aggiungi il primo servizio
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
