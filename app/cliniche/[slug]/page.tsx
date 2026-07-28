import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, Mail, Globe, Clock, CheckCircle2, Star, ArrowLeft, Euro } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

interface ClinicService {
  id: string;
  name: string;
  price?: string | number | null;
  description?: string | null;
  duration_minutes?: number | null;
}

interface OpeningHour {
  day: string;
  open?: string;
  close?: string;
  closed?: boolean;
}

export default async function ClinicDetailPage({ params }: Props) {
  const { slug } = await params;
  const supabase = await createClient();

  // Fetch Clinica
  const { data: clinic, error } = await supabase
    .from("clinics")
    .select("*, services(*)") // Join con tabella services
    .eq("slug", slug)
    .single();

  if (error || !clinic) {
    return notFound();
  }

  // Parsing orari (se salvati come JSON string)
  let openingHours = [];
  try {
    if (typeof clinic.opening_hours === 'string') {
      openingHours = JSON.parse(clinic.opening_hours);
    } else if (Array.isArray(clinic.opening_hours)) {
      openingHours = clinic.opening_hours;
    }
  } catch (e) {
    console.error("Errore parsing orari:", e);
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-32">

      {/* HEADER IMMAGINE */}
      <div className="relative h-[400px] w-full bg-gray-900">
        {clinic.cover_url ? (
          <Image
            src={clinic.cover_url}
            alt={clinic.name}
            fill
            className="object-cover opacity-80"
            priority
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-gray-800 to-gray-900 flex items-center justify-center">
            <MapPin className="w-20 h-20 text-white/20" />
          </div>
        )}

        {/* Overlay Gradiente */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

        {/* Breadcrumb & Back */}
        <div className="absolute top-24 left-6 md:left-12 z-20">
          <Link href="/cliniche" className="inline-flex items-center gap-2 text-white/80 hover:text-white transition text-sm font-medium bg-black/30 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
            <ArrowLeft className="w-4 h-4" /> Torna alle cliniche
          </Link>
        </div>

        {/* Info Principali Header */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 z-20 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="px-3 py-1 bg-[#0D47A1] text-white text-xs font-bold uppercase tracking-wider rounded-full">
                  {clinic.category}
                </span>
                {clinic.verified && (
                  <span className="px-3 py-1 bg-green-600/90 text-white text-xs font-bold uppercase tracking-wider rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Profilo in evidenza
                  </span>
                )}
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-white mb-2 leading-tight">
                {clinic.name}
              </h1>
              <div className="flex items-center gap-2 text-white/90 text-lg">
                <MapPin className="w-5 h-5" />
                <span>{clinic.address}, {clinic.city}</span>
              </div>
            </div>

            {/* Rating Box */}
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 min-w-[140px] text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                <span className="text-2xl font-black text-white">4.8</span>
              </div>
              <p className="text-white/70 text-xs font-medium">Basato su 120+ recensioni</p>
            </div>
          </div>
        </div>
      </div>

      {/* CONTENUTO PRINCIPALE */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid lg:grid-cols-3 gap-12">

        {/* COLONNA SINISTRA: Dettagli */}
        <div className="lg:col-span-2 space-y-12">

          {/* Descrizione */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Chi siamo</h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              {clinic.description || "La nostra clinica offre trattamenti all'avanguardia con un team di specialisti dedicati al tuo benessere."}
            </p>
          </section>

          {/* Servizi Offerti */}
          {clinic.services && clinic.services.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Trattamenti e Prezzi</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {clinic.services.map((service: ClinicService) => (
                  <div key={service.id} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:border-[#99E7DB] transition group">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-gray-900 group-hover:text-[#0D47A1] transition">{service.name}</h3>
                      {service.price && (
                        <span className="flex items-center gap-1 text-green-700 font-bold bg-green-50 px-2 py-1 rounded-lg text-sm">
                          <Euro className="w-3.5 h-3.5" /> {service.price}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 mb-3 line-clamp-2">{service.description}</p>
                    {service.duration_minutes && (
                      <div className="flex items-center gap-2 text-xs text-gray-400 font-medium">
                        <Clock className="w-3.5 h-3.5" /> {service.duration_minutes} min
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Orari di Apertura */}
          {openingHours.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Orari di Apertura</h2>
              <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                {openingHours.map((day: OpeningHour, idx: number) => (
                  <div key={idx} className={`flex justify-between p-4 ${idx !== openingHours.length - 1 ? 'border-b border-gray-50' : ''}`}>
                    <span className={`font-semibold ${day.closed ? 'text-gray-400' : 'text-gray-900'}`}>{day.day}</span>
                    <span className={day.closed ? 'text-gray-400 text-sm' : 'text-gray-600'}>
                      {day.closed ? 'Chiuso' : `${day.open} - ${day.close}`}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* COLONNA DESTRA: Contatti & CTA Sticky */}
        <aside className="lg:col-span-1">
          <div className="sticky top-28 space-y-6">

            {/* Card Contatti */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4">Contatta la Clinica</h3>
              <div className="space-y-4">
                {clinic.phone && (
                  <a href={`tel:${clinic.phone}`} className="flex items-center gap-3 text-gray-600 hover:text-[#0D47A1] transition group">
                    <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-[#E6FAF5] transition">
                      <Phone className="w-5 h-5" />
                    </div>
                    <span className="font-medium">{clinic.phone}</span>
                  </a>
                )}
                {clinic.email && (
                  <a href={`mailto:${clinic.email}`} className="flex items-center gap-3 text-gray-600 hover:text-[#0D47A1] transition group">
                    <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-[#E6FAF5] transition">
                      <Mail className="w-5 h-5" />
                    </div>
                    <span className="font-medium truncate">{clinic.email}</span>
                  </a>
                )}
                {clinic.website && (
                  <a href={clinic.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-600 hover:text-[#0D47A1] transition group">
                    <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-[#E6FAF5] transition">
                      <Globe className="w-5 h-5" />
                    </div>
                    <span className="font-medium truncate">Visita sito web</span>
                  </a>
                )}
              </div>
            </div>

            {/* CTA Preventivo Sticky */}
            <div className="bg-[#0D47A1] p-6 rounded-2xl shadow-xl shadow-[#0D47A1]/20 text-white text-center">
              <h3 className="text-xl font-black mb-2">Richiedi Preventivo Gratuito</h3>
              <p className="text-[#CCF3EC] text-sm mb-6">
                Compila il form per ricevere fino a 3 preventivi comparabili entro 24h.
              </p>

              {/* Bottone che apre Modal o porta a /check-up precompilato */}
              <Link
                href={`/check-up?clinic=${clinic.slug}`}
                className="block w-full py-4 bg-white text-[#0D47A1] rounded-xl font-bold text-lg hover:bg-gray-50 transition shadow-lg active:scale-95 transform duration-150"
              >
                RICHIEDI ORA
              </Link>

              <p className="mt-4 text-xs text-[#99E7DB] opacity-80">
                ✓ Richiesta senza impegno ✓ Contatto diretto
              </p>
            </div>

          </div>
        </aside>

      </div>
    </div>
  );
}
