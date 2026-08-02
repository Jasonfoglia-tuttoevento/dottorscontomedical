import "server-only";

import { countClinicMatches, getClinicMatches } from "@/lib/data/matches";
import { getClinicProfileCompleteness } from "@/lib/clinics/profile-completeness";
import { createClient } from "@/lib/supabase/server";
import type { Clinic, MatchWithCheckup } from "@/lib/types/database";

export interface ClinicMonthlyPerformance {
  key: string;
  label: string;
  leads: number;
  accepted: number;
}

export interface ClinicDashboardData {
  leadsThisMonth: number;
  leadsPreviousMonth: number;
  monthlyTrend: number | null;
  pendingLeads: number;
  acceptedLeads: number;
  rejectedLeads: number;
  totalLeads: number;
  conversionRate: number;
  responseRate: number;
  servicesCount: number;
  monthlyPerformance: ClinicMonthlyPerformance[];
  recentLeads: MatchWithCheckup[];
  acceptedContacts: MatchWithCheckup[];
  profile: ReturnType<typeof getClinicProfileCompleteness>;
}

const MONTH_LABELS = ["Gen", "Feb", "Mar", "Apr", "Mag", "Giu", "Lug", "Ago", "Set", "Ott", "Nov", "Dic"];

function createMonthlyPerformance(matches: MatchWithCheckup[]): ClinicMonthlyPerformance[] {
  const now = new Date();
  const months = Array.from({ length: 6 }, (_, index) => {
    const date = new Date(now.getFullYear(), now.getMonth() - (5 - index), 1);

    return {
      key: `${date.getFullYear()}-${date.getMonth()}`,
      label: MONTH_LABELS[date.getMonth()],
      leads: 0,
      accepted: 0,
    };
  });
  const byKey = new Map(months.map((month) => [month.key, month]));

  for (const match of matches) {
    const date = new Date(match.created_at);
    const month = byKey.get(`${date.getFullYear()}-${date.getMonth()}`);

    if (!month) {
      continue;
    }

    month.leads += 1;

    if (match.status === "accepted") {
      month.accepted += 1;
    }
  }

  return months;
}

function calculateTrend(current: number, previous: number): number | null {
  if (previous === 0) {
    return null;
  }

  return Math.round(((current - previous) / previous) * 100);
}

export async function getClinicDashboardData(clinic: Clinic): Promise<ClinicDashboardData> {
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const nextMonthStart = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  const previousMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const sixMonthsStart = new Date(now.getFullYear(), now.getMonth() - 5, 1);
  const supabase = await createClient();

  const [
    leadsThisMonth,
    leadsPreviousMonth,
    pendingLeads,
    acceptedLeads,
    rejectedLeads,
    performanceMatches,
    recentLeads,
    acceptedContacts,
    servicesResult,
  ] = await Promise.all([
    countClinicMatches(clinic.id, {
      since: monthStart.toISOString(),
      before: nextMonthStart.toISOString(),
    }),
    countClinicMatches(clinic.id, {
      since: previousMonthStart.toISOString(),
      before: monthStart.toISOString(),
    }),
    countClinicMatches(clinic.id, { status: "pending" }),
    countClinicMatches(clinic.id, { status: "accepted" }),
    countClinicMatches(clinic.id, { status: "rejected" }),
    getClinicMatches(clinic.id, { since: sixMonthsStart.toISOString() }),
    getClinicMatches(clinic.id, { limit: 6 }),
    getClinicMatches(clinic.id, { status: "accepted", limit: 3 }),
    supabase
      .from("services")
      .select("id", { count: "exact", head: true })
      .eq("clinic_id", clinic.id),
  ]);

  if (servicesResult.error) {
    throw new Error("Impossibile recuperare i servizi della clinica.");
  }

  const resolvedLeads = acceptedLeads + rejectedLeads;
  const totalLeads = resolvedLeads + pendingLeads;

  return {
    leadsThisMonth,
    leadsPreviousMonth,
    monthlyTrend: calculateTrend(leadsThisMonth, leadsPreviousMonth),
    pendingLeads,
    acceptedLeads,
    rejectedLeads,
    totalLeads,
    conversionRate: resolvedLeads > 0 ? Math.round((acceptedLeads / resolvedLeads) * 100) : 0,
    responseRate: totalLeads > 0 ? Math.round((resolvedLeads / totalLeads) * 100) : 0,
    servicesCount: servicesResult.count ?? 0,
    monthlyPerformance: createMonthlyPerformance(performanceMatches),
    recentLeads,
    acceptedContacts,
    profile: getClinicProfileCompleteness(clinic),
  };
}
