"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { setMatchStatus } from "@/app/dashboard/clinic/leads/actions";

export default function RejectLeadButton({ matchId }: { matchId: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleReject = async () => {
    if (!window.confirm("Confermi il rifiuto di questo lead?")) {
      return;
    }

    setLoading(true);

    try {
      const result = await setMatchStatus(matchId, "rejected");

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
      onClick={handleReject}
      disabled={loading}
      className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-red-600 transition hover:bg-red-50 disabled:cursor-wait disabled:opacity-50"
      title="Rifiuta lead"
      aria-label="Rifiuta lead"
    >
      {loading ? (
        <span className="block h-5 w-5 animate-spin rounded-full border-2 border-red-500 border-t-transparent" />
      ) : (
        <X className="h-5 w-5" />
      )}
    </button>
  );
}
