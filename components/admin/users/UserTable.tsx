import Link from "next/link";
import { Building2, ShieldCheck, UserRound } from "lucide-react";
import UserRoleForm from "@/components/admin/users/UserRoleForm";
import AdminEmptyState from "@/components/admin/shared/AdminEmptyState";
import type { AdminUserListItem } from "@/lib/admin/users/types";

const roleLabels = {
  patient: "Paziente",
  clinic: "Clinica",
  admin: "Admin",
};

const roleClasses = {
  patient: "bg-sky-50 text-sky-700",
  clinic: "bg-emerald-50 text-emerald-700",
  admin: "bg-violet-50 text-violet-700",
};

function RoleBadge({ role }: { role: AdminUserListItem["role"] }) {
  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-black ${roleClasses[role]}`}>
      {roleLabels[role]}
    </span>
  );
}

function ClinicDetails({ user }: { user: AdminUserListItem }) {
  if (!user.clinic) {
    return <span className="text-sm font-semibold text-slate-400">Nessuna clinica collegata</span>;
  }

  return (
    <div>
      <Link
        href={`/cliniche/${user.clinic.id}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 font-black text-slate-900 hover:text-[#0D47A1]"
      >
        <Building2 className="h-4 w-4" />
        {user.clinic.name}
      </Link>
      <p className="mt-1 text-xs font-semibold text-slate-500">
        {user.clinic.city ?? "Città non indicata"} · {user.clinic.verified ? "verificata" : "da verificare"}
      </p>
    </div>
  );
}

export default function UserTable({ users }: { users: AdminUserListItem[] }) {
  if (users.length === 0) {
    return (
      <AdminEmptyState
        icon={UserRound}
        title="Nessun utente trovato"
        description="Cerca tramite UUID esatto oppure usa il nome della clinica collegata."
      />
    );
  }

  return (
    <>
      <div className="space-y-4 md:hidden">
        {users.map((user) => (
          <article key={user.id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div className="flex min-w-0 items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                  {user.role === "admin" ? <ShieldCheck className="h-5 w-5" /> : <UserRound className="h-5 w-5" />}
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-black text-slate-900">
                    {user.isCurrentUser ? "Il tuo account" : "Account piattaforma"}
                  </p>
                  <p className="mt-1 break-all font-mono text-[10px] text-slate-500">{user.id}</p>
                </div>
              </div>
              <RoleBadge role={user.role} />
            </div>

            <div className="mt-4 border-y border-slate-100 py-4">
              <ClinicDetails user={user} />
            </div>

            <div className="mt-4">
              <UserRoleForm userId={user.id} role={user.role} disabled={user.isCurrentUser} />
            </div>
          </article>
        ))}
      </div>

      <div className="hidden overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm md:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] text-left">
            <thead className="bg-slate-50 text-[11px] font-black uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-5 py-4">Utente</th>
                <th className="px-5 py-4">Ruolo</th>
                <th className="px-5 py-4">Clinica collegata</th>
                <th className="px-5 py-4 text-right">Gestione ruolo</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map((user) => (
                <tr key={user.id} className="align-top transition hover:bg-slate-50/70">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                        {user.role === "admin" ? <ShieldCheck className="h-5 w-5" /> : <UserRound className="h-5 w-5" />}
                      </span>
                      <div>
                        <p className="text-xs font-black text-slate-900">
                          {user.isCurrentUser ? "Il tuo account" : "Account piattaforma"}
                        </p>
                        <p className="mt-1 font-mono text-[11px] text-slate-500">{user.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4"><RoleBadge role={user.role} /></td>
                  <td className="px-5 py-4"><ClinicDetails user={user} /></td>
                  <td className="px-5 py-4">
                    <div className="flex justify-end">
                      <UserRoleForm userId={user.id} role={user.role} disabled={user.isCurrentUser} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
