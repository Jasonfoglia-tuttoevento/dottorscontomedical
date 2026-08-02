import type { Clinic } from "@/lib/types/database";

interface ProfileCheck {
  label: string;
  isComplete: (clinic: Clinic) => boolean;
}

const PROFILE_CHECKS: ProfileCheck[] = [
  { label: "nome della clinica", isComplete: (clinic) => clinic.name.trim().length >= 3 },
  { label: "descrizione", isComplete: (clinic) => Boolean(clinic.description?.trim()) },
  { label: "città", isComplete: (clinic) => Boolean(clinic.city?.trim()) },
  { label: "indirizzo", isComplete: (clinic) => Boolean(clinic.address?.trim()) },
  { label: "telefono", isComplete: (clinic) => Boolean(clinic.phone?.trim()) },
  { label: "email", isComplete: (clinic) => Boolean(clinic.email?.trim()) },
  { label: "sito web", isComplete: (clinic) => Boolean(clinic.website?.trim()) },
  { label: "logo", isComplete: (clinic) => Boolean(clinic.logo_url?.trim()) },
  { label: "immagine di copertina", isComplete: (clinic) => Boolean(clinic.cover_url?.trim()) },
  {
    label: "orari di apertura",
    isComplete: (clinic) => {
      if (!clinic.opening_hours || typeof clinic.opening_hours !== "object") {
        return false;
      }

      return Object.keys(clinic.opening_hours as Record<string, unknown>).length > 0;
    },
  },
];

export interface ClinicProfileCompleteness {
  completed: number;
  total: number;
  percentage: number;
  missing: string[];
}

export function getClinicProfileCompleteness(clinic: Clinic): ClinicProfileCompleteness {
  const missing = PROFILE_CHECKS
    .filter((check) => !check.isComplete(clinic))
    .map((check) => check.label);
  const completed = PROFILE_CHECKS.length - missing.length;

  return {
    completed,
    total: PROFILE_CHECKS.length,
    percentage: Math.round((completed / PROFILE_CHECKS.length) * 100),
    missing,
  };
}
