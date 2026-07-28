import { createClient } from "@/lib/supabase/server";
import { getUserContext } from "@/lib/auth/get-user-context";

export async function getCurrentClinic() {
  const context = await getUserContext();

  if (context.status !== "authenticated" || context.role !== "clinic") {
    return null;
  }

  const supabase = await createClient();

  // Ottieni clinica
  const { data: clinic } = await supabase
    .from("clinics")
    .select("*")
    .eq("owner_id", context.user.id)
    .single();

  return { user: context.user, profile: context.profile, clinic };
}
