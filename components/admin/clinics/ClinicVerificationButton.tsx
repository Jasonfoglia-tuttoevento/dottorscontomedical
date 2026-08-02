"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { BadgeCheck, ShieldOff } from "lucide-react";
import { setClinicVerificationAction } from "@/app/dashboard/admin/clinics/actions";
import { INITIAL_ADMIN_ACTION_STATE } from "@/lib/admin/shared/action-state";

function SubmitButton({ verified }: { verified: boolean }) {
  const { pending } = useFormStatus();
  const Icon = verified ? ShieldOff : BadgeCheck;

  return (
    <button
      type="submit"
      disabled={pending}
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-3 py-2 text-xs font-black transition disabled:cursor-wait disabled:opacity-60 ${
        verified
          ? "border border-slate-200 bg-white text-slate-700 hover:border-rose-300 hover:text-rose-700"
          : "bg-[#0D47A1] text-white hover:bg-[#0B3B86]"
      }`}
    >
      <Icon className="h-4 w-4" />
      {pending ? "Salvataggio..." : verified ? "Revoca" : "Verifica"}
    </button>
  );
}

export default function ClinicVerificationButton({
  clinicId,
  verified,
}: {
  clinicId: string;
  verified: boolean;
}) {
  const [state, formAction] = useActionState(
    setClinicVerificationAction,
    INITIAL_ADMIN_ACTION_STATE,
  );

  return (
    <div className="flex flex-col items-start gap-1.5 sm:items-end">
      <form action={formAction}>
        <input type="hidden" name="clinicId" value={clinicId} />
        <input type="hidden" name="verified" value={String(!verified)} />
        <SubmitButton verified={verified} />
      </form>
      {state.message && (
        <p
          className={`max-w-64 text-left text-[11px] font-semibold sm:text-right ${
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
