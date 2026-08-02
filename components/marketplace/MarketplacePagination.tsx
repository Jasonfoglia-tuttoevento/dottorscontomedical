import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  marketplaceHref,
  type ParsedMarketplaceParams,
} from "@/lib/marketplace/search-params";

interface MarketplacePaginationProps {
  params: ParsedMarketplaceParams;
  totalPages: number;
}

export default function MarketplacePagination({
  params,
  totalPages,
}: MarketplacePaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <nav className="mt-10 flex items-center justify-between gap-4" aria-label="Paginazione cliniche">
      {params.page > 1 ? (
        <Link
          href={marketplaceHref(params, { page: params.page - 1 })}
          className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 font-bold text-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B39A]"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          Precedente
        </Link>
      ) : <span />}

      <span className="text-sm font-semibold text-gray-600">
        Pagina {params.page} di {totalPages}
      </span>

      {params.page < totalPages ? (
        <Link
          href={marketplaceHref(params, { page: params.page + 1 })}
          className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 font-bold text-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B39A]"
        >
          Successiva
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      ) : <span />}
    </nav>
  );
}
