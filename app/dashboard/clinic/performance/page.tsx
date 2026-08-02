import ClinicAcceptedContacts from "@/components/clinics/dashboard/ClinicAcceptedContacts";
import ClinicDashboardEmptyState from "@/components/clinics/dashboard/ClinicDashboardEmptyState";
import ClinicLeadFunnel from "@/components/clinics/dashboard/ClinicLeadFunnel";
import ClinicPerformanceChart from "@/components/clinics/dashboard/ClinicPerformanceChart";
import ClinicRecentLeads from "@/components/clinics/dashboard/ClinicRecentLeads";
import { requireUserRole } from "@/lib/auth/get-user-context";
import { getClinicDashboardData } from "@/lib/data/clinic-dashboard";
import { getClinicByOwnerId } from "@/lib/data/clinics";

export default async function ClinicPerformancePage() {
  const context = await requireUserRole("clinic");
  const clinic = await getClinicByOwnerId(context.user.id);

  if (!clinic) return <ClinicDashboardEmptyState />;

  const dashboard = await getClinicDashboardData(clinic);

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div>
        <p className="text-xs font-black uppercase tracking-[0.16em] text-[#0D47A1]">Analisi operativa</p>
        <h2 className="mt-1 text-2xl font-black text-slate-950 sm:text-3xl">Richieste e conversioni</h2>
        <p className="mt-2 text-sm text-slate-600">Grafici e contatti sono separati dalla panoramica per mantenere ogni schermata più leggibile.</p>
      </div>
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.4fr)_minmax(300px,0.6fr)]">
        <ClinicPerformanceChart data={dashboard.monthlyPerformance} responseRate={dashboard.responseRate} />
        <ClinicLeadFunnel pending={dashboard.pendingLeads} accepted={dashboard.acceptedLeads} rejected={dashboard.rejectedLeads} />
      </div>
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.25fr)_minmax(320px,0.75fr)]">
        <ClinicRecentLeads leads={dashboard.recentLeads} />
        <ClinicAcceptedContacts leads={dashboard.acceptedContacts} />
      </div>
    </div>
  );
}
