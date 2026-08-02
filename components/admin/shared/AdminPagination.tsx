import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface AdminPaginationProps {
  pathname: string;
  page: number;
  totalPages: number;
  params: Record<string, string>;
}

function pageHref(
  pathname: string,
  params: Record<string, string>,
  page: number,
): string {
  const search = new URLSearchParams(params);
  if (page <= 1) search.delete("page");
  else search.set("page", String(page));
  const query = search.toString();
  return query ? `${pathname}?${query}` : pathname;
}

export default function AdminPagination({
  pathname,
  page,
  totalPages,
  params,
}: AdminPaginationProps) {
  if (totalPages <= 1) return null;

  const linkClassName =
    "inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-sm font-bold text-slate-700 transition hover:border-[#0D47A1] hover:text-[#0D47A1] sm:px-4";

  return (
    <nav className="grid grid-cols-[1fr_auto_1fr] items-center gap-2" aria-label="Paginazione">
      <div className="flex justify-start">
        {page > 1 && (
          <Link href={pageHref(pathname, params, page - 1)} className={linkClassName} aria-label="Pagina precedente">
            <ChevronLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Precedente</span>
          </Link>
        )}
      </div>

      <p className="whitespace-nowrap text-xs font-bold text-slate-500 sm:text-sm">
        <span className="sm:hidden">{page}/{totalPages}</span>
        <span className="hidden sm:inline">Pagina {page} di {totalPages}</span>
      </p>

      <div className="flex justify-end">
        {page < totalPages && (
          <Link href={pageHref(pathname, params, page + 1)} className={linkClassName} aria-label="Pagina successiva">
            <span className="hidden sm:inline">Successiva</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        )}
      </div>
    </nav>
  );
}
