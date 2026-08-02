const LOCAL_SITE_URL = "http://localhost:3001";

function normalizeSiteUrl(value: string): string {
  const withProtocol = /^https?:\/\//i.test(value) ? value : `https://${value}`;
  return withProtocol.replace(/\/$/, "");
}

export function getSiteUrl(): string {
  const configuredUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? process.env.NEXT_PUBLIC_VERCEL_URL;

  return configuredUrl ? normalizeSiteUrl(configuredUrl) : LOCAL_SITE_URL;
}
