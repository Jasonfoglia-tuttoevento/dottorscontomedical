import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function HomeCTA() {
  return (
    <section className="section-padding bg-gradient-to-br from-primary to-red-700 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full translate-x-1/3 translate-y-1/3"></div>

      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white mb-6">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">100% Gratuito, senza impegno</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Pronto a risparmiare sulla tua salute?
          </h2>
          
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Inizia ora il tuo check-up gratuito e ricevi fino a 3 proposte 
            di cliniche verificate nella tua zona.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/check-up" 
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary rounded-xl font-bold hover:bg-gray-100 transition shadow-xl"
            >
              Inizia il Check-up Gratuito
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link 
              href="/cliniche" 
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent text-white border-2 border-white rounded-xl font-bold hover:bg-white/10 transition"
            >
              Esplora le Cliniche
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-8 text-white/80 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              Nessuna carta di credito richiesta
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              Risposta in 24 ore
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              Cliniche verificate
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}