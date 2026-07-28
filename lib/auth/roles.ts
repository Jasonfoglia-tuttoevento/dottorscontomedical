export const USER_ROLES = ["patient", "clinic", "admin"] as const;

export type UserRole = (typeof USER_ROLES)[number];

export function isUserRole(value: unknown): value is UserRole {
  return typeof value === "string" && USER_ROLES.includes(value as UserRole);
}

export function dashboardPathForRole(role: UserRole): string | null {
  switch (role) {
    case "patient":
      return "/dashboard/patient";
    case "clinic":
      return "/dashboard/clinic";
    case "admin":
      return null;
  }
}
