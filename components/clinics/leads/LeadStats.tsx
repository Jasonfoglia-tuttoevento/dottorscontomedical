import { CheckCircle2, Clock3, UsersRound, XCircle } from "lucide-react";

interface LeadStatsProps {
  total: number;
  pending: number;
  accepted: number;
  rejected: number;
}

export default function LeadStats({ total, pending, accepted, rejected }: LeadStatsProps) {
  const stats = [
    { key: "total", icon: UsersRound, label: "Totali", value: total, iconClassName: "bg-blue-50 text-blue-700" },
    { key: "pending", icon: Clock3, label: "Da gestire", value: pending, iconClassName: "bg-amber-50 text-amber-700" },
    { key: "accepted", icon: CheckCircle2, label: "Accettati", value: accepted, iconClassName: "bg-emerald-50 text-emerald-700" },
    { key: "rejected", icon: XCircle, label: "Rifiutati", value: rejected, iconClassName: "bg-gray-100 text-gray-600" },
  ];

  return (
    <section className="grid grid-cols-2 gap-4 xl:grid-cols-4" aria-label="Riepilogo lead">
      {stats.map((stat) => (
        <article key={stat.key} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.iconClassName}`}>
            <stat.icon className="h-5 w-5" />
          </div>
          <p className="mt-4 text-3xl font-black text-gray-950">{stat.value.toLocaleString("it-IT")}</p>
          <p className="mt-1 text-sm font-bold text-gray-600">{stat.label}</p>
        </article>
      ))}
    </section>
  );
}
