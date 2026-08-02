"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";
import { setMatchStatus } from "@/app/dashboard/clinic/leads/actions";

export default function AcceptLeadButton({ matchId }: { matchId: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleAccept = async () => {
    setLoading(true);

    try {
      const result = await setMatchStatus(matchId, "accepted");

      if (!result.ok) {
        window.alert(result.error);
        return;
      }

      router.refresh();
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleAccept}
      disabled={loading}
      className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-emerald-700 transition hover:bg-emerald-50 disabled:cursor-wait disabled:opacity-50"
      title="Accetta lead"
      aria-label="Accetta lead"
    >
      {loading ? (
        <span className="block h-5 w-5 animate-spin rounded-full border-2 border-emerald-600 border-t-transparent" />
      ) : (
        <Check className="h-5 w-5" />
      )}
    </button>
  );
}
