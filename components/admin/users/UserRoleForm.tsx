"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Save } from "lucide-react";
import { changeUserRoleAction } from "@/app/dashboard/admin/users/actions";
import { INITIAL_ADMIN_ACTION_STATE } from "@/lib/admin/shared/action-state";
import type { UserRole } from "@/lib/auth/roles";

function SaveButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-xl bg-slate-950 px-3 text-xs font-black text-white transition hover:bg-[#0D47A1] disabled:cursor-wait disabled:opacity-60"
    >
      <Save className="h-3.5 w-3.5" />
      {pending ? "Salvo..." : "Salva"}
    </button>
  );
}

export default function UserRoleForm({
  userId,
  role,
  disabled,
}: {
  userId: string;
  role: UserRole;
  disabled: boolean;
}) {
  const [state, formAction] = useActionState(
    changeUserRoleAction,
    INITIAL_ADMIN_ACTION_STATE,
  );

  if (disabled) {
    return (
      <span className="inline-flex min-h-10 items-center rounded-full bg-blue-50 px-3 py-1.5 text-xs font-black text-[#0D47A1]">
        Account corrente
      </span>
    );
  }

  return (
    <div className="flex w-full flex-col items-start gap-1.5 sm:items-end">
      <form action={formAction} className="grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-2 sm:w-auto">
        <input type="hidden" name="userId" value={userId} />
        <select
          name="role"
          defaultValue={role}
          aria-label="Ruolo utente"
          className="h-11 min-w-0 rounded-xl border border-slate-200 bg-white px-2 text-xs font-black text-slate-700 outline-none focus:border-[#0D47A1]"
        >
          <option value="patient">Paziente</option>
          <option value="clinic">Clinica</option>
          <option value="admin">Admin</option>
        </select>
        <SaveButton />
      </form>
      {state.message && (
        <p
          className={`max-w-72 text-left text-[11px] font-semibold sm:text-right ${
            state.ok ? "text-emerald-700" : "text-rose-700"
          }`}
          role="status"
        >
          {state.message}
        </p>
      )}
    </div>
  );
}
