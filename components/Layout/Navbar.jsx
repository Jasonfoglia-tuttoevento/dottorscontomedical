"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { brand } from "@/lib/brand";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image 
              src={brand.logoFull}
              alt={brand.name}
              width={1281}
              height={252}
              className="h-9 sm:h-12 w-auto max-w-[calc(100vw-6rem)] object-contain"
              priority
            />
          </Link>

          {/* Menu Desktop */}
          <div className="hidden lg:flex items-center gap-10">
            <Link href="/cliniche" className="text-gray-700 hover:text-[#0D47A1] font-medium transition">
              Cliniche
            </Link>
            <Link href="/#specializzazioni" className="text-gray-700 hover:text-[#0D47A1] font-medium transition">
              Specializzazioni
            </Link>
            <Link href="/#come-funziona" className="text-gray-700 hover:text-[#0D47A1] font-medium transition">
              Come funziona
            </Link>
            <Link href="/#recensioni" className="text-gray-700 hover:text-[#0D47A1] font-medium transition">
              Recensioni
            </Link>
          </div>

          {/* CTA Desktop */}
          <div className="hidden lg:flex items-center gap-4">
            <Link href="/login" className="text-gray-700 hover:text-[#0D47A1] font-semibold transition">
              Accedi
            </Link>
            <Link 
              href="/check-up" 
              className="px-6 py-3 bg-[#0D47A1] text-white rounded-full font-semibold hover:bg-[#0B3B86] transition shadow-lg hover:shadow-xl"
            >
              Check-up Gratuito
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="lg:hidden text-gray-700"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden py-6 border-t border-gray-100 bg-white absolute left-0 right-0 shadow-xl">
            <div className="flex flex-col gap-4 px-6">
              <Link href="/cliniche" className="text-gray-700 font-medium py-2 border-b border-gray-50">Cliniche</Link>
              <Link href="/#specializzazioni" className="text-gray-700 font-medium py-2 border-b border-gray-50">Specializzazioni</Link>
              <Link href="/#come-funziona" className="text-gray-700 font-medium py-2 border-b border-gray-50">Come funziona</Link>
              <Link href="/#recensioni" className="text-gray-700 font-medium py-2 border-b border-gray-50">Recensioni</Link>
              <Link href="/login" className="text-gray-700 font-semibold py-2">Accedi</Link>
              <Link 
                href="/check-up" 
                className="mt-2 px-6 py-3 bg-[#0D47A1] text-white rounded-full font-semibold text-center shadow-md"
              >
                Check-up Gratuito
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
