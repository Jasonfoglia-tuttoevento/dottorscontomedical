import type { MetadataRoute } from "next";
import { brand } from "@/lib/brand";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: brand.name,
    short_name: brand.wordmark,
    description: brand.description,
    start_url: "/",
    display: "standalone",
    background_color: "#F2F4F7",
    theme_color: "#0D47A1",
    icons: [
      {
        src: brand.favicon,
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
