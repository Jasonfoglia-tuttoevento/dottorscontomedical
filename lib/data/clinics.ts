import "server-only";

import { cache } from "react";
import { createClient } from "@/lib/supabase/server";
import { SLUG_PATTERN, UUID_PATTERN } from "@/lib/marketplace/clinic-identifier";
import type { Clinic, Service } from "@/lib/types/database";

export const MARKETPLACE_PAGE_SIZE = 12;
export const MARKETPLACE_SORTS = ["newest", "name-asc", "name-desc"] as const;

export type MarketplaceSort = (typeof MARKETPLACE_SORTS)[number];

export interface ClinicFilters {
  category?: string;
  city?: string;
  verified?: boolean;
  searchQuery?: string;
  sort?: MarketplaceSort;
  page?: number;
}

export interface ClinicPage {
  clinics: Clinic[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export class MarketplaceDataError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "MarketplaceDataError";
  }
}

export async function getClinicByOwnerId(ownerId: string): Promise<Clinic | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("clinics")
    .select("*")
    .eq("owner_id", ownerId)
    .maybeSingle();

  if (error) {
    throw new MarketplaceDataError("Impossibile recuperare il profilo clinica.");
  }

  return data as Clinic | null;
}

export async function getPublicClinics(filters: ClinicFilters): Promise<ClinicPage> {
  const supabase = await createClient();
  const page = Math.max(1, Math.floor(filters.page ?? 1));
  const from = (page - 1) * MARKETPLACE_PAGE_SIZE;
  const to = from + MARKETPLACE_PAGE_SIZE - 1;
  let query = supabase.from("clinics").select("*", { count: "exact" });

  if (filters.category && filters.category !== "all") {
    query = query.eq("category", filters.category);
  }
  if (filters.city) {
    query = query.ilike("city", `%${filters.city}%`);
  }
  if (filters.verified) {
    query = query.eq("verified", true);
  }
  if (filters.searchQuery) {
    query = query.or(
      `name.ilike.%${filters.searchQuery}%,description.ilike.%${filters.searchQuery}%`,
    );
  }
  switch (filters.sort) {
    case "name-asc":
      query = query.order("name", { ascending: true }).order("id", { ascending: true });
      break;
    case "name-desc":
      query = query.order("name", { ascending: false }).order("id", { ascending: true });
      break;
    default:
      query = query.order("created_at", { ascending: false }).order("id", { ascending: true });
  }

  const { data, error, count } = await query.range(from, to);

  if (error) {
    throw new MarketplaceDataError("Impossibile recuperare l’elenco delle cliniche.");
  }

  const total = count ?? 0;

  return {
    clinics: (data ?? []) as Clinic[],
    total,
    page,
    pageSize: MARKETPLACE_PAGE_SIZE,
    totalPages: total === 0 ? 0 : Math.ceil(total / MARKETPLACE_PAGE_SIZE),
  };
}

export type ClinicDetail = Clinic & { services: Service[] };

export const getPublicClinicByIdentifier = cache(async (
  identifier: string,
): Promise<ClinicDetail | null> => {
  const normalizedIdentifier = identifier.trim();
  const lookupColumn = UUID_PATTERN.test(normalizedIdentifier)
    ? "id"
    : SLUG_PATTERN.test(normalizedIdentifier)
      ? "slug"
      : null;

  if (!lookupColumn) {
    return null;
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("clinics")
    .select("*, services(*)")
    .eq(lookupColumn, normalizedIdentifier)
    .maybeSingle();

  if (error) {
    throw new MarketplaceDataError("Impossibile recuperare la clinica.");
  }

  return data as ClinicDetail | null;
});
