import Link from "next/link";
import Image from "next/image";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header con Logo */}
      <header className="w-full py-6 px-6">
        <Link href="/" className="inline-block">
          <Image
            src="/images/dottorsconto-logo.png"
            alt="Dottor Sconto"
            width={160}
            height={44}
            className="h-10 w-auto"
            priority
          />
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-start md:items-center justify-center px-4 pb-12 pt-4 md:pt-0">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-10">
            {children}
          </div>

          {/* Footer card */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              © 2026 Dottor Sconto Medical. Tutti i diritti riservati.
            </p>
          </div>
        </div>
      </main>

      {/* Decorazione mobile: gradiente sottile in basso */}
      <div className="fixed bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-red-50 to-transparent pointer-events-none md:hidden"></div>
    </div>
  );
}