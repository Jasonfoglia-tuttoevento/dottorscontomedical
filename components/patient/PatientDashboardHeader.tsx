"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ClipboardList, LayoutDashboard, LogOut, PlusCircle, User } from "lucide-react";
import { brand } from "@/lib/brand";

const navigation = [
  { label: "Panoramica", href: "/dashboard/patient", icon: LayoutDashboard },
  { label: "Richieste", href: "/dashboard/patient/requests", icon: ClipboardList },
  { label: "Nuova richiesta", href: "/check-up", icon: PlusCircle },
] as const;

function isActive(pathname: string, href: string): boolean {
  if (href === "/dashboard/patient") return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function PatientDashboardHeader({ email }: { email: string }) {
  const pathname = usePathname();

  return (
    <>
      <header className="border-b border-slate-200 bg-white px-4 py-3 sm:px-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
          <Link href="/" aria-label="Torna alla homepage" className="inline-flex min-h-11 items-center gap-3 rounded-xl">
            <Image src={brand.logoCompact} alt={brand.name} width={64} height={64} className="h-10 w-10 object-contain" />
            <span className="hidden text-sm font-black text-slate-950 sm:block">Area paziente</span>
          </Link>

          <div className="flex min-w-0 items-center gap-2">
            <div className="hidden min-w-0 items-center gap-2 rounded-full bg-slate-100 px-3 py-2 text-sm text-slate-600 md:flex">
              <User className="h-4 w-4 shrink-0" />
              <span className="max-w-56 truncate font-bold">{email}</span>
            </div>
            <form action="/auth/signout" method="POST">
              <button
                type="submit"
                aria-label="Esci dall'account"
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-700"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </form>
          </div>
        </div>
      </header>

      <nav className="border-b border-slate-200 bg-white px-4 py-3 sm:px-6" aria-label="Navigazione paziente">
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto">
          {navigation.map((item) => {
            const Icon = item.icon;
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`inline-flex min-h-11 shrink-0 items-center gap-2 rounded-xl px-4 py-2 text-sm font-black transition ${
                  active ? "bg-[#0D47A1] text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
