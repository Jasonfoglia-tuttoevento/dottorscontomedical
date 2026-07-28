import "server-only";

import { createClient } from "@/lib/supabase/server";
import type { Checkup } from "@/lib/types/database";

export type CreateCheckupInput = Pick<
  Checkup,
  | "category"
  | "treatment"
  | "city"
  | "patient_name"
  | "patient_email"
  | "patient_phone"
  | "notes"
>;

export async function createCheckup(input: CreateCheckupInput): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase.from("checkups").insert({
    ...input,
    status: "new",
  });

  if (error) {
    throw new Error("Impossibile inviare la richiesta.");
  }
}

export async function getCheckupsByPatientEmail(email: string): Promise<Checkup[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("checkups")
    .select(
      "id, category, treatment, city, patient_name, patient_email, patient_phone, notes, status, created_at",
    )
    .eq("patient_email", email)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error("Impossibile recuperare le richieste del paziente.");
  }

  return (data ?? []) as Checkup[];
}
