import { getUserContext } from "@/lib/auth/get-user-context";
import { getClinicByOwnerId } from "@/lib/data/clinics";

export async function getCurrentClinic() {
  const context = await getUserContext();

  if (context.status !== "authenticated" || context.role !== "clinic") {
    return null;
  }

  const clinic = await getClinicByOwnerId(context.user.id);

  return { user: context.user, profile: context.profile, clinic };
}
