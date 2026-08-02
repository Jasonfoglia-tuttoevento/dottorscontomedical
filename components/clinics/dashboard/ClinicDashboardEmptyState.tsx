import Link from "next/link";
import { Building2 } from "lucide-react";

export default function ClinicDashboardEmptyState() {
  return (
    <section className="mx-auto max-w-3xl rounded-3xl border border-dashed border-blue-200 bg-white p-10 text-center shadow-sm md:p-16">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-[#0D47A1]"><Building2 className="h-8 w-8" /></div>
      <h1 className="mt-6 text-3xl font-black text-gray-950">Configura la tua clinica</h1>
      <p className="mx-auto mt-3 max-w-xl text-gray-600">Il tuo account ha ruolo clinica, ma non è ancora collegato a un profilo pubblico. Completa i dati essenziali per attivare la dashboard commerciale.</p>
      <Link href="/dashboard/clinic/profile/general" className="mt-7 inline-flex rounded-xl bg-[#0D47A1] px-6 py-3 font-bold text-white hover:bg-[#0B3B86]">Inizia configurazione</Link>
    </section>
  );
}
