"use client";

import { useEffect } from "react";
import type { ClinicAnalyticsEventType } from "@/lib/types/analytics";

interface ClinicAnalyticsTrackerProps {
  clinicId: string;
}

const VISITOR_KEY = "facilemedical.analytics.visitor";
const SESSION_KEY = "facilemedical.analytics.session";

function createIdentifier(prefix: string): string {
  const random = typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  return `${prefix}-${random}`;
}

function storedIdentifier(storage: Storage, key: string, prefix: string): string {
  try {
    const existing = storage.getItem(key);
    if (existing && existing.length >= 8) return existing;
    const created = createIdentifier(prefix);
    storage.setItem(key, created);
    return created;
  } catch {
    return createIdentifier(prefix);
  }
}

function trackEvent(clinicId: string, eventType: ClinicAnalyticsEventType) {
  const visitorId = storedIdentifier(window.localStorage, VISITOR_KEY, "visitor");
  const sessionId = storedIdentifier(window.sessionStorage, SESSION_KEY, "session");

  void fetch("/api/analytics/clinic-event", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      clinicId,
      eventType,
      visitorId,
      sessionId,
      pagePath: window.location.pathname,
      referrer: document.referrer || null,
    }),
    credentials: "same-origin",
    keepalive: true,
  }).catch(() => undefined);
}

export default function ClinicAnalyticsTracker({ clinicId }: ClinicAnalyticsTrackerProps) {
  useEffect(() => {
    const viewKey = `facilemedical.analytics.viewed.${clinicId}`;

    try {
      if (window.sessionStorage.getItem(viewKey) !== "1") {
        trackEvent(clinicId, "profile_view");
        window.sessionStorage.setItem(viewKey, "1");
      }
    } catch {
      trackEvent(clinicId, "profile_view");
    }

    const handleClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const trackedElement = target.closest("[data-clinic-event]");
      if (!(trackedElement instanceof HTMLElement)) return;
      const eventType = trackedElement.dataset.clinicEvent as ClinicAnalyticsEventType | undefined;
      if (!eventType) return;
      trackEvent(clinicId, eventType);
    };

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [clinicId]);

  return null;
}
