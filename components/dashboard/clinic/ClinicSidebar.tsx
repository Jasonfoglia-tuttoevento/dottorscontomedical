"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Building2,
  Calendar,
  MessageSquare,
  Star,
  CreditCard,
  Settings,
  LogOut,
} from "lucide-react";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard/clinic" },
  { icon: Users, label: "Lead", href: "/dashboard/clinic/leads" },
  { icon: Building2, label: "Profilo Clinica", href: "/dashboard/clinic/profile" },
  { icon: Calendar, label: "Appuntamenti", href: "/dashboard/clinic/appointments" },
  { icon: MessageSquare, label: "Messaggi", href: "/dashboard/clinic/messages" },
  { icon: Star, label: "Recensioni", href: "/dashboard/clinic/reviews" },
  { icon: CreditCard, label: "Fatturazione", href: "/dashboard/clinic/billing" },
  { icon: Settings, label: "Impostazioni", href: "/dashboard/clinic/settings" },
];

export default function ClinicSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-gray-900 text-white flex flex-col">
      <div className="p-6 border-b border-gray-800">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex items-end gap-1">
            <span className="text-2xl font-black text-gray-400">Dottor</span>
            <span className="text-2xl font-black text-red-600">sconto</span>
          </div>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive
                  ? "bg-red-600 text-white shadow-lg"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-800">
        <button className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-gray-800 hover:text-white rounded-lg transition w-full">
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Esci</span>
        </button>
      </div>
    </aside>
  );
}