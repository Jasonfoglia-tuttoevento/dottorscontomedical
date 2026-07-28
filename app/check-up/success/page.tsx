import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, Home, Search } from "lucide-react";
import { brand } from "@/lib/brand";

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 md:p-8 text-center">

      {/* Logo in alto */}
      <div className="mb-12">
        <Link href="/">
          <Image src={brand.logoCompact} alt={brand.name} width={512} height={512} className="h-12 w-12 object-contain mx-auto opacity-80 hover:opacity-100 transition" />
        </Link>
      </div>

      {/* Card di Successo */}
      <div className="w-full max-w-lg bg-white rounded-[2rem] shadow-xl border border-gray-100 p-8 md:p-12 animate-fade-up">

        {/* Icona Animata */}
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce-slow">
          <CheckCircle2 className="w-12 h-12 text-green-600" />
        </div>

        <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 leading-tight">
          Richiesta Inviata! 🎉
        </h1>

        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
          Grazie per averci scelto. La tua richiesta è stata registrata e potrà essere valutata dalle strutture disponibili.
        </p>

        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 mb-8 text-left">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Cosa succede ora?</h3>
          <ul className="space-y-3 text-sm text-gray-700">
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 bg-[#CCF3EC] text-[#0D47A1] rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">1</span>
              <span>Riceverai una <strong>email di conferma</strong> entro pochi minuti.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 bg-[#CCF3EC] text-[#0D47A1] rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">2</span>
              <span>Le strutture potranno contattarti via <strong>telefono o email</strong>.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 bg-[#CCF3EC] text-[#0D47A1] rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">3</span>
              <span>Confronta le informazioni ricevute e scegli come procedere.</span>
            </li>
          </ul>
        </div>

        {/* CTA Secondarie */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link href="/" className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition">
            <Home className="w-5 h-5" /> Torna alla Home
          </Link>
          <Link href="/cliniche" className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-[#0D47A1] text-white rounded-xl font-bold hover:bg-[#0B3B86] transition shadow-lg shadow-[#0D47A1]/20">
            <Search className="w-5 h-5" /> Esplora Cliniche
          </Link>
        </div>
      </div>

      <p className="mt-8 text-xs text-gray-400 max-w-md">
        Per assistenza contattaci all’indirizzo {brand.supportEmail}.
      </p>
    </div>
  );
}
