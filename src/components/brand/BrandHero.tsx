"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const HERO_SLIDES = [
  {
    image: "/images/brand/hero-1.jpg",
    label: "Signature Latte",
    labelKo: "시그니처 라떼",
  },
  {
    image: "/images/brand/hero-2.jpg",
    label: "Specialty Coffee",
    labelKo: "스페셜티 커피",
  },
  {
    image: "/images/brand/hero-3.jpg",
    label: "Crafted with Care",
    labelKo: "정성을 담은 한 잔",
  },
];

export default function BrandHero() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 4500);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="relative w-full h-screen flex flex-col md:flex-row overflow-hidden">
      {/* Left side - Image slider */}
      <div data-header-theme="dark" className="relative w-full h-[60vh] md:w-1/2 md:h-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <img
              src={HERO_SLIDES[current].image}
              alt={HERO_SLIDES[current].label}
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Overlay text describing the scene */}
            <div className="absolute inset-0 flex flex-col items-center justify-end pb-16 md:pb-20">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-white/40 text-sm font-[family-name:var(--font-dm-sans)] tracking-[0.3em] uppercase"
              >
                {HERO_SLIDES[current].label}
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.5 }}
                className="text-white/30 text-xs mt-1 tracking-wider"
              >
                {HERO_SLIDES[current].labelKo}
              </motion.p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Slide indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === current
                  ? "bg-white w-8"
                  : "bg-white/40 w-1.5 hover:bg-white/60"
              }`}
              aria-label={`슬라이드 ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Right side - Brand info */}
      <div className="w-full flex-1 md:w-1/2 md:h-full bg-warm-50 flex items-center justify-center px-8 py-12 md:px-16 md:py-0">
        <div className="max-w-md w-full">
          {/* Shark fin logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-8"
          >
            <Image
              src="/images/logo/logo-icon.png"
              alt=""
              width={64}
              height={60}
              className="h-14 w-auto"
              aria-hidden="true"
            />
          </motion.div>

          {/* Slogan */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="font-[family-name:var(--font-playfair-display)] text-4xl md:text-5xl lg:text-6xl text-dark-800 italic leading-tight"
          >
            Vacation
            <br />
            in the <span className="text-blu-500">CITY</span>
          </motion.h1>

          {/* Sub-copy */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-8 text-base md:text-lg leading-relaxed text-gray-600"
          >
            바쁜 도시의 흐름 속에서
            <br className="hidden md:block" />
            일상이 잠시 휴가처럼 느껴지는 순간,
            <br />
            도심 속 작은 쉼표를 전합니다
          </motion.p>

          {/* Accent line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.7, duration: 0.8, ease: "easeOut" }}
            className="mt-10 h-px w-16 bg-blu-500 origin-left"
          />
        </div>
      </div>
    </section>
  );
}
