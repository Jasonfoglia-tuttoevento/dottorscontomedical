import StatsCards from "@/components/dashboard/clinic/StatsCards";
import RecentLeads from "@/components/dashboard/clinic/RecentLeads";
import PerformanceChart from "@/components/dashboard/clinic/PerformanceChart";

export default function ClinicDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Panoramica delle tue performance e attività</p>
      </div>
      <StatsCards />
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <PerformanceChart />
        </div>
        <div>
          <RecentLeads />
        </div>
      </div>
    </div>
  );
}