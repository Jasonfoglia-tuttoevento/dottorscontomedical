import { requireUserRole } from "@/lib/auth/get-user-context";

export default async function PatientDashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  await requireUserRole("patient");

  return children;
}
