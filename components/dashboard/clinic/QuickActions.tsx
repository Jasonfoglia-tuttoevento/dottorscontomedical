import Link from "next/link";
import { Plus, MessageSquare, Calendar, Settings } from "lucide-react";

const actions = [
  {
    icon: Plus,
    label: "Nuovo Servizio",
    href: "/dashboard/clinic/services/new",
    color: "red",
  },
  {
    icon: MessageSquare,
    label: "Messaggi",
    href: "/dashboard/clinic/messages",
    color: "blue",
  },
  {
    icon: Calendar,
    label: "Appuntamenti",
    href: "/dashboard/clinic/appointments",
    color: "green",
  },
  {
    icon: Settings,
    label: "Impostazioni",
    href: "/dashboard/clinic/settings",
    color: "gray",
  },
];

export default function QuickActions() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Azioni Rapide</h3>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action, index) => (
          <Link
            key={index}
            href={action.href}
            className={`p-4 rounded-lg border-2 border-gray-100 hover:border-${action.color}-600 hover:bg-${action.color}-50 transition group`}
          >
            <action.icon className={`w-6 h-6 mb-2 text-${action.color}-600 group-hover:scale-110 transition`} />
            <div className="text-sm font-semibold text-gray-700">{action.label}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}