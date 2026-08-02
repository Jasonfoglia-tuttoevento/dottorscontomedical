import ClinicProfileSectionShell from "@/components/clinics/profile/ClinicProfileSectionShell";
import GeneralInfoSection from "@/components/clinics/profile/sections/GeneralInfoSection";
import LocationSection from "@/components/clinics/profile/sections/LocationSection";
import { getCurrentClinic } from "@/lib/supabase/getClinic";

export default async function ClinicProfileGeneralPage() {
  const clinicData = await getCurrentClinic();
  if (!clinicData?.clinic) return <div className="rounded-2xl bg-white p-8 text-center">Nessuna clinica trovata.</div>;

  return (
    <ClinicProfileSectionShell eyebrow="Profilo pubblico" title="Dati e sede" description="Aggiorna identità, descrizione e indirizzo della clinica.">
      <div className="space-y-6">
        <GeneralInfoSection clinic={clinicData.clinic} />
        <LocationSection clinic={clinicData.clinic} />
      </div>
    </ClinicProfileSectionShell>
  );
}
