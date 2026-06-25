import LeadTable from "@/components/dashboard/clinic/leads/LeadTable";
import LeadFilters from "@/components/dashboard/clinic/leads/LeadFilters";
import LeadStats from "@/components/dashboard/clinic/leads/LeadStats";

export default function LeadsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Lead</h1>
        <p className="text-gray-600">Gestisci le richieste dei pazienti e invia preventivi</p>
      </div>

      {/* Stats */}
      <LeadStats />

      {/* Filters */}
      <LeadFilters />

      {/* Table */}
      <LeadTable />
    </div>
  );
}