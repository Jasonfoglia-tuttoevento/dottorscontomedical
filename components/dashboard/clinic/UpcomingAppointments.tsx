import Link from "next/link";
import { Calendar, Clock, MapPin, ArrowRight } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { getCurrentClinic } from "@/lib/supabase/getClinic";

export default async function UpcomingAppointments() {
  const supabase = await createClient();
  const clinicData = await getCurrentClinic();
  
  if (!clinicData?.clinic) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 w-48 bg-gray-200 rounded"></div>
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-100 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Per ora mostriamo i match accettati come "appuntamenti"
  // In futuro avremo una tabella appointments dedicata
  const { data: appointments } = await supabase
    .from("matches")
    .select(`
      *,
      checkups:checkups (
        category,
        issue,
        patients:patients (name, phone)
      )
    `)
    .eq("clinic_id", clinicData.clinic.id)
    .eq("status", "accepted")
    .order("created_at", { ascending: false })
    .limit(5);

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-900">Prossimi Appuntamenti</h3>
          <Link href="/dashboard/clinic/appointments" className="text-red-600 hover:text-red-700 text-sm font-semibold">
            Vedi tutti
          </Link>
        </div>
      </div>

      <div className="divide-y divide-gray-200">
        {appointments && appointments.length > 0 ? (
          appointments.map((apt: any) => (
            <div key={apt.id} className="p-4 hover:bg-gray-50 transition">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="font-semibold text-gray-900">
                    {apt.checkups?.patients?.name || "Paziente"}
                  </div>
                  <div className="text-sm text-gray-600">
                    {apt.checkups?.category || "Visita"}
                  </div>
                </div>
                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                  Confermato
                </span>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {new Date(apt.created_at).toLocaleDateString("it-IT")}
                </span>
                {apt.checkups?.patients?.phone && (
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {apt.checkups.patients.phone}
                  </span>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="p-8 text-center">
            <div className="text-gray-400 mb-2">Nessun appuntamento</div>
            <div className="text-sm text-gray-500">
              Gli appuntamenti confermati appariranno qui
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-gray-200">
        <Link
          href="/dashboard/clinic/appointments"
          className="flex items-center justify-center gap-2 text-red-600 hover:text-red-700 font-semibold text-sm"
        >
          Vedi tutti gli appuntamenti
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}