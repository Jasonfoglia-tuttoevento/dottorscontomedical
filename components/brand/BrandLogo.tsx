import Image from "next/image";
import { brand } from "@/lib/brand";

interface BrandLogoProps {
  className?: string;
  iconClassName?: string;
  textClassName?: string;
  theme?: "light" | "dark";
  priority?: boolean;
  compact?: boolean;
}

export default function BrandLogo({
  className = "",
  iconClassName = "h-10 w-10",
  textClassName = "text-xl",
  theme = "light",
  priority = false,
  compact = false,
}: BrandLogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`} aria-label={brand.name}>
      <Image
        src={brand.logoCompact}
        alt=""
        width={512}
        height={512}
        className={`shrink-0 object-contain ${iconClassName}`}
        priority={priority}
      />
      {!compact && (
        <span className={`whitespace-nowrap font-black tracking-[-0.045em] ${textClassName}`}>
          <span className={theme === "dark" ? "text-white" : "text-[#0D47A1]"}>FACILE</span>
          <span className="text-[#00A98F]">MEDICAL</span>
          <span className={theme === "dark" ? "text-cyan-100" : "text-[#0D47A1]"}>.IT</span>
        </span>
      )}
    </span>
  );
}
