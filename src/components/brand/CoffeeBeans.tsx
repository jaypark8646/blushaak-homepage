"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { COFFEE_BEANS } from "@/lib/beanData";

export default function CoffeeBeans() {
  const [hoveredBean, setHoveredBean] = useState<string | null>(null);

  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Title */}
        <ScrollReveal>
          <div className="text-center mb-16 md:mb-20">
            <p className="text-blu-500 text-sm font-medium font-[family-name:var(--font-dm-sans)] tracking-[0.2em] uppercase mb-4">
              Our Coffee
            </p>
            <h2 className="font-[family-name:var(--font-playfair-display)] text-2xl md:text-3xl lg:text-4xl text-dark-800 leading-snug">
              The Standard of Specialty,
              <br />
              Rewritten by Blu Shaak
            </h2>
          </div>
        </ScrollReveal>

        {/* Bean cards */}
        <ScrollReveal delay={0.15}>
          <div className="grid grid-cols-3 gap-6 md:gap-8 max-w-3xl mx-auto">
            {COFFEE_BEANS.map((bean) => (
              <div
                key={bean.id}
                className="relative flex flex-col items-center"
                onMouseEnter={() => setHoveredBean(bean.id)}
                onMouseLeave={() => setHoveredBean(null)}
              >
                {/* Bean bag circle */}
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden transition-transform duration-300 hover:scale-105 cursor-pointer shadow-lg">
                  <img
                    src={bean.image}
                    alt={bean.nameKo}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Bean name */}
                <h3 className="mt-5 text-sm md:text-base font-semibold text-dark-800 font-[family-name:var(--font-dm-sans)] text-center">
                  {bean.name}
                </h3>
                <p className="text-xs text-gray-400 mt-1 text-center">
                  {bean.nameKo}
                </p>

                {/* Hover popup card */}
                <AnimatePresence>
                  {hoveredBean === bean.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute top-full mt-4 left-1/2 -translate-x-1/2 w-64 bg-white rounded-xl shadow-[0_8px_40px_rgba(0,0,0,0.12)] p-5 z-30 pointer-events-none"
                    >
                      {/* Arrow */}
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45 shadow-[-2px_-2px_4px_rgba(0,0,0,0.04)]" />

                      <p className="text-xs text-gray-400 font-[family-name:var(--font-dm-sans)] tracking-wider uppercase">
                        Origin
                      </p>
                      <p className="text-sm text-dark-800 mt-1">
                        {bean.origin}
                      </p>

                      <div className="mt-3 flex items-center gap-3">
                        <div>
                          <p className="text-xs text-gray-400 font-[family-name:var(--font-dm-sans)]">
                            Roast
                          </p>
                          <p className="text-sm text-dark-800">
                            {bean.roastLevel}
                          </p>
                        </div>
                        <div className="h-6 w-px bg-gray-200" />
                        <div>
                          <p className="text-xs text-gray-400 font-[family-name:var(--font-dm-sans)]">
                            Agtron
                          </p>
                          <p className="text-sm text-dark-800 font-[family-name:var(--font-dm-sans)]">
                            {bean.agtron}
                          </p>
                        </div>
                      </div>

                      {/* Flavor tags */}
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {bean.flavors.map((flavor) => (
                          <span
                            key={flavor}
                            className="inline-block px-2 py-0.5 text-[11px] bg-blu-50 text-blu-600 rounded-full"
                          >
                            {flavor}
                          </span>
                        ))}
                      </div>

                      {/* Description */}
                      <p className="mt-3 text-xs text-gray-500 leading-relaxed">
                        {bean.description}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
