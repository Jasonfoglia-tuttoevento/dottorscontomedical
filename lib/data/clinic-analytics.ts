import "server-only";

import { createClient } from "@/lib/supabase/server";
import type { ClinicAnalyticsData, ClinicAnalyticsDay } from "@/lib/types/analytics";

interface SummaryRow {
  days?: number;
  views?: number;
  uniqueVisitors?: number;
  clicks?: number;
  phoneClicks?: number;
  emailClicks?: number;
  websiteClicks?: number;
  requestClicks?: number;
  previousViews?: number;
  previousUniqueVisitors?: number;
  previousClicks?: number;
  clickThroughRate?: number;
  trackingSince?: string | null;
}

interface DailyRow {
  day: string;
  views: number | string;
  unique_visitors: number | string;
  clicks: number | string;
}

const DAY_FORMATTER = new Intl.DateTimeFormat("it-IT", {
  day: "2-digit",
  month: "short",
});

function numberValue(value: unknown): number {
  const parsed = Number(value ?? 0);
  return Number.isFinite(parsed) ? parsed : 0;
}

function trend(current: number, previous: number): number | null {
  if (previous === 0) return null;
  return Math.round(((current - previous) / previous) * 100);
}

function emptyAnalytics(days: number): ClinicAnalyticsData {
  return {
    available: false,
    days,
    views: 0,
    uniqueVisitors: 0,
    clicks: 0,
    phoneClicks: 0,
    emailClicks: 0,
    websiteClicks: 0,
    requestClicks: 0,
    clickThroughRate: 0,
    viewsTrend: null,
    visitorsTrend: null,
    clicksTrend: null,
    trackingSince: null,
    daily: [],
  };
}

export async function getClinicAnalyticsData(
  clinicId: string,
  days = 30,
): Promise<ClinicAnalyticsData> {
  const supabase = await createClient();
  const [summaryResult, dailyResult] = await Promise.all([
    supabase.rpc("get_clinic_analytics_summary", {
      p_clinic_id: clinicId,
      p_days: days,
    }),
    supabase.rpc("get_clinic_analytics_daily", {
      p_clinic_id: clinicId,
      p_days: days,
    }),
  ]);

  if (summaryResult.error || dailyResult.error) {
    const migrationMissing = [summaryResult.error, dailyResult.error]
      .filter(Boolean)
      .some((error) => error?.code === "42883" || error?.code === "PGRST202");

    if (migrationMissing) return emptyAnalytics(days);

    throw new Error("Impossibile recuperare le analitiche della clinica.");
  }

  const summary = (summaryResult.data ?? {}) as SummaryRow;
  const views = numberValue(summary.views);
  const visitors = numberValue(summary.uniqueVisitors);
  const clicks = numberValue(summary.clicks);
  const previousViews = numberValue(summary.previousViews);
  const previousVisitors = numberValue(summary.previousUniqueVisitors);
  const previousClicks = numberValue(summary.previousClicks);

  const daily: ClinicAnalyticsDay[] = ((dailyResult.data ?? []) as DailyRow[]).map((row) => {
    const date = new Date(`${row.day}T12:00:00Z`);

    return {
      date: row.day,
      label: DAY_FORMATTER.format(date),
      views: numberValue(row.views),
      uniqueVisitors: numberValue(row.unique_visitors),
      clicks: numberValue(row.clicks),
    };
  });

  return {
    available: true,
    days: numberValue(summary.days) || days,
    views,
    uniqueVisitors: visitors,
    clicks,
    phoneClicks: numberValue(summary.phoneClicks),
    emailClicks: numberValue(summary.emailClicks),
    websiteClicks: numberValue(summary.websiteClicks),
    requestClicks: numberValue(summary.requestClicks),
    clickThroughRate: numberValue(summary.clickThroughRate),
    viewsTrend: trend(views, previousViews),
    visitorsTrend: trend(visitors, previousVisitors),
    clicksTrend: trend(clicks, previousClicks),
    trackingSince: summary.trackingSince ?? null,
    daily,
  };
}
