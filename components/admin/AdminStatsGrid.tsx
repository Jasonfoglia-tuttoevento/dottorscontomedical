import { Building2, ClipboardList, Link2, Users } from "lucide-react";
import AdminStatCard from "@/components/admin/AdminStatCard";
import type { AdminStats } from "@/lib/admin/types";

interface AdminStatsGridProps {
  stats: AdminStats;
}

export default function AdminStatsGrid({ stats }: AdminStatsGridProps) {
  const cards = [
    {
      label: "Utenti registrati",
      value: stats.users,
      detail: "Profili presenti sulla piattaforma",
      icon: Users,
    },
    {
      label: "Cliniche",
      value: stats.clinics,
      detail: `${stats.verifiedClinics} strutture verificate`,
      icon: Building2,
    },
    {
      label: "Richieste check-up",
      value: stats.checkups,
      detail: `${stats.newCheckups} nuove richieste da gestire`,
      icon: ClipboardList,
    },
    {
      label: "Lead generati",
      value: stats.matches,
      detail: `${stats.pendingMatches} match ancora in attesa`,
      icon: Link2,
    },
  ];

  return (
    <section aria-labelledby="admin-kpi-title">
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-bold text-[#0D47A1]">Indicatori principali</p>
          <h2 id="admin-kpi-title" className="text-2xl font-black text-slate-950">
            Stato della piattaforma
          </h2>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <AdminStatCard key={card.label} {...card} />
        ))}
      </div>
    </section>
  );
}
