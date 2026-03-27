"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";

// DT점 매장사진 - 사진 추가 시 src를 실제 경로로 교체하세요
const DT_STORE_PHOTOS = [
  {
    src: "/images/franchise/dt-store.jpg",
    alt: "블루샥 DT점 매장 전경 1",
    label: "블루샥 DT점",
  },
  {
    src: "/images/franchise/dt-store.jpg",
    alt: "블루샥 DT점 매장 전경 2",
    label: "블루샥 DT점",
  },
  {
    src: "/images/franchise/dt-store.jpg",
    alt: "블루샥 DT점 매장 전경 3",
    label: "블루샥 DT점",
  },
];

export default function DTStoreGallery() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % DT_STORE_PHOTOS.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + DT_STORE_PHOTOS.length) % DT_STORE_PHOTOS.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="bg-dark-800">
      {/* 전체 너비 슬라이더 */}
      <div className="relative w-full h-[320px] sm:h-[420px] md:h-[520px] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <div
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${DT_STORE_PHOTOS[current].src})` }}
              role="img"
              aria-label={DT_STORE_PHOTOS[current].alt}
            />
            {/* 하단 그라데이션 */}
            <div className="absolute inset-0 bg-gradient-to-t from-dark-800/60 via-transparent to-transparent" />
          </motion.div>
        </AnimatePresence>

        {/* 좌우 화살표 */}
        <button
          onClick={prev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/35 transition-colors"
          aria-label="이전 사진"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <button
          onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/35 transition-colors"
          aria-label="다음 사진"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>

        {/* 인디케이터 */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {DT_STORE_PHOTOS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === current ? "bg-white w-7" : "bg-white/45 w-2 hover:bg-white/65"
              }`}
              aria-label={`슬라이드 ${i + 1}`}
            />
          ))}
        </div>

        {/* 슬라이드 번호 */}
        <div className="absolute bottom-5 right-6 z-10 text-white/60 text-xs font-[family-name:var(--font-dm-sans)] tabular-nums">
          {String(current + 1).padStart(2, "0")} / {String(DT_STORE_PHOTOS.length).padStart(2, "0")}
        </div>
      </div>
    </section>
  );
}
