import type { UserRole } from "@/lib/auth/roles";

export type AdminUserRoleFilter = "all" | UserRole;

export interface AdminUserClinicSummary {
  id: string;
  name: string;
  city: string | null;
  verified: boolean;
}

export interface AdminUserListItem {
  id: string;
  role: UserRole;
  clinic: AdminUserClinicSummary | null;
  isCurrentUser: boolean;
}

export interface AdminUserFilters {
  query: string;
  role: AdminUserRoleFilter;
  page: number;
}

export interface AdminUserResult {
  users: AdminUserListItem[];
  page: number;
  total: number;
  totalPages: number;
}
