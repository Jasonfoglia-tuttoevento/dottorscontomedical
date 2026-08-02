import { CheckCircle2, Clock3, XCircle } from "lucide-react";

interface ClinicLeadFunnelProps {
  pending: number;
  accepted: number;
  rejected: number;
}

export default function ClinicLeadFunnel({ pending, accepted, rejected }: ClinicLeadFunnelProps) {
  const total = pending + accepted + rejected;
  const rows = [
    {
      key: "pending",
      label: "Da gestire",
      value: pending,
      icon: Clock3,
      barClassName: "bg-amber-400",
      iconClassName: "bg-amber-50 text-amber-700",
    },
    {
      key: "accepted",
      label: "Accettati",
      value: accepted,
      icon: CheckCircle2,
      barClassName: "bg-emerald-500",
      iconClassName: "bg-emerald-50 text-emerald-700",
    },
    {
      key: "rejected",
      label: "Rifiutati",
      value: rejected,
      icon: XCircle,
      barClassName: "bg-slate-400",
      iconClassName: "bg-slate-100 text-slate-600",
    },
  ];

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <p className="text-xs font-bold uppercase tracking-wider text-[#0D47A1]">Pipeline</p>
      <div className="mt-1 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-gray-950">Stato complessivo dei lead</h2>
          <p className="mt-1 text-sm text-gray-500">Distribuzione reale delle richieste ricevute.</p>
        </div>
        <p className="text-3xl font-black text-gray-950">{total}</p>
      </div>

      <div className="mt-6 space-y-5">
        {rows.map((row) => {
          const percentage = total > 0 ? Math.round((row.value / total) * 100) : 0;

          return (
            <div key={row.key}>
              <div className="mb-2 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-sm font-bold text-gray-700">
                  <span className={`flex h-8 w-8 items-center justify-center rounded-lg ${row.iconClassName}`}>
                    <row.icon className="h-4 w-4" />
                  </span>
                  {row.label}
                </div>
                <span className="text-sm font-black text-gray-950">{row.value} <span className="font-semibold text-gray-400">· {percentage}%</span></span>
              </div>
              <div className="h-2.5 overflow-hidden rounded-full bg-gray-100">
                <div className={`h-full rounded-full ${row.barClassName}`} style={{ width: `${percentage}%` }} />
              </div>
            </div>
          );
        })}
      </div>

      {total === 0 && (
        <p className="mt-6 rounded-xl bg-gray-50 p-4 text-sm text-gray-500">La pipeline si popolerà quando la clinica riceverà i primi lead.</p>
      )}
    </section>
  );
}
