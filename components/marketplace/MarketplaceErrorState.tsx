import Link from "next/link";
import { AlertCircle } from "lucide-react";

interface MarketplaceErrorStateProps {
  onRetry?: () => void;
}

export default function MarketplaceErrorState({ onRetry }: MarketplaceErrorStateProps) {
  return (
    <div className="rounded-3xl border border-red-100 bg-white px-6 py-16 text-center">
      <AlertCircle className="mx-auto h-12 w-12 text-red-500" aria-hidden="true" />
      <h2 className="mt-5 text-2xl font-black text-[#0B1D3A]">Marketplace non disponibile</h2>
      <p className="mx-auto mt-3 max-w-lg text-gray-600">
        Non è stato possibile caricare le informazioni. Riprova tra poco.
      </p>
      <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="rounded-xl bg-[#0D47A1] px-6 py-3 font-bold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B39A] focus-visible:ring-offset-2"
          >
            Riprova
          </button>
        )}
        <Link
          href="/"
          className="rounded-xl border border-gray-200 px-6 py-3 font-bold text-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B39A] focus-visible:ring-offset-2"
        >
          Torna alla home
        </Link>
      </div>
    </div>
  );
}
