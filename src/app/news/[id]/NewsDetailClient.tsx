"use client";

import { use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { GNB, Footer, FloatingSidebar } from "@/components/layout";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import {
  getNewsById,
  SAMPLE_NEWS,
  categoryColors,
  categoryLabels,
} from "@/lib/newsData";

export default function NewsDetailClient({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { isScrolled } = useScrollPosition();
  const newsItem = getNewsById(id);

  // Find prev/next items
  const currentIndex = SAMPLE_NEWS.findIndex((item) => item.id === id);
  const prevItem = currentIndex > 0 ? SAMPLE_NEWS[currentIndex - 1] : null;
  const nextItem =
    currentIndex < SAMPLE_NEWS.length - 1
      ? SAMPLE_NEWS[currentIndex + 1]
      : null;

  if (!newsItem) {
    return (
      <>
        <GNB isScrolled={isScrolled} />
        <main className="min-h-screen bg-white pt-[72px]">
          <div className="mx-auto max-w-3xl px-4 py-32 text-center">
            <h1 className="text-2xl font-bold text-dark-800">
              게시글을 찾을 수 없습니다.
            </h1>
            <p className="mt-4 text-gray-500">
              요청하신 게시글이 존재하지 않거나 삭제되었습니다.
            </p>
            <Link
              href="/news"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-blu-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blu-600"
            >
              목록으로 돌아가기
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const category = newsItem.category;

  return (
    <>
      <GNB isScrolled={isScrolled} />

      <main className="min-h-screen bg-white pt-[72px]">
        {/* Hero section */}
        <section className="bg-gradient-to-b from-warm-100 to-white py-16 md:py-20">
          <div className="mx-auto max-w-3xl px-4">
            <ScrollReveal>
              {/* Back link */}
              <button
                onClick={() => router.back()}
                className="mb-8 inline-flex items-center gap-1.5 text-sm font-medium text-gray-400 transition-colors hover:text-blu-500 font-[family-name:var(--font-dm-sans)] cursor-pointer"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="15 18 9 12 15 6" />
                </svg>
                뒤로가기
              </button>

              {/* Category & Date */}
              <div className="mb-4 flex items-center gap-3">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${categoryColors[category].bg} ${categoryColors[category].text}`}
                >
                  {categoryLabels[category]}
                </span>
                <time className="text-sm text-gray-400 font-[family-name:var(--font-dm-sans)]">
                  {newsItem.date}
                </time>
              </div>

              {/* Title */}
              <h1 className="text-3xl font-bold leading-tight text-dark-800 md:text-4xl">
                {newsItem.title}
              </h1>
            </ScrollReveal>
          </div>
        </section>

        {/* Content section */}
        <section className="mx-auto max-w-3xl px-4 py-12 md:py-16">
          <ScrollReveal delay={0.1}>
            {/* Divider */}
            <div className="mb-10 h-px bg-gradient-to-r from-blu-400 to-mint-400" />

            {/* Article content */}
            <article className="whitespace-pre-line text-base leading-[1.9] text-gray-700">
              {newsItem.content || newsItem.excerpt}
            </article>

            {/* Bottom divider */}
            <div className="mt-12 h-px bg-gray-100" />
          </ScrollReveal>

          {/* Navigation */}
          <ScrollReveal delay={0.15}>
            <nav className="mt-8 space-y-3">
              {prevItem && (
                <Link
                  href={`/news/${prevItem.id}`}
                  className="group flex items-center gap-3 rounded-xl border border-gray-100 px-5 py-4 transition-all hover:border-blu-100 hover:bg-blu-50/30"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="shrink-0 text-gray-300 group-hover:text-blu-400"
                  >
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                  <div className="min-w-0">
                    <span className="text-xs font-medium text-gray-400 font-[family-name:var(--font-dm-sans)]">
                      이전 글
                    </span>
                    <p className="truncate text-sm font-medium text-dark-800 group-hover:text-blu-500 transition-colors">
                      {prevItem.title}
                    </p>
                  </div>
                </Link>
              )}
              {nextItem && (
                <Link
                  href={`/news/${nextItem.id}`}
                  className="group flex items-center justify-end gap-3 rounded-xl border border-gray-100 px-5 py-4 transition-all hover:border-blu-100 hover:bg-blu-50/30"
                >
                  <div className="min-w-0 text-right">
                    <span className="text-xs font-medium text-gray-400 font-[family-name:var(--font-dm-sans)]">
                      다음 글
                    </span>
                    <p className="truncate text-sm font-medium text-dark-800 group-hover:text-blu-500 transition-colors">
                      {nextItem.title}
                    </p>
                  </div>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="shrink-0 text-gray-300 group-hover:text-blu-400"
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </Link>
              )}
            </nav>
          </ScrollReveal>

          {/* Back to list button */}
          <ScrollReveal delay={0.2}>
            <div className="mt-10 text-center">
              <Link
                href={`/news?tab=${newsItem.category}`}
                className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-6 py-3 text-sm font-medium text-gray-600 transition-all hover:border-blu-200 hover:bg-blu-50 hover:text-blu-500"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                </svg>
                목록으로 돌아가기
              </Link>
            </div>
          </ScrollReveal>
        </section>
      </main>

      <FloatingSidebar variant="brand" />
      <Footer />
    </>
  );
}
