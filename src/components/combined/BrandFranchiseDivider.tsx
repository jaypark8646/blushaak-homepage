"use client";

import Image from "next/image";
import type { StaticImageData } from "next/image";
import type { PointerEvent } from "react";
import { useEffect, useRef, useState } from "react";
import storeImage1 from "../../../public/images/franchise/stores/store-1.jpg";
import storeImage2 from "../../../public/images/franchise/stores/store-2.jpg";
import storeImage3 from "../../../public/images/franchise/stores/store-3.jpg";
import storeImage4 from "../../../public/images/franchise/stores/store-4.jpg";
import storeImage5 from "../../../public/images/franchise/stores/store-5.jpg";

const FRANCHISE_STORE_IMAGES = [
  {
    src: storeImage1,
    alt: "블루샥 매장 내부 전경 1",
  },
  {
    src: storeImage2,
    alt: "블루샥 매장 내부 전경 2",
  },
  {
    src: storeImage3,
    alt: "블루샥 매장 내부 전경 3",
  },
  {
    src: storeImage4,
    alt: "블루샥 매장 내부 전경 4",
  },
  {
    src: storeImage5,
    alt: "블루샥 매장 내부 전경 5",
  },
] satisfies { src: StaticImageData; alt: string }[];

export function BrandFranchiseDivider() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState(0);
  const pointerStartX = useRef<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrent((prev) => (prev + 1) % FRANCHISE_STORE_IMAGES.length);
    }, 4500);

    return () => window.clearInterval(timer);
  }, []);

  const goToPrev = () => {
    setCurrent((prev) => (prev - 1 + FRANCHISE_STORE_IMAGES.length) % FRANCHISE_STORE_IMAGES.length);
  };

  const goToNext = () => {
    setCurrent((prev) => (prev + 1) % FRANCHISE_STORE_IMAGES.length);
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    pointerStartX.current = event.clientX;
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (pointerStartX.current === null) return;

    const distance = event.clientX - pointerStartX.current;
    pointerStartX.current = null;

    if (Math.abs(distance) < 36) return;

    if (distance > 0) {
      goToPrev();
      return;
    }

    goToNext();
  };

  return (
    <div
      ref={ref}
      className="relative w-full bg-[#0a1628] overflow-hidden py-20 md:py-28"
    >
      {/* Background texture lines */}
      <div className="absolute inset-0 opacity-[0.04]">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-px bg-white"
            style={{
              left: `${(i + 1) * (100 / 13)}%`,
              top: 0,
              bottom: 0,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 lg:flex-row lg:items-center lg:justify-between lg:gap-14 lg:px-10">
        <div className="flex flex-1 flex-col items-center gap-6 text-center lg:items-start lg:text-left">
          <div
            className="h-px bg-white/20 transition-all duration-1000 ease-out"
            style={{ width: visible ? "min(480px, 80vw)" : "0px" }}
          />

          <div
            className={`transition-all duration-700 delay-300 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <p className="mb-3 text-[11px] font-semibold tracking-[0.35em] text-white/40 uppercase">
              Blu Shaak Coffee
            </p>
            <h2 className="text-[32px] font-bold tracking-[0.15em] text-white uppercase leading-none md:text-[48px]">
              Franchise
            </h2>
            <p className="mt-3 text-[14px] text-white/50 tracking-wide font-light md:text-[16px]">
              블루샥과 함께하는 창업 파트너십
            </p>
          </div>

          <div
            className="h-px bg-white/20 transition-all duration-1000 ease-out delay-500"
            style={{ width: visible ? "min(480px, 80vw)" : "0px" }}
          />

          <div
            className={`mt-2 transition-all duration-700 delay-700 ${
              visible ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="flex flex-col items-center gap-1.5 lg:items-start">
              <span className="text-[10px] tracking-widest text-white/30 uppercase">
                scroll
              </span>
              <div className="h-5 w-px bg-gradient-to-b from-white/30 to-transparent" />
            </div>
          </div>
        </div>

        <div
          className={`transition-all duration-700 delay-500 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="relative ml-auto w-full max-w-[560px] overflow-hidden rounded-[28px] border border-white/10 bg-white/6 p-3 shadow-[0_24px_70px_rgba(0,0,0,0.32)] backdrop-blur-sm lg:w-[560px] lg:shrink-0">
            <div
              className="group relative aspect-[5/4] overflow-hidden rounded-[20px] bg-[#102038] touch-pan-y"
              onPointerDown={handlePointerDown}
              onPointerUp={handlePointerUp}
              onPointerCancel={() => {
                pointerStartX.current = null;
              }}
            >
              <div
                className="flex h-full transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${current * 100}%)` }}
              >
                {FRANCHISE_STORE_IMAGES.map((image, index) => (
                  <div
                    key={image.alt}
                    className="relative h-full min-w-full"
                    aria-hidden={index !== current}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 560px"
                      className="object-cover"
                      priority={index === 0}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#07101d]/55 via-transparent to-transparent" />
                  </div>
                ))}
              </div>

              <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between p-4">
                <span className="rounded-full border border-white/15 bg-black/20 px-3 py-1 text-[10px] font-medium tracking-[0.24em] text-white/70 uppercase backdrop-blur-sm">
                  Store Gallery
                </span>
                <span className="rounded-full border border-white/15 bg-black/20 px-3 py-1 text-[11px] text-white/70 backdrop-blur-sm">
                  {String(current + 1).padStart(2, "0")} / {String(FRANCHISE_STORE_IMAGES.length).padStart(2, "0")}
                </span>
              </div>

              <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="pointer-events-auto flex gap-2">
                    <button
                      type="button"
                      onClick={goToPrev}
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/25 text-white backdrop-blur-sm transition hover:bg-black/40"
                      aria-label="이전 매장 사진"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 18L9 12L15 6" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      onClick={goToNext}
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/25 text-white backdrop-blur-sm transition hover:bg-black/40"
                      aria-label="다음 매장 사진"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 18L15 12L9 6" />
                      </svg>
                    </button>
                  </div>

                  <div className="pointer-events-auto flex gap-2 rounded-full border border-white/12 bg-black/20 px-3 py-2 backdrop-blur-sm">
                    {FRANCHISE_STORE_IMAGES.map((image, index) => (
                      <button
                        key={image.alt}
                        type="button"
                        onClick={() => setCurrent(index)}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          index === current ? "w-7 bg-white" : "w-2 bg-white/40 hover:bg-white/70"
                        }`}
                        aria-label={`매장 사진 ${index + 1} 보기`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
