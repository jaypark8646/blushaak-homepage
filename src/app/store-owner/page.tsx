"use client";

import { GNB, Footer } from "@/components/layout";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { BRAND } from "@/lib/constants";

export default function StoreOwnerPage() {
  const { isScrolled } = useScrollPosition();

  return (
    <>
      <GNB isScrolled={isScrolled} />

      <main className="min-h-screen bg-white pt-[72px]">
        {/* Hero section */}
        <section className="bg-gradient-to-b from-blu-50 to-white py-20">
          <div className="mx-auto max-w-7xl px-4">
            <ScrollReveal>
              <h1 className="text-center font-[family-name:var(--font-playfair-display)] text-5xl font-bold tracking-tight text-dark-800 md:text-6xl">
                STORE OWNER
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <p className="mt-4 text-center text-lg text-gray-500">
                가맹점주 전용 페이지
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Content area */}
        <section className="mx-auto max-w-7xl px-4 py-16">
          <div className="mx-auto max-w-2xl">
            {/* Cards */}
            <div className="grid gap-6 sm:grid-cols-2">
              {/* Card 1: Order Program */}
              <ScrollReveal delay={0.1}>
                <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm text-center">
                  {/* Icon */}
                  <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-blu-50">
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-blu-500"
                    >
                      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                      <line x1="3" y1="6" x2="21" y2="6" />
                      <path d="M16 10a4 4 0 01-8 0" />
                    </svg>
                  </div>

                  <h3 className="mb-2 text-lg font-semibold text-dark-800">
                    발주 프로그램
                  </h3>
                  <p className="mb-4 text-sm leading-relaxed text-gray-500">
                    원자재 및 부자재 온라인 발주 시스템을 통해 편리하게 주문하세요.
                  </p>
                  <span className="inline-block rounded-full bg-warm-200 px-3 py-1 text-xs font-semibold text-amber-700">
                    준비 중
                  </span>
                </div>
              </ScrollReveal>

              {/* Card 2: Notices */}
              <ScrollReveal delay={0.2}>
                <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm text-center">
                  {/* Icon */}
                  <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-blu-50">
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-blu-500"
                    >
                      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="16" y1="13" x2="8" y2="13" />
                      <line x1="16" y1="17" x2="8" y2="17" />
                      <polyline points="10 9 9 9 8 9" />
                    </svg>
                  </div>

                  <h3 className="mb-2 text-lg font-semibold text-dark-800">
                    공지사항
                  </h3>
                  <p className="mb-4 text-sm leading-relaxed text-gray-500">
                    본사 공지, 운영 매뉴얼 업데이트, 프로모션 일정 등을
                    확인하세요.
                  </p>
                  <span className="inline-block rounded-full bg-warm-200 px-3 py-1 text-xs font-semibold text-amber-700">
                    준비 중
                  </span>
                </div>
              </ScrollReveal>
            </div>

            {/* Message */}
            <ScrollReveal delay={0.3}>
              <div className="mt-12 rounded-2xl bg-warm-50 p-8 text-center">
                <p className="text-base leading-relaxed text-gray-600">
                  가맹점주 전용 기능은 준비 중입니다.
                  <br />
                  문의사항은{" "}
                  <a
                    href={`tel:${BRAND.phone}`}
                    className="font-bold text-blu-500 hover:text-blu-600 transition-colors"
                  >
                    {BRAND.phone}
                  </a>
                  로 연락주세요.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
