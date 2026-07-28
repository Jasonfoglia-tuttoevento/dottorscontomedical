"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Save, Clock } from "lucide-react";

interface Clinic {
  id: string;
}

interface TimeSlot {
  day: string;
  open: string;
  close: string;
  closed: boolean;
}

const defaultDays = [
  "Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato", "Domenica"
];

export default function HoursSection({ clinic }: { clinic: Clinic }) {
  const [loading, setLoading] = useState(false);
  const [hours, setHours] = useState<TimeSlot[]>(
    defaultDays.map((day) => ({
      day,
      open: "09:00",
      close: "18:00",
      closed: day === "Domenica",
    }))
  );
  const supabase = createClient();

  const toggleDay = (index: number) => {
    const newHours = [...hours];
    newHours[index].closed = !newHours[index].closed;
    setHours(newHours);
  };

  const updateTime = (index: number, field: "open" | "close", value: string) => {
    const newHours = [...hours];
    newHours[index][field] = value;
    setHours(newHours);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // TODO: Salvare orari in tabella dedicata clinic_hours
    alert("Orari salvati (funzionalità in sviluppo)");

    setLoading(false);
  };

  return (
    <section id="hours" className="bg-white rounded-xl border border-gray-200 shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-900">Orari di Apertura</h2>
        <p className="text-sm text-gray-600 mt-1">
          Quando i pazienti possono trovarti
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        {hours.map((slot, index) => (
          <div
            key={slot.day}
            className={`flex items-center gap-4 p-4 rounded-lg border transition ${
              slot.closed
                ? "bg-gray-50 border-gray-200 opacity-60"
                : "bg-white border-gray-200 hover:border-[#99E7DB]"
            }`}
          >
            <div className="w-28">
              <span className={`font-semibold text-sm ${slot.closed ? "text-gray-400" : "text-gray-900"}`}>
                {slot.day}
              </span>
            </div>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={slot.closed}
                onChange={() => toggleDay(index)}
                className="w-4 h-4 text-[#0D47A1] rounded border-gray-300 focus:ring-[#0D47A1]"
              />
              <span className="text-sm text-gray-600">Chiuso</span>
            </label>

            {!slot.closed && (
              <div className="flex items-center gap-3 flex-1">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <input
                    type="time"
                    value={slot.open}
                    onChange={(e) => updateTime(index, "open", e.target.value)}
                    className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D47A1] text-sm"
                  />
                </div>
                <span className="text-gray-400">—</span>
                <input
                  type="time"
                  value={slot.close}
                  onChange={(e) => updateTime(index, "close", e.target.value)}
                  className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D47A1] text-sm"
                />
              </div>
            )}

            {slot.closed && (
              <div className="flex-1 text-right">
                <span className="text-sm text-gray-400 font-medium">Chiuso</span>
              </div>
            )}
          </div>
        ))}

        <div className="flex justify-end pt-4 border-t border-gray-200">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-6 py-3 bg-[#0D47A1] text-white rounded-lg font-semibold hover:bg-[#0B3B86] transition disabled:opacity-50"
          >
            <Save className="w-5 h-5" />
            {loading ? "Salvataggio..." : "Salva Orari"}
          </button>
        </div>
      </form>
    </section>
  );
}