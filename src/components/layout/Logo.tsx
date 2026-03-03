import Link from "next/link";
import Image from "next/image";

interface LogoProps {
  variant?: "color" | "white";
  className?: string;
}

export function Logo({ variant = "color", className = "" }: LogoProps) {
  const src =
    variant === "white"
      ? "/images/logo/logo-full-white.png"
      : "/images/logo/logo-full.png";

  return (
    <Link href="/" className={`flex items-center ${className}`}>
      <Image
        src={src}
        alt="Blu Shaak Coffee"
        width={140}
        height={96}
        className="h-10 w-auto"
        priority
      />
    </Link>
  );
}
