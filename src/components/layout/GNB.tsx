"use client";

import { useState, useCallback, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_ITEMS } from "@/lib/constants";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import { useDarkRegions } from "@/hooks/useDarkRegions";

interface GNBProps {
  isScrolled: boolean;
  variant?: "default" | "landing";
}

export function GNB({ isScrolled, variant = "default" }: GNBProps) {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [ctaExpanded, setCtaExpanded] = useState(false);
  const collapseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();
  const darkClipPath = useDarkRegions();

  const handleCtaClick = useCallback(() => {
    if (ctaExpanded) {
      // 펼쳐진 상태에서 탭 → 전화 연결
      window.location.href = "tel:16448067";
      return;
    }
    // 첫 탭 → 펼치기
    setCtaExpanded(true);
    if (collapseTimerRef.current) clearTimeout(collapseTimerRef.current);
    collapseTimerRef.current = setTimeout(() => {
      setCtaExpanded(false);
    }, 3500);
  }, [ctaExpanded]);

  const leftItems = NAV_ITEMS.slice(0, 2);
  const rightItems = NAV_ITEMS.slice(2);

  const handleMouseEnter = useCallback((label: string) => {
    setActiveDropdown(label);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setActiveDropdown(null);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  if (variant === "landing") {
    return null;
  }

  // Show the white overlay when not scrolled and dark regions exist
  const showLightOverlay = !isScrolled && !!darkClipPath;

  const navLinkClass = (href: string, theme: "dark" | "light") => {
    if (theme === "light") {
      return `inline-flex items-center px-3 py-2 text-[13px] font-medium tracking-wide font-[family-name:var(--font-dm-sans)] text-white`;
    }
    return `inline-flex items-center px-3 py-2 text-[13px] font-medium tracking-wide transition-colors font-[family-name:var(--font-dm-sans)] ${
      isActive(href)
        ? "text-blu-500"
        : "text-dark-800 hover:text-blu-500"
    }`;
  };

  // Shared nav content renderer
  const renderNavItems = (
    items: typeof leftItems,
    theme: "dark" | "light",
    withDropdown: boolean
  ) =>
    items.map((item) => (
      <li
        key={item.label}
        className="relative"
        onMouseEnter={
          withDropdown
            ? () => (item.submenu ? handleMouseEnter(item.label) : undefined)
            : undefined
        }
        onMouseLeave={withDropdown ? handleMouseLeave : undefined}
      >
        <Link href={item.href} className={navLinkClass(item.href, theme)} tabIndex={withDropdown ? 0 : -1}>
          {item.label}
        </Link>

        {withDropdown && (
          <AnimatePresence>
            {item.submenu && activeDropdown === item.label && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute left-0 top-full pt-2 z-50"
              >
                <ul className="min-w-[180px] rounded-lg bg-white py-2 shadow-lg ring-1 ring-black/5">
                  {item.submenu.map((sub) => (
                    <li key={sub.label}>
                      <Link
                        href={sub.href}
                        className="block px-4 py-2.5 text-[13px] text-gray-600 transition-colors hover:bg-blu-50 hover:text-blu-500 font-[family-name:var(--font-dm-sans)]"
                      >
                        {sub.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </li>
    ));

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-sm shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
            : "bg-transparent"
        }`}
      >
        {/* Base layer: dark text (always rendered) */}
        <nav className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-6 lg:px-10">
          {/* Mobile hamburger */}
          <button
            type="button"
            className="flex items-center justify-center md:hidden text-dark-800"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="메뉴 열기"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>

          <ul className="hidden md:flex md:items-center md:gap-1 lg:gap-6 flex-1 justify-end">
            {renderNavItems(leftItems, "dark", true)}
          </ul>

          <div className="mx-4 flex-shrink-0 lg:mx-10">
            <Logo variant="color" />
          </div>

          <ul className="hidden md:flex md:items-center md:gap-1 lg:gap-6 flex-1">
            {renderNavItems(rightItems, "dark", true)}
          </ul>

          <div className="w-6 md:hidden" />
        </nav>

        {/* Light overlay: white text, clipped to dark background regions */}
        {showLightOverlay && (
          <nav
            className="absolute inset-0 mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-6 lg:px-10 pointer-events-none"
            style={{ clipPath: darkClipPath }}
            aria-hidden="true"
          >
            {/* Mobile hamburger (white) */}
            <div className="flex items-center justify-center md:hidden text-white">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </div>

            <ul className="hidden md:flex md:items-center md:gap-1 lg:gap-6 flex-1 justify-end">
              {renderNavItems(leftItems, "light", false)}
            </ul>

            <div className="mx-4 flex-shrink-0 lg:mx-10">
              <Logo variant="white" />
            </div>

            <ul className="hidden md:flex md:items-center md:gap-1 lg:gap-6 flex-1">
              {renderNavItems(rightItems, "light", false)}
            </ul>

            <div className="w-6 md:hidden" />
          </nav>
        )}
      </header>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      {/* Floating CTA — 우측 중앙 고정 (PC/모바일 공통) */}
      {/* 기본: 전화 아이콘만 / 탭: 가맹문의+번호 펼침 / 펼친 상태 탭: 전화 연결 */}
      <button
        type="button"
        onClick={handleCtaClick}
        aria-label="가맹문의"
        className="fixed z-40 right-4 top-1/2 -translate-y-1/2 flex flex-col items-center justify-center bg-blu-500 text-white shadow-xl rounded-2xl overflow-hidden transition-all duration-300 ease-in-out"
        style={{
          width: ctaExpanded ? "72px" : "44px",
          height: ctaExpanded ? "72px" : "44px",
        }}
      >
        {ctaExpanded ? (
          <div className="flex flex-col items-center justify-center gap-0.5 px-2 font-[family-name:var(--font-dm-sans)]">
            <span className="text-[11px] font-bold tracking-wide leading-tight whitespace-nowrap">가맹문의</span>
            <span className="text-[10px] font-semibold leading-tight whitespace-nowrap">1644-8067</span>
          </div>
        ) : (
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
          </svg>
        )}
      </button>
    </>
  );
}
