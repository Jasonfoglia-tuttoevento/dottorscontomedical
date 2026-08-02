import type { LucideIcon } from "lucide-react";

interface AdminPageHeaderProps {
  eyebrow: string;
  title: string;
  description: string;
  icon: LucideIcon;
  count?: number;
}

export default function AdminPageHeader({
  eyebrow,
  title,
  description,
  icon: Icon,
  count,
}: AdminPageHeaderProps) {
  return (
    <header className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-7">
      <div className="max-w-3xl">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-[#0D47A1]">
          {eyebrow}
        </p>
        <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
          {title}
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
      </div>
      <div className="flex shrink-0 items-center gap-3 rounded-2xl bg-slate-950 px-4 py-3 text-white">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
          <Icon className="h-5 w-5" />
        </span>
        {typeof count === "number" && (
          <div>
            <p className="text-2xl font-black leading-none">{count}</p>
            <p className="mt-1 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              risultati
            </p>
          </div>
        )}
      </div>
    </header>
  );
}
