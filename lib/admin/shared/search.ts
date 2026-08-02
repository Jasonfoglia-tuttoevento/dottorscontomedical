export function readSearchParam(
  value: string | string[] | undefined,
): string {
  return typeof value === "string" ? value.trim() : "";
}

export function readPositiveInteger(
  value: string | string[] | undefined,
  fallback = 1,
): number {
  const parsed = Number.parseInt(readSearchParam(value), 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

export function isUuid(value: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    value,
  );
}

export function escapeLikePattern(value: string): string {
  return value
    .replace(/[(),]/g, " ")
    .replace(/[\\%_]/g, "\\$&")
    .trim();
}
