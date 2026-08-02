import "server-only";

import { createClient } from "@/lib/supabase/server";
import { isUserRole, type UserRole } from "@/lib/auth/roles";
import {
  escapeLikePattern,
  isUuid,
} from "@/lib/admin/shared/search";
import type {
  AdminUserFilters,
  AdminUserResult,
} from "@/lib/admin/users/types";

const PAGE_SIZE = 15;

interface ProfileRow {
  id: string;
  role: unknown;
}

interface ValidProfileRow {
  id: string;
  role: UserRole;
}

interface ClinicRow {
  id: string;
  owner_id: string;
  name: string;
  city: string | null;
  verified: boolean;
}

export async function getAdminUsers(
  filters: AdminUserFilters,
): Promise<AdminUserResult> {
  const supabase = await createClient();
  const {
    data: { user: currentUser },
  } = await supabase.auth.getUser();

  let matchingOwnerIds: string[] | null = null;

  if (filters.query && !isUuid(filters.query)) {
    const { data: matchingClinics, error: clinicSearchError } = await supabase
      .from("clinics")
      .select("owner_id")
      .ilike("name", `%${escapeLikePattern(filters.query)}%`)
      .limit(250);

    if (clinicSearchError) {
      throw new Error(`Ricerca utenti non disponibile: ${clinicSearchError.message}`);
    }

    matchingOwnerIds = Array.from(
      new Set(
        (matchingClinics ?? [])
          .map((clinic) => clinic.owner_id)
          .filter((ownerId): ownerId is string => typeof ownerId === "string"),
      ),
    );

    if (matchingOwnerIds.length === 0) {
      return { users: [], page: 1, total: 0, totalPages: 1 };
    }
  }

  const from = (filters.page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  let profilesQuery = supabase
    .from("profiles")
    .select("id, role", { count: "exact" })
    .order("id", { ascending: true });

  if (filters.query && isUuid(filters.query)) {
    profilesQuery = profilesQuery.eq("id", filters.query);
  } else if (matchingOwnerIds) {
    profilesQuery = profilesQuery.in("id", matchingOwnerIds);
  }

  if (filters.role !== "all") {
    profilesQuery = profilesQuery.eq("role", filters.role);
  }

  const { data, error, count } = await profilesQuery.range(from, to);

  if (error) {
    throw new Error(`Impossibile caricare gli utenti: ${error.message}`);
  }

  const profiles = ((data ?? []) as ProfileRow[]).filter(
    (profile): profile is ValidProfileRow => isUserRole(profile.role),
  );
  const profileIds = profiles.map((profile) => profile.id);
  let clinics: ClinicRow[] = [];

  if (profileIds.length > 0) {
    const { data: clinicData, error: clinicError } = await supabase
      .from("clinics")
      .select("id, owner_id, name, city, verified")
      .in("owner_id", profileIds);

    if (clinicError) {
      throw new Error(`Collegamento cliniche non disponibile: ${clinicError.message}`);
    }

    clinics = (clinicData ?? []) as ClinicRow[];
  }

  const clinicByOwner = new Map(clinics.map((clinic) => [clinic.owner_id, clinic]));
  const total = count ?? 0;

  return {
    users: profiles.map((profile) => {
      const clinic = clinicByOwner.get(profile.id);
      return {
        id: profile.id,
        role: profile.role,
        clinic: clinic
          ? {
              id: clinic.id,
              name: clinic.name,
              city: clinic.city,
              verified: clinic.verified,
            }
          : null,
        isCurrentUser: profile.id === currentUser?.id,
      };
    }),
    page: filters.page,
    total,
    totalPages: Math.max(1, Math.ceil(total / PAGE_SIZE)),
  };
}
