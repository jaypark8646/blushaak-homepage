"use client";

import ScrollReveal from "@/components/ui/ScrollReveal";

export default function BrandDirection() {
  return (
    <section id="vision" className="py-24 md:py-32">
      {/* Title */}
      <div className="max-w-7xl mx-auto px-4 mb-16 md:mb-24">
        <ScrollReveal>
          <p className="text-blu-500 text-sm font-medium font-[family-name:var(--font-dm-sans)] tracking-[0.2em] uppercase mb-4">
            Brand Direction
          </p>
          <h2 className="font-[family-name:var(--font-playfair-display)] text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-dark-800 leading-tight">
            Crafted with
            <br />
            Better Ingredients.
          </h2>
        </ScrollReveal>
      </div>

      {/* Block 1 - Coffee (Image Left, Text Right) */}
      <div className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Image */}
          <ScrollReveal direction="left">
            <div className="w-full aspect-[4/3] lg:aspect-auto lg:h-[500px] overflow-hidden">
              <img src="/images/brand/roasting.jpg" alt="스페셜티 커피 로스팅" className="w-full h-full object-cover" />
            </div>
          </ScrollReveal>

          {/* Text */}
          <ScrollReveal direction="right" delay={0.15}>
            <div className="flex items-center h-full bg-warm-50 p-8 md:p-12 lg:p-16">
              <div className="max-w-lg">
                <p className="text-blu-500 text-xs font-medium font-[family-name:var(--font-dm-sans)] tracking-[0.3em] uppercase mb-4">
                  Coffee
                </p>
                <h3 className="font-[family-name:var(--font-playfair-display)] text-2xl md:text-3xl text-dark-800 italic leading-snug mb-6">
                  Specialty Grade Only
                </h3>
                <p className="text-gray-600 leading-relaxed text-base md:text-lg">
                  Q-Grader 평가 80점 이상의 스페셜티 등급 원두만을 선별합니다.
                  세계 바리스타 챔피언이 직접 로스팅 프로파일을 설계하고, 매
                  배치마다 커핑 테스트를 거쳐 일관된 풍미를 보장합니다.
                </p>
                <div className="mt-8 flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-blu-500/10 flex items-center justify-center">
                      <span className="text-blu-500 text-xs font-bold font-[family-name:var(--font-dm-sans)]">
                        80+
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">Q-Grade Score</span>
                  </div>
                  <div className="h-4 w-px bg-gray-200" />
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-blu-500/10 flex items-center justify-center">
                      <span className="text-blu-500 text-xs font-bold font-[family-name:var(--font-dm-sans)]">
                        4
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">Bean Varieties</span>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Block 2 - Bakery (Text Left, Image Right) */}
      <div className="w-full mt-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Text */}
          <ScrollReveal direction="left" delay={0.15}>
            <div className="flex items-center h-full bg-warm-100 p-8 md:p-12 lg:p-16 order-2 lg:order-1">
              <div className="max-w-lg">
                <p className="text-mint-600 text-xs font-medium font-[family-name:var(--font-dm-sans)] tracking-[0.3em] uppercase mb-4">
                  Bakery
                </p>
                <h3 className="font-[family-name:var(--font-playfair-display)] text-2xl md:text-3xl text-dark-800 italic leading-snug mb-6">
                  Baked In-Store, Daily
                </h3>
                <p className="text-gray-600 leading-relaxed text-base md:text-lg">
                  재료 하나하나를 세심하게 고르고, 매장에서 직접 구워, 가장 좋은
                  순간의 맛을 전합니다. 프랑스산 버터, 유기농 밀가루 등 프리미엄
                  원재료만을 사용하여 갓 구운 베이커리의 감동을 선사합니다.
                </p>
                <div className="mt-8 flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-mint-500/10 flex items-center justify-center">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#2DB89A"
                        strokeWidth="2"
                        strokeLinecap="round"
                      >
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    </div>
                    <span className="text-xs text-gray-500">
                      Premium Ingredients
                    </span>
                  </div>
                  <div className="h-4 w-px bg-gray-200" />
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-mint-500/10 flex items-center justify-center">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#2DB89A"
                        strokeWidth="2"
                        strokeLinecap="round"
                      >
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    </div>
                    <span className="text-xs text-gray-500">
                      Fresh from Oven
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Image */}
          <ScrollReveal direction="right">
            <div className="w-full aspect-[4/3] lg:aspect-auto lg:h-[500px] order-1 lg:order-2 overflow-hidden">
              <img src="/images/brand/bakery.jpg" alt="인스토어 베이커리" className="w-full h-full object-cover" />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
