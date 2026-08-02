import type { NextConfig } from "next";

const remotePatterns: NonNullable<NextConfig["images"]>["remotePatterns"] = [
  {
    protocol: "https",
    hostname: "images.unsplash.com",
    pathname: "/**",
  },
];

try {
  if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
    const supabaseUrl = new URL(process.env.NEXT_PUBLIC_SUPABASE_URL);
    if (supabaseUrl.protocol === "https:") {
      remotePatterns.push({
        protocol: "https",
        hostname: supabaseUrl.hostname,
        pathname: "/storage/v1/object/public/**",
      });
    }
  }
} catch {
  // Invalid or missing public URL: remote Supabase images remain disabled.
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns,
  },
};

export default nextConfig;
