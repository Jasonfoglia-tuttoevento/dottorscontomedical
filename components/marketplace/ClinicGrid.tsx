import ClinicCard from "@/components/marketplace/ClinicCard";
import MarketplaceEmptyState from "@/components/marketplace/MarketplaceEmptyState";
import type { Clinic } from "@/lib/types/database";

export default function ClinicGrid({ clinics }: { clinics: Clinic[] }) {
  if (clinics.length === 0) {
    return <MarketplaceEmptyState />;
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {clinics.map((clinic) => (
        <ClinicCard key={clinic.id} clinic={clinic} />
      ))}
    </div>
  );
}
