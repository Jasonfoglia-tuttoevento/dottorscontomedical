import Link from "next/link";
import { ArrowUpRight, BadgeCheck, Building2, MapPin, ShieldAlert } from "lucide-react";
import type { Clinic } from "@/lib/types/database";

interface ClinicDashboardHeroProps {
  clinic: Clinic;
  profilePercentage: number;
}

export default function ClinicDashboardHero({ clinic, profilePercentage }: ClinicDashboardHeroProps) {
  const publicHref = clinic.slug ? `/cliniche/${clinic.slug}` : null;
  const profileComplete = profilePercentage === 100;

  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#09182E] via-[#0D47A1] to-[#00A98F] p-6 text-white shadow-xl md:p-8">
      <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" aria-hidden="true" />
      <div className="relative flex flex-col gap-8 xl:flex-row xl:items-end xl:justify-between">
        <div className="max-w-3xl">
          <div className="mb-5 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wider backdrop-blur">
              <Building2 className="h-4 w-4" /> Area clinica
            </span>
            {clinic.verified ? (
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-300/20 px-3 py-1.5 text-xs font-bold text-emerald-100">
                <BadgeCheck className="h-4 w-4" /> Profilo verificato
              </span>
            ) : (
              <span className="inline-flex items-center gap-2 rounded-full bg-amber-300/20 px-3 py-1.5 text-xs font-bold text-amber-100">
                <ShieldAlert className="h-4 w-4" /> Verifica in attesa
              </span>
            )}
          </div>

          <p className="text-sm font-semibold text-cyan-100">{clinic.category || "Clinica dentale"}</p>
          <h1 className="mt-2 text-3xl font-black tracking-tight md:text-5xl">{clinic.name}</h1>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-white/75">
            {clinic.city && <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4" />{clinic.city}</span>}
            <span>Profilo completato al {profilePercentage}%</span>
          </div>
          <p className="mt-5 max-w-2xl text-sm leading-6 text-cyan-50/80">
            Da qui controlli le richieste ricevute, la velocità di risposta e la qualità della presenza pubblica della clinica.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link href="/dashboard/clinic/profile/general" className="rounded-xl bg-white px-5 py-3 text-sm font-bold text-[#0D47A1] transition hover:bg-cyan-50">
            {profileComplete ? "Aggiorna il profilo" : "Completa il profilo"}
          </Link>
          {publicHref ? (
            <Link href={publicHref} className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/20">
              Anteprima pubblica <ArrowUpRight className="h-4 w-4" />
            </Link>
          ) : (
            <span className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/55">
              Anteprima disponibile dopo lo slug
            </span>
          )}
        </div>
      </div>
    </section>
  );
}
