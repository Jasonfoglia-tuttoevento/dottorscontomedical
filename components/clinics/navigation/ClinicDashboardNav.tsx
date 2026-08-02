"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, Building2, LayoutDashboard, Sparkles, Users } from "lucide-react";

const clinicNavigation = [
  { label: "Panoramica", href: "/dashboard/clinic", icon: LayoutDashboard },
  { label: "Lead", href: "/dashboard/clinic/leads", icon: Users },
  { label: "Analitiche", href: "/dashboard/clinic/performance", icon: BarChart3 },
  { label: "Profilo", href: "/dashboard/clinic/profile", icon: Building2 },
  { label: "Piani", href: "/dashboard/clinic/plans", icon: Sparkles },
] as const;

function isActive(pathname: string, href: string): boolean {
  return href === "/dashboard/clinic"
    ? pathname === href
    : pathname === href || pathname.startsWith(`${href}/`);
}

export default function ClinicDashboardNav() {
  const pathname = usePathname();

  return (
    <nav
      className="border-b border-slate-200 bg-white px-4 py-3 sm:px-6 lg:px-8"
      aria-label="Navigazione area clinica"
    >
      <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto">
        {clinicNavigation.map((item) => {
          const active = isActive(pathname, item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`inline-flex min-h-11 shrink-0 items-center gap-2 rounded-xl px-4 py-2 text-sm font-black transition ${
                active
                  ? "bg-[#0D47A1] text-white shadow-sm"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
