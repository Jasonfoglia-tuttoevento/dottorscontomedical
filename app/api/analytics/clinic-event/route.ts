import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import {
  CLINIC_ANALYTICS_EVENT_TYPES,
  type ClinicAnalyticsEventType,
} from "@/lib/types/analytics";

export const runtime = "nodejs";

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const EVENT_TYPES = new Set<string>(CLINIC_ANALYTICS_EVENT_TYPES);

interface AnalyticsPayload {
  clinicId?: unknown;
  eventType?: unknown;
  visitorId?: unknown;
  sessionId?: unknown;
  pagePath?: unknown;
  referrer?: unknown;
}

function safeText(value: unknown, maxLength: number): string | null {
  if (typeof value !== "string") return null;
  const normalized = value.trim();
  return normalized ? normalized.slice(0, maxLength) : null;
}

export async function POST(request: Request) {
  let payload: AnalyticsPayload;

  try {
    payload = (await request.json()) as AnalyticsPayload;
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const clinicId = safeText(payload.clinicId, 36);
  const eventType = safeText(payload.eventType, 32);
  const visitorId = safeText(payload.visitorId, 128);
  const sessionId = safeText(payload.sessionId, 128);

  if (
    !clinicId
    || !UUID_PATTERN.test(clinicId)
    || !eventType
    || !EVENT_TYPES.has(eventType)
    || !visitorId
    || visitorId.length < 8
    || !sessionId
    || sessionId.length < 8
  ) {
    return NextResponse.json({ error: "invalid_payload" }, { status: 400 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const publicKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    ?? process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !publicKey) {
    return NextResponse.json({ error: "analytics_not_configured" }, { status: 503 });
  }

  const supabase = createClient(supabaseUrl, publicKey, {
    auth: {
      autoRefreshToken: false,
      detectSessionInUrl: false,
      persistSession: false,
    },
  });

  const { error } = await supabase.rpc("track_clinic_event", {
    p_clinic_id: clinicId,
    p_event_type: eventType as ClinicAnalyticsEventType,
    p_visitor_id: visitorId,
    p_session_id: sessionId,
    p_page_path: safeText(payload.pagePath, 300),
    p_referrer: safeText(payload.referrer, 500),
  });

  if (error) {
    return NextResponse.json({ error: "analytics_write_failed" }, { status: 500 });
  }

  return new NextResponse(null, { status: 204 });
}
