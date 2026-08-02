import type { Clinic } from "@/lib/types/database";

export const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
export const SLUG_PATTERN = /^[a-z0-9](?:[a-z0-9-]{0,126}[a-z0-9])?$/i;

export function getClinicDetailIdentifier(clinic: Pick<Clinic, "id" | "slug">): string | null {
  const slug = clinic.slug?.trim();
  if (slug && SLUG_PATTERN.test(slug)) return slug;
  return UUID_PATTERN.test(clinic.id) ? clinic.id : null;
}
