"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { GNB, Footer, FloatingSidebar } from "@/components/layout";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { NewsItem } from "@/types";

type NewsTab = "notice" | "event" | "support";

const NEWS_TABS: { id: NewsTab; label: string }[] = [
  { id: "notice", label: "Notice" },
  { id: "event", label: "Event" },
  { id: "support", label: "Support" },
];

const SAMPLE_NEWS: NewsItem[] = [
  // Notice items
  {
    id: "notice-1",
    title: "블루샥 강남역점 신규 오픈 안내",
    date: "2025-12-15",
    category: "notice",
    excerpt:
      "강남역 4번 출구 앞에 블루샥 강남역점이 새롭게 오픈합니다. 오픈 기념 다양한 혜택을 준비했으니 많은 관심 부탁드립니다.",
  },
  {
    id: "notice-2",
    title: "2026년 설 연휴 매장 운영 안내",
    date: "2026-01-20",
    category: "notice",
    excerpt:
      "설 연휴 기간(1월 28일~30일) 매장별 운영 시간이 상이합니다. 방문 전 해당 매장의 운영 시간을 확인해주세요.",
  },
  // Event items
  {
    id: "event-1",
    title: "겨울 시즌 한정 메뉴 출시",
    date: "2025-11-25",
    category: "event",
    excerpt:
      "따뜻한 겨울을 위한 시즌 한정 메뉴가 출시되었습니다. 토피넛 라떼, 진저브레드 쿠키 등 새로운 메뉴를 만나보세요.",
  },
  {
    id: "event-2",
    title: "블루샥 멤버십 2배 적립 이벤트",
    date: "2026-01-05",
    category: "event",
    excerpt:
      "1월 한 달간 블루샥 멤버십 포인트가 2배로 적립됩니다. 자주 방문하시고 더 많은 혜택을 누려보세요.",
  },
  // Support items
  {
    id: "support-1",
    title: "자주 묻는 질문 (FAQ) 안내",
    date: "2025-10-10",
    category: "support",
    excerpt:
      "블루샥 이용 시 자주 묻는 질문들을 정리했습니다. 멤버십, 주문, 매장 관련 궁금한 점을 확인해보세요.",
  },
  {
    id: "support-2",
    title: "고객센터 운영 시간 변경 안내",
    date: "2026-02-01",
    category: "support",
    excerpt:
      "보다 나은 서비스를 위해 고객센터 운영 시간이 변경됩니다. 평일 09:00~18:00, 토요일 10:00~14:00으로 운영됩니다.",
  },
];

const categoryColors: Record<NewsTab, { bg: string; text: string }> = {
  notice: { bg: "bg-blu-50", text: "text-blu-600" },
  event: { bg: "bg-mint-50", text: "text-mint-700" },
  support: { bg: "bg-warm-200", text: "text-amber-700" },
};

const categoryLabels: Record<NewsTab, string> = {
  notice: "공지",
  event: "이벤트",
  support: "고객지원",
};

function NewsPageContent() {
  const searchParams = useSearchParams();
  const initialTab = (searchParams.get("tab") as NewsTab) || "notice";
  const [activeTab, setActiveTab] = useState<NewsTab>(initialTab);
  const { isScrolled } = useScrollPosition();

  const filteredNews = useMemo(
    () => SAMPLE_NEWS.filter((item) => item.category === activeTab),
    [activeTab]
  );

  return (
    <>
      <GNB isScrolled={isScrolled} />

      <main className="min-h-screen bg-white pt-[72px]">
        {/* Hero section */}
        <section className="bg-gradient-to-b from-warm-100 to-white py-20">
          <div className="mx-auto max-w-7xl px-4">
            <ScrollReveal>
              <h1 className="text-center font-[family-name:var(--font-playfair-display)] text-5xl font-bold tracking-tight text-dark-800 md:text-6xl">
                NEWS
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <p className="mt-4 text-center text-lg text-gray-500">
                블루샥의 최신 소식
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Tabs & content */}
        <section className="mx-auto max-w-7xl px-4 py-12">
          {/* Tab buttons */}
          <ScrollReveal delay={0.1}>
            <div className="mb-10 flex justify-center gap-8 border-b border-gray-200">
              {NEWS_TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    relative pb-3 text-base font-medium transition-colors cursor-pointer
                    font-[family-name:var(--font-dm-sans)]
                    ${
                      activeTab === tab.id
                        ? "text-blu-500"
                        : "text-gray-400 hover:text-gray-600"
                    }
                  `}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <span className="absolute bottom-0 left-0 right-0 h-[3px] rounded-t-full bg-blu-500" />
                  )}
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* News cards grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredNews.map((item, index) => (
              <ScrollReveal key={item.id} delay={index * 0.08}>
                <article className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all hover:shadow-md">
                  {/* Gradient top area */}
                  <div className="relative h-3 bg-gradient-to-r from-blu-400 to-mint-400" />

                  <div className="p-6">
                    {/* Date & category */}
                    <div className="mb-3 flex items-center gap-3">
                      <time className="text-xs font-medium text-gray-400 font-[family-name:var(--font-dm-sans)]">
                        {item.date}
                      </time>
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${categoryColors[item.category].bg} ${categoryColors[item.category].text}`}
                      >
                        {categoryLabels[item.category]}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="mb-2 text-lg font-semibold leading-snug text-dark-800 group-hover:text-blu-500 transition-colors">
                      {item.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="mb-4 text-sm leading-relaxed text-gray-500 line-clamp-2">
                      {item.excerpt}
                    </p>

                    {/* Read more link */}
                    <Link
                      href="#"
                      className="inline-flex items-center gap-1 text-sm font-medium text-blu-500 transition-colors hover:text-blu-600 font-[family-name:var(--font-dm-sans)]"
                    >
                      자세히 보기
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </Link>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>

          {filteredNews.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-lg text-gray-400">
                해당 카테고리에 소식이 없습니다.
              </p>
            </div>
          )}
        </section>
      </main>

      <FloatingSidebar variant="brand" />
      <Footer />
    </>
  );
}

export default function NewsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-blu-500 border-t-transparent" />
        </div>
      }
    >
      <NewsPageContent />
    </Suspense>
  );
}
