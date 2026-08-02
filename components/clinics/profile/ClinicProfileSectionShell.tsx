import type { ReactNode } from "react";
import ClinicProfileNav from "@/components/clinics/profile/ClinicProfileNav";

interface ClinicProfileSectionShellProps {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
}

export default function ClinicProfileSectionShell({
  eyebrow,
  title,
  description,
  children,
}: ClinicProfileSectionShellProps) {
  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div>
        <p className="text-xs font-black uppercase tracking-[0.16em] text-[#0D47A1]">{eyebrow}</p>
        <h2 className="mt-1 text-2xl font-black text-slate-950 sm:text-3xl">{title}</h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600 sm:text-base">{description}</p>
      </div>
      <ClinicProfileNav />
      <div className="min-w-0">{children}</div>
    </div>
  );
}
