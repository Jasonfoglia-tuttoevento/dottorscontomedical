import type { UserRole } from "@/lib/auth/roles";

export type CheckupStatus = "new" | "contacted" | "converted";
export type MatchStatus = "pending" | "accepted" | "rejected";

export interface Profile {
  id: string;
  role: UserRole;
}

export interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string | null;
}

export interface Clinic {
  id: string;
  owner_id: string;
  name: string;
  category: string | null;
  description: string | null;
  verified: boolean;
  slug: string | null;
  city: string | null;
  address: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  logo_url: string | null;
  cover_url: string | null;
  rating: number | null;
  price_level: number | null;
  opening_hours: unknown;
  created_at: string;
}

export interface Service {
  id: string;
  clinic_id: string;
  name: string;
  description: string | null;
  price: number | null;
  duration_minutes: number | null;
  created_at: string;
}

export interface Checkup {
  id: string;
  category: string;
  treatment: string;
  city: string | null;
  patient_name: string;
  patient_email: string;
  patient_phone: string;
  notes: string | null;
  status: CheckupStatus;
  created_at: string;
}

export interface Match {
  id: string;
  clinic_id: string;
  checkup_id: string;
  status: MatchStatus;
  created_at: string;
}

export interface MatchWithCheckup extends Match {
  checkups: Checkup | null;
}
