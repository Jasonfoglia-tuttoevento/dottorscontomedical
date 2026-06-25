import { createClient } from "@/lib/supabase/server";
import { getCurrentClinic } from "@/lib/supabase/getClinic";

export default async function PerformanceChart() {
  const supabase = await createClient();
  const clinicData = await getCurrentClinic();
  
  if (!clinicData?.clinic) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <div className="animate-pulse">
          <div className="h-6 w-48 bg-gray-200 rounded mb-6"></div>
          <div className="space-y-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-8 bg-gray-100 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Recupera lead degli ultimi 6 mesi
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  const { data: matches } = await supabase
    .from("matches")
    .select("created_at")
    .eq("clinic_id", clinicData.clinic.id)
    .gte("created_at", sixMonthsAgo.toISOString());

  // Raggruppa per mese
  const months = ["Gen", "Feb", "Mar", "Apr", "Mag", "Giu", "Lug", "Ago", "Set", "Ott", "Nov", "Dic"];
  const currentMonth = new Date().getMonth();
  
  const monthlyData = Array.from({ length: 6 }, (_, i) => {
    const monthIndex = (currentMonth - 5 + i + 12) % 12;
    return {
      month: months[monthIndex],
      leads: 0,
    };
  });

  if (matches) {
    matches.forEach((match: any) => {
      const matchMonth = new Date(match.created_at).getMonth();
      const diff = (currentMonth - matchMonth + 12) % 12;
      if (diff < 6) {
        monthlyData[5 - diff].leads++;
      }
    });
  }

  const maxValue = Math.max(...monthlyData.map((d) => d.leads), 1);

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-6">Andamento Lead (ultimi 6 mesi)</h3>

      <div className="space-y-4">
        {monthlyData.map((item, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-gray-700">{item.month}</span>
              <span className="text-gray-600">{item.leads} lead</span>
            </div>
            <div className="relative h-8 bg-gray-100 rounded-lg overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-red-600 to-red-400 transition-all duration-500 flex items-center justify-end pr-3"
                style={{ width: `${Math.max((item.leads / maxValue) * 100, item.leads > 0 ? 10 : 0)}%` }}
              >
                {item.leads > 0 && (
                  <span className="text-white text-xs font-bold">{item.leads}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}