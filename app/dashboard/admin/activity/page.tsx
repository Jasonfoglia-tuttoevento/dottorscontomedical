import AdminRecentActivity from "@/components/admin/AdminRecentActivity";
import AdminSystemStatus from "@/components/admin/AdminSystemStatus";
import { getAdminDashboardData } from "@/lib/admin/get-admin-dashboard-data";

export default async function AdminActivityPage() {
  const data = await getAdminDashboardData();

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div>
        <p className="text-xs font-black uppercase tracking-[0.16em] text-[#0D47A1]">Monitoraggio</p>
        <h2 className="mt-1 text-2xl font-black text-slate-950 sm:text-3xl">Attività e stato sistema</h2>
        <p className="mt-2 text-sm text-slate-600">Una pagina dedicata per consultare gli eventi senza allungare la panoramica.</p>
      </div>
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.55fr)_minmax(300px,0.75fr)]">
        <AdminRecentActivity activities={data.recentActivity} />
        <AdminSystemStatus unavailableSources={data.unavailableSources} />
      </div>
    </div>
  );
}
