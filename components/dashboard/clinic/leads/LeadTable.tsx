import Link from "next/link";
import { Eye, MessageSquare, Check, X, Clock, MapPin, Euro } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { getCurrentClinic } from "@/lib/supabase/getClinic";
import AcceptLeadButton from "./AcceptLeadButton";
import RejectLeadButton from "./RejectLeadButton";

export default async function LeadTable() {
  const supabase = await createClient();
  const clinicData = await getCurrentClinic();
  
  if (!clinicData?.clinic) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-12 text-center">
        <div className="text-gray-400 mb-2">Nessuna clinica trovata</div>
      </div>
    );
  }

  const { data: matches } = await supabase
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
          id,
          name,
          email,
          phone
        )
      )
    `)
    .eq("clinic_id", clinicData.clinic.id)
    .order("created_at", { ascending: false });

  if (!matches || matches.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-12 text-center">
        <div className="text-gray-400 mb-2">Nessun lead ricevuto</div>
        <div className="text-sm text-gray-500">
          I lead appariranno qui quando i pazienti ti invieranno richieste
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                Paziente
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                Trattamento
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                Budget
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                Città
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                Data
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                Stato
              </th>
              <th className="px-6 py-4 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">
                Azioni
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {matches.map((match: any) => {
              const checkup = match.checkups;
              const patient = checkup?.patients;
              
              return (
                <tr key={match.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-semibold text-gray-900">
                        {patient?.name || "Anonimo"}
                      </div>
                      {patient?.email && (
                        <div className="text-sm text-gray-500">{patient.email}</div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-gray-900">{checkup?.category}</div>
                      <div className="text-sm text-gray-500 line-clamp-1">{checkup?.issue}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-gray-700">
                      <Euro className="w-4 h-4 text-gray-400" />
                      {checkup?.budget || "Non specificato"}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {checkup?.city ? (
                      <div className="flex items-center gap-1 text-gray-700">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        {checkup.city}
                      </div>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-700">
                      {new Date(match.created_at).toLocaleDateString("it-IT")}
                    </div>
                    <div className="text-xs text-gray-500">
                      {new Date(match.created_at).toLocaleTimeString("it-IT", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                        match.status === "pending"
                          ? "bg-red-100 text-red-700"
                          : match.status === "accepted"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {match.status === "pending" && <Clock className="w-3 h-3" />}
                      {match.status === "accepted" && <Check className="w-3 h-3" />}
                      {match.status === "rejected" && <X className="w-3 h-3" />}
                      {match.status === "pending"
                        ? "Nuovo"
                        : match.status === "accepted"
                        ? "Accettato"
                        : "Rifiutato"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      {match.status === "pending" ? (
                        <>
                          <AcceptLeadButton matchId={match.id} />
                          <RejectLeadButton matchId={match.id} />
                        </>
                      ) : (
                        <Link
                          href={`/dashboard/clinic/messages?patient=${patient?.id}`}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                          title="Invia messaggio"
                        >
                          <MessageSquare className="w-5 h-5" />
                        </Link>
                      )}
                      <Link
                        href={`/dashboard/clinic/leads/${match.id}`}
                        className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
                        title="Vedi dettagli"
                      >
                        <Eye className="w-5 h-5" />
                      </Link>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}