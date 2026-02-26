"use client";

import { motion } from "framer-motion";
import { FRANCHISE_STRENGTHS } from "@/lib/franchiseData";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.6,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export default function FranchiseIntro() {
  return (
    <section data-header-theme="dark" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(160deg, #061B31 0%, #0B3152 30%, #104773 60%, #155D94 100%)",
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

      {/* Glow effect */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-10"
        style={{
          background:
            "radial-gradient(circle, #1A73B5 0%, transparent 70%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center pt-24 pb-32">
        {/* Main copy */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-bold text-white leading-snug tracking-tight">
            프랜차이즈 카페의 한계,
            <br />
            <span className="text-blu-300 font-extrabold">블루샥</span>이 그
            경계를 이끕니다.
          </h1>
        </motion.div>

        {/* Sub copy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="mt-8 space-y-2"
        >
          <p className="text-base sm:text-lg text-white/70 leading-relaxed">
            프랜차이즈는 <span className="font-bold text-white/90">품질</span>이
            아쉽고, 개인 카페는{" "}
            <span className="font-bold text-white/90">시스템</span>이 불안하다?
          </p>
          <p className="text-base sm:text-lg text-white/70 leading-relaxed">
            블루샥은 이 두 가지 난제를 완벽하게 해결합니다.
          </p>
        </motion.div>

        {/* 4 Strength icons */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="mt-16 sm:mt-20 grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-6"
        >
          {FRANCHISE_STRENGTHS.map((strength) => (
            <motion.div
              key={strength.number}
              variants={item}
              className="flex flex-col items-center"
            >
              {/* Circle with number */}
              <div className="w-20 h-20 sm:w-[88px] sm:h-[88px] rounded-full border-2 border-white/30 bg-white/5 backdrop-blur-sm flex items-center justify-center mb-4 transition-colors hover:border-white/50 hover:bg-white/10">
                <span className="text-2xl sm:text-3xl font-bold text-white font-[family-name:var(--font-dm-sans)]">
                  {strength.number}
                </span>
              </div>

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
