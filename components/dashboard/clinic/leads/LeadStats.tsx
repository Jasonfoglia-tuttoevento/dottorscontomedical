import { Users, Clock, CheckCircle, XCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { getCurrentClinic } from "@/lib/supabase/getClinic";

export default async function LeadStats() {
  const supabase = await createClient();
  const clinicData = await getCurrentClinic();
  
  if (!clinicData?.clinic) return null;

  const clinicId = clinicData.clinic.id;

  // Totali
  const { count: total } = await supabase
    .from("matches")
    .select("*", { count: "exact", head: true })
    .eq("clinic_id", clinicId);

  // Nuovi (pending)
  const { count: newLeads } = await supabase
    .from("matches")
    .select("*", { count: "exact", head: true })
    .eq("clinic_id", clinicId)
    .eq("status", "pending");

  // Accettati
  const { count: accepted } = await supabase
    .from("matches")
    .select("*", { count: "exact", head: true })
    .eq("clinic_id", clinicId)
    .eq("status", "accepted");

  // Rifiutati
  const { count: rejected } = await supabase
    .from("matches")
    .select("*", { count: "exact", head: true })
    .eq("clinic_id", clinicId)
    .eq("status", "rejected");

  const stats = [
    { icon: Users, label: "Totali", value: total || 0, color: "gray", bgColor: "bg-gray-100" },
    { icon: Clock, label: "Nuovi", value: newLeads || 0, color: "red", bgColor: "bg-red-100" },
    { icon: CheckCircle, label: "Accettati", value: accepted || 0, color: "green", bgColor: "bg-green-100" },
    { icon: XCircle, label: "Rifiutati", value: rejected || 0, color: "orange", bgColor: "bg-orange-100" },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className={`w-10 h-10 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
              <stat.icon className={`w-5 h-5 text-${stat.color}-600`} />
            </div>
            <span className="text-sm text-gray-600 font-medium">{stat.label}</span>
          </div>
          <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
        </div>
      ))}
    </div>
  );
}