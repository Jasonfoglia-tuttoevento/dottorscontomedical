export const CLINIC_ANALYTICS_EVENT_TYPES = [
  "profile_view",
  "phone_click",
  "email_click",
  "website_click",
  "request_click",
] as const;

export type ClinicAnalyticsEventType = (typeof CLINIC_ANALYTICS_EVENT_TYPES)[number];

export interface ClinicAnalyticsDay {
  date: string;
  label: string;
  views: number;
  uniqueVisitors: number;
  clicks: number;
}

export interface ClinicAnalyticsData {
  available: boolean;
  days: number;
  views: number;
  uniqueVisitors: number;
  clicks: number;
  phoneClicks: number;
  emailClicks: number;
  websiteClicks: number;
  requestClicks: number;
  clickThroughRate: number;
  viewsTrend: number | null;
  visitorsTrend: number | null;
  clicksTrend: number | null;
  trackingSince: string | null;
  daily: ClinicAnalyticsDay[];
}
