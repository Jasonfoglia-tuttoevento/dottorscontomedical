import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { MapPin, Star, CheckCircle2, ArrowUpRight, Euro, SearchX } from "lucide-react";
import Image from "next/image";

interface Props {
  category: string;
  city: string;
  verified?: boolean;
  searchQuery?: string;
  minRating?: number;
  priceRange?: string; // 'low', 'medium', 'high', 'all'
}

export default async function ClinicList({
  category,
  city,
  verified,
  searchQuery = "",
  minRating = 0,
  priceRange = "all"
}: Props) {
  const supabase = await createClient();

  // Costruzione query dinamica con tutti i nuovi filtri
  let query = supabase.from("clinics").select("*");

  if (category && category !== "all") {
    query = query.eq("category", category);
  }
  if (city) {
    query = query.ilike("city", `%${city}%`);
  }
  if (verified) {
    query = query.eq("verified", true);
  }

  // Ricerca testuale su nome e descrizione
  if (searchQuery) {
    query = query.or(
      `name.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`
    );
  }

  // Filtro Rating (Nota: richiede colonna 'rating' nella tabella clinics)
  if (minRating > 0) {
    query = query.gte("rating", minRating);
  }

  // Filtro Fascia di Prezzo (richiede colonna 'price_level': 1=econ, 2=medio, 3=alto)
  if (priceRange && priceRange !== "all") {
    const priceMap: Record<string, number> = { low: 1, medium: 2, high: 3 };
    if (priceMap[priceRange]) {
      query = query.eq("price_level", priceMap[priceRange]);
    }
  }

  const { data: clinics, error } = await query.order("created_at", { ascending: false });

  // Gestione stato vuoto o errore
  if (!clinics || clinics.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center bg-white rounded-[2rem] border border-gray-100 shadow-sm">
        <div className="w-24 h-24 bg-[#E6FAF5] rounded-full flex items-center justify-center mb-6 animate-pulse">
          <SearchX className="w-12 h-12 text-[#33C6B2]" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-3">Nessun risultato trovato</h3>
        <p className="text-gray-500 max-w-md mb-8 leading-relaxed">
          Non abbiamo trovato cliniche che corrispondono ai tuoi criteri. Prova a rimuovere alcuni filtri o amplia la zona di ricerca.
        </p>
        <Link
          href="/cliniche"
          className="px-8 py-4 bg-[#0D47A1] text-white rounded-full font-bold hover:bg-[#0B3B86] transition shadow-lg shadow-[#0D47A1]/20 hover:-translate-y-1 transform duration-200"
        >
          Resetta tutti i filtri
        </Link>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {clinics.map((clinic) => {
        // Calcolo prezzo stimato per UI (fallback se manca price_level)
        const getPriceLabel = () => {
          if (!clinic.price_level) return "Prezzo su richiesta";
          if (clinic.price_level === 1) return "€ Economico";
          if (clinic.price_level === 2) return "€€ Medio";
          return "€€€ Premium";
        };

        return (
          <Link
            key={clinic.id}
            href={`/cliniche/${clinic.slug || clinic.id}`}
            className="group relative bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-500 hover:-translate-y-2 flex flex-col h-full"
          >
            {/* IMMAGINE PREMIUM */}
            <div className="relative aspect-[4/3] overflow-hidden bg-gray-100 shrink-0">
              {clinic.cover_url ? (
                <Image
                  src={clinic.cover_url}
                  alt={clinic.name || "Clinica"}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                  <MapPin className="w-16 h-16 text-gray-300" />
                </div>
              )}

              {/* Overlay gradiente per leggibilità badge */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80"></div>

              {/* Badge profilo in evidenza */}
              {clinic.verified && (
                <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold text-green-700 flex items-center gap-2 shadow-lg border border-white/20">
                  <CheckCircle2 className="w-4 h-4" /> Profilo in evidenza
                </div>
              )}

              {/* Rating Flottante */}
              <div className="absolute bottom-6 right-6 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-lg border border-white/20">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <span className="text-sm font-black text-gray-900">{clinic.rating || "4.8"}</span>
              </div>
            </div>

            {/* CONTENUTO CARD */}
            <div className="p-8 flex flex-col flex-grow">
              <div className="mb-4">
                <span className="text-xs font-bold text-[#0D47A1] uppercase tracking-widest mb-2 block">
                  {clinic.category || "Generale"}
                </span>
                <h3 className="text-2xl font-black text-gray-900 group-hover:text-[#0D47A1] transition-colors leading-tight mb-2">
                  {clinic.name}
                </h3>

                {/* Prezzo Stimato */}
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-600 bg-gray-50 px-3 py-1.5 rounded-lg inline-flex w-fit">
                  <Euro className="w-3.5 h-3.5" />
                  {getPriceLabel()}
                </div>
              </div>

              <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-2 flex-grow">
                {clinic.description || "Struttura specializzata in trattamenti di alta qualità e tecnologia avanzata."}
              </p>

              {/* Footer Card */}
              <div className="flex items-center justify-between pt-6 border-t border-gray-50 mt-auto">
                <div className="flex items-center gap-2 text-gray-500 text-sm font-medium truncate max-w-[60%]">
                  <MapPin className="w-4 h-4 text-[#00B39A] shrink-0" />
                  <span className="truncate">{clinic.city || "Italia"}</span>
                </div>

                <div className="flex items-center gap-2 text-[#0D47A1] font-bold text-sm group-hover:gap-3 transition-all shrink-0">
                  Scopri dettagli
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
