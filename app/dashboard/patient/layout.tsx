import type { ReactNode } from "react";
import PatientDashboardHeader from "@/components/patient/PatientDashboardHeader";
import { requireUserRole } from "@/lib/auth/get-user-context";

export default async function PatientDashboardLayout({ children }: { children: ReactNode }) {
  const context = await requireUserRole("patient");

  return (
    <div className="min-h-screen bg-slate-50">
      <PatientDashboardHeader email={context.user.email ?? ""} />
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">{children}</main>
    </div>
  );
}
