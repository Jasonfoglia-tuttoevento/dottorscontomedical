import { Users, Calendar, TrendingUp, MessageSquare } from "lucide-react";

const stats = [
  {
    icon: Users,
    label: "Lead questo mese",
    value: "24",
    change: "+12%",
    changeType: "positive" as const,
    color: "red",
  },
  {
    icon: Calendar,
    label: "Appuntamenti",
    value: "18",
    change: "+5",
    changeType: "positive" as const,
    color: "blue",
  },
  {
    icon: TrendingUp,
    label: "Tasso conversione",
    value: "75%",
    change: "+8%",
    changeType: "positive" as const,
    color: "green",
  },
  {
    icon: MessageSquare,
    label: "Messaggi non letti",
    value: "5",
    change: "-2",
    changeType: "negative" as const,
    color: "gray",
  },
];

export default function StatsCards() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-start justify-between mb-4">
            <div className={`w-12 h-12 rounded-lg bg-${stat.color}-100 flex items-center justify-center`}>
              <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
            </div>
            <span
              className={`text-sm font-semibold ${
                stat.changeType === "positive" ? "text-green-600" : "text-red-600"
              }`}
            >
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