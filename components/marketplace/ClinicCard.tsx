import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2, MapPin } from "lucide-react";
import { safeMarketplaceImageUrl } from "@/lib/marketplace/images";
import { getClinicDetailIdentifier } from "@/lib/marketplace/clinic-identifier";
import type { Clinic } from "@/lib/types/database";

function priceLevelLabel(value: number | null): string | null {
  switch (value) {
    case 1:
      return "Fascia economica";
    case 2:
      return "Fascia media";
    case 3:
      return "Fascia alta";
    default:
      return null;
  }
}

export default function ClinicCard({ clinic }: { clinic: Clinic }) {
  const coverUrl = safeMarketplaceImageUrl(clinic.cover_url);
  const logoUrl = safeMarketplaceImageUrl(clinic.logo_url);
  const imageUrl = coverUrl ?? logoUrl;
  const priceLabel = priceLevelLabel(clinic.price_level);
  const detailIdentifier = getClinicDetailIdentifier(clinic);

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition hover:border-[#99E7DB] hover:shadow-lg">
      <div className="relative aspect-[16/10] overflow-hidden bg-[#F2F4F7]">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={`Immagine di ${clinic.name}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className={coverUrl ? "object-cover" : "object-contain p-8"}
          />
        ) : (
          <div className="flex h-full items-center justify-center" role="img" aria-label="Immagine non disponibile">
            <MapPin className="h-14 w-14 text-gray-300" aria-hidden="true" />
          </div>
        )}

        {clinic.verified && (
          <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-[#0D47A1] shadow-sm">
            <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
            Profilo in evidenza
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        {clinic.category && (
          <p className="mb-2 text-xs font-bold uppercase tracking-wider text-[#0D47A1]">
            {clinic.category}
          </p>
        )}
        <h2 className="text-xl font-black leading-tight text-[#0B1D3A]">{clinic.name}</h2>

        <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-gray-600">
          {clinic.description || "Descrizione non disponibile."}
        </p>

        <div className="mt-5 space-y-3 border-t border-gray-100 pt-4 text-sm">
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin className="h-4 w-4 shrink-0 text-[#00B39A]" aria-hidden="true" />
            <span>{clinic.city || "Località non indicata"}</span>
          </div>
          {priceLabel && (
            <p className="text-xs font-semibold text-gray-500">{priceLabel}</p>
          )}
          {detailIdentifier ? (
            <Link
              href={`/cliniche/${encodeURIComponent(detailIdentifier)}`}
              className="inline-flex items-center gap-2 rounded-lg font-bold text-[#0D47A1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B39A] focus-visible:ring-offset-2"
              aria-label={`Apri il profilo di ${clinic.name}`}
            >
              Vedi profilo
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          ) : (
            <p className="text-xs font-semibold text-gray-400">Profilo non disponibile</p>
          )}
        </div>
      </div>
    </article>
  );
}
