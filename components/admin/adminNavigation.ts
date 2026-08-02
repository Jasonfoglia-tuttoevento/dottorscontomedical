import { Activity, Building2, LayoutDashboard, Sparkles, Users } from "lucide-react";

export const adminNavigation = [
  { label: "Panoramica", href: "/dashboard/admin", icon: LayoutDashboard },
  { label: "Cliniche", href: "/dashboard/admin/clinics", icon: Building2 },
  { label: "Utenti", href: "/dashboard/admin/users", icon: Users },
  { label: "Attività", href: "/dashboard/admin/activity", icon: Activity },
  { label: "Piani", href: "/dashboard/admin/plans", icon: Sparkles },
] as const;

export function isAdminPathActive(pathname: string, href: string): boolean {
  return href === "/dashboard/admin"
    ? pathname === href
    : pathname === href || pathname.startsWith(`${href}/`);
}
