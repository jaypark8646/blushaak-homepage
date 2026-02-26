import Link from "next/link";

interface LogoProps {
  variant?: "color" | "white";
  className?: string;
}

export function Logo({ variant = "color", className = "" }: LogoProps) {
  const fillColor = variant === "white" ? "#FFFFFF" : "#1A73B5";
  const textColor = variant === "white" ? "text-white" : "text-blu-500";

  return (
    <Link href="/" className={`flex items-center gap-2 ${className}`}>
      {/* Shark fin / wave SVG logo */}
      <svg
        width="36"
        height="32"
        viewBox="0 0 36 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Shark fin shape */}
        <path
          d="M18 2C18 2 8 14 4 20C2 23 1 25 2 27C3 29 6 30 10 30H30C32 30 34 29 34 27C34 25 32 22 28 18C24 14 18 2 18 2Z"
          fill={fillColor}
          opacity="0.9"
        />
        {/* Wave accent */}
        <path
          d="M2 26C6 24 10 25 14 24C18 23 22 22 26 23C30 24 33 26 34 27"
          stroke={fillColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
          opacity="0.6"
        />
      </svg>
      <span
        className={`font-[family-name:var(--font-dm-sans)] text-lg font-bold tracking-tight ${textColor}`}
      >
        Blu Shaak
        <span className="ml-1 text-sm font-medium tracking-wider">COFFEE</span>
      </span>
    </Link>
  );
}
