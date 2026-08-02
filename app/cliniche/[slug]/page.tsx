import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2, Clock, Globe, Mail, MapPin, Phone } from "lucide-react";
import ClinicAnalyticsTracker from "@/components/analytics/ClinicAnalyticsTracker";
import BrandLogo from "@/components/brand/BrandLogo";
import ClinicServicesList from "@/components/marketplace/ClinicServicesList";
import { brand } from "@/lib/brand";
import { getPublicClinicByIdentifier } from "@/lib/data/clinics";
import { safeMarketplaceImageUrl } from "@/lib/marketplace/images";
import { getClinicDetailIdentifier } from "@/lib/marketplace/clinic-identifier";

interface Props {
  params: Promise<{ slug: string }>;
}

interface OpeningHour {
  day: string;
  label: string;
}

function parseOpeningHours(value: unknown): OpeningHour[] {
  let parsed = value;

  if (typeof value === "string") {
    try {
      parsed = JSON.parse(value);
    } catch {
      return [];
    }
  }

  if (!Array.isArray(parsed)) return [];

  return parsed.flatMap((entry): OpeningHour[] => {
    if (!entry || typeof entry !== "object") return [];
    const item = entry as Record<string, unknown>;
    if (typeof item.day !== "string" || !item.day.trim()) return [];
    if (item.closed === true) return [{ day: item.day.trim(), label: "Chiuso" }];
    if (typeof item.open !== "string" || typeof item.close !== "string") return [];
    if (!item.open.trim() || !item.close.trim()) return [];
    return [{ day: item.day.trim(), label: `${item.open.trim()} – ${item.close.trim()}` }];
  });
}

function safeWebsiteUrl(value: string | null): string | null {
  if (!value) return null;
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:" ? url.toString() : null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const clinic = await getPublicClinicByIdentifier(slug);

  if (!clinic) {
    return {
      title: "Struttura non trovata",
      robots: { index: false, follow: false },
    };
  }

  const canonicalIdentifier = getClinicDetailIdentifier(clinic);
  const description = clinic.description?.trim()
    || `Informazioni e servizi disponibili presso ${clinic.name} su ${brand.name}.`;

  return {
    title: clinic.name,
    description,
    ...(canonicalIdentifier
      ? { alternates: { canonical: `/cliniche/${encodeURIComponent(canonicalIdentifier)}` } }
      : { robots: { index: false, follow: false } }),
    openGraph: { title: clinic.name, description, type: "website" },
  };
}

export default async function ClinicDetailPage({ params }: Props) {
  const { slug } = await params;
  const clinic = await getPublicClinicByIdentifier(slug);

  if (!clinic) notFound();

  const coverUrl = safeMarketplaceImageUrl(clinic.cover_url);
  const logoUrl = safeMarketplaceImageUrl(clinic.logo_url);
  const heroImage = coverUrl ?? logoUrl;
  const openingHours = parseOpeningHours(clinic.opening_hours);
  const websiteUrl = safeWebsiteUrl(clinic.website);
  const location = [clinic.address, clinic.city].filter(Boolean).join(", ");

  return (
    <div className="min-h-screen bg-[#F2F4F7] pb-20">
      <ClinicAnalyticsTracker clinicId={clinic.id} />
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B39A]">
            <BrandLogo iconClassName="h-10 w-10" textClassName="text-lg sm:text-xl" priority />
          </Link>
          <Link href="/cliniche" className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold text-[#0D47A1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B39A]">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Tutte le cliniche
          </Link>
        </div>
      </header>

      <main>
        <section className="relative min-h-[24rem] overflow-hidden bg-[#0B1D3A]">
          {heroImage ? (
            <Image
              src={heroImage}
              alt={coverUrl ? `Immagine di ${clinic.name}` : `Logo di ${clinic.name}`}
              fill
              sizes="100vw"
              className={coverUrl ? "object-cover opacity-55" : "object-contain p-20 opacity-80"}
              priority
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center" role="img" aria-label="Immagine non disponibile">
              <MapPin className="h-24 w-24 text-white/15" aria-hidden="true" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1D3A] via-[#0B1D3A]/35 to-transparent" />
          <div className="relative mx-auto flex min-h-[24rem] max-w-7xl items-end px-4 py-10 sm:px-6">
            <div className="max-w-4xl">
              <div className="flex flex-wrap gap-2">
                {clinic.category && <span className="rounded-full bg-[#00B39A] px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">{clinic.category}</span>}
                {clinic.verified && <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-bold text-[#0D47A1]"><CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />Profilo in evidenza</span>}
              </div>
              <h1 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-6xl">{clinic.name}</h1>
              {location && <p className="mt-3 flex items-start gap-2 text-lg text-white/85"><MapPin className="mt-1 h-5 w-5 shrink-0" aria-hidden="true" />{location}</p>}
            </div>
          </div>
        </section>

        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,2fr)_minmax(18rem,1fr)] lg:py-14">
          <div className="min-w-0 space-y-10">
            <section className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8">
              <h2 className="text-2xl font-black text-[#0B1D3A]">Informazioni sulla struttura</h2>
              <p className="mt-4 whitespace-pre-line leading-relaxed text-gray-600">
                {clinic.description?.trim() || "La struttura non ha ancora pubblicato una descrizione."}
              </p>
            </section>

            <ClinicServicesList services={clinic.services ?? []} />

            {openingHours.length > 0 && (
              <section className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8">
                <h2 className="flex items-center gap-3 text-2xl font-black text-[#0B1D3A]"><Clock className="h-6 w-6 text-[#00B39A]" aria-hidden="true" />Orari</h2>
                <dl className="mt-5 divide-y divide-gray-100">
                  {openingHours.map((item, index) => (
                    <div key={`${item.day}-${index}`} className="flex justify-between gap-5 py-3">
                      <dt className="font-semibold text-gray-800">{item.day}</dt>
                      <dd className="text-right text-gray-600">{item.label}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            )}
          </div>

          <aside className="min-w-0 space-y-6">
            {(clinic.phone || clinic.email || websiteUrl || location) && (
              <section className="rounded-3xl border border-gray-200 bg-white p-6">
                <h2 className="text-xl font-black text-[#0B1D3A]">Contatti</h2>
                <div className="mt-5 space-y-4 text-sm">
                  {location && <p className="flex items-start gap-3 break-words text-gray-600"><MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#00B39A]" aria-hidden="true" /><span>{location}</span></p>}
                  {clinic.phone && <a href={`tel:${clinic.phone}`} data-clinic-event="phone_click" className="flex items-start gap-3 break-all text-gray-600 hover:text-[#0D47A1]"><Phone className="mt-0.5 h-5 w-5 shrink-0 text-[#00B39A]" aria-hidden="true" /><span>{clinic.phone}</span></a>}
                  {clinic.email && <a href={`mailto:${clinic.email}`} data-clinic-event="email_click" className="flex items-start gap-3 break-all text-gray-600 hover:text-[#0D47A1]"><Mail className="mt-0.5 h-5 w-5 shrink-0 text-[#00B39A]" aria-hidden="true" /><span>{clinic.email}</span></a>}
                  {websiteUrl && <a href={websiteUrl} target="_blank" rel="noopener noreferrer" data-clinic-event="website_click" className="flex items-start gap-3 break-all text-gray-600 hover:text-[#0D47A1]"><Globe className="mt-0.5 h-5 w-5 shrink-0 text-[#00B39A]" aria-hidden="true" /><span>Visita il sito della struttura</span></a>}
                </div>
              </section>
            )}

            <section className="rounded-3xl bg-[#0D47A1] p-6 text-white">
              <h2 className="text-xl font-black">Hai bisogno di orientamento?</h2>
              <p className="mt-3 text-sm leading-relaxed text-blue-100">
                Invia una richiesta generale a Facile Medical indicando le tue esigenze.
              </p>
              <Link href="/check-up" data-clinic-event="request_click" className="mt-6 block rounded-xl bg-white px-5 py-3 text-center font-bold text-[#0D47A1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B39A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0D47A1]">
                Inizia la richiesta
              </Link>
            </section>
          </aside>
        </div>
      </main>
    </div>
  );
}
