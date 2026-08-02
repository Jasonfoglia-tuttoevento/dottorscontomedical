"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { adminNavigation, isAdminPathActive } from "@/components/admin/adminNavigation";

export default function AdminDashboardNav() {
  const pathname = usePathname();

  return (
    <nav className="border-b border-slate-200 bg-white px-4 py-3 sm:px-6 lg:px-8" aria-label="Navigazione amministratore">
      <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto">
        {adminNavigation.map((item) => {
          const Icon = item.icon;
          const active = isAdminPathActive(pathname, item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`inline-flex min-h-11 shrink-0 items-center gap-2 rounded-xl px-4 py-2 text-sm font-black transition ${
                active
                  ? "bg-slate-950 text-white shadow-sm"
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
