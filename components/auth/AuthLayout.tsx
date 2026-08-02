import Link from "next/link";
import BrandLogo from "@/components/brand/BrandLogo";
import { brand } from "@/lib/brand";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header con Logo */}
      <header className="w-full py-4 px-6">
        <Link href="/" className="inline-block">
          <BrandLogo iconClassName="h-10 w-10" textClassName="text-lg sm:text-xl" priority />
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-start md:items-center justify-center px-4 py-6 md:py-0">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-10">
            {children}
          </div>

          {/* Footer card */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              © 2026 {brand.name}. Tutti i diritti riservati.
            </p>
          </div>
        </div>
      </main>

      {/* Decorazione mobile: gradiente sottile in basso */}
      <div className="fixed bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#E6FAF5] to-transparent pointer-events-none md:hidden"></div>
    </div>
  );
}
