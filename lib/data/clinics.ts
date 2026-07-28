import "server-only";

import { createClient } from "@/lib/supabase/server";
import type { Clinic, Service } from "@/lib/types/database";

export interface ClinicFilters {
  category?: string;
  city?: string;
  verified?: boolean;
  searchQuery?: string;
  minRating?: number;
  priceRange?: string;
}

export async function getClinicByOwnerId(ownerId: string): Promise<Clinic | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("clinics")
    .select("*")
    .eq("owner_id", ownerId)
    .maybeSingle();

  if (error) {
    throw new Error("Impossibile recuperare il profilo clinica.");
  }

  return data as Clinic | null;
}

export async function getPublicClinics(filters: ClinicFilters): Promise<Clinic[]> {
  const supabase = await createClient();
  let query = supabase.from("clinics").select("*");

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
  if (filters.minRating && filters.minRating > 0) {
    query = query.gte("rating", filters.minRating);
  }
  if (filters.priceRange && filters.priceRange !== "all") {
    const priceMap: Record<string, number> = { low: 1, medium: 2, high: 3 };
    const priceLevel = priceMap[filters.priceRange];
    if (priceLevel) {
      query = query.eq("price_level", priceLevel);
    }
  }

  const { data, error } = await query.order("created_at", { ascending: false });

  if (error) {
    throw new Error("Impossibile recuperare l’elenco delle cliniche.");
  }

  return (data ?? []) as Clinic[];
}

export async function getPublicClinicBySlug(
  slug: string,
): Promise<(Clinic & { services: Service[] }) | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("clinics")
    .select("*, services(*)")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    throw new Error("Impossibile recuperare la clinica.");
  }

  return data as (Clinic & { services: Service[] }) | null;
}
