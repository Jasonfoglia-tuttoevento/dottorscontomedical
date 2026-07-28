"use server";

import { revalidatePath } from "next/cache";
import { updateCurrentClinicMatchStatus } from "@/lib/data/matches";
import type { MatchStatus } from "@/lib/types/database";

export async function setMatchStatus(
  matchId: string,
  status: Extract<MatchStatus, "accepted" | "rejected">,
) {
  if (!matchId || (status !== "accepted" && status !== "rejected")) {
    return { ok: false, error: "Match non valido." } as const;
  }

  try {
    await updateCurrentClinicMatchStatus(matchId, status);
    revalidatePath("/dashboard/clinic");
    revalidatePath("/dashboard/clinic/leads");
    return { ok: true } as const;
  } catch {
    return { ok: false, error: "Impossibile aggiornare il lead." } as const;
  }
}
