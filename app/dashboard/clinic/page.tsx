import { createClient } from "@/lib/supabase/server";
import { requireUserRole } from "@/lib/auth/get-user-context";
import Link from "next/link";
import Image from "next/image";
import { brand } from "@/lib/brand";
import {
  LayoutDashboard, Users, Calendar, Settings,
  LogOut, Bell, Search
} from "lucide-react";

// Importa i TUOI componenti esistenti
import StatsCards from "@/components/clinics/StatsCards";
import RecentLeads from "@/components/clinics/RecentLeads";
import PerformanceChart from "@/components/clinics/PerformanceChart";
import UpcomingAppointments from "@/components/clinics/UpcomingAppointments";
import QuickActions from "@/components/clinics/QuickActions";

export default async function ClinicDashboard() {
  const context = await requireUserRole("clinic");
  const supabase = await createClient();

  // Fetch dati clinica per header personalizzato
  const { data: clinic } = await supabase
    .from("clinics")
    .select("name, category")
    .eq("user_id", context.user.id)
    .single();

  return (
    <div className="min-h-screen bg-gray-50 flex">

      {/* SIDEBAR NAVIGAZIONE (Opzionale ma Premium) */}
      <aside className="hidden lg:flex w-64 bg-white border-r border-gray-200 flex-col sticky top-0 h-screen">
        <div className="p-6 border-b border-gray-100">
          <Link href="/" className="flex items-center gap-2">
            <Image src={brand.logoCompact} alt={brand.name} width={512} height={512} className="h-10 w-10 object-contain" />
          </Link>
        </div>

        <nav className="flex-grow p-4 space-y-1">
          {[
            { label: "Panoramica", icon: LayoutDashboard, active: true, href: "/dashboard/clinic" },
            { label: "Lead Pazienti", icon: Users, active: false, href: "/dashboard/clinic/leads" },
            { label: "Appuntamenti", icon: Calendar, active: false, href: "/dashboard/clinic/appointments" },
            { label: "Impostazioni", icon: Settings, active: false, href: "/dashboard/clinic/profile" },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                item.active
                  ? "bg-[#E6FAF5] text-[#0D47A1] shadow-sm"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <div className="bg-gray-50 p-4 rounded-xl mb-3">
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">Clinica Attiva</p>
            <p className="text-sm font-black text-gray-900 truncate">{clinic?.name || "Nome Clinica"}</p>
            <p className="text-[10px] text-gray-500 capitalize">{clinic?.category || "Categoria"}</p>
          </div>

          <form action="/auth/signout" method="POST">
            <button type="submit" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-gray-500 hover:bg-[#E6FAF5] hover:text-[#0D47A1] transition">
              <LogOut className="w-5 h-5" /> Esci
            </button>
          </form>
        </div>
      </aside>

      {/* AREA PRINCIPALE */}
      <div className="flex-grow flex flex-col min-w-0">

        {/* HEADER DASHBOARD */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-30">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-black text-gray-900">Dashboard</h1>
              <p className="text-sm text-gray-500">Bentornato, ecco cosa succede oggi.</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Cerca lead o appuntamenti..."
                  className="pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#00B39A] w-64"
                />
              </div>

              <button className="p-2 text-gray-400 hover:text-[#0D47A1] hover:bg-[#E6FAF5] rounded-lg transition relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#0D47A1] rounded-full"></span>
              </button>
            </div>
          </div>
        </header>

        {/* CONTENUTO DEI TUOI COMPONENTI */}
        <main className="flex-grow p-6 md:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto space-y-8">

            {/* Stats Cards */}
            <StatsCards />

            {/* Charts & Quick Actions */}
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <PerformanceChart />
              </div>
              <div className="lg:col-span-1">
                <QuickActions />
              </div>
            </div>

            {/* Leads & Appointments */}
            <div className="grid lg:grid-cols-2 gap-8">
              <RecentLeads />
              <UpcomingAppointments />
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
