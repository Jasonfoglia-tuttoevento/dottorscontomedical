"use server";

import { revalidatePath } from "next/cache";
import { requireUserRole } from "@/lib/auth/get-user-context";
import { createClient } from "@/lib/supabase/server";
import { isUuid } from "@/lib/admin/shared/search";
import type { AdminActionState } from "@/lib/admin/shared/action-state";

export async function setClinicVerificationAction(
  _previousState: AdminActionState,
  formData: FormData,
): Promise<AdminActionState> {
  await requireUserRole("admin");

  const clinicId = String(formData.get("clinicId") ?? "");
  const verified = String(formData.get("verified") ?? "") === "true";

  if (!isUuid(clinicId)) {
    return { ok: false, message: "Identificativo clinica non valido." };
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("clinics")
    .update({ verified })
    .eq("id", clinicId)
    .select("id")
    .maybeSingle();

  if (error) {
    return { ok: false, message: `Operazione non riuscita: ${error.message}` };
  }

  if (!data) {
    return {
      ok: false,
      message: "Nessuna clinica aggiornata. Verifica le policy RLS amministrative.",
    };
  }

  revalidatePath("/dashboard/admin");
  revalidatePath("/dashboard/admin/clinics");
  revalidatePath("/cliniche");

  return {
    ok: true,
    message: verified ? "Clinica verificata." : "Verifica revocata.",
  };
}
