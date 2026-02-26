import Link from "next/link";
import { BRAND, FOOTER_LINKS } from "@/lib/constants";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="bg-dark-800 text-white">
      {/* Top section - Logo */}
      <div className="mx-auto max-w-[1200px] px-6 pt-12 pb-8 lg:px-10">
        <Logo variant="white" />
      </div>

      {/* Middle section - Links row */}
      <div className="mx-auto max-w-[1200px] px-6 pb-6 lg:px-10">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-white/10 pb-6">
          {FOOTER_LINKS.map((link, index) => (
            <Link
              key={link.label}
              href={link.href}
              className={`text-[13px] transition-colors hover:text-white ${
                link.label === "개인정보 처리방침"
                  ? "font-bold text-white"
                  : "text-gray-400"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Contact info */}
      <div className="mx-auto max-w-[1200px] px-6 pb-6 lg:px-10">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-6">
          <div className="flex items-center gap-2">
            <span className="text-[13px] font-semibold text-white">가맹문의</span>
            <Link
              href="tel:1644-8067"
              className="text-[15px] font-bold text-blu-400 transition-colors hover:text-blu-300"
            >
              {BRAND.phone}
            </Link>
          </div>
          <div className="hidden h-3 w-px bg-white/20 sm:block" />
          <div className="flex items-center gap-2">
            <span className="text-[13px] text-gray-400">이메일</span>
            <Link
              href={`mailto:${BRAND.email}`}
              className="text-[13px] text-gray-300 transition-colors hover:text-white"
            >
              {BRAND.email}
            </Link>
          </div>
          <div className="hidden h-3 w-px bg-white/20 sm:block" />
          <div className="flex items-center gap-2">
            <span className="text-[13px] text-gray-400">FAX</span>
            <span className="text-[13px] text-gray-300">{BRAND.fax}</span>
          </div>
        </div>
      </div>

      {/* Company info */}
      <div className="mx-auto max-w-[1200px] px-6 pb-6 lg:px-10">
        <div className="space-y-1.5 text-[12px] leading-relaxed text-gray-500">
          <p>
            {BRAND.company} | 대표 {BRAND.ceo} | 사업자등록번호{" "}
            {BRAND.bizNumber}
          </p>
          <p>
            <span className="text-gray-400">[서울]</span>{" "}
            {BRAND.headquarters.seoul}
          </p>
          <p>
            <span className="text-gray-400">[부산]</span>{" "}
            {BRAND.headquarters.busan}
          </p>
        </div>
      </div>

      {/* Copyright */}
      <div className="mx-auto max-w-[1200px] px-6 pb-10 lg:px-10">
        <div className="border-t border-white/5 pt-6">
          <p className="text-[11px] text-gray-600">{BRAND.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
