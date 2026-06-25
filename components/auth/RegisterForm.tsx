"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, User, Building2 } from "lucide-react";

export default function RegisterForm() {
  const [role, setRole] = useState<"patient" | "clinic">("patient");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          role: role,
        },
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push("/auth/confirm");
      router.refresh();
    }
  };

  return (
    <div>
      {/* Header form */}
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-black text-gray-900 mb-2">
          Crea il tuo account
        </h1>
        <p className="text-sm md:text-base text-gray-500">
          Hai già un account?{" "}
          <Link href="/login" className="text-red-600 font-semibold hover:text-red-700 transition">
            Accedi
          </Link>
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* Role Selection */}
      <div className="mb-5 md:mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Sei un paziente o una clinica?
        </label>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setRole("patient")}
            className={`p-4 border-2 rounded-xl transition-all ${
              role === "patient"
                ? "border-red-600 bg-red-50 shadow-md"
                : "border-gray-200 hover:border-gray-300 bg-white"
            }`}
          >
            <User className={`w-6 h-6 mx-auto mb-2 ${role === "patient" ? "text-red-600" : "text-gray-400"}`} />
            <div className={`font-semibold text-sm ${role === "patient" ? "text-red-600" : "text-gray-700"}`}>
              Paziente
            </div>
          </button>
          <button
            type="button"
            onClick={() => setRole("clinic")}
            className={`p-4 border-2 rounded-xl transition-all ${
              role === "clinic"
                ? "border-red-600 bg-red-50 shadow-md"
                : "border-gray-200 hover:border-gray-300 bg-white"
            }`}
          >
            <Building2 className={`w-6 h-6 mx-auto mb-2 ${role === "clinic" ? "text-red-600" : "text-gray-400"}`} />
            <div className={`font-semibold text-sm ${role === "clinic" ? "text-red-600" : "text-gray-700"}`}>
              Clinica
            </div>
          </button>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleRegister} className="space-y-4 md:space-y-5">
        {/* Nome */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            {role === "patient" ? "Nome completo" : "Nome clinica"}
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition text-base"
              placeholder={role === "patient" ? "Mario Rossi" : "Clinica Dentale Roma"}
              required
              autoComplete="name"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition text-base"
              placeholder="nome@email.com"
              required
              autoComplete="email"
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition text-base"
              placeholder="Minimo 6 caratteri"
              minLength={6}
              required
              autoComplete="new-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              aria-label={showPassword ? "Nascondi password" : "Mostra password"}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 bg-red-600 text-white rounded-lg font-bold text-base hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-red-600/20"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
              </svg>
              Registrazione in corso...
            </span>
          ) : (
            "Registrati"
          )}
        </button>
      </form>

      {/* Footer */}
      <p className="mt-6 text-xs text-gray-500 text-center leading-relaxed">
        Registrandoti accetti i{" "}
        <Link href="/termini" className="text-red-600 hover:underline font-medium">
          Termini di Servizio
        </Link>{" "}
        e la{" "}
        <Link href="/privacy" className="text-red-600 hover:underline font-medium">
          Privacy Policy
        </Link>
      </p>
    </div>
  );
}