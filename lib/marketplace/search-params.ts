import {
  MARKETPLACE_SORTS,
  type ClinicFilters,
  type MarketplaceSort,
} from "@/lib/data/clinics";

export interface MarketplaceSearchParams {
  q?: string | string[];
  cat?: string | string[];
  city?: string | string[];
  verified?: string | string[];
  sort?: string | string[];
  page?: string | string[];
}

export interface ParsedMarketplaceParams extends ClinicFilters {
  category: string;
  city: string;
  searchQuery: string;
  verified: boolean;
  sort: MarketplaceSort;
  page: number;
}

function first(value: string | string[] | undefined): string {
  return Array.isArray(value) ? (value[0] ?? "") : (value ?? "");
}

function normalizeText(value: string, maxLength = 100): string {
  return value.trim().replace(/[%,()]/g, " ").replace(/\s+/g, " ").slice(0, maxLength);
}

export function parseMarketplaceParams(
  params: MarketplaceSearchParams,
): ParsedMarketplaceParams {
  const requestedSort = first(params.sort);
  const sort = MARKETPLACE_SORTS.includes(requestedSort as MarketplaceSort)
    ? (requestedSort as MarketplaceSort)
    : "newest";
  const requestedPage = Number.parseInt(first(params.page), 10);

  return {
    category: normalizeText(first(params.cat), 80),
    city: normalizeText(first(params.city), 80),
    searchQuery: normalizeText(first(params.q), 120),
    verified: first(params.verified) === "true",
    sort,
    page: Number.isSafeInteger(requestedPage) && requestedPage > 0
      ? Math.min(requestedPage, 10_000)
      : 1,
  };
}

export function marketplaceHref(
  params: ParsedMarketplaceParams,
  overrides: Partial<ParsedMarketplaceParams> = {},
): string {
  const next = { ...params, ...overrides };
  const query = new URLSearchParams();

  if (next.searchQuery) query.set("q", next.searchQuery);
  if (next.category) query.set("cat", next.category);
  if (next.city) query.set("city", next.city);
  if (next.verified) query.set("verified", "true");
  if (next.sort !== "newest") query.set("sort", next.sort);
  if (next.page > 1) query.set("page", String(next.page));

  const serialized = query.toString();
  return serialized ? `/cliniche?${serialized}` : "/cliniche";
}
