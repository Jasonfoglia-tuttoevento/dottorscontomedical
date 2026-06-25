import { Users, Calendar, TrendingUp, Euro } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { getCurrentClinic } from "@/lib/supabase/getClinic";

export default async function StatsCards() {
  const supabase = await createClient();
  const clinicData = await getCurrentClinic();
  
  if (!clinicData?.clinic) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm animate-pulse">
            <div className="h-12 w-12 bg-gray-200 rounded-lg mb-4"></div>
            <div className="h-8 w-20 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 w-32 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  const clinicId = clinicData.clinic.id;

  // Lead questo mese
  const { count: leadsCount } = await supabase
    .from("matches")
    .select("*", { count: "exact", head: true })
    .eq("clinic_id", clinicId)
    .gte("created_at", new Date(new Date().setDate(1)).toISOString());

  // Appuntamenti confermati
  const { count: appointmentsCount } = await supabase
    .from("matches")
    .select("*", { count: "exact", head: true })
    .eq("clinic_id", clinicId)
    .eq("status", "accepted");

  // Tasso conversione
  const conversionRate = leadsCount && leadsCount > 0 
    ? Math.round(((appointmentsCount || 0) / leadsCount) * 100) 
    : 0;

  // Revenue stimata (media €500 per conversione)
  const estimatedRevenue = (appointmentsCount || 0) * 500;

  const stats = [
    {
      icon: Users,
      label: "Lead questo mese",
      value: leadsCount || 0,
      change: "+12%",
      changeType: "positive" as const,
      color: "red",
    },
    {
      icon: Calendar,
      label: "Appuntamenti confermati",
      value: appointmentsCount || 0,
      change: "+5",
      changeType: "positive" as const,
      color: "blue",
    },
    {
      icon: TrendingUp,
      label: "Tasso conversione",
      value: `${conversionRate}%`,
      change: "+8%",
      changeType: "positive" as const,
      color: "green",
    },
    {
      icon: Euro,
      label: "Revenue stimata",
      value: `€${estimatedRevenue.toLocaleString()}`,
      change: "+€2.500",
      changeType: "positive" as const,
      color: "purple",
    },
  ];

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition">
          <div className="flex items-start justify-between mb-4">
            <div className={`w-12 h-12 rounded-lg bg-${stat.color}-100 flex items-center justify-center`}>
              <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
            </div>
            <span className={`text-sm font-semibold ${
              stat.changeType === "positive" ? "text-green-600" : "text-red-600"
            }`}>
              {stat.change}
            </span>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
          <div className="text-sm text-gray-600">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}