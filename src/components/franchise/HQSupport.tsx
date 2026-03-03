"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { HQ_SUPPORT } from "@/lib/franchiseData";

function AnimatedAmount({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 1200;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref} className="tabular-nums">
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

function SupportIcon({ type }: { type: string }) {
  switch (type) {
    case "logistics":
      return (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="14" width="24" height="16" rx="2" />
          <path d="M26 18h6l4 5v7h-10V18z" />
          <circle cx="10" cy="32" r="3" />
          <circle cx="32" cy="32" r="3" />
          <path d="M13 30h15" />
        </svg>
      );
    case "care":
      return (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="20" cy="12" r="6" />
          <path d="M8 34c0-6.627 5.373-12 12-12s12 5.373 12 12" />
          <path d="M28 20l3 3-3 3" />
        </svg>
      );
    case "brand":
      return (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="20,4 24.5,14.5 36,16 27.5,24 29.5,36 20,30.5 10.5,36 12.5,24 4,16 15.5,14.5" />
        </svg>
      );
    default:
      return null;
  }
}

export default function HQSupport() {
  return (
    <section className="py-24 md:py-32 bg-warm-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Title */}
        <ScrollReveal>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-dark-800 text-center mb-16 md:mb-20">
            본사 지원사항
          </h2>
        </ScrollReveal>

        {/* Amount badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-16 md:mb-20">
          {HQ_SUPPORT.amounts.map((amount, index) => (
            <ScrollReveal key={amount.label} delay={0.1 * index}>
              <div className="flex flex-col items-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full flex items-center justify-center relative"
                >
                  {/* Gradient border */}
                  <div
                    className="absolute inset-0 rounded-full p-[3px]"
                    style={{
                      background:
                        "linear-gradient(135deg, #1A73B5, #3DCBA8)",
                    }}
                  >
                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                      <span className="text-lg sm:text-xl md:text-2xl font-extrabold text-blu-500">
                        <AnimatedAmount
                          target={parseInt(amount.value.replace(/[^0-9]/g, ""))}
                          suffix="만원"
                        />
                      </span>
                    </div>
                  </div>
                </motion.div>
                <p className="mt-4 text-sm sm:text-base font-medium text-dark-700 text-center">
                  {amount.label}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Support item cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {HQ_SUPPORT.items.map((supportItem, index) => (
            <ScrollReveal key={supportItem.title} delay={0.15 * index}>
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 h-full">
                {/* Icon */}
                <div className="text-blu-500 mb-5">
                  <SupportIcon type={supportItem.icon} />
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-bold text-dark-800 mb-3">
                  {supportItem.title}
                </h3>

                {/* Description */}
                <p className="text-gray-500 text-sm leading-relaxed">
                  {supportItem.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
