import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HomeHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-900 pt-20">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1920&q=80"
          alt="Medical background"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-gray-900/60 to-gray-900"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-red-600/20 backdrop-blur-sm border border-red-600/30 rounded-full px-5 py-2 mb-8">
          <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
          <span className="text-red-100 text-sm font-semibold tracking-wide uppercase">
            Marketplace Medicale · Italia
          </span>
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 leading-[1.05] tracking-tight">
          La tua salute,<br />
          il tuo <span className="text-red-600">risparmio</span>.
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
          La piattaforma che connette pazienti e cliniche specializzate.
          <br className="hidden md:block" />
          Check-up, confronti e prenotazioni — tutto in un posto solo.
        </p>

        {/* CTA Buttons - Solo Pazienti e Cliniche */}
        <div className="flex flex-col md:flex-row gap-4 justify-center mb-16">
          <Link 
            href="/check-up" 
            className="group px-8 py-4 bg-red-600 text-white rounded-full font-bold text-lg hover:bg-red-700 transition shadow-2xl hover:shadow-red-600/30 flex items-center justify-center gap-2"
          >
            Sono un paziente
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
          </Link>
          <Link 
            href="/register" 
            className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-full font-bold text-lg hover:bg-white/20 transition"
          >
            Sono una clinica
          </Link>
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {[
            { value: "50+", label: "Cliniche partner" },
            { value: "1000+", label: "Pazienti soddisfatti" },
            { value: "24h", label: "Tempo di risposta" },
            { value: "100%", label: "Gratuito" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl md:text-4xl font-black text-white mb-1">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-white/60 rounded-full"></div>
        </div>
      </div>
    </section>
  );
}