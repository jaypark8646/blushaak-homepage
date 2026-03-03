"use client";

import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Button from "@/components/ui/Button";

const NEWS_ITEMS = [
  {
    id: "1",
    date: "2025.12.15",
    category: "notice" as const,
    categoryLabel: "공지",
    title: "블루샥 커피 300호점 돌파 기념 이벤트",
    excerpt:
      "전국 300호점 돌파를 기념하여 특별 프로모션을 진행합니다. 가까운 매장에서 다양한 혜택을 만나보세요.",
  },
  {
    id: "2",
    date: "2025.11.28",
    category: "event" as const,
    categoryLabel: "이벤트",
    title: "겨울 시즌 한정 메뉴 출시 안내",
    excerpt:
      "따뜻한 겨울을 위한 시즌 한정 메뉴가 출시되었습니다. 윈터 스페셜 라떼와 홀리데이 디저트를 만나보세요.",
  },
  {
    id: "3",
    date: "2025.11.10",
    category: "notice" as const,
    categoryLabel: "공지",
    title: "블루샥 앱 리뉴얼 오픈 & 포인트 2배 적립",
    excerpt:
      "더욱 편리해진 블루샥 앱이 새롭게 단장했습니다. 리뉴얼 기념 포인트 2배 적립 이벤트를 놓치지 마세요.",
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  notice: "bg-blu-50 text-blu-600",
  event: "bg-mint-50 text-mint-700",
  support: "bg-warm-200 text-dark-800",
};

export default function NewsPreview() {
  return (
    <section className="py-24 md:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Title */}
        <ScrollReveal>
          <div className="flex items-end justify-between mb-12 md:mb-16">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-dark-800 font-[family-name:var(--font-dm-sans)]">
                NEWS
              </h2>
              <p className="text-sm text-gray-500 mt-2">최신 소식</p>
            </div>
            <Link
              href="/news"
              className="text-sm text-blu-500 font-medium font-[family-name:var(--font-dm-sans)] hover:text-blu-600 transition-colors hidden md:block"
            >
              View All &rarr;
            </Link>
          </div>
        </ScrollReveal>

        {/* News cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {NEWS_ITEMS.map((item, index) => (
            <ScrollReveal key={item.id} delay={index * 0.1}>
              <article className="group bg-white rounded-xl overflow-hidden shadow-[0_2px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1">
                {/* Card top gradient */}
                <div
                  className="h-2 w-full"
                  style={{
                    background:
                      item.category === "event"
                        ? "linear-gradient(90deg, #3DCBA8, #2DB89A)"
                        : "linear-gradient(90deg, #1A73B5, #2E9CDF)",
                  }}
                />

                <div className="p-6 md:p-7">
                  {/* Date + category */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs text-gray-400 font-[family-name:var(--font-dm-sans)]">
                      {item.date}
                    </span>
                    <span
                      className={`inline-block px-2.5 py-0.5 text-[11px] font-medium rounded-full ${CATEGORY_COLORS[item.category]}`}
                    >
                      {item.categoryLabel}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-bold text-dark-800 leading-snug group-hover:text-blu-500 transition-colors line-clamp-2">
                    {item.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-sm text-gray-500 mt-3 leading-relaxed line-clamp-2">
                    {item.excerpt}
                  </p>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>

        {/* Mobile view all link */}
        <ScrollReveal delay={0.3}>
          <div className="mt-10 text-center md:hidden">
            <Link href="/news">
              <Button variant="outline" size="sm">
                소식 더보기
              </Button>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
