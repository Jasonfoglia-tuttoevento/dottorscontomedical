export interface ProfileSaveState {
  kind: "success" | "error";
  text: string;
}

export default function ProfileSaveMessage({ state }: { state: ProfileSaveState | null }) {
  if (!state) return null;

  return (
    <p
      role="status"
      className={`rounded-xl px-4 py-3 text-sm font-semibold ${
        state.kind === "success"
          ? "border border-emerald-200 bg-emerald-50 text-emerald-800"
          : "border border-rose-200 bg-rose-50 text-rose-800"
      }`}
    >
      {state.text}
    </p>
  );
}
