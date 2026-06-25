import Link from "next/link";
import { ArrowRight, Clock, MapPin } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { getCurrentClinic } from "@/lib/supabase/getClinic";

export default async function RecentLeads() {
  const supabase = await createClient();
  const clinicData = await getCurrentClinic();
  
  if (!clinicData?.clinic) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 w-32 bg-gray-200 rounded"></div>
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-100 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const { data: recentMatches } = await supabase
    .from("matches")
    .select(`
      *,
      checkups:checkups (
        id,
        category,
        issue,
        budget,
        city,
        status,
        created_at,
        patients:patients (
          name,
          email
        )
      )
    `)
    .eq("clinic_id", clinicData.clinic.id)
    .order("created_at", { ascending: false })
    .limit(5);

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-900">Lead Recenti</h3>
          <Link href="/dashboard/clinic/leads" className="text-red-600 hover:text-red-700 text-sm font-semibold">
            Vedi tutti
          </Link>
        </div>
      </div>

      <div className="divide-y divide-gray-200">
        {recentMatches && recentMatches.length > 0 ? (
          recentMatches.map((match: any) => {
            const checkup = match.checkups;
            const patient = checkup?.patients;
            return (
              <div key={match.id} className="p-4 hover:bg-gray-50 transition">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="font-semibold text-gray-900">
                      {patient?.name || "Paziente anonimo"}
                    </div>
                    <div className="text-sm text-gray-600">
                      {checkup?.category || "Categoria non specificata"}
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    match.status === "pending" 
                      ? "bg-red-100 text-red-700" 
                      : match.status === "accepted"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-700"
                  }`}>
                    {match.status === "pending" ? "Nuovo" : match.status === "accepted" ? "Accettato" : "Rifiutato"}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                  {checkup?.city && (
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {checkup.city}
                    </span>
                  )}
                  {checkup?.budget && <span>•</span>}
                  {checkup?.budget && <span>{checkup.budget}</span>}
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <Clock className="w-3 h-3" />
                  {new Date(match.created_at).toLocaleDateString("it-IT", {
                    day: "numeric",
                    month: "short",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            );
          })
        ) : (
          <div className="p-8 text-center">
            <div className="text-gray-400 mb-2">Nessun lead ricevuto</div>
            <div className="text-sm text-gray-500">
              I lead appariranno qui quando i pazienti ti invieranno richieste
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-gray-200">
        <Link
          href="/dashboard/clinic/leads"
          className="flex items-center justify-center gap-2 text-red-600 hover:text-red-700 font-semibold text-sm"
        >
          Vedi tutti i lead
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}