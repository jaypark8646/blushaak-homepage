"use client";

import { motion } from "framer-motion";
import { FRANCHISE_STRENGTHS } from "@/lib/franchiseData";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.75,
    },
  },
};

const cardItem = {
  hidden: { opacity: 0, y: 36, scale: 0.92 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: "easeOut" as const },
  },
};

export default function FranchiseIntro() {
  return (
    <section
      data-header-theme="dark"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(160deg, #4495D1 0%, #2367A6 45%, #0D4E8B 100%)",
        }}
      />

      {/* Subtle pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Animated glow orb */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.08, 0.14, 0.08] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, #4495D1 0%, transparent 70%)" }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center pt-24 pb-32">

        {/* ── Headline ── */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-bold text-white leading-snug tracking-tight">
          {/* Line 1: slides in from left */}
          <motion.span
            className="block"
            initial={{ opacity: 0, x: -32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, delay: 0.1, ease: "easeOut" }}
          >
            프랜차이즈 카페의 한계,
          </motion.span>

          {/* Line 2: slides in from right */}
          <motion.span
            className="block"
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, delay: 0.3, ease: "easeOut" }}
          >
            {/* "블루샥" — periodic shimmer glow */}
            <motion.span
              className="text-blu-300 font-extrabold inline-block"
              animate={{
                textShadow: [
                  "0 0 0px transparent",
                  "0 0 18px rgba(68,149,209,0.8)",
                  "0 0 0px transparent",
                ],
              }}
              transition={{ duration: 2.2, delay: 1.4, repeat: Infinity, repeatDelay: 3.5 }}
            >
              블루샥
            </motion.span>
            이 그 경계를 허뭅니다.
          </motion.span>
        </h1>

        {/* ── Sub copy ── */}
        <div className="mt-8 space-y-2">
          {/* "품질" & "시스템" — brief scale-pop highlight on appear */}
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="text-base sm:text-lg text-white/70 leading-relaxed"
          >
            프랜차이즈는{" "}
            <motion.span
              className="font-bold text-white/90 inline-block"
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.25, 1] }}
              transition={{ duration: 0.45, delay: 1.1 }}
            >
              품질
            </motion.span>
            이 아쉽고, 개인 카페는{" "}
            <motion.span
              className="font-bold text-white/90 inline-block"
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.25, 1] }}
              transition={{ duration: 0.45, delay: 1.35 }}
            >
              시스템
            </motion.span>
            이 불안하다?
          </motion.p>

          {/* Solution line — scale-up from 0.9 + fade */}
          <motion.p
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.65, delay: 0.75, ease: "easeOut" }}
            className="text-base sm:text-lg text-white/70 leading-relaxed"
          >
            블루샥은 이 두 가지 난제를{" "}
            <motion.span
              className="font-semibold text-white inline-block"
              animate={{ opacity: [1, 0.65, 1] }}
              transition={{ duration: 2, delay: 1.8, repeat: Infinity, repeatDelay: 2.5 }}
            >
              완벽하게 해결
            </motion.span>
            합니다.
          </motion.p>
        </div>

        {/* ── Description — blur-to-clear ── */}
        <motion.div
          initial={{ opacity: 0, filter: "blur(6px)", y: 10 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          transition={{ duration: 0.9, delay: 1.0 }}
          className="mt-6"
        >
          <p className="text-sm sm:text-base text-white/50 leading-relaxed max-w-2xl mx-auto">
            체계적인 가맹 시스템 위에 개인 스페셜티 카페 이상의 원재료 품질을 담아낸
            블루샥만의 새로운 기준을 경험해 보세요.
          </p>
        </motion.div>

        {/* ── 6 Strength cards ── */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="mt-16 sm:mt-20 grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-6"
        >
          {FRANCHISE_STRENGTHS.map((strength) => (
            <motion.div
              key={strength.number}
              variants={cardItem}
              whileHover={{ scale: 1.06, y: -6 }}
              transition={{ type: "spring", stiffness: 280, damping: 18 }}
              className="flex flex-col items-center cursor-default"
            >
              {/* Circle — glow on hover */}
              <motion.div
                whileHover={{
                  borderColor: "rgba(255,255,255,0.75)",
                  backgroundColor: "rgba(255,255,255,0.14)",
                  boxShadow: "0 0 22px rgba(68,149,209,0.65)",
                }}
                className="w-20 h-20 sm:w-[88px] sm:h-[88px] rounded-full border-2 border-white/30 bg-white/5 backdrop-blur-sm flex items-center justify-center mb-4 transition-all duration-300"
              >
                <span className="text-2xl sm:text-3xl font-bold text-white font-[family-name:var(--font-dm-sans)]">
                  {strength.number}
                </span>
              </motion.div>

              {/* Title */}
              <h3 className="text-white font-semibold text-base sm:text-lg mb-1.5">
                {strength.title}
              </h3>

              {/* Description */}
              <p className="text-white/50 text-xs sm:text-sm leading-relaxed max-w-[200px]">
                {strength.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
