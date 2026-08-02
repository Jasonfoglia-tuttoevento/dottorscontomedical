import Link from "next/link";
import { Clock3, MessageCircleReply, Target, TrendingDown, TrendingUp, UsersRound } from "lucide-react";

interface ClinicStatsGridProps {
  leadsThisMonth: number;
  leadsPreviousMonth: number;
  monthlyTrend: number | null;
  pendingLeads: number;
  responseRate: number;
  conversionRate: number;
}

function TrendLabel({ trend, previous }: { trend: number | null; previous: number }) {
  if (trend === null) {
    return <span className="text-gray-500">Mese precedente: {previous}</span>;
  }

  const positive = trend >= 0;
  const Icon = positive ? TrendingUp : TrendingDown;

  return (
    <span className={`inline-flex items-center gap-1 font-bold ${positive ? "text-emerald-700" : "text-red-600"}`}>
      <Icon className="h-3.5 w-3.5" />
      {positive ? "+" : ""}{trend}% rispetto al mese scorso
    </span>
  );
}

export default function ClinicStatsGrid({
  leadsThisMonth,
  leadsPreviousMonth,
  monthlyTrend,
  pendingLeads,
  responseRate,
  conversionRate,
}: ClinicStatsGridProps) {
  const cards = [
    {
      key: "monthly",
      icon: UsersRound,
      label: "Lead questo mese",
      value: leadsThisMonth.toLocaleString("it-IT"),
      helper: <TrendLabel trend={monthlyTrend} previous={leadsPreviousMonth} />,
      href: "/dashboard/clinic/leads",
      iconClassName: "bg-blue-50 text-blue-700",
    },
    {
      key: "pending",
      icon: Clock3,
      label: "Da gestire",
      value: pendingLeads.toLocaleString("it-IT"),
      helper: pendingLeads > 0 ? "Richiedono una decisione" : "Nessuna richiesta in attesa",
      href: "/dashboard/clinic/leads?status=pending",
      iconClassName: "bg-amber-50 text-amber-700",
    },
    {
      key: "response",
      icon: MessageCircleReply,
      label: "Tasso di risposta",
      value: `${responseRate}%`,
      helper: "Lead accettati o rifiutati sul totale",
      href: "/dashboard/clinic/leads",
      iconClassName: "bg-emerald-50 text-emerald-700",
    },
    {
      key: "conversion",
      icon: Target,
      label: "Tasso di accettazione",
      value: `${conversionRate}%`,
      helper: "Accettati sul totale delle decisioni",
      href: "/dashboard/clinic/leads?status=accepted",
      iconClassName: "bg-violet-50 text-violet-700",
    },
  ];

  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-label="Indicatori principali">
      {cards.map((card) => (
        <Link key={card.key} href={card.href} className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md">
          <div className={`mb-5 flex h-11 w-11 items-center justify-center rounded-xl ${card.iconClassName}`}>
            <card.icon className="h-5 w-5" />
          </div>
          <p className="text-3xl font-black tracking-tight text-gray-950">{card.value}</p>
          <h2 className="mt-2 text-sm font-bold text-gray-800 group-hover:text-[#0D47A1]">{card.label}</h2>
          <p className="mt-1 text-xs leading-5 text-gray-500">{card.helper}</p>
        </Link>
      ))}
    </section>
  );
}
