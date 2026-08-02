import ClinicProfileSectionShell from "@/components/clinics/profile/ClinicProfileSectionShell";
import GallerySection from "@/components/clinics/profile/sections/GallerySection";
import { getCurrentClinic } from "@/lib/supabase/getClinic";

export default async function ClinicProfileGalleryPage() {
  const clinicData = await getCurrentClinic();
  if (!clinicData?.clinic) return <div className="rounded-2xl bg-white p-8 text-center">Nessuna clinica trovata.</div>;
  return <ClinicProfileSectionShell eyebrow="Immagine commerciale" title="Logo e galleria" description="Carica immagini professionali senza mescolarle agli altri dati del profilo."><GallerySection clinic={clinicData.clinic} /></ClinicProfileSectionShell>;
}
