import StatsCards from "@/components/dashboard/clinic/StatsCards";
import RecentLeads from "@/components/dashboard/clinic/RecentLeads";
import PerformanceChart from "@/components/dashboard/clinic/PerformanceChart";
import UpcomingAppointments from "@/components/dashboard/clinic/UpcomingAppointments";
import QuickActions from "@/components/dashboard/clinic/QuickActions";

export default function ClinicDashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Panoramica delle tue performance e attività</p>
      </div>

      {/* Stats Cards */}
      <StatsCards />

      {/* Charts & Recent Activity */}
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <PerformanceChart />
        </div>
        <div>
          <QuickActions />
        </div>
      </div>

      {/* Leads & Appointments */}
      <div className="grid lg:grid-cols-2 gap-8">
        <RecentLeads />
        <UpcomingAppointments />
      </div>
    </div>
  );
}