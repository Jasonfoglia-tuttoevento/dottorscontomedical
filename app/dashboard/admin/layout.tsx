import type { ReactNode } from "react";
import AdminDashboardNav from "@/components/admin/AdminDashboardNav";
import AdminTopbar from "@/components/admin/AdminTopbar";
import { requireUserRole } from "@/lib/auth/get-user-context";

export default async function AdminDashboardLayout({ children }: { children: ReactNode }) {
  const context = await requireUserRole("admin");

  return (
    <div className="min-h-screen bg-slate-50">
      <AdminTopbar email={context.user.email ?? "admin@facilemedical.it"} />
      <AdminDashboardNav />
      <main className="px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-8">{children}</main>
    </div>
  );
}
