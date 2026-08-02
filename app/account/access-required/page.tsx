import Link from "next/link";
import { redirect } from "next/navigation";
import { getUserContext } from "@/lib/auth/get-user-context";
import { dashboardPathForRole } from "@/lib/auth/roles";
import BrandLogo from "@/components/brand/BrandLogo";
import { brand } from "@/lib/brand";

export default async function AccessRequiredPage() {
  const context = await getUserContext();

  if (context.status === "anonymous") {
    redirect("/login");
  }

  if (context.status === "authenticated") {
    const dashboardPath = dashboardPathForRole(context.role);
    if (dashboardPath) {
      redirect(dashboardPath);
    }
  }

  const isAdminPending =
    context.status === "authenticated" && context.role === "admin";
  const isProfileUnavailable = context.status === "profile-unavailable";

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="mx-auto max-w-xl rounded-3xl border border-gray-100 bg-white p-8 text-center shadow-xl md:p-12">
        <Link href="/" className="inline-block">
          <BrandLogo iconClassName="h-11 w-11" textClassName="text-xl sm:text-2xl" priority />
        </Link>

        <h1 className="mt-10 text-3xl font-black text-[#0B1D3A]">
          {isAdminPending
            ? "Area amministrativa non ancora disponibile"
            : isProfileUnavailable
              ? "Profilo temporaneamente non disponibile"
              : "Profilo da completare"}
        </h1>
        <p className="mt-4 leading-relaxed text-gray-600">
          {isAdminPending
            ? "Il tuo ruolo amministrativo è valido, ma la dashboard admin non è ancora attiva."
            : isProfileUnavailable
              ? "Non è stato possibile verificare il tuo profilo applicativo. Riprova più tardi o contatta il supporto se il problema continua."
              : "Il tuo account è autenticato, ma non dispone ancora di un profilo applicativo con un ruolo valido. Contatta il supporto prima di accedere alla dashboard."}
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <a
            href={`mailto:${brand.supportEmail}`}
            className="rounded-xl bg-[#0D47A1] px-6 py-3 font-bold text-white transition hover:bg-[#0B3B86]"
          >
            Contatta il supporto
          </a>
          <form action="/auth/signout" method="POST">
            <button
              type="submit"
              className="w-full rounded-xl border border-gray-200 px-6 py-3 font-bold text-gray-700 transition hover:bg-gray-50"
            >
              Esci
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
