import { redirect } from "next/navigation";
import { getUserContext } from "@/lib/auth/get-user-context";
import { dashboardPathForRole } from "@/lib/auth/roles";

export default async function DashboardDispatcherPage() {
  const context = await getUserContext();

  if (context.status === "anonymous") {
    redirect("/login");
  }

  if (context.status !== "authenticated") {
    redirect("/account/access-required");
  }

  const dashboardPath = dashboardPathForRole(context.role);

  if (!dashboardPath) {
    redirect("/account/access-required");
  }

  redirect(dashboardPath);
}
