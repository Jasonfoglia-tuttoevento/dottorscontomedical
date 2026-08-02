"use client";

import { useState } from "react";
import { Clock, Save } from "lucide-react";
import ProfileSaveMessage, { type ProfileSaveState } from "@/components/clinics/profile/ProfileSaveMessage";
import { createClient } from "@/lib/supabase/client";
import type { Clinic } from "@/lib/types/database";

interface TimeSlot {
  day: string;
  open: string;
  close: string;
  closed: boolean;
}

const defaultDays = [
  "Lunedì",
  "Martedì",
  "Mercoledì",
  "Giovedì",
  "Venerdì",
  "Sabato",
  "Domenica",
];

function defaultHours(): TimeSlot[] {
  return defaultDays.map((day) => ({
    day,
    open: "09:00",
    close: "18:00",
    closed: day === "Domenica",
  }));
}

function readHours(value: unknown): TimeSlot[] {
  let parsed = value;

  if (typeof parsed === "string") {
    try {
      parsed = JSON.parse(parsed);
    } catch {
      return defaultHours();
    }
  }

  if (!Array.isArray(parsed)) return defaultHours();

  const byDay = new Map<string, TimeSlot>();
  for (const item of parsed) {
    if (!item || typeof item !== "object") continue;
    const record = item as Record<string, unknown>;
    if (typeof record.day !== "string") continue;
    byDay.set(record.day, {
      day: record.day,
      open: typeof record.open === "string" ? record.open : "09:00",
      close: typeof record.close === "string" ? record.close : "18:00",
      closed: record.closed === true,
    });
  }

  return defaultDays.map((day) => byDay.get(day) ?? {
    day,
    open: "09:00",
    close: "18:00",
    closed: day === "Domenica",
  });
}

export default function HoursSection({ clinic }: { clinic: Clinic }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<ProfileSaveState | null>(null);
  const [hours, setHours] = useState<TimeSlot[]>(() => readHours(clinic.opening_hours));
  const supabase = createClient();

  const updateSlot = (index: number, patch: Partial<TimeSlot>) => {
    setHours((current) => current.map((slot, slotIndex) => (
      slotIndex === index ? { ...slot, ...patch } : slot
    )));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setMessage(null);

    const invalidSlot = hours.find((slot) => !slot.closed && slot.open >= slot.close);
    if (invalidSlot) {
      setMessage({ kind: "error", text: `Controlla gli orari di ${invalidSlot.day}: la chiusura deve essere successiva all’apertura.` });
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("clinics")
      .update({ opening_hours: hours })
      .eq("id", clinic.id)
      .select("id")
      .maybeSingle();

    setMessage(
      error || !data
        ? { kind: "error", text: error?.message || "Nessun orario aggiornato." }
        : { kind: "success", text: "Orari di apertura aggiornati." },
    );
    setLoading(false);
  };

  return (
    <section id="hours" className="scroll-mt-24 rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-200 p-4 sm:p-6">
        <h2 className="text-xl font-bold text-gray-900">Orari di apertura</h2>
        <p className="mt-1 text-sm text-gray-600">Gli orari vengono pubblicati nella pagina della clinica.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3 p-4 sm:p-6">
        {hours.map((slot, index) => (
          <div
            key={slot.day}
            className={`grid gap-3 rounded-xl border p-4 transition sm:grid-cols-[7rem_auto_minmax(0,1fr)] sm:items-center ${
              slot.closed ? "border-gray-200 bg-gray-50" : "border-gray-200 bg-white hover:border-[#99E7DB]"
            }`}
          >
            <span className={`font-semibold ${slot.closed ? "text-gray-500" : "text-gray-900"}`}>{slot.day}</span>

            <label className="inline-flex min-h-11 items-center gap-2 text-sm text-gray-600">
              <input
                type="checkbox"
                checked={slot.closed}
                onChange={() => updateSlot(index, { closed: !slot.closed })}
                className="h-4 w-4"
              />
              Chiuso
            </label>

            {slot.closed ? (
              <span className="text-sm font-medium text-gray-400 sm:text-right">Giornata di chiusura</span>
            ) : (
              <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-2">
                <label className="sr-only" htmlFor={`open-${index}`}>Apertura {slot.day}</label>
                <div className="relative">
                  <Clock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <input
                    id={`open-${index}`}
                    type="time"
                    value={slot.open}
                    onChange={(event) => updateSlot(index, { open: event.target.value })}
                    className="min-w-0 pl-9 pr-2"
                  />
                </div>
                <span className="text-gray-400">–</span>
                <label className="sr-only" htmlFor={`close-${index}`}>Chiusura {slot.day}</label>
                <input
                  id={`close-${index}`}
                  type="time"
                  value={slot.close}
                  onChange={(event) => updateSlot(index, { close: event.target.value })}
                  className="min-w-0 px-2"
                />
              </div>
            )}
          </div>
        ))}

        <ProfileSaveMessage state={message} />

        <div className="flex border-t border-gray-200 pt-4 sm:justify-end">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#0D47A1] px-6 py-3 font-semibold text-white transition hover:bg-[#0B3B86] disabled:cursor-wait disabled:opacity-50 sm:w-auto"
          >
            <Save className="h-5 w-5" />
            {loading ? "Salvataggio..." : "Salva orari"}
          </button>
        </div>
      </form>
    </section>
  );
}
