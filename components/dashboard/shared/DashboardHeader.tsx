"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ExternalLink, LogOut } from "lucide-react";
import BrandLogo from "@/components/brand/BrandLogo";

function pageCopy(pathname: string) {
  if (pathname.startsWith("/dashboard/clinic/leads")) {
    return { eyebrow: "Acquisizione pazienti", title: "Gestione lead", description: "Valuta le richieste assegnate alla clinica." };
  }
  if (pathname.startsWith("/dashboard/clinic/performance")) {
    return { eyebrow: "Dati e crescita", title: "Analitiche", description: "Misura visualizzazioni, click, richieste e conversioni." };
  }
  if (pathname.startsWith("/dashboard/clinic/profile")) {
    return { eyebrow: "Presenza pubblica", title: "Profilo clinica", description: "Aggiorna una sezione alla volta, senza pagine infinite." };
  }
  if (pathname.startsWith("/dashboard/clinic/plans")) {
    return { eyebrow: "Abbonamento", title: "Piani Free e Plus", description: "Confronta costi e funzioni dell'offerta SaaS." };
  }
  return { eyebrow: "Area clinica", title: "Centro operativo", description: "Le priorità principali in una panoramica compatta." };
}

export default function DashboardHeader() {
  const pathname = usePathname();
  const copy = pageCopy(pathname);

  return (
    <header className="border-b border-slate-200 bg-white px-4 py-4 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-4">
          <Link href="/" className="hidden shrink-0 rounded-xl sm:inline-flex" aria-label="FACILE MEDICAL">
            <BrandLogo iconClassName="h-10 w-10" textClassName="text-base" />
          </Link>
          <div className="min-w-0 sm:border-l sm:border-slate-200 sm:pl-4">
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#0D47A1] sm:text-xs">{copy.eyebrow}</p>
            <h1 className="mt-1 truncate text-lg font-black text-slate-950 sm:text-2xl">{copy.title}</h1>
            <p className="mt-1 hidden text-sm text-slate-500 md:block">{copy.description}</p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <Link href="/" className="inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-black text-slate-700 transition hover:border-blue-200 hover:text-[#0D47A1]">
            <ExternalLink className="h-4 w-4" />
            <span className="hidden md:inline">Apri il sito</span>
          </Link>
          <form action="/auth/signout" method="POST">
            <button type="submit" aria-label="Esci dall'account clinica" className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl border border-slate-200 text-slate-700 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-700">
              <LogOut className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
