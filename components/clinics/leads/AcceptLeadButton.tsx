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
    
    const result = await setMatchStatus(matchId, "accepted");

    if (result.ok) {
      router.refresh();
    }
    
    setLoading(false);
  };

  return (
    <button
      onClick={handleAccept}
      disabled={loading}
      className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition disabled:opacity-50"
      title="Accetta lead"
    >
      {loading ? (
        <div className="w-5 h-5 border-2 border-green-600 border-t-transparent rounded-full animate-spin"></div>
      ) : (
        <Check className="w-5 h-5" />
      )}
    </button>
  );
}
