"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { setMatchStatus } from "@/app/dashboard/clinic/leads/actions";

export default function RejectLeadButton({ matchId }: { matchId: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleReject = async () => {
    if (!confirm("Sei sicuro di voler rifiutare questo lead?")) return;
    
    setLoading(true);
    
    const result = await setMatchStatus(matchId, "rejected");

    if (result.ok) {
      router.refresh();
    }
    
    setLoading(false);
  };

  return (
    <button
      onClick={handleReject}
      disabled={loading}
      className="p-2 text-[#0D47A1] hover:bg-[#E6FAF5] rounded-lg transition disabled:opacity-50"
      title="Rifiuta lead"
    >
      {loading ? (
        <div className="w-5 h-5 border-2 border-[#0D47A1] border-t-transparent rounded-full animate-spin"></div>
      ) : (
        <X className="w-5 h-5" />
      )}
    </button>
  );
}
