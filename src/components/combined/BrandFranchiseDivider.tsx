"use client";

import { useEffect, useRef, useState } from "react";

export function BrandFranchiseDivider() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

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

      <div className="relative z-10 flex flex-col items-center gap-6 px-6 text-center">
        {/* Divider line */}
        <div
          className="h-px bg-white/20 transition-all duration-1000 ease-out"
          style={{ width: visible ? "min(480px, 80%)" : "0px" }}
        />

        {/* Main heading */}
        <div
          className={`transition-all duration-700 delay-300 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <p className="text-[11px] font-semibold tracking-[0.35em] text-white/40 uppercase mb-3">
            Blu Shaak Coffee
          </p>
          <h2 className="text-[32px] md:text-[48px] font-bold tracking-[0.15em] text-white uppercase leading-none">
            Franchise
          </h2>
          <p className="mt-3 text-[14px] md:text-[16px] text-white/50 tracking-wide font-light">
            블루샥과 함께하는 창업 파트너십
          </p>
        </div>

        {/* Divider line bottom */}
        <div
          className="h-px bg-white/20 transition-all duration-1000 ease-out delay-500"
          style={{ width: visible ? "min(480px, 80%)" : "0px" }}
        />

        {/* Scroll cue */}
        <div
          className={`mt-2 transition-all duration-700 delay-700 ${
            visible ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="flex flex-col items-center gap-1.5">
            <span className="text-[10px] tracking-widest text-white/30 uppercase">
              scroll
            </span>
            <div className="h-5 w-px bg-gradient-to-b from-white/30 to-transparent" />
          </div>
        </div>
      </div>
    </div>
  );
}
