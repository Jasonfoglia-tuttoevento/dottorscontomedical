import "server-only";

import { createClient } from "@/lib/supabase/server";
import { getCurrentClinic } from "@/lib/supabase/getClinic";
import type {
  Match,
  MatchStatus,
  MatchWithCheckup,
} from "@/lib/types/database";

const MATCH_WITH_CHECKUP_SELECT = `
  id,
  clinic_id,
  checkup_id,
  status,
  created_at,
  checkups:checkups (
    id,
    category,
    treatment,
    city,
    patient_name,
    patient_email,
    patient_phone,
    notes,
    status,
    created_at
  )
`;

interface MatchFilters {
  status?: MatchStatus;
  since?: string;
  limit?: number;
}

export async function getClinicMatches(
  clinicId: string,
  filters: MatchFilters = {},
): Promise<MatchWithCheckup[]> {
  const supabase = await createClient();
  let query = supabase
    .from("matches")
    .select(MATCH_WITH_CHECKUP_SELECT)
    .eq("clinic_id", clinicId)
    .order("created_at", { ascending: false });

  if (filters.status) {
    query = query.eq("status", filters.status);
  }
  if (filters.since) {
    query = query.gte("created_at", filters.since);
  }
  if (filters.limit) {
    query = query.limit(filters.limit);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error("Impossibile recuperare i match della clinica.");
  }

  return (data ?? []) as unknown as MatchWithCheckup[];
}

export async function countClinicMatches(
  clinicId: string,
  filters: Omit<MatchFilters, "limit"> = {},
): Promise<number> {
  const supabase = await createClient();
  let query = supabase
    .from("matches")
    .select("id", { count: "exact", head: true })
    .eq("clinic_id", clinicId);

  if (filters.status) {
    query = query.eq("status", filters.status);
  }
  if (filters.since) {
    query = query.gte("created_at", filters.since);
  }

  const { count, error } = await query;

  if (error) {
    throw new Error("Impossibile contare i match della clinica.");
  }

  return count ?? 0;
}

export async function updateCurrentClinicMatchStatus(
  matchId: Match["id"],
  status: Extract<MatchStatus, "accepted" | "rejected">,
): Promise<void> {
  const clinicData = await getCurrentClinic();
  if (!clinicData?.clinic) {
    throw new Error("Accesso clinica non autorizzato.");
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("matches")
    .update({ status })
    .eq("id", matchId)
    .eq("clinic_id", clinicData.clinic.id);

  if (error) {
    throw new Error("Impossibile aggiornare lo stato del match.");
  }
}
