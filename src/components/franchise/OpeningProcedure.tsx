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

        {/* Desktop: clean grid layout */}
        <div ref={pathRef} className="hidden md:block">
          {/* Top row: Steps 1-4 */}
          <div className="grid grid-cols-4 gap-5 mb-6">
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

          {/* Bottom row: Steps 5-8 */}
          <div className="grid grid-cols-4 gap-5">
            {bottomRow.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.6 + 0.15 * index }}
              >
                <StepCard step={step} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile: compact 2-column grid */}
        <div className="md:hidden grid grid-cols-2 gap-3">
          {OPENING_STEPS.map((step, index) => (
            <ScrollReveal key={step.step} delay={0.06 * index}>
              <StepCard step={step} compact />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function StepCard({ step, compact }: { step: (typeof OPENING_STEPS)[number]; compact?: boolean }) {
  const isHighlighted = step.isHighlighted;

  return (
    <div
      className={`rounded-2xl h-full transition-shadow duration-300 ${
        compact ? "p-4" : "p-5 sm:p-6"
      } ${
        isHighlighted
          ? "bg-cta-500 text-white shadow-lg shadow-cta-500/20"
          : "bg-white border border-gray-100 shadow-sm hover:shadow-md"
      }`}
    >
      {/* Step number */}
      <div
        className={`inline-flex items-center justify-center rounded-full font-bold font-[family-name:var(--font-dm-sans)] ${
          compact ? "w-6 h-6 text-xs mb-2" : "w-8 h-8 text-sm mb-3"
        } ${
          isHighlighted
            ? "bg-white/20 text-white"
            : "bg-blu-500/10 text-blu-500"
        }`}
      >
        {step.step}
      </div>

      {/* Title */}
      <h3
        className={`font-bold ${
          compact ? "text-sm mb-2" : "text-base sm:text-lg mb-3"
        } ${isHighlighted ? "text-white" : "text-dark-800"}`}
      >
        {step.title}
      </h3>

      {/* Details */}
      <ul className={compact ? "space-y-1" : "space-y-1.5"}>
        {step.details.map((detail) => (
          <li
            key={detail}
            className={`flex items-start gap-1.5 leading-relaxed ${
              compact ? "text-[11px]" : "text-xs sm:text-sm"
            } ${isHighlighted ? "text-white/80" : "text-gray-500"}`}
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
