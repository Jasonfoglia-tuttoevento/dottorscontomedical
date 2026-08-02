import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin, ShieldCheck, Smile } from "lucide-react";

export default function HomeCategories() {
  return (
    <section id="specializzazioni" className="scroll-mt-20 bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#E6FAF5] px-4 py-2">
            <span className="h-2 w-2 rounded-full bg-[#0D47A1]" />
            <span className="text-sm font-semibold uppercase tracking-wide text-[#0D47A1]">Specializzazione beta</span>
          </div>
          <h2 className="text-4xl font-black tracking-tight text-gray-950 md:text-6xl">Partiamo dalla cura <span className="text-[#0D47A1]">dentale</span></h2>
          <p className="mt-6 max-w-2xl text-xl leading-8 text-gray-600">La prima versione di Facile Medical è dedicata alle cliniche odontoiatriche e ai pazienti che cercano trattamenti dentali in modo più semplice.</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.45fr_0.55fr]">
          <Link href="/cliniche?cat=dentali" className="group relative min-h-[480px] overflow-hidden rounded-3xl bg-gray-900">
            <Image src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=1400&q=85" alt="Clinica dentale" fill sizes="(max-width: 1024px) 100vw, 70vw" className="object-cover transition duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#071B36] via-[#0D47A1]/55 to-transparent" />
            <div className="relative flex h-full min-h-[480px] flex-col justify-between p-7 text-white md:p-10">
              <div className="flex items-start justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur"><Smile className="h-7 w-7" /></div>
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/20 backdrop-blur transition group-hover:bg-white group-hover:text-[#0D47A1]"><ArrowUpRight className="h-5 w-5" /></div>
              </div>
              <div className="max-w-2xl">
                <p className="text-sm font-bold uppercase tracking-widest text-cyan-100">Cliniche dentali</p>
                <h3 className="mt-3 text-4xl font-black md:text-5xl">Implantologia, ortodonzia e trattamenti odontoiatrici</h3>
                <p className="mt-4 max-w-xl text-base leading-7 text-white/80">Esplora strutture, servizi e informazioni utili prima di inviare una richiesta.</p>
              </div>
            </div>
          </Link>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
            <div className="rounded-3xl border border-blue-100 bg-blue-50 p-7">
              <ShieldCheck className="h-9 w-9 text-[#0D47A1]" />
              <h3 className="mt-5 text-2xl font-black text-gray-950">Profili verificati</h3>
              <p className="mt-3 leading-7 text-gray-600">Le cliniche possono presentare struttura, contatti, servizi e punti di forza in un profilo completo.</p>
            </div>
            <div className="rounded-3xl border border-emerald-100 bg-emerald-50 p-7">
              <MapPin className="h-9 w-9 text-emerald-700" />
              <h3 className="mt-5 text-2xl font-black text-gray-950">Ricerca per località</h3>
              <p className="mt-3 leading-7 text-gray-600">Trova cliniche nelle città disponibili e invia una richiesta con le tue esigenze.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
