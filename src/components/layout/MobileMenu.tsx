"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_ITEMS } from "@/lib/constants";
import { Logo } from "./Logo";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const toggleExpand = (label: string) => {
    setExpandedItem((prev) => (prev === label ? null : label));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Dark overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-black/50"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Menu panel - slide from right */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.35, ease: "easeOut" }}
            className="fixed right-0 top-0 bottom-0 z-[70] w-[300px] max-w-[85vw] bg-white shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
              <Logo variant="color" />
              <button
                type="button"
                onClick={onClose}
                className="flex h-10 w-10 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-gray-100"
                aria-label="메뉴 닫기"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <line x1="4" y1="4" x2="16" y2="16" />
                  <line x1="16" y1="4" x2="4" y2="16" />
                </svg>
              </button>
            </div>

            {/* Navigation */}
            <nav className="overflow-y-auto px-5 py-4" style={{ maxHeight: "calc(100vh - 72px)" }}>
              <ul className="space-y-1">
                {NAV_ITEMS.map((item) => (
                  <li key={item.label}>
                    {item.submenu ? (
                      <>
                        {/* Parent item with accordion toggle */}
                        <button
                          type="button"
                          onClick={() => toggleExpand(item.label)}
                          className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-[15px] font-semibold tracking-wide text-dark-800 transition-colors hover:bg-gray-50 font-[family-name:var(--font-dm-sans)]"
                        >
                          {item.label}
                          <motion.svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            animate={{
                              rotate: expandedItem === item.label ? 180 : 0,
                            }}
                            transition={{ duration: 0.2 }}
                          >
                            <polyline points="4,6 8,10 12,6" />
                          </motion.svg>
                        </button>

                        {/* Submenu accordion */}
                        <AnimatePresence>
                          {expandedItem === item.label && (
                            <motion.ul
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25, ease: "easeOut" }}
                              className="overflow-hidden"
                            >
                              {item.submenu.map((sub) => (
                                <li key={sub.label}>
                                  <Link
                                    href={sub.href}
                                    onClick={onClose}
                                    className="block rounded-lg py-2.5 pl-7 pr-3 text-[14px] text-gray-500 transition-colors hover:text-blu-500 font-[family-name:var(--font-dm-sans)]"
                                  >
                                    {sub.label}
                                  </Link>
                                </li>
                              ))}
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className="block rounded-lg px-3 py-3 text-[15px] font-semibold tracking-wide text-dark-800 transition-colors hover:bg-gray-50 font-[family-name:var(--font-dm-sans)]"
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>

              {/* Divider + secondary links */}
              <div className="mt-6 border-t border-gray-100 pt-4">
                <Link
                  href="tel:1644-8067"
                  onClick={onClose}
                  className="flex items-center gap-3 rounded-lg px-3 py-3 text-[14px] text-gray-600 transition-colors hover:bg-gray-50"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#1A73B5"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                  </svg>
                  <span className="font-medium">가맹문의 1644-8067</span>
                </Link>
              </div>
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
