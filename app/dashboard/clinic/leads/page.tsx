import LeadFilters, { type LeadFilterValues } from "@/components/clinics/leads/LeadFilters";
import LeadStats from "@/components/clinics/leads/LeadStats";
import LeadTable from "@/components/clinics/leads/LeadTable";
import { requireUserRole } from "@/lib/auth/get-user-context";
import { getClinicByOwnerId } from "@/lib/data/clinics";
import { countClinicMatches, getClinicMatches } from "@/lib/data/matches";
import type { MatchStatus, MatchWithCheckup } from "@/lib/types/database";

interface ClinicLeadSearchParams {
  q?: string;
  status?: string;
  from?: string;
  to?: string;
}

function validDate(value: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
}

function dateStart(value: string) {
  return validDate(value) ? new Date(`${value}T00:00:00.000Z`).toISOString() : undefined;
}

function dateEndExclusive(value: string) {
  if (!validDate(value)) {
    return undefined;
  }

  const date = new Date(`${value}T00:00:00.000Z`);
  date.setUTCDate(date.getUTCDate() + 1);
  return date.toISOString();
}

function parseStatus(value: string): MatchStatus | undefined {
  return value === "pending" || value === "accepted" || value === "rejected" ? value : undefined;
}

function matchesSearch(match: MatchWithCheckup, query: string) {
  if (!query) {
    return true;
  }

  const checkup = match.checkups;
  const haystack = [
    checkup?.patient_name,
    checkup?.treatment,
    checkup?.category,
    checkup?.city,
  ]
    .filter(Boolean)
    .join(" ")
    .toLocaleLowerCase("it-IT");

  return haystack.includes(query.toLocaleLowerCase("it-IT"));
}

export default async function LeadsPage({
  searchParams,
}: {
  searchParams: Promise<ClinicLeadSearchParams>;
}) {
  const context = await requireUserRole("clinic");
  const clinic = await getClinicByOwnerId(context.user.id);

  if (!clinic) {
    return (
      <section className="rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center shadow-sm">
        <h2 className="text-xl font-black text-gray-950">Profilo clinica non configurato</h2>
        <p className="mt-2 text-sm text-gray-500">Completa il profilo prima di gestire i lead.</p>
      </section>
    );
  }

  const params = await searchParams;
  const values: LeadFilterValues = {
    q: params.q?.trim() ?? "",
    status: parseStatus(params.status ?? "") ?? "",
    from: validDate(params.from ?? "") ? params.from ?? "" : "",
    to: validDate(params.to ?? "") ? params.to ?? "" : "",
  };
  const status = parseStatus(values.status);

  const [matches, total, pending, accepted, rejected] = await Promise.all([
    getClinicMatches(clinic.id, {
      status,
      since: dateStart(values.from),
      before: dateEndExclusive(values.to),
    }),
    countClinicMatches(clinic.id),
    countClinicMatches(clinic.id, { status: "pending" }),
    countClinicMatches(clinic.id, { status: "accepted" }),
    countClinicMatches(clinic.id, { status: "rejected" }),
  ]);

  const filteredMatches = matches.filter((match) => matchesSearch(match, values.q));

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-[#0D47A1]">Pipeline commerciale</p>
          <h2 className="mt-1 text-3xl font-black tracking-tight text-gray-950">Lead della clinica</h2>
          <p className="mt-2 text-gray-600">I contatti diretti vengono mostrati soltanto dopo l’accettazione del lead.</p>
        </div>
        <p className="text-sm font-semibold text-gray-500">{filteredMatches.length} {filteredMatches.length === 1 ? "risultato" : "risultati"}</p>
      </div>

      <LeadStats total={total} pending={pending} accepted={accepted} rejected={rejected} />
      <LeadFilters values={values} />
      <LeadTable matches={filteredMatches} />
    </div>
  );
}
