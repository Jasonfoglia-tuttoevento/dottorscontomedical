import { createClient } from "@/lib/supabase/server";

export async function getCurrentClinic() {
  const supabase = await createClient();
  
  // Ottieni utente corrente
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  // Ottieni profilo
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (!profile || profile.role !== "clinic") return null;

  // Ottieni clinica
  const { data: clinic } = await supabase
    .from("clinics")
    .select("*")
    .eq("owner_id", user.id)
    .single();

  return { user, profile, clinic };
}