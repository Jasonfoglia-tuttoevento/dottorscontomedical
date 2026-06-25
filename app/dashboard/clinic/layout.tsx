import ClinicSidebar from "@/components/dashboard/clinic/ClinicSidebar";
import DashboardHeader from "@/components/dashboard/shared/DashboardHeader";

export default function ClinicDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-50">
      <ClinicSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />
        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>
      </div>
    </div>
  );
}