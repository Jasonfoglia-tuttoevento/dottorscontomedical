import { Users } from "lucide-react";
import { redirect } from "next/navigation";
import UserFilters from "@/components/admin/users/UserFilters";
import UserTable from "@/components/admin/users/UserTable";
import AdminPageHeader from "@/components/admin/shared/AdminPageHeader";
import AdminPagination from "@/components/admin/shared/AdminPagination";
import { getAdminUsers } from "@/lib/admin/users/get-admin-users";
import type { AdminUserRoleFilter } from "@/lib/admin/users/types";
import { isUserRole } from "@/lib/auth/roles";
import {
  readPositiveInteger,
  readSearchParam,
} from "@/lib/admin/shared/search";

interface UsersSearchParams {
  q?: string | string[];
  role?: string | string[];
  page?: string | string[];
}

export default async function AdminUsersPage({
  searchParams,
}: {
  searchParams: Promise<UsersSearchParams>;
}) {
  const raw = await searchParams;
  const rawRole = readSearchParam(raw.role);
  const role: AdminUserRoleFilter = isUserRole(rawRole) ? rawRole : "all";
  const filters = {
    query: readSearchParam(raw.q),
    role,
    page: readPositiveInteger(raw.page),
  };

  const result = await getAdminUsers(filters);

  if (result.total > 0 && filters.page > result.totalPages) {
    redirect("/dashboard/admin/users");
  }

  const paginationParams = {
    ...(filters.query ? { q: filters.query } : {}),
    ...(filters.role !== "all" ? { role: filters.role } : {}),
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <AdminPageHeader
        eyebrow="Controllo accessi"
        title="Utenti"
        description="Visualizza i profili applicativi e gestisci i ruoli senza esporre credenziali o dati di autenticazione."
        icon={Users}
        count={result.total}
      />
      <UserFilters filters={filters} />
      <UserTable users={result.users} />
      <AdminPagination
        pathname="/dashboard/admin/users"
        page={result.page}
        totalPages={result.totalPages}
        params={paginationParams}
      />
    </div>
  );
}
