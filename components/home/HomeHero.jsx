import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle, Search, HeartHandshake } from "lucide-react";
import { brand } from "@/lib/brand";

export default function HomeHero() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-gray-900">

      {/* SFONDO FOTO PREMIUM */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?q=80&w=2091&auto=format&fit=crop"
          alt="Studio medico moderno"
          fill
          priority
          className="object-cover opacity-60"
        />
        {/* Overlay gradiente per leggibilità testo */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/80 to-gray-900/40"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
      </div>

      {/* CONTENUTO CENTRALE */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-20 pb-12 flex flex-col md:flex-row items-center gap-12">

        {/* TESTO E CTA */}
        <div className="flex-1 space-y-8 text-center md:text-left">

          {/* Badge Premium */}
          <div className="inline-flex items-center gap-2 bg-[#0D47A1]/20 backdrop-blur-md border border-[#00B39A]/30 rounded-full px-4 py-1.5">
            <span className="w-2 h-2 bg-[#00B39A] rounded-full animate-pulse"></span>
            <span className="text-[#CCF3EC] text-xs font-bold uppercase tracking-wider">
              {brand.wordmark}
            </span>
          </div>

          {/* Titolo Principale */}
          <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.1] tracking-tight drop-shadow-lg">
            La salute,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00B39A] to-[#66D8C9]">
              più semplice.
            </span>
          </h1>

          {/* Sottotitolo */}
          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl leading-relaxed font-light">
            Cerca strutture, richiedi un check-up e confronta le opzioni disponibili
            con un percorso chiaro e accessibile.
          </p>

          {/* Bottoni CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
            <Link
              href="/check-up"
              className="group flex items-center justify-center gap-3 px-8 py-4 bg-[#0D47A1] text-white rounded-full font-bold text-lg hover:bg-[#0B3B86] transition-all shadow-lg shadow-[#0D47A1]/30 hover:shadow-[#0D47A1]/50 hover:-translate-y-1"
            >
              Sono un paziente
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/register?role=clinic"
              className="flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-full font-bold text-lg hover:bg-white/20 hover:border-white/40 transition-all"
            >
              Sono una clinica
            </Link>
          </div>
        </div>

        {/* CARD TRUST BAR (Opzionale, per bilanciare il vuoto a destra) */}
        <div className="hidden lg:block w-80 shrink-0">
          <div className="bg-white/10 backdrop-blur-md border border-white/10 p-6 rounded-3xl shadow-2xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/20">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-white font-bold text-lg">Ricerca semplice</p>
                <p className="text-gray-400 text-sm">Strutture e servizi in un solo posto</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between text-gray-300 text-sm border-b border-white/10 pb-3">
                <span className="flex items-center gap-2"><Search className="w-4 h-4" /> Confronto opzioni</span>
                <span className="font-bold text-white">Chiaro</span>
              </div>
              <div className="flex items-center justify-between text-gray-300 text-sm border-b border-white/10 pb-3">
                <span className="flex items-center gap-2"><HeartHandshake className="w-4 h-4" /> Contatto strutture</span>
                <span className="font-bold text-white">Diretto</span>
              </div>
              <div className="flex items-center justify-between text-gray-300 text-sm">
                <span className="flex items-center gap-2"><ArrowRight className="w-4 h-4" /> Tempo risposta</span>
                <span className="font-bold text-white">Online</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
