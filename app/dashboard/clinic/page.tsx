import ClinicDashboardEmptyState from "@/components/clinics/dashboard/ClinicDashboardEmptyState";
import ClinicDashboardHero from "@/components/clinics/dashboard/ClinicDashboardHero";
import ClinicPriorityPanel from "@/components/clinics/dashboard/ClinicPriorityPanel";
import ClinicQuickActions from "@/components/clinics/dashboard/ClinicQuickActions";
import ClinicStatsGrid from "@/components/clinics/dashboard/ClinicStatsGrid";
import { requireUserRole } from "@/lib/auth/get-user-context";
import { getClinicDashboardData } from "@/lib/data/clinic-dashboard";
import { getClinicByOwnerId } from "@/lib/data/clinics";

export default async function ClinicDashboard() {
  const context = await requireUserRole("clinic");
  const clinic = await getClinicByOwnerId(context.user.id);

  if (!clinic) return <ClinicDashboardEmptyState />;

  const dashboard = await getClinicDashboardData(clinic);

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <ClinicDashboardHero clinic={clinic} profilePercentage={dashboard.profile.percentage} />
      <ClinicPriorityPanel pendingLeads={dashboard.pendingLeads} missingProfileItems={dashboard.profile.missing} verified={clinic.verified} />
      <ClinicStatsGrid
        leadsThisMonth={dashboard.leadsThisMonth}
        leadsPreviousMonth={dashboard.leadsPreviousMonth}
        monthlyTrend={dashboard.monthlyTrend}
        pendingLeads={dashboard.pendingLeads}
        responseRate={dashboard.responseRate}
        conversionRate={dashboard.conversionRate}
      />
      <ClinicQuickActions slug={clinic.slug} />
    </div>
  );
}
