export type ClinicVerificationFilter = "all" | "verified" | "pending";

export interface AdminClinicListItem {
  id: string;
  ownerId: string;
  name: string;
  category: string | null;
  city: string | null;
  email: string | null;
  verified: boolean;
  createdAt: string;
}

export interface AdminClinicFilters {
  query: string;
  city: string;
  status: ClinicVerificationFilter;
  page: number;
}

export interface AdminClinicResult {
  clinics: AdminClinicListItem[];
  page: number;
  total: number;
  totalPages: number;
}
