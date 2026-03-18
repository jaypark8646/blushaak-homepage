"use client";

import ScrollReveal from "@/components/ui/ScrollReveal";

export default function BrandIntro() {
  return (
    <section id="story" className="py-24 md:py-32">
      {/* Top area - Large image + title + body text */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Image placeholder */}
          <ScrollReveal direction="left">
            <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden">
              <img src="/images/brand/coffee-cup.jpg" alt="Blu Shaak coffee cup" className="w-full h-full object-cover" />
            </div>
          </ScrollReveal>

          {/* Right - Title + body text */}
          <ScrollReveal direction="right" delay={0.15}>
            <div>
              <p className="text-blu-500 text-sm font-medium font-[family-name:var(--font-dm-sans)] tracking-[0.2em] uppercase mb-4">
                About Blu Shaak
              </p>
              <h2 className="font-[family-name:var(--font-playfair-display)] text-3xl md:text-4xl lg:text-5xl text-dark-800 leading-tight">
                Vacation
                <br />
                in the CITY
              </h2>
              <div className="mt-8 space-y-5 text-gray-600 leading-relaxed">
                <p>
                  블루샥 커피는 도심 속 작은 바캉스를 꿈꿉니다. 바쁜 일상
                  속에서 잠시 쉬어가는 순간, 한 잔의 커피가 선사하는 여유로움을
                  통해 도심 속 작은 휴가를 제안합니다.
                </p>
                <p>
                  세계적인 바리스타와 커피 프로듀서가 직접 선별한 스페셜티 원두,
                  매장에서 직접 구운 베이커리, 그리고 바다를 닮은 공간까지.
                  블루샥에서의 시간은 일상에 특별한 쉼표가 됩니다.
                </p>
              </div>
              <div className="mt-6 h-px w-12 bg-blu-300" />
            </div>
          </ScrollReveal>
        </div>
      </div>

    </section>
  );
}
