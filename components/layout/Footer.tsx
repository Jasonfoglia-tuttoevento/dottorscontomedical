import Link from "next/link";
import BrandLogo from "@/components/brand/BrandLogo";
import { brand } from "@/lib/brand";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-6 py-16 lg:flex-row">
          <div>
            <h2 className="mb-4 text-4xl font-black tracking-tight md:text-5xl">Rendere la salute più semplice</h2>
            <p className="text-xl text-gray-400">Raccontaci ciò di cui hai bisogno e confronta le opzioni disponibili.</p>
          </div>
          <Link href="/check-up" className="whitespace-nowrap rounded-full bg-[#0D47A1] px-8 py-4 text-lg font-bold text-white shadow-2xl transition hover:bg-[#0B3B86]">Inizia il check-up →</Link>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <BrandLogo theme="dark" iconClassName="h-12 w-12" textClassName="text-xl" />
            <p className="mt-6 max-w-sm leading-relaxed text-gray-400">{brand.description} {brand.tagline}</p>
          </div>

          <div>
            <h3 className="mb-5 font-bold">Piattaforma</h3>
            <ul className="space-y-3 text-gray-400">
              <li><Link href="/check-up" className="transition hover:text-white">Check-up gratuito</Link></li>
              <li><Link href="/cliniche" className="transition hover:text-white">Cerca clinica</Link></li>
              <li><Link href="/register?role=clinic" className="transition hover:text-white">Registra una clinica</Link></li>
              <li><Link href="/dashboard" className="transition hover:text-white">Dashboard</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-5 font-bold">Contatti e documenti</h3>
            <ul className="space-y-3 text-gray-400">
              <li><a href={`mailto:${brand.infoEmail}`} className="transition hover:text-white">{brand.infoEmail}</a></li>
              <li><Link href="/privacy" className="transition hover:text-white">Privacy beta</Link></li>
              <li><Link href="/termini" className="transition hover:text-white">Termini beta</Link></li>
              <li><Link href="/cookie" className="transition hover:text-white">Cookie beta</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-gray-500 md:flex-row">
          <span>© 2026 {brand.name}. Tutti i diritti riservati.</span>
          <span>Versione beta dimostrativa</span>
        </div>
      </div>
    </footer>
  );
}
