import { createClient } from "@/lib/supabase/server";
import { getCurrentClinic } from "@/lib/supabase/getClinic";
import GeneralInfoSection from "./sections/GeneralInfoSection";
import LocationSection from "./sections/LocationSection";
import ContactSection from "./sections/ContactSection";
import HoursSection from "./sections/HoursSection";
import GallerySection from "./sections/GallerySection";
import ServicesSection from "./sections/ServicesSection";

export default async function ClinicProfileForm() {
  const supabase = await createClient();
  const clinicData = await getCurrentClinic();
  
  if (!clinicData?.clinic) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-12 text-center">
        <div className="text-gray-400 mb-2">Nessuna clinica trovata</div>
      </div>
    );
  }

  // Recupera servizi
  const { data: services } = await supabase
    .from("services")
    .select("*")
    .eq("clinic_id", clinicData.clinic.id)
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-8">
      {/* Sezione 1: Informazioni Generali */}
      <GeneralInfoSection clinic={clinicData.clinic} />

      {/* Sezione 2: Indirizzo e Mappa */}
      <LocationSection clinic={clinicData.clinic} />

      {/* Sezione 3: Contatti */}
      <ContactSection clinic={clinicData.clinic} />

      {/* Sezione 4: Orari */}
      <HoursSection clinic={clinicData.clinic} />

      {/* Sezione 5: Galleria Foto */}
      <GallerySection clinic={clinicData.clinic} />

      {/* Sezione 6: Servizi */}
      <ServicesSection clinic={clinicData.clinic} services={services || []} />
    </div>
  );
}