"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import BrandLogo from "@/components/brand/BrandLogo";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" aria-label="Facile Medical" className="rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A98F]">
            <BrandLogo
              className="gap-1.5"
              iconClassName="h-9 w-9 sm:h-10 sm:w-10"
              textClassName="text-lg sm:text-xl"
              priority
            />
          </Link>

          <div className="hidden items-center gap-10 lg:flex">
            <Link href="/cliniche" className="font-medium text-gray-700 transition hover:text-[#0D47A1]">Cliniche</Link>
            <Link href="/#specializzazioni" className="font-medium text-gray-700 transition hover:text-[#0D47A1]">Specializzazioni</Link>
            <Link href="/#come-funziona" className="font-medium text-gray-700 transition hover:text-[#0D47A1]">Come funziona</Link>
            <Link href="/#recensioni" className="font-medium text-gray-700 transition hover:text-[#0D47A1]">Recensioni</Link>
          </div>

          <div className="hidden items-center gap-4 lg:flex">
            <Link href="/login" className="font-semibold text-gray-700 transition hover:text-[#0D47A1]">Accedi</Link>
            <Link href="/check-up" className="rounded-full bg-[#0D47A1] px-6 py-3 font-semibold text-white shadow-lg transition hover:bg-[#0B3B86]">Check-up gratuito</Link>
          </div>

          <button
            type="button"
            className="rounded-lg p-2 text-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A98F] lg:hidden"
            onClick={() => setMobileOpen((current) => !current)}
            aria-label={mobileOpen ? "Chiudi menu" : "Apri menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {mobileOpen && (
          <div className="absolute inset-x-0 border-t border-gray-100 bg-white px-6 py-6 shadow-xl lg:hidden">
            <div className="flex flex-col gap-4">
              <Link href="/cliniche" onClick={() => setMobileOpen(false)} className="border-b border-gray-50 py-2 font-medium text-gray-700">Cliniche</Link>
              <Link href="/#specializzazioni" onClick={() => setMobileOpen(false)} className="border-b border-gray-50 py-2 font-medium text-gray-700">Specializzazioni</Link>
              <Link href="/#come-funziona" onClick={() => setMobileOpen(false)} className="border-b border-gray-50 py-2 font-medium text-gray-700">Come funziona</Link>
              <Link href="/#recensioni" onClick={() => setMobileOpen(false)} className="border-b border-gray-50 py-2 font-medium text-gray-700">Recensioni</Link>
              <Link href="/login" onClick={() => setMobileOpen(false)} className="py-2 font-semibold text-gray-700">Accedi</Link>
              <Link href="/check-up" onClick={() => setMobileOpen(false)} className="rounded-full bg-[#0D47A1] px-6 py-3 text-center font-semibold text-white shadow-md">Check-up gratuito</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
