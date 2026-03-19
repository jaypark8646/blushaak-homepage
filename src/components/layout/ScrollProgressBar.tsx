"use client";

import { useEffect, useState } from "react";

interface ScrollProgressBarProps {
  currentSection: "brand" | "franchise";
}

export function ScrollProgressBar({ currentSection }: ScrollProgressBarProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[3px] bg-black/10">
      <div
        className="h-full transition-[width] duration-150 ease-out"
        style={{
          width: `${progress}%`,
          backgroundColor: currentSection === "franchise" ? "#1a3a6b" : "#2563eb",
        }}
      />
      {/* Section label — desktop only */}
      <div
        className="absolute right-4 top-2 hidden md:flex items-center gap-1.5"
        style={{ color: currentSection === "franchise" ? "#1a3a6b" : "#2563eb" }}
      >
        <span
          className="inline-block w-1.5 h-1.5 rounded-full"
          style={{
            backgroundColor:
              currentSection === "franchise" ? "#1a3a6b" : "#2563eb",
          }}
        />
        <span className="text-[10px] font-semibold tracking-widest">
          {currentSection === "franchise" ? "FRANCHISE" : "BRAND"}
        </span>
      </div>
    </div>
  );
}
