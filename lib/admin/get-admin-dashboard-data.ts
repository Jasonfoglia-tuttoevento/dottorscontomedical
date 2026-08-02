import "server-only";

import { createClient } from "@/lib/supabase/server";
import type {
  AdminActivity,
  AdminDashboardData,
} from "@/lib/admin/types";

interface RecentClinicRow {
  id: string;
  name: string;
  verified: boolean;
  created_at: string;
}

interface RecentCheckupRow {
  id: string;
  category: string;
  treatment: string;
  status: string;
  created_at: string;
}

export async function getAdminDashboardData(): Promise<AdminDashboardData> {
  const supabase = await createClient();

  const [
    usersResult,
    clinicsResult,
    verifiedClinicsResult,
    checkupsResult,
    newCheckupsResult,
    matchesResult,
    pendingMatchesResult,
    recentClinicsResult,
    recentCheckupsResult,
  ] = await Promise.all([
    supabase.from("profiles").select("id", { count: "exact", head: true }),
    supabase.from("clinics").select("id", { count: "exact", head: true }),
    supabase
      .from("clinics")
      .select("id", { count: "exact", head: true })
      .eq("verified", true),
    supabase.from("checkups").select("id", { count: "exact", head: true }),
    supabase
      .from("checkups")
      .select("id", { count: "exact", head: true })
      .eq("status", "new"),
    supabase.from("matches").select("id", { count: "exact", head: true }),
    supabase
      .from("matches")
      .select("id", { count: "exact", head: true })
      .eq("status", "pending"),
    supabase
      .from("clinics")
      .select("id, name, verified, created_at")
      .order("created_at", { ascending: false })
      .limit(4),
    supabase
      .from("checkups")
      .select("id, category, treatment, status, created_at")
      .order("created_at", { ascending: false })
      .limit(4),
  ]);

  const sourceChecks = [
    { label: "utenti", error: usersResult.error },
    { label: "cliniche", error: clinicsResult.error ?? verifiedClinicsResult.error ?? recentClinicsResult.error },
    { label: "check-up", error: checkupsResult.error ?? newCheckupsResult.error ?? recentCheckupsResult.error },
    { label: "match", error: matchesResult.error ?? pendingMatchesResult.error },
  ];

  const unavailableSources = sourceChecks
    .filter((source) => Boolean(source.error))
    .map((source) => source.label);

  const clinicActivity: AdminActivity[] = (
    (recentClinicsResult.data ?? []) as RecentClinicRow[]
  ).map((clinic) => ({
    id: `clinic-${clinic.id}`,
    kind: "clinic",
    title: clinic.name,
    description: "Nuova struttura registrata",
    occurredAt: clinic.created_at,
    status: clinic.verified ? "Verificata" : "Da verificare",
  }));

  const checkupActivity: AdminActivity[] = (
    (recentCheckupsResult.data ?? []) as RecentCheckupRow[]
  ).map((checkup) => ({
    id: `checkup-${checkup.id}`,
    kind: "checkup",
    title: checkup.treatment,
    description: checkup.category,
    occurredAt: checkup.created_at,
    status: checkup.status,
  }));

  return {
    stats: {
      users: usersResult.count ?? 0,
      clinics: clinicsResult.count ?? 0,
      verifiedClinics: verifiedClinicsResult.count ?? 0,
      checkups: checkupsResult.count ?? 0,
      newCheckups: newCheckupsResult.count ?? 0,
      matches: matchesResult.count ?? 0,
      pendingMatches: pendingMatchesResult.count ?? 0,
    },
    recentActivity: [...clinicActivity, ...checkupActivity]
      .sort(
        (first, second) =>
          new Date(second.occurredAt).getTime() -
          new Date(first.occurredAt).getTime(),
      )
      .slice(0, 6),
    unavailableSources,
  };
}
