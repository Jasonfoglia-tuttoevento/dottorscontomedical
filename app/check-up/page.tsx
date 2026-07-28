"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { submitCheckup } from "@/app/check-up/actions";
import { brand } from "@/lib/brand";
import {
  ArrowRight, ArrowLeft, CheckCircle2, User, Phone,
  Mail, MapPin, FileText, ShieldCheck, Sparkles, AlertCircle
} from "lucide-react";

const STEPS = [
  { id: 1, title: "Trattamento", icon: Sparkles },
  { id: 2, title: "Dati Personali", icon: User },
  { id: 3, title: "Conferma", icon: CheckCircle2 },
];

export default function CheckUpPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    category: "",
    treatment: "",
    city: "",
    name: "",
    phone: "",
    email: "",
    notes: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (error) setError(null);
  };

  const nextStep = () => {
    // Validazione Step 1
    if (step === 1 && (!formData.category || !formData.treatment)) return;
    // Validazione Step 2
    if (step === 2 && (!formData.name || !formData.phone || !formData.email)) return;
    setStep(prev => prev + 1);
  };

  const prevStep = () => setStep(prev => prev - 1);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await submitCheckup({
        category: formData.category,
        treatment: formData.treatment,
        city: formData.city || null,
        patient_name: formData.name,
        patient_phone: formData.phone,
        patient_email: formData.email,
        notes: formData.notes || null,
      });

      if (!result.ok) throw new Error(result.error);
      router.push("/check-up/success");

    } catch (err: unknown) {
      console.error("Errore invio check-up:", err);
      setError(err instanceof Error ? err.message : "Si è verificato un errore. Riprova più tardi.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header Semplice */}
      <header className="bg-white border-b border-gray-200 py-4 px-6 sticky top-0 z-50">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image src={brand.logoCompact} alt={brand.name} width={512} height={512} className="h-9 w-9 object-contain" priority />
          </Link>
          <div className="text-xs font-bold text-gray-400 uppercase tracking-widest hidden sm:block">
            Check-up Gratuito
          </div>
        </div>
      </header>

      {/* Contenuto Principale */}
      <main className="flex-grow flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-2xl bg-white rounded-[2rem] shadow-xl border border-gray-100 overflow-hidden">

          {/* Barra Progresso */}
          <div className="bg-gray-50 px-8 py-6 border-b border-gray-100">
            <div className="flex items-center justify-between relative">
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -z-0"></div>
              {STEPS.map((s) => {
                const isActive = step >= s.id;
                const isCurrent = step === s.id;
                return (
                  <div key={s.id} className="relative z-10 flex flex-col items-center gap-2 bg-gray-50 px-2">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                      isActive ? "bg-[#0D47A1] border-[#0D47A1] text-white" : "bg-white border-gray-300 text-gray-400"
                    }`}>
                      {isActive ? <CheckCircle2 className="w-5 h-5" /> : <s.icon className="w-5 h-5" />}
                    </div>
                    <span className={`text-xs font-bold uppercase tracking-wide ${isCurrent ? "text-[#0D47A1]" : "text-gray-400"}`}>
                      {s.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Area Form Dinamica */}
          <div className="p-8 md:p-12 min-h-[450px] flex flex-col">

            {/* STEP 1: Trattamento */}
            {step === 1 && (
              <div className="space-y-8 animate-fade-in">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-black text-gray-900 mb-3">Di cosa hai bisogno?</h2>
                  <p className="text-gray-500">Seleziona la categoria e il trattamento specifico.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">Categoria</label>
                    <select
                      value={formData.category}
                      onChange={(e) => handleChange("category", e.target.value)}
                      className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#00B39A]/20 focus:border-[#00B39A] outline-none transition-all appearance-none cursor-pointer font-medium"
                    >
                      <option value="">Seleziona categoria...</option>
                      <option value="dentali">🦷 Dentali</option>
                      <option value="capelli">♂️ Capelli</option>
                      <option value="estetica">✨ Estetica</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">Trattamento Specifico</label>
                    <input
                      type="text" placeholder="Es. Implantologia, Trapianto FUE..."
                      value={formData.treatment} onChange={(e) => handleChange("treatment", e.target.value)}
                      className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#00B39A]/20 focus:border-[#00B39A] outline-none transition-all font-medium"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-400" /> Zona di interesse (Opzionale)
                  </label>
                  <input
                    type="text" placeholder="Es. Milano, Roma Centro..."
                    value={formData.city} onChange={(e) => handleChange("city", e.target.value)}
                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#00B39A]/20 focus:border-[#00B39A] outline-none transition-all font-medium"
                  />
                </div>
              </div>
            )}

            {/* STEP 2: Dati Personali - CORRETTO PER SOVRAPPOSIZIONE */}
            {step === 2 && (
              <div className="space-y-6 animate-fade-in">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-black text-gray-900 mb-3">I tuoi contatti</h2>
                  <p className="text-gray-500">Dove possiamo inviarti i preventivi delle cliniche?</p>
                </div>

                <div className="space-y-4">
                  {/* Nome */}
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#0D47A1] transition-colors pointer-events-none" />
                    <input
                      type="text"
                      placeholder="Nome e Cognome"
                      value={formData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      // pl-12 crea lo spazio fisico per l'icona a sinistra
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#00B39A]/20 focus:border-[#00B39A] outline-none transition-all font-medium text-gray-900 placeholder-gray-400"
                    />
                  </div>

                  {/* Telefono */}
                  <div className="relative group">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#0D47A1] transition-colors pointer-events-none" />
                    <input
                      type="tel"
                      placeholder="Numero di Telefono"
                      value={formData.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#00B39A]/20 focus:border-[#00B39A] outline-none transition-all font-medium text-gray-900 placeholder-gray-400"
                    />
                  </div>

                  {/* Email */}
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#0D47A1] transition-colors pointer-events-none" />
                    <input
                      type="email"
                      placeholder="Indirizzo Email"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#00B39A]/20 focus:border-[#00B39A] outline-none transition-all font-medium text-gray-900 placeholder-gray-400"
                    />
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <label className="text-sm font-bold text-gray-700 ml-1 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-gray-400" /> Note aggiuntive (Opzionale)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Hai esigenze particolari? Scrivile qui..."
                    value={formData.notes}
                    onChange={(e) => handleChange("notes", e.target.value)}
                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#00B39A]/20 focus:border-[#00B39A] outline-none transition-all font-medium text-gray-900 placeholder-gray-400 resize-none"
                  />
                </div>
              </div>
            )}

            {/* STEP 3: Conferma */}
            {step === 3 && (
              <div className="space-y-8 animate-fade-in text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <ShieldCheck className="w-10 h-10 text-green-600" />
                </div>
                <h2 className="text-3xl font-black text-gray-900 mb-3">Tutto pronto!</h2>
                <p className="text-gray-500 max-w-md mx-auto leading-relaxed">
                  Stai per richiedere preventivi gratuiti per <strong>{formData.treatment}</strong> nella zona di <strong>{formData.city || "tutta Italia"}</strong>.
                  Le strutture disponibili potranno contattarti usando i recapiti indicati.
                </p>
                <div className="bg-gray-50 p-6 rounded-2xl text-left max-w-md mx-auto border border-gray-100 mt-8">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Riepilogo Richiesta</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between"><span className="text-gray-500">Trattamento:</span><span className="font-bold text-gray-900">{formData.treatment}</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">Zona:</span><span className="font-bold text-gray-900">{formData.city || "Non specificata"}</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">Contatto:</span><span className="font-bold text-gray-900">{formData.phone}</span></div>
                  </div>
                </div>
              </div>
            )}

            {/* Messaggio di Errore */}
            {error && (
              <div className="mt-6 p-4 bg-[#E6FAF5] border border-[#CCF3EC] rounded-xl flex items-start gap-3 text-[#0B3B86] text-sm animate-pulse">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <p>{error}</p>
              </div>
            )}

            {/* Navigazione Footer */}
            <div className="mt-auto pt-8 flex items-center justify-between gap-4">
              {step > 1 ? (
                <button onClick={prevStep} className="flex items-center gap-2 px-6 py-4 text-gray-500 font-bold hover:text-gray-900 transition">
                  <ArrowLeft className="w-5 h-5" /> Indietro
                </button>
              ) : <div></div>}

              {step < 3 ? (
                <button onClick={nextStep} className="flex items-center gap-2 px-8 py-4 bg-[#0D47A1] text-white rounded-xl font-bold text-lg hover:bg-[#0B3B86] transition shadow-lg shadow-[#0D47A1]/20 hover:-translate-y-1 transform duration-200 ml-auto">
                  Avanti <ArrowRight className="w-5 h-5" />
                </button>
              ) : (
                <button onClick={handleSubmit} disabled={loading}
                  className="flex items-center gap-2 px-8 py-4 bg-green-600 text-white rounded-xl font-bold text-lg hover:bg-green-700 transition shadow-lg shadow-green-600/20 hover:-translate-y-1 transform duration-200 ml-auto disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0">
                  {loading ? "Invio in corso..." : "Invia Richiesta"} <CheckCircle2 className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </main>

      <footer className="py-6 text-center text-xs text-gray-400">
        <p>Inviando questo form accetti la nostra Privacy Policy e acconsenti al trattamento dei dati.</p>
      </footer>
    </div>
  );
}
