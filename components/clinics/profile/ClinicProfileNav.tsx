"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Building2, Clock, FileText, Image, Phone } from "lucide-react";

const sections = [
  { label: "Dati e sede", href: "/dashboard/clinic/profile/general", icon: Building2 },
  { label: "Contatti", href: "/dashboard/clinic/profile/contacts", icon: Phone },
  { label: "Orari", href: "/dashboard/clinic/profile/hours", icon: Clock },
  { label: "Galleria", href: "/dashboard/clinic/profile/gallery", icon: Image },
  { label: "Servizi", href: "/dashboard/clinic/profile/services", icon: FileText },
] as const;

export default function ClinicProfileNav() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-2 overflow-x-auto rounded-2xl border border-slate-200 bg-white p-2 shadow-sm" aria-label="Sezioni profilo clinica">
      {sections.map((section) => {
        const Icon = section.icon;
        const active = pathname === section.href;

        return (
          <Link
            key={section.href}
            href={section.href}
            aria-current={active ? "page" : undefined}
            className={`inline-flex min-h-11 shrink-0 items-center gap-2 rounded-xl px-4 py-2 text-sm font-black transition ${
              active ? "bg-[#0D47A1] text-white" : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <Icon className="h-4 w-4" />
            {section.label}
          </Link>
        );
      })}
    </nav>
  );
}
