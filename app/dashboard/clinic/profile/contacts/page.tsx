import ClinicProfileSectionShell from "@/components/clinics/profile/ClinicProfileSectionShell";
import ContactSection from "@/components/clinics/profile/sections/ContactSection";
import { getCurrentClinic } from "@/lib/supabase/getClinic";

export default async function ClinicProfileContactsPage() {
  const clinicData = await getCurrentClinic();
  if (!clinicData?.clinic) return <div className="rounded-2xl bg-white p-8 text-center">Nessuna clinica trovata.</div>;
  return <ClinicProfileSectionShell eyebrow="Profilo pubblico" title="Contatti" description="Gestisci telefono, email e sito web pubblicati nel marketplace."><ContactSection clinic={clinicData.clinic} /></ClinicProfileSectionShell>;
}
