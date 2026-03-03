"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { GNB, Footer, FloatingSidebar } from "@/components/layout";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import {
  SAMPLE_NEWS,
  NEWS_TABS,
  categoryColors,
  categoryLabels,
  type NewsTab,
} from "@/lib/newsData";

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
                <Link href={`/news/${item.id}`} className="block">
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
                      <span className="inline-flex items-center gap-1 text-sm font-medium text-blu-500 transition-colors group-hover:text-blu-600 font-[family-name:var(--font-dm-sans)]">
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
                      </span>
                    </div>
                  </article>
                </Link>
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
