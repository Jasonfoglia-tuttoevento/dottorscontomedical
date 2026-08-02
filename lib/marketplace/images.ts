const UNSPLASH_HOST = "images.unsplash.com";
const SUPABASE_PUBLIC_STORAGE_PATH = "/storage/v1/object/public/";

function configuredSupabaseHost(): string | null {
  try {
    return process.env.NEXT_PUBLIC_SUPABASE_URL
      ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname
      : null;
  } catch {
    return null;
  }
}

export function safeMarketplaceImageUrl(value: string | null): string | null {
  if (!value) return null;

  try {
    const url = new URL(value);
    if (url.protocol !== "https:") return null;

    if (url.hostname === UNSPLASH_HOST) {
      return url.toString();
    }

    const supabaseHost = configuredSupabaseHost();
    if (
      supabaseHost &&
      url.hostname === supabaseHost &&
      url.pathname.startsWith(SUPABASE_PUBLIC_STORAGE_PATH)
    ) {
      return url.toString();
    }
  } catch {
    return null;
  }

  return null;
}
