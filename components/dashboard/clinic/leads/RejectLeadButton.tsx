"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function RejectLeadButton({ matchId }: { matchId: string }) {
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  const handleReject = async () => {
    if (!confirm("Sei sicuro di voler rifiutare questo lead?")) return;
    
    setLoading(true);
    
    const { error } = await supabase
      .from("matches")
      .update({ status: "rejected" })
      .eq("id", matchId);

    if (!error) {
      window.location.reload();
    }
    
    setLoading(false);
  };

  return (
    <button
      onClick={handleReject}
      disabled={loading}
      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition disabled:opacity-50"
      title="Rifiuta lead"
    >
      {loading ? (
        <div className="w-5 h-5 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
      ) : (
        <X className="w-5 h-5" />
      )}
    </button>
  );
}