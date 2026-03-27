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
          {FOOTER_LINKS.map((link) => (
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
        <div className="grid gap-3 md:grid-cols-2">
          <div className="flex items-center gap-2">
            <span className="text-[13px] font-semibold text-white">가맹문의</span>
            <Link
              href="mailto:sd@dandikorea.com"
              className="text-[13px] text-gray-300 transition-colors hover:text-white"
            >
              sd@dandikorea.com
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[13px] text-gray-400">마케팅 제안</span>
            <Link
              href="mailto:mkt@dandikorea.com"
              className="text-[13px] text-gray-300 transition-colors hover:text-white"
            >
              mkt@dandikorea.com
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[13px] text-gray-400">메뉴·제품제안</span>
            <Link
              href="mailto:tax_dandi@dandikorea.com"
              className="text-[13px] text-gray-300 transition-colors hover:text-white"
            >
              tax_dandi@dandikorea.com
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[13px] text-gray-400">대표번호</span>
            <span className="text-[13px] text-gray-300">{BRAND.phone}</span>
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

      {/* Family Brand */}
      <div className="mx-auto max-w-[1200px] px-6 pb-6 lg:px-10">
        <div className="border-t border-white/10 pt-6">
          <p className="text-[11px] font-semibold tracking-widest text-gray-500 uppercase mb-3">
            Family Brand
          </p>
          <Link
            href="https://photosignature.co.kr/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[13px] text-gray-300 transition-colors hover:text-white"
          >
            <span className="font-medium">포토시그니처</span>
            <span className="text-gray-500">PHOTO SIGNATURE</span>
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              className="text-gray-500"
            >
              <path
                d="M3.5 2.5H9.5V8.5M9.5 2.5L2.5 9.5"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
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
