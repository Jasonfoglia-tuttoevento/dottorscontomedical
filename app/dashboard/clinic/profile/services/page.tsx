import ClinicProfileSectionShell from "@/components/clinics/profile/ClinicProfileSectionShell";
import ServicesSection from "@/components/clinics/profile/sections/ServicesSection";
import { createClient } from "@/lib/supabase/server";
import { getCurrentClinic } from "@/lib/supabase/getClinic";

export default async function ClinicProfileServicesPage() {
  const clinicData = await getCurrentClinic();
  if (!clinicData?.clinic) return <div className="rounded-2xl bg-white p-8 text-center">Nessuna clinica trovata.</div>;
  const supabase = await createClient();
  const { data: services } = await supabase.from("services").select("*").eq("clinic_id", clinicData.clinic.id).order("created_at", { ascending: false });
  return <ClinicProfileSectionShell eyebrow="Offerta clinica" title="Servizi e prezzi" description="Gestisci i trattamenti in una pagina dedicata, più facile da usare anche da smartphone."><ServicesSection clinic={clinicData.clinic} services={services ?? []} /></ClinicProfileSectionShell>;
}
