"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function AcceptLeadButton({ matchId }: { matchId: string }) {
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  const handleAccept = async () => {
    setLoading(true);
    
    const { error } = await supabase
      .from("matches")
      .update({ status: "accepted" })
      .eq("id", matchId);

    if (!error) {
      window.location.reload();
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