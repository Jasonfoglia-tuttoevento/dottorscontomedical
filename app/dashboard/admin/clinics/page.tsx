import { Building2 } from "lucide-react";
import { redirect } from "next/navigation";
import ClinicFilters from "@/components/admin/clinics/ClinicFilters";
import ClinicTable from "@/components/admin/clinics/ClinicTable";
import AdminPageHeader from "@/components/admin/shared/AdminPageHeader";
import AdminPagination from "@/components/admin/shared/AdminPagination";
import { getAdminClinics } from "@/lib/admin/clinics/get-admin-clinics";
import type { ClinicVerificationFilter } from "@/lib/admin/clinics/types";
import {
  readPositiveInteger,
  readSearchParam,
} from "@/lib/admin/shared/search";

interface ClinicsSearchParams {
  q?: string | string[];
  city?: string | string[];
  status?: string | string[];
  page?: string | string[];
}

export default async function AdminClinicsPage({
  searchParams,
}: {
  searchParams: Promise<ClinicsSearchParams>;
}) {
  const raw = await searchParams;
  const rawStatus = readSearchParam(raw.status);
  const status: ClinicVerificationFilter =
    rawStatus === "verified" || rawStatus === "pending" ? rawStatus : "all";
  const filters = {
    query: readSearchParam(raw.q),
    city: readSearchParam(raw.city),
    status,
    page: readPositiveInteger(raw.page),
  };

  const result = await getAdminClinics(filters);

  if (result.total > 0 && filters.page > result.totalPages) {
    redirect("/dashboard/admin/clinics");
  }

  const paginationParams = {
    ...(filters.query ? { q: filters.query } : {}),
    ...(filters.city ? { city: filters.city } : {}),
    ...(filters.status !== "all" ? { status: filters.status } : {}),
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <AdminPageHeader
        eyebrow="Gestione piattaforma"
        title="Cliniche"
        description="Controlla le strutture registrate e abilita la visibilità pubblica soltanto dopo la verifica amministrativa."
        icon={Building2}
        count={result.total}
      />
      <ClinicFilters filters={filters} />
      <ClinicTable clinics={result.clinics} />
      <AdminPagination
        pathname="/dashboard/admin/clinics"
        page={result.page}
        totalPages={result.totalPages}
        params={paginationParams}
      />
    </div>
  );
}
