import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* CTA Section */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
                Pronto a <span className="text-red-600">risparmiare</span>?
              </h2>
              <p className="text-xl text-gray-400">
                Inizia ora il tuo check-up gratuito.
              </p>
            </div>
            <Link 
              href="/check-up" 
              className="px-8 py-4 bg-red-600 text-white rounded-full font-bold text-lg hover:bg-red-700 transition shadow-2xl whitespace-nowrap"
            >
              Inizia il Check-up →
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="mb-6">
              <Image 
                src="/images/dottorsconto-logo.png" 
                alt="Dottor Sconto" 
                width={180}
                height={48}
                className="h-12 w-auto brightness-0 invert"
                priority
              />
            </div>
            <p className="text-gray-400 mb-6 max-w-sm leading-relaxed">
              Il primo marketplace medicale italiano che connette pazienti e cliniche specializzate.
            </p>
            <div className="flex gap-3">
              {["f", "in", "ig", "yt"].map((social) => (
                <a 
                  key={social}
                  href="#" 
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-red-600 flex items-center justify-center transition text-sm font-semibold"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>

          {/* Pazienti */}
          <div>
            <h4 className="font-bold mb-6 text-white">Pazienti</h4>
            <ul className="space-y-3 text-gray-400">
              <li><Link href="/check-up" className="hover:text-white transition">Check-up gratuito</Link></li>
              <li><Link href="/cliniche" className="hover:text-white transition">Cerca clinica</Link></li>
              <li><Link href="/specializzazioni" className="hover:text-white transition">Specializzazioni</Link></li>
              <li><Link href="/recensioni" className="hover:text-white transition">Recensioni</Link></li>
            </ul>
          </div>

          {/* Cliniche */}
          <div>
            <h4 className="font-bold mb-6 text-white">Cliniche</h4>
            <ul className="space-y-3 text-gray-400">
              <li><Link href="/register" className="hover:text-white transition">Registrati</Link></li>
              <li><Link href="/dashboard" className="hover:text-white transition">Dashboard</Link></li>
              <li><Link href="/partner" className="hover:text-white transition">Diventa partner</Link></li>
              <li><Link href="/pricing" className="hover:text-white transition">Piani</Link></li>
            </ul>
          </div>

          {/* Contatti */}
          <div>
            <h4 className="font-bold mb-6 text-white">Contatti</h4>
            <ul className="space-y-3 text-gray-400">
              <li>info@dottorscontomedical.it</li>
              <li>+39 02 1234567</li>
              <li>Lun-Ven 9:00-18:00</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 mt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-gray-500 text-sm">
            © 2026 Dottor Sconto Medical. Tutti i diritti riservati.
          </div>
          <div className="flex gap-6 text-sm text-gray-500">
            <Link href="/privacy" className="hover:text-white transition">Privacy</Link>
            <Link href="/termini" className="hover:text-white transition">Termini</Link>
            <Link href="/cookie" className="hover:text-white transition">Cookie</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}