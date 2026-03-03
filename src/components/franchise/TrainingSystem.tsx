"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { TRAINING_STEPS } from "@/lib/franchiseData";

const EDUCATION_CARDS = [
  {
    title: "전담 바이저 밀착 케어",
    description:
      "전담 슈퍼바이저의 세심한 관리로, 매장 품질 및 제품 퀄리티를 일정하게 유지합니다.",
  },
  {
    title: "위생 및 교육 시스템",
    description:
      "커피 이론과 지식, 실제 메뉴 제조까지 블루샥만의 노하우를 아낌없이 나누어 드립니다. 식품 위생법 기반의 철저한 위생 교육과 함께, 희망 점주님께는 월별 체크리스트를 송부하여 체계적인 피드백을 제공합니다.",
  },
];

const stepGradients = [
  "linear-gradient(135deg, #0B3152, #1A73B5)",
  "linear-gradient(135deg, #1A73B5, #2E9CDF)",
  "linear-gradient(135deg, #5C3D2E, #8B6542)",
  "linear-gradient(135deg, #3DCBA8, #1A73B5)",
];

export default function TrainingSystem() {
  const stepsRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(stepsRef, { once: true, margin: "-100px" });

  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Title */}
        <ScrollReveal>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-dark-800 text-center mb-16 md:mb-20">
            교육 시스템
          </h2>
        </ScrollReveal>

        {/* Education description cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-16 md:mb-20">
          {EDUCATION_CARDS.map((card, index) => (
            <ScrollReveal key={card.title} delay={0.1 * index}>
              <div className="bg-warm-50 rounded-2xl p-6 sm:p-8 border border-warm-200 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-2 h-2 rounded-full bg-blu-500" />
                  <h3 className="text-lg sm:text-xl font-bold text-dark-800">
                    {card.title}
                  </h3>
                </div>
                <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
                  {card.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* 5-step training process */}
        <div ref={stepsRef} className="relative">
          {/* Desktop: horizontal connected steps */}
          <div className="hidden md:block">
            {/* Connecting line */}
            <div className="absolute top-10 left-[60px] right-[60px] h-[2px] bg-gray-200 z-0">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 1.2, ease: "easeInOut", delay: 0.3 }}
                className="h-full bg-blu-500 origin-left"
              />
            </div>

            <div className="relative z-10 grid grid-cols-4 gap-4">
              {TRAINING_STEPS.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.15 }}
                  className="flex flex-col items-center text-center"
                >
                  {/* Circle */}
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center shadow-lg mb-4 ring-4 ring-white"
                    style={{ background: stepGradients[index] }}
                  >
                    <span className="text-white font-bold text-lg font-[family-name:var(--font-dm-sans)]">
                      {step.step}
                    </span>
                  </div>

                  {/* Title */}
                  <h4 className="font-bold text-dark-800 text-sm sm:text-base mb-1">
                    {step.title}
                  </h4>

                  {/* Description */}
                  <p className="text-gray-400 text-xs sm:text-sm">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile: vertical steps */}
          <div className="md:hidden space-y-6">
            {TRAINING_STEPS.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.12 }}
                className="flex items-center gap-4"
              >
                <div
                  className="w-14 h-14 rounded-full flex-shrink-0 flex items-center justify-center shadow-md"
                  style={{ background: stepGradients[index] }}
                >
                  <span className="text-white font-bold text-base font-[family-name:var(--font-dm-sans)]">
                    {step.step}
                  </span>
                </div>
                <div>
                  <h4 className="font-bold text-dark-800 text-base">
                    {step.title}
                  </h4>
                  <p className="text-gray-400 text-sm">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
