"use client";

import Link from "next/link";
import { BRAND_SIDEBAR_ITEMS, FRANCHISE_SIDEBAR_ITEMS } from "@/lib/constants";

type SidebarIcon = "phone" | "app" | "inquiry" | "event" | "consult" | "global";

interface FloatingSidebarProps {
  variant: "brand" | "franchise";
}

function SidebarIcon({ name }: { name: string }) {
  switch (name as SidebarIcon) {
    case "phone":
      return (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
        </svg>
      );
    case "app":
      return (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
          <line x1="12" y1="18" x2="12" y2="18" />
        </svg>
      );
    case "inquiry":
      return (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      );
    case "event":
      return (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      );
    case "consult":
      return (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
        </svg>
      );
    case "global":
      return (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
        </svg>
      );
    default:
      return null;
  }
}

export function FloatingSidebar({ variant }: FloatingSidebarProps) {
  const items =
    variant === "brand" ? BRAND_SIDEBAR_ITEMS : FRANCHISE_SIDEBAR_ITEMS;

  return (
    <>
      {/* Desktop: fixed right sidebar, vertically centered */}
      <aside className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 md:flex md:flex-col md:gap-2 xl:right-6">
        {items.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="group flex w-[100px] flex-col items-center gap-1.5 rounded-xl bg-white px-3 py-3.5 text-center shadow-md ring-1 ring-black/5 transition-all hover:shadow-lg hover:ring-blu-200"
          >
            <span className="text-blu-500 transition-colors group-hover:text-blu-600">
              <SidebarIcon name={item.icon} />
            </span>
            <span className="text-[11px] font-medium leading-tight text-gray-700 group-hover:text-blu-500">
              {item.label}
            </span>
            {item.sublabel && (
              <span className="text-[10px] font-bold text-blu-500">
                {item.sublabel}
              </span>
            )}
          </Link>
        ))}
      </aside>

      {/* Mobile: fixed bottom bar */}
      <aside className="fixed bottom-0 left-0 right-0 z-40 md:hidden">
        <div className="flex items-stretch border-t border-gray-100 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.06)]">
          {items.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex flex-1 flex-col items-center justify-center gap-1 py-2.5 text-center transition-colors hover:bg-blu-50"
            >
              <span className="text-blu-500">
                <SidebarIcon name={item.icon} />
              </span>
              <span className="text-[10px] font-medium leading-tight text-gray-600">
                {item.label}
              </span>
              {item.sublabel && (
                <span className="text-[9px] font-bold text-blu-500">
                  {item.sublabel}
                </span>
              )}
            </Link>
          ))}
        </div>
      </aside>
    </>
  );
}
