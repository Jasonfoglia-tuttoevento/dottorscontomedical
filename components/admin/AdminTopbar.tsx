import Link from "next/link";
import { ExternalLink, Home, LogOut, ShieldCheck } from "lucide-react";

interface AdminTopbarProps {
  email: string;
}

function initialsFromEmail(email: string): string {
  const localPart = email.split("@")[0] ?? "AD";
  return localPart.slice(0, 2).toUpperCase();
}

export default function AdminTopbar({ email }: AdminTopbarProps) {
  return (
    <header className="border-b border-slate-200 bg-white px-4 py-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#0D47A1] sm:text-xs">
            Centro di controllo
          </p>
          <h1 className="mt-1 truncate text-lg font-black text-slate-950 sm:text-2xl">
            Dashboard amministratore
          </h1>
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <Link
            href="/"
            aria-label="Apri il sito"
            className="inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-bold text-slate-600 transition hover:border-[#0D47A1] hover:text-[#0D47A1]"
          >
            <Home className="h-4 w-4 sm:hidden" />
            <span className="hidden sm:inline">Vedi sito</span>
            <ExternalLink className="hidden h-4 w-4 sm:block" />
          </Link>

          <form action="/auth/signout" method="POST">
            <button
              type="submit"
              aria-label="Esci dall’account amministratore"
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:border-rose-300 hover:text-rose-700"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </form>

          <div className="flex items-center gap-3 rounded-2xl bg-slate-100 p-1.5 sm:px-3 sm:py-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 text-sm font-black text-white">
              {initialsFromEmail(email)}
            </span>
            <div className="hidden min-w-0 md:block">
              <p className="max-w-48 truncate text-sm font-bold text-slate-900">{email}</p>
              <p className="flex items-center gap-1 text-xs font-semibold text-emerald-700">
                <ShieldCheck className="h-3.5 w-3.5" />
                Amministratore
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
