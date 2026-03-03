"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { OPENING_STEPS } from "@/lib/franchiseData";

export default function OpeningProcedure() {
  const pathRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(pathRef, { once: true, margin: "-100px" });

  const topRow = OPENING_STEPS.slice(0, 4);
  const bottomRow = OPENING_STEPS.slice(4);

  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Title */}
        <ScrollReveal>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-dark-800 text-center mb-16 md:mb-20">
            개설 절차
          </h2>
        </ScrollReveal>

        {/* Desktop: S-curve flowchart */}
        <div ref={pathRef} className="hidden md:block relative">
          {/* SVG S-curve connector */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 1000 460"
            preserveAspectRatio="none"
            fill="none"
          >
            <motion.path
              d="M60 100 H320 Q380 100 380 160 V260 Q380 320 440 320 H940"
              stroke="#1A73B5"
              strokeWidth="2"
              strokeDasharray="6 4"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 2, ease: "easeInOut", delay: 0.3 }}
              opacity={0.3}
            />
          </svg>

          {/* Top row: Steps 1-4 */}
          <div className="grid grid-cols-4 gap-5 mb-10">
            {topRow.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.15 * index }}
              >
                <StepCard step={step} />
              </motion.div>
            ))}
          </div>

          {/* Curved connector visual indicator */}
          <div className="flex justify-center mb-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <path
                  d="M24 8v32M16 32l8 8 8-8"
                  stroke="#1A73B5"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.4"
                />
              </svg>
            </motion.div>
          </div>

          {/* Bottom row: Steps 5-8 */}
          <div className="grid grid-cols-4 gap-5">
            {bottomRow.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.8 + 0.15 * index }}
              >
                <StepCard step={step} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile: vertical list */}
        <div className="md:hidden space-y-4">
          {OPENING_STEPS.map((step, index) => (
            <ScrollReveal key={step.step} delay={0.08 * index}>
              <StepCard step={step} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function StepCard({ step }: { step: (typeof OPENING_STEPS)[number] }) {
  const isHighlighted = step.isHighlighted;

  return (
    <div
      className={`rounded-2xl p-5 sm:p-6 h-full transition-shadow duration-300 ${
        isHighlighted
          ? "bg-cta-500 text-white shadow-lg shadow-cta-500/20"
          : "bg-white border border-gray-100 shadow-sm hover:shadow-md"
      }`}
    >
      {/* Step number */}
      <div
        className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold mb-3 font-[family-name:var(--font-dm-sans)] ${
          isHighlighted
            ? "bg-white/20 text-white"
            : "bg-blu-500/10 text-blu-500"
        }`}
      >
        {step.step}
      </div>

      {/* Title */}
      <h3
        className={`text-base sm:text-lg font-bold mb-3 ${
          isHighlighted ? "text-white" : "text-dark-800"
        }`}
      >
        {step.title}
      </h3>

      {/* Details */}
      <ul className="space-y-1.5">
        {step.details.map((detail) => (
          <li
            key={detail}
            className={`flex items-start gap-2 text-xs sm:text-sm leading-relaxed ${
              isHighlighted ? "text-white/80" : "text-gray-500"
            }`}
          >
            <span
              className={`w-1 h-1 rounded-full mt-1.5 flex-shrink-0 ${
                isHighlighted ? "bg-white/60" : "bg-gray-300"
              }`}
            />
            {detail}
          </li>
        ))}
      </ul>
    </div>
  );
}
