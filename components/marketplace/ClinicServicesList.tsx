import { Clock, Euro } from "lucide-react";
import type { Service } from "@/lib/types/database";

function formatPrice(value: number): string {
  return new Intl.NumberFormat("it-IT", { style: "currency", currency: "EUR" }).format(value);
}

export default function ClinicServicesList({ services }: { services: Service[] }) {
  return (
    <section className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8">
      <h2 className="text-2xl font-black text-[#0B1D3A]">Servizi</h2>
      {services.length === 0 ? (
        <p className="mt-4 text-gray-600">La struttura non ha ancora pubblicato i propri servizi.</p>
      ) : (
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {services.map((service) => (
            <li key={service.id} className="rounded-2xl border border-gray-200 p-5">
              <h3 className="font-bold text-[#0B1D3A]">{service.name}</h3>
              {service.description && <p className="mt-2 text-sm leading-relaxed text-gray-600">{service.description}</p>}
              {(service.price !== null || service.duration_minutes !== null) && (
                <div className="mt-4 flex flex-wrap gap-3 text-sm font-semibold text-gray-600">
                  {service.price !== null && <span className="inline-flex items-center gap-1.5"><Euro className="h-4 w-4 text-[#00B39A]" aria-hidden="true" />{formatPrice(service.price)}</span>}
                  {service.duration_minutes !== null && <span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4 text-[#00B39A]" aria-hidden="true" />{service.duration_minutes} min</span>}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
