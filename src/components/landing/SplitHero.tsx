"use client";

import { useRouter } from "next/navigation";
import { useState, useCallback } from "react";
import { motion } from "framer-motion";

/* ------------------------------------------------------------------ */
/*  Blu Shaak Logo -- Stylised shark-fin / wave SVG                   */
/* ------------------------------------------------------------------ */
function BluShaakLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Blu Shaak Coffee logo"
    >
      <defs>
        <linearGradient id="fin-grad" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#2E9CDF" />
          <stop offset="50%" stopColor="#1A73B5" />
          <stop offset="100%" stopColor="#104773" />
        </linearGradient>
        <linearGradient id="wave-grad" x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="#3DCBA8" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#1A73B5" stopOpacity="0.8" />
        </linearGradient>
      </defs>

      {/* Shark fin */}
      <path
        d="M60 8 C60 8, 62 28, 68 48 C72 60, 78 68, 88 74 C78 74, 68 73, 60 72 C52 73, 42 74, 32 74 C42 68, 48 60, 52 48 C58 28, 60 8, 60 8Z"
        fill="url(#fin-grad)"
      />

      {/* Specular highlight on fin */}
      <path
        d="M60 14 C60 14, 58 30, 55 46 C54 52, 52 56, 48 62 C50 58, 54 46, 56 34 C58 24, 60 14, 60 14Z"
        fill="white"
        opacity="0.18"
      />

      {/* Wave line */}
      <path
        d="M10 74 C20 68, 30 74, 40 72 C50 70, 55 72, 60 72 C65 72, 70 70, 80 72 C90 74, 100 68, 110 74"
        stroke="url(#wave-grad)"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />

      {/* Second wave -- thinner, offset */}
      <path
        d="M14 80 C24 76, 32 80, 42 78 C52 76, 58 78, 64 78 C70 78, 78 76, 86 78 C94 80, 102 76, 108 80"
        stroke="url(#wave-grad)"
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
        opacity="0.5"
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Hover state type                                                   */
/* ------------------------------------------------------------------ */
type HoverSide = "brand" | "franchise" | null;

/* ------------------------------------------------------------------ */
/*  Motion variants                                                    */
/* ------------------------------------------------------------------ */
const logoVariants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: "easeOut" as const },
  },
};

const leftVariants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: "easeOut" as const, delay: 0.5 },
  },
};

const rightVariants = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: "easeOut" as const, delay: 0.5 },
  },
};

/* Mobile variants -- slide from top / bottom */
const topVariants = {
  hidden: { opacity: 0, y: -40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" as const, delay: 0.5 },
  },
};

const bottomVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" as const, delay: 0.5 },
  },
};

/* ------------------------------------------------------------------ */
/*  SplitHero Component                                                */
/* ------------------------------------------------------------------ */
export default function SplitHero() {
  const router = useRouter();
  const [hovered, setHovered] = useState<HoverSide>(null);

  const handleNavigate = useCallback(
    (path: string) => {
      router.push(path);
    },
    [router],
  );

  /* ---------- width helpers (desktop) ---------- */
  const leftWidth =
    hovered === "brand" ? "60%" : hovered === "franchise" ? "40%" : "50%";
  const rightWidth =
    hovered === "franchise" ? "60%" : hovered === "brand" ? "40%" : "50%";

  return (
    <section className="relative h-dvh w-full overflow-hidden bg-white">
      {/* ====== DESKTOP layout (md+) ====== */}
      <div className="hidden md:flex h-full w-full">
        {/* --- Left: BRAND --- */}
        <motion.div
          className="relative flex cursor-pointer items-center justify-center overflow-hidden"
          style={{
            width: leftWidth,
            transition: "width 500ms ease-out, background 500ms ease-out",
            background:
              hovered === "brand"
                ? "linear-gradient(135deg, rgba(26,115,181,0.04) 0%, rgba(26,115,181,0.08) 100%)"
                : "transparent",
          }}
          variants={leftVariants}
          initial="hidden"
          animate="visible"
          onMouseEnter={() => setHovered("brand")}
          onMouseLeave={() => setHovered(null)}
          onClick={() => handleNavigate("/brand")}
          role="link"
          tabIndex={0}
          aria-label="브랜드 소개 페이지로 이동"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") handleNavigate("/brand");
          }}
        >
          {/* Nudge text slightly left so it never overlaps the center logo */}
          <div className="flex flex-col items-center gap-3 select-none pr-8 lg:pr-12">
            <span
              className="text-4xl font-bold tracking-[0.18em] text-dark-800 lg:text-5xl xl:text-6xl"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              BRAND
            </span>
            <span
              className="text-base tracking-widest text-dark-800/50 lg:text-lg"
              style={{ fontFamily: "var(--font-pretendard)" }}
            >
              브랜드
            </span>
          </div>
        </motion.div>

        {/* --- Right: FRANCHISE --- */}
        <motion.div
          className="relative flex cursor-pointer items-center justify-center overflow-hidden"
          style={{
            width: rightWidth,
            transition: "width 500ms ease-out, background 500ms ease-out",
            background:
              hovered === "franchise"
                ? "linear-gradient(225deg, rgba(251,246,239,0.7) 0%, rgba(254,252,249,0.9) 100%)"
                : "transparent",
          }}
          variants={rightVariants}
          initial="hidden"
          animate="visible"
          onMouseEnter={() => setHovered("franchise")}
          onMouseLeave={() => setHovered(null)}
          onClick={() => handleNavigate("/franchise")}
          role="link"
          tabIndex={0}
          aria-label="프랜차이즈 페이지로 이동"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ")
              handleNavigate("/franchise");
          }}
        >
          {/* Nudge text slightly right so it never overlaps the center logo */}
          <div className="flex flex-col items-center gap-3 select-none pl-8 lg:pl-12">
            <span
              className="text-4xl font-bold tracking-[0.18em] text-dark-800 lg:text-5xl xl:text-6xl"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              FRANCHISE
            </span>
            <span
              className="text-base tracking-widest text-dark-800/50 lg:text-lg"
              style={{ fontFamily: "var(--font-pretendard)" }}
            >
              프랜차이즈
            </span>
          </div>
        </motion.div>

        {/* --- Center divider + logo (desktop) --- */}
        <motion.div
          className="pointer-events-none absolute inset-y-0 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center justify-center"
          variants={logoVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Thin vertical line */}
          <div className="absolute inset-y-0 w-px bg-gradient-to-b from-transparent via-blu-200/60 to-transparent" />

          {/* Logo cluster -- no opaque background so it never clips side labels */}
          <div className="relative flex flex-col items-center gap-2 py-5">
            <BluShaakLogo className="h-16 w-16 drop-shadow-sm lg:h-20 lg:w-20" />
            <span
              className="whitespace-nowrap text-xs font-semibold tracking-[0.22em] text-blu-500 lg:text-sm"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              Blu Shaak COFFEE
            </span>
          </div>
        </motion.div>
      </div>

      {/* ====== MOBILE layout (below md) ====== */}
      <div className="flex md:hidden h-full w-full flex-col">
        {/* Top: BRAND */}
        <motion.div
          className="relative flex h-1/2 cursor-pointer items-center justify-center"
          style={{
            background:
              "linear-gradient(180deg, rgba(26,115,181,0.03) 0%, transparent 100%)",
          }}
          variants={topVariants}
          initial="hidden"
          animate="visible"
          onClick={() => handleNavigate("/brand")}
          role="link"
          tabIndex={0}
          aria-label="브랜드 소개 페이지로 이동"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") handleNavigate("/brand");
          }}
        >
          <div className="flex flex-col items-center gap-2 select-none pb-10">
            <span
              className="text-3xl font-bold tracking-[0.18em] text-dark-800 sm:text-4xl"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              BRAND
            </span>
            <span
              className="text-sm tracking-widest text-dark-800/50"
              style={{ fontFamily: "var(--font-pretendard)" }}
            >
              브랜드
            </span>
          </div>
        </motion.div>

        {/* Bottom: FRANCHISE */}
        <motion.div
          className="relative flex h-1/2 cursor-pointer items-center justify-center"
          style={{
            background:
              "linear-gradient(0deg, rgba(251,246,239,0.5) 0%, transparent 100%)",
          }}
          variants={bottomVariants}
          initial="hidden"
          animate="visible"
          onClick={() => handleNavigate("/franchise")}
          role="link"
          tabIndex={0}
          aria-label="프랜차이즈 페이지로 이동"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ")
              handleNavigate("/franchise");
          }}
        >
          <div className="flex flex-col items-center gap-2 select-none pt-10">
            <span
              className="text-3xl font-bold tracking-[0.18em] text-dark-800 sm:text-4xl"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              FRANCHISE
            </span>
            <span
              className="text-sm tracking-widest text-dark-800/50"
              style={{ fontFamily: "var(--font-pretendard)" }}
            >
              프랜차이즈
            </span>
          </div>
        </motion.div>

        {/* Center logo (mobile -- positioned at boundary) */}
        <motion.div
          className="pointer-events-none absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
          variants={logoVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Horizontal divider */}
          <div className="absolute left-1/2 top-1/2 h-px w-[60vw] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-blu-200/50 to-transparent" />

          <div className="relative flex flex-col items-center gap-2 rounded-2xl bg-white/90 px-5 py-4 backdrop-blur-sm shadow-sm">
            <BluShaakLogo className="h-14 w-14 drop-shadow-sm" />
            <span
              className="whitespace-nowrap text-xs font-semibold tracking-[0.22em] text-blu-500"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              Blu Shaak COFFEE
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
