import ClinicProfileSectionShell from "@/components/clinics/profile/ClinicProfileSectionShell";
import HoursSection from "@/components/clinics/profile/sections/HoursSection";
import { getCurrentClinic } from "@/lib/supabase/getClinic";

export default async function ClinicProfileHoursPage() {
  const clinicData = await getCurrentClinic();
  if (!clinicData?.clinic) return <div className="rounded-2xl bg-white p-8 text-center">Nessuna clinica trovata.</div>;
  return <ClinicProfileSectionShell eyebrow="Disponibilità" title="Orari di apertura" description="Configura una sola sezione e salva gli orari pubblicati nella pagina clinica."><HoursSection clinic={clinicData.clinic} /></ClinicProfileSectionShell>;
}
