"use server";

import { revalidatePath } from "next/cache";
import { requireUserRole } from "@/lib/auth/get-user-context";
import { isUserRole } from "@/lib/auth/roles";
import { createClient } from "@/lib/supabase/server";
import { isUuid } from "@/lib/admin/shared/search";
import type { AdminActionState } from "@/lib/admin/shared/action-state";

export async function changeUserRoleAction(
  _previousState: AdminActionState,
  formData: FormData,
): Promise<AdminActionState> {
  const context = await requireUserRole("admin");
  const userId = String(formData.get("userId") ?? "");
  const nextRole = String(formData.get("role") ?? "");

  if (!isUuid(userId) || !isUserRole(nextRole)) {
    return { ok: false, message: "Utente o ruolo non valido." };
  }

  if (userId === context.user.id) {
    return { ok: false, message: "Non puoi modificare il tuo ruolo amministratore." };
  }

  const supabase = await createClient();
  const { data: currentProfile, error: profileError } = await supabase
    .from("profiles")
    .select("id, role")
    .eq("id", userId)
    .maybeSingle();

  if (profileError || !currentProfile || !isUserRole(currentProfile.role)) {
    return { ok: false, message: "Profilo utente non disponibile." };
  }

  const { data: clinic } = await supabase
    .from("clinics")
    .select("id")
    .eq("owner_id", userId)
    .maybeSingle();

  if (nextRole === "clinic" && !clinic) {
    return {
      ok: false,
      message: "Prima di assegnare il ruolo clinica deve esistere la struttura collegata.",
    };
  }

  if (currentProfile.role === "clinic" && nextRole !== "clinic" && clinic) {
    return {
      ok: false,
      message: "Il ruolo non può cambiare finché la clinica collegata è presente.",
    };
  }

  if (currentProfile.role === "admin" && nextRole !== "admin") {
    const { count, error: countError } = await supabase
      .from("profiles")
      .select("id", { count: "exact", head: true })
      .eq("role", "admin");

    if (countError || (count ?? 0) <= 1) {
      return { ok: false, message: "Deve rimanere almeno un amministratore." };
    }
  }

  const { data, error } = await supabase
    .from("profiles")
    .update({ role: nextRole })
    .eq("id", userId)
    .select("id")
    .maybeSingle();

  if (error) {
    return { ok: false, message: `Operazione non riuscita: ${error.message}` };
  }

  if (!data) {
    return {
      ok: false,
      message: "Nessun profilo aggiornato. Verifica le policy RLS amministrative.",
    };
  }

  revalidatePath("/dashboard/admin");
  revalidatePath("/dashboard/admin/users");
  return { ok: true, message: "Ruolo aggiornato correttamente." };
}
