export interface AdminStats {
  users: number;
  clinics: number;
  verifiedClinics: number;
  checkups: number;
  newCheckups: number;
  matches: number;
  pendingMatches: number;
}

export type AdminActivityKind = "clinic" | "checkup";

export interface AdminActivity {
  id: string;
  kind: AdminActivityKind;
  title: string;
  description: string;
  occurredAt: string;
  status: string;
}

export interface AdminDashboardData {
  stats: AdminStats;
  recentActivity: AdminActivity[];
  unavailableSources: string[];
}
