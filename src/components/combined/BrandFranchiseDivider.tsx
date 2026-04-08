"use client";

import Image from "next/image";
import type { PointerEvent } from "react";
import { useEffect, useRef, useState } from "react";

const FRANCHISE_STORE_IMAGES = [
  {
    src: "/images/franchise/stores/store-1.jpg",
    alt: "블루샥 매장 사진 1",
  },
  {
    src: "/images/franchise/stores/store-2.jpg",
    alt: "블루샥 매장 사진 2",
  },
  {
    src: "/images/franchise/stores/store-3.jpg",
    alt: "블루샥 매장 사진 3",
  },
  {
    src: "/images/franchise/stores/store-4.jpg",
    alt: "블루샥 매장 사진 4",
  },
  {
    src: "/images/franchise/stores/store-5.jpg",
    alt: "블루샥 매장 사진 5",
  },
] as const;

export function BrandFranchiseDivider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const pointerStartX = useRef<number | null>(null);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % FRANCHISE_STORE_IMAGES.length);
    }, 4800);

    return () => window.clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + FRANCHISE_STORE_IMAGES.length) % FRANCHISE_STORE_IMAGES.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % FRANCHISE_STORE_IMAGES.length);
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    pointerStartX.current = event.clientX;
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (pointerStartX.current === null) {
      return;
    }

    const distance = event.clientX - pointerStartX.current;
    pointerStartX.current = null;

    if (Math.abs(distance) < 36) {
      return;
    }

    if (distance > 0) {
      goToPrev();
      return;
    }

    goToNext();
  };

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#071624_0%,#0d2238_100%)] px-6 py-20 text-white md:px-10 md:py-28">
      <div className="absolute inset-0 opacity-[0.06]">
        {Array.from({ length: 11 }).map((_, index) => (
          <div
            key={index}
            className="absolute top-0 bottom-0 w-px bg-white"
            style={{ left: `${(index + 1) * 8.5}%` }}
          />
        ))}
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-col gap-10">
        <div className="max-w-3xl text-center md:text-left">
          <p className="text-[11px] font-semibold uppercase tracking-[0.34em] text-white/45">
            Blu Shaak Coffee
          </p>
          <h2 className="mt-4 text-3xl font-black uppercase tracking-[0.14em] text-white md:text-5xl">
            Franchise
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-white/65 md:text-base">
            블루샥과 함께하는 창업 파트너십. 이전에 전달된 매장 사진들을 메인 비주얼로 구성해
            실제 공간 분위기를 바로 확인할 수 있게 정리했습니다.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_220px] lg:items-stretch">
          <div
            className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/5 shadow-[0_28px_80px_rgba(0,0,0,0.32)]"
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerCancel={() => {
              pointerStartX.current = null;
            }}
          >
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {FRANCHISE_STORE_IMAGES.map((image, index) => (
                <div
                  key={image.src}
                  className="relative aspect-[16/10] min-w-full bg-[#0d2238]"
                  aria-hidden={index !== currentIndex}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    priority={index === 0}
                    sizes="(max-width: 1024px) 100vw, 960px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#08111d]/60 via-transparent to-transparent" />
                </div>
              ))}
            </div>

            <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between p-4 sm:p-5">
              <span className="rounded-full border border-white/15 bg-black/25 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-white/75 backdrop-blur-sm">
                Photo Carousel
              </span>
              <span className="rounded-full border border-white/15 bg-black/25 px-3 py-1 text-xs text-white/75 backdrop-blur-sm">
                {String(currentIndex + 1).padStart(2, "0")} / {String(FRANCHISE_STORE_IMAGES.length).padStart(2, "0")}
              </span>
            </div>

            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 p-4 sm:p-5">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={goToPrev}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/25 text-white backdrop-blur-sm transition hover:bg-black/40"
                  aria-label="이전 사진"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 18L9 12L15 6" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={goToNext}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/25 text-white backdrop-blur-sm transition hover:bg-black/40"
                  aria-label="다음 사진"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 18L15 12L9 6" />
                  </svg>
                </button>
              </div>

              <div className="hidden rounded-full border border-white/12 bg-black/20 px-3 py-2 backdrop-blur-sm sm:flex sm:gap-2">
                {FRANCHISE_STORE_IMAGES.map((image, index) => (
                  <button
                    key={image.src}
                    type="button"
                    onClick={() => goToSlide(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex ? "w-7 bg-white" : "w-2 bg-white/40 hover:bg-white/70"
                    }`}
                    aria-label={`사진 ${index + 1} 보기`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-5 gap-3 lg:grid-cols-1">
            {FRANCHISE_STORE_IMAGES.map((image, index) => (
              <button
                key={image.src}
                type="button"
                onClick={() => goToSlide(index)}
                className={`group relative overflow-hidden rounded-[18px] border transition ${
                  index === currentIndex
                    ? "border-cyan-300 shadow-[0_18px_40px_rgba(61,203,168,0.16)]"
                    : "border-white/10 hover:border-white/25"
                }`}
                aria-label={`${image.alt} 선택`}
              >
                <div className="relative aspect-[4/5] bg-[#0d2238]">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 1024px) 20vw, 220px"
                    className={`object-cover transition duration-300 ${
                      index === currentIndex ? "scale-[1.02]" : "opacity-70 group-hover:opacity-100"
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#08111d]/70 via-transparent to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 px-3 py-3 text-left">
                    <span className="text-[11px] font-semibold tracking-[0.2em] text-white/85">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
