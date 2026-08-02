import AdminModuleGrid from "@/components/admin/AdminModuleGrid";
import AdminStatsGrid from "@/components/admin/AdminStatsGrid";
import { getAdminDashboardData } from "@/lib/admin/get-admin-dashboard-data";

export default async function AdminDashboardPage() {
  const data = await getAdminDashboardData();

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <section className="rounded-3xl bg-gradient-to-br from-[#0D47A1] via-blue-800 to-slate-950 px-5 py-6 text-white shadow-xl shadow-blue-950/10 sm:px-8 sm:py-8">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-200">Centro di controllo</p>
        <h2 className="mt-3 text-2xl font-black tracking-tight sm:text-4xl">Panoramica compatta della piattaforma.</h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-blue-100 sm:text-base">
          Le attività dettagliate sono state divise in sezioni cliccabili per evitare una dashboard lunga e dispersiva.
        </p>
      </section>
      <AdminStatsGrid stats={data.stats} />
      <AdminModuleGrid />
    </div>
  );
}
