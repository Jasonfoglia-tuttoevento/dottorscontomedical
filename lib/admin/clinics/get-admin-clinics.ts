import "server-only";

import { createClient } from "@/lib/supabase/server";
import { escapeLikePattern } from "@/lib/admin/shared/search";
import type {
  AdminClinicFilters,
  AdminClinicResult,
} from "@/lib/admin/clinics/types";

const PAGE_SIZE = 12;

interface ClinicRow {
  id: string;
  owner_id: string;
  name: string;
  category: string | null;
  city: string | null;
  email: string | null;
  verified: boolean;
  created_at: string;
}

export async function getAdminClinics(
  filters: AdminClinicFilters,
): Promise<AdminClinicResult> {
  const supabase = await createClient();
  const from = (filters.page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  let query = supabase
    .from("clinics")
    .select(
      "id, owner_id, name, category, city, email, verified, created_at",
      { count: "exact" },
    )
    .order("created_at", { ascending: false })
    .order("id", { ascending: true });

  if (filters.query) {
    const safeQuery = escapeLikePattern(filters.query);
    query = query.or(
      `name.ilike.%${safeQuery}%,category.ilike.%${safeQuery}%,email.ilike.%${safeQuery}%`,
    );
  }

  if (filters.city) {
    query = query.ilike("city", `%${escapeLikePattern(filters.city)}%`);
  }

  if (filters.status === "verified") query = query.eq("verified", true);
  if (filters.status === "pending") query = query.eq("verified", false);

  const { data, error, count } = await query.range(from, to);

  if (error) {
    throw new Error(`Impossibile caricare le cliniche: ${error.message}`);
  }

  const total = count ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return {
    clinics: ((data ?? []) as ClinicRow[]).map((clinic) => ({
      id: clinic.id,
      ownerId: clinic.owner_id,
      name: clinic.name,
      category: clinic.category,
      city: clinic.city,
      email: clinic.email,
      verified: clinic.verified,
      createdAt: clinic.created_at,
    })),
    page: filters.page,
    total,
    totalPages,
  };
}
