"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, User, Building2 } from "lucide-react";

interface RegisterFormProps {
  initialRole?: "patient" | "clinic";
}

export default function RegisterForm({ initialRole = "patient" }: RegisterFormProps) {
  const [role, setRole] = useState<"patient" | "clinic">(initialRole);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Rinominato in formError per evitare conflitti con l'oggetto error di Supabase
  const [formError, setFormError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const supabase = createClient();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setLoading(true);

    try {
      // Controllo preventivo variabili d'ambiente
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        throw new Error("Configurazione Supabase mancante. Controlla .env.local e riavvia il server.");
      }

      const { data, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            role: role,
          },
        },
      });

      if (authError) {
        console.error("Supabase Auth Error:", authError);
        setFormError(authError.message);
        return;
      }

      if (data.session) {
        router.push("/dashboard");
        router.refresh();
      } else if (data.user) {
        router.push("/login?registered=check-email");
      } else {
        setFormError("Registrazione completata ma utente non trovato. Controlla la tua email.");
      }

    } catch (err: unknown) {
      console.error("Unexpected Registration Error:", err);
      setFormError(err instanceof Error ? err.message : "Si è verificato un errore imprevisto durante la registrazione.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-black text-gray-900 mb-2">
          Crea il tuo account
        </h1>
        <p className="text-sm md:text-base text-gray-500">
          Hai già un account?{" "}
          <Link href="/login" className="text-[#0D47A1] font-semibold hover:text-[#0B3B86] transition">
            Accedi
          </Link>
        </p>
      </div>

      {/* Visualizzazione Errori Sicura */}
      {formError && (
        <div className="mb-4 p-3 bg-[#E6FAF5] border border-[#99E7DB] text-[#0B3B86] rounded-lg text-sm font-medium animate-pulse">
          ⚠️ {formError}
        </div>
      )}

      <div className="mb-5 md:mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Sei un paziente o una clinica?
        </label>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setRole("patient")}
            className={`p-4 border-2 rounded-xl transition-all flex flex-col items-center justify-center ${
              role === "patient"
                ? "border-[#0D47A1] bg-[#E6FAF5] shadow-md"
                : "border-gray-200 hover:border-gray-300 bg-white"
            }`}
          >
            <User className={`w-6 h-6 mb-2 ${role === "patient" ? "text-[#0D47A1]" : "text-gray-400"}`} />
            <span className={`font-semibold text-sm ${role === "patient" ? "text-[#0D47A1]" : "text-gray-700"}`}>
              Paziente
            </span>
          </button>
          <button
            type="button"
            onClick={() => setRole("clinic")}
            className={`p-4 border-2 rounded-xl transition-all flex flex-col items-center justify-center ${
              role === "clinic"
                ? "border-[#0D47A1] bg-[#E6FAF5] shadow-md"
                : "border-gray-200 hover:border-gray-300 bg-white"
            }`}
          >
            <Building2 className={`w-6 h-6 mb-2 ${role === "clinic" ? "text-[#0D47A1]" : "text-gray-400"}`} />
            <span className={`font-semibold text-sm ${role === "clinic" ? "text-[#0D47A1]" : "text-gray-700"}`}>
              Clinica
            </span>
          </button>
        </div>
      </div>

      <form onSubmit={handleRegister} className="space-y-4 md:space-y-5">
        {/* Nome Completo / Nome Clinica */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            {role === "patient" ? "Nome completo" : "Nome clinica"}
          </label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D47A1] focus:border-transparent transition text-base bg-white"
              placeholder={role === "patient" ? "Mario Rossi" : "Clinica Dentale Roma"}
              required
              autoComplete="name"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D47A1] focus:border-transparent transition text-base bg-white"
              placeholder="nome@email.com"
              required
              autoComplete="email"
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-12 pr-12 py-3.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D47A1] focus:border-transparent transition text-base bg-white"
              placeholder="Minimo 6 caratteri"
              minLength={6}
              required
              autoComplete="new-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
              aria-label={showPassword ? "Nascondi password" : "Mostra password"}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Bottone Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 bg-[#0D47A1] text-white rounded-lg font-bold text-base hover:bg-[#0B3B86] transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#0D47A1]/20 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
              </svg>
              Registrazione in corso...
            </>
          ) : (
            "Registrati"
          )}
        </button>
      </form>

      <p className="mt-6 text-xs text-gray-500 text-center leading-relaxed">
        Registrandoti accetti i{" "}
        <Link href="/termini" className="text-[#0D47A1] hover:underline font-medium">Termini di Servizio</Link>{" "}
        e la{" "}
        <Link href="/privacy" className="text-[#0D47A1] hover:underline font-medium">Privacy Policy</Link>
      </p>
    </div>
  );
}
