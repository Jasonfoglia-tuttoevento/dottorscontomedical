import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { brand } from "@/lib/brand";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(brand.siteUrl),
  title: {
    default: `${brand.wordmark} | ${brand.tagline}`,
    template: `%s | ${brand.wordmark}`,
  },
  description: brand.description,
  applicationName: brand.name,
  alternates: { canonical: "/" },
  icons: {
    icon: [
      { url: brand.favicon16, sizes: "16x16", type: "image/png" },
      { url: brand.favicon32, sizes: "32x32", type: "image/png" },
      { url: brand.favicon, sizes: "512x512", type: "image/png" },
    ],
    shortcut: brand.favicon32,
    apple: [{ url: brand.appleTouchIcon, sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: brand.siteUrl,
    siteName: brand.wordmark,
    title: `${brand.wordmark} | ${brand.tagline}`,
    description: brand.description,
    images: [{ url: brand.logoFull, width: 1281, height: 252, alt: brand.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${brand.wordmark} | ${brand.tagline}`,
    description: brand.description,
    images: [brand.logoFull],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
