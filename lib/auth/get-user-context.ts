import "server-only";

import type { User } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isUserRole, type UserRole } from "@/lib/auth/roles";

interface ProfileRecord {
  id: string;
  role: unknown;
}

export type UserContext =
  | { status: "anonymous"; user: null; profile: null; role: null }
  | { status: "profile-unavailable"; user: User; profile: null; role: null }
  | { status: "missing-profile"; user: User; profile: null; role: null }
  | { status: "invalid-role"; user: User; profile: ProfileRecord; role: null }
  | { status: "authenticated"; user: User; profile: ProfileRecord; role: UserRole };

export async function getUserContext(): Promise<UserContext> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { status: "anonymous", user: null, profile: null, role: null };
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("id, role")
    .eq("id", user.id)
    .maybeSingle<ProfileRecord>();

  if (profileError) {
    return { status: "profile-unavailable", user, profile: null, role: null };
  }

  if (!profile) {
    return { status: "missing-profile", user, profile: null, role: null };
  }

  if (!isUserRole(profile.role)) {
    return { status: "invalid-role", user, profile, role: null };
  }

  return { status: "authenticated", user, profile, role: profile.role };
}

export async function requireUserRole(
  expectedRole: UserRole,
) {
  const context = await getUserContext();

  if (context.status === "anonymous") {
    redirect("/login");
  }

  if (context.status !== "authenticated") {
    redirect("/account/access-required");
  }

  if (context.role !== expectedRole) {
    redirect("/dashboard");
  }

  return context;
}
