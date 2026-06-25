"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Plus, Trash2, Save, Edit3, X, Check, Clock, Euro } from "lucide-react";

interface Clinic {
  id: string;
}

interface Service {
  id: string;
  name: string;
  description: string | null;
  price: number | null;
  duration_minutes: number | null;
}

export default function ServicesSection({ clinic, services: initialServices }: { clinic: Clinic; services: Service[] }) {
  const [services, setServices] = useState<Service[]>(initialServices);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    duration_minutes: "",
  });
  const supabase = createClient();

  const resetForm = () => {
    setFormData({ name: "", description: "", price: "", duration_minutes: "" });
    setShowAddForm(false);
    setEditingId(null);
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await supabase
      .from("services")
      .insert({
        clinic_id: clinic.id,
        name: formData.name,
        description: formData.description || null,
        price: formData.price ? parseFloat(formData.price) : null,
        duration_minutes: formData.duration_minutes ? parseInt(formData.duration_minutes) : null,
      })
      .select()
      .single();

    if (!error && data) {
      setServices([data, ...services]);
      resetForm();
    }

    setLoading(false);
  };

  const handleDelete = async (serviceId: string) => {
    if (!confirm("Eliminare questo servizio?")) return;

    const { error } = await supabase
      .from("services")
      .delete()
      .eq("id", serviceId);

    if (!error) {
      setServices(services.filter((s) => s.id !== serviceId));
    }
  };

  const startEdit = (service: Service) => {
    setEditingId(service.id);
    setFormData({
      name: service.name,
      description: service.description || "",
      price: service.price?.toString() || "",
      duration_minutes: service.duration_minutes?.toString() || "",
    });
    setShowAddForm(true);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingId) return;
    setLoading(true);

    const { error } = await supabase
      .from("services")
      .update({
        name: formData.name,
        description: formData.description || null,
        price: formData.price ? parseFloat(formData.price) : null,
        duration_minutes: formData.duration_minutes ? parseInt(formData.duration_minutes) : null,
      })
      .eq("id", editingId);

    if (!error) {
      setServices(services.map((s) =>
        s.id === editingId
          ? { ...s, name: formData.name, description: formData.description || null, price: formData.price ? parseFloat(formData.price) : null, duration_minutes: formData.duration_minutes ? parseInt(formData.duration_minutes) : null }
          : s
      ));
      resetForm();
    }

    setLoading(false);
  };

  return (
    <section id="services" className="bg-white rounded-xl border border-gray-200 shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Servizi Offerti</h2>
            <p className="text-sm text-gray-600 mt-1">
              Aggiungi i trattamenti che offri ai pazienti
            </p>
          </div>
          {!showAddForm && (
            <button
              onClick={() => setShowAddForm(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition text-sm"
            >
              <Plus className="w-4 h-4" />
              Nuovo Servizio
            </button>
          )}
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Add/Edit Form */}
        {showAddForm && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6">
            <h3 className="font-bold text-gray-900 mb-4">
              {editingId ? "Modifica Servizio" : "Nuovo Servizio"}
            </h3>
            <form onSubmit={editingId ? handleUpdate : handleAdd} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nome Servizio *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                    placeholder="Es. Impianto dentale singolo"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Descrizione
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                    placeholder="Descrivi il trattamento..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Prezzo (€)
                  </label>
                  <div className="relative">
                    <Euro className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      style={{ paddingLeft: '3.5rem' }}
                      className="w-full pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                      placeholder="500"
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Durata (minuti)
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="number"
                      value={formData.duration_minutes}
                      onChange={(e) => setFormData({ ...formData, duration_minutes: e.target.value })}
                      style={{ paddingLeft: '3.5rem' }}
                      className="w-full pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                      placeholder="60"
                      min="1"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-lg font-medium text-sm hover:bg-gray-50 transition"
                >
                  <X className="w-4 h-4" />
                  Annulla
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center gap-2 px-4 py-2.5 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition text-sm disabled:opacity-50"
                >
                  <Check className="w-4 h-4" />
                  {loading ? "Salvataggio..." : editingId ? "Aggiorna" : "Aggiungi"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Services List */}
        {services.length > 0 ? (
          <div className="space-y-3">
            {services.map((service) => (
              <div
                key={service.id}
                className="flex items-start justify-between p-4 border border-gray-200 rounded-xl hover:border-red-200 hover:shadow-sm transition"
              >
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">{service.name}</div>
                  {service.description && (
                    <div className="text-sm text-gray-600 mt-1">{service.description}</div>
                  )}
                  <div className="flex items-center gap-4 mt-2">
                    {service.price && (
                      <span className="flex items-center gap-1 text-sm text-green-700 font-medium">
                        <Euro className="w-3.5 h-3.5" />
                        {service.price.toLocaleString("it-IT")}
                      </span>
                    )}
                    {service.duration_minutes && (
                      <span className="flex items-center gap-1 text-sm text-gray-500">
                        <Clock className="w-3.5 h-3.5" />
                        {service.duration_minutes} min
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 ml-4">
                  <button
                    onClick={() => startEdit(service)}
                    className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                    title="Modifica"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(service.id)}
                    className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                    title="Elimina"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          !showAddForm && (
            <div className="text-center py-12">
              <Image className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <div className="text-gray-500 mb-2">Nessun servizio aggiunto</div>
              <div className="text-sm text-gray-400 mb-4">
                Aggiungi i trattamenti che offri per attirare più pazienti
              </div>
              <button
                onClick={() => setShowAddForm(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition text-sm"
              >
                <Plus className="w-4 h-4" />
                Aggiungi Primo Servizio
              </button>
            </div>
          )
        )}
      </div>
    </section>
  );
}