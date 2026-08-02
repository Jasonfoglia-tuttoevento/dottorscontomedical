import type { ReactNode } from "react";
import ClinicDashboardNav from "@/components/clinics/navigation/ClinicDashboardNav";
import DashboardHeader from "@/components/dashboard/shared/DashboardHeader";
import { requireUserRole } from "@/lib/auth/get-user-context";

export default async function ClinicDashboardLayout({ children }: { children: ReactNode }) {
  await requireUserRole("clinic");

  return (
    <div className="min-h-screen bg-slate-50">
      <DashboardHeader />
      <ClinicDashboardNav />
      <main className="px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-8">{children}</main>
    </div>
  );
}
