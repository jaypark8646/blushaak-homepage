"use client";

import { useState, useEffect, useCallback } from "react";

/**
 * Tracks the horizontal bounds of elements with data-header-theme="dark"
 * that currently overlap the GNB header area (top 72px).
 * Returns a CSS clip-path string that covers those dark regions.
 */
export function useDarkRegions() {
  const [clipPath, setClipPath] = useState("");

  const update = useCallback(() => {
    const HEADER_HEIGHT = 72;
    const darkEls = document.querySelectorAll('[data-header-theme="dark"]');
    const rects: { left: number; right: number }[] = [];

    darkEls.forEach((el) => {
      const rect = el.getBoundingClientRect();
      // Only include sections that vertically overlap the header area
      if (rect.top < HEADER_HEIGHT && rect.bottom > 0) {
        rects.push({ left: rect.left, right: rect.right });
      }
    });

    if (rects.length === 0) {
      setClipPath("");
      return;
    }

    // Build a clip-path polygon covering all dark regions
    // For multiple regions, combine into one path using move-to segments
    const vw = window.innerWidth;
    const segments = rects.map((r) => {
      const l = Math.max(0, r.left);
      const right = Math.min(vw, r.right);
      // Convert to percentage for responsive behavior
      const lp = (l / vw) * 100;
      const rp = (right / vw) * 100;
      return `${lp}% 0%, ${rp}% 0%, ${rp}% 100%, ${lp}% 100%`;
    });

    // For a single region, simple polygon
    if (segments.length === 1) {
      setClipPath(`polygon(${segments[0]})`);
    } else {
      // For multiple regions, combine (simplified: use bounding box)
      const minL = Math.max(0, Math.min(...rects.map((r) => r.left)));
      const maxR = Math.min(vw, Math.max(...rects.map((r) => r.right)));
      const lp = (minL / vw) * 100;
      const rp = (maxR / vw) * 100;
      setClipPath(`polygon(${lp}% 0%, ${rp}% 0%, ${rp}% 100%, ${lp}% 100%)`);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    // Run initial check + delayed check for dynamic content
    update();
    const timer = setTimeout(update, 100);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      clearTimeout(timer);
    };
  }, [update]);

  return clipPath;
}
