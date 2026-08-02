import type { LucideIcon } from "lucide-react";

interface AdminStatCardProps {
  label: string;
  value: number;
  detail: string;
  icon: LucideIcon;
}

export default function AdminStatCard({
  label,
  value,
  detail,
  icon: Icon,
}: AdminStatCardProps) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-bold text-slate-500">{label}</p>
          <p className="mt-3 text-3xl font-black tracking-tight text-slate-950">
            {new Intl.NumberFormat("it-IT").format(value)}
          </p>
        </div>
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-[#0D47A1]">
          <Icon className="h-6 w-6" />
        </span>
      </div>
      <p className="mt-4 border-t border-slate-100 pt-4 text-xs font-semibold text-slate-500">
        {detail}
      </p>
    </article>
  );
}
