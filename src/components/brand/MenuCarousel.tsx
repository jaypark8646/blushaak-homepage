"use client";

import { useState } from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { MENU_ITEMS, MENU_CATEGORIES } from "@/lib/menuData";
import { useDragScroll } from "@/hooks/useDragScroll";

export default function MenuCarousel() {
  const [activeCategory, setActiveCategory] = useState<string>("coffee");
  const { ref, isDragging, handlers } = useDragScroll();

  const filteredItems = MENU_ITEMS.filter(
    (item) => item.category === activeCategory
  );

  return (
    <section className="py-24 md:py-32 bg-warm-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Title */}
        <ScrollReveal>
          <div className="text-center mb-12 md:mb-16">
            <h2 className="font-[family-name:var(--font-playfair-display)] text-2xl md:text-3xl lg:text-4xl text-dark-800 leading-snug">
              Made the Blu Shaak Way
            </h2>
            <p className="text-gray-500 mt-4 text-sm md:text-base leading-relaxed">
              블루샥만의 레시피로 완성한, 특별함이 담긴 메뉴
            </p>
          </div>
        </ScrollReveal>

        {/* Category tabs */}
        <ScrollReveal delay={0.1}>
          <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-10 md:mb-12">
            {MENU_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 font-[family-name:var(--font-dm-sans)] ${
                  activeCategory === cat.id
                    ? "bg-blu-500 text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Carousel */}
        <ScrollReveal delay={0.2}>
          <div
            ref={ref}
            {...handlers}
            className="flex gap-5 md:gap-6 overflow-x-auto pb-4 scrollbar-hide select-none"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className={`flex-shrink-0 w-[200px] md:w-[220px] group ${
                  isDragging ? "pointer-events-none" : ""
                }`}
              >
                {/* Menu image */}
                <div className="relative w-full aspect-square rounded-xl overflow-hidden transition-transform duration-300 group-hover:scale-[1.03] shadow-sm">
                  <img src={item.image} alt={item.nameKo} className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute top-2 left-2 flex gap-1">
                    {item.isNew && (
                      <span className="inline-block px-2 py-0.5 text-[10px] font-bold font-[family-name:var(--font-dm-sans)] bg-blu-500 text-white rounded-full uppercase tracking-wider">
                        New
                      </span>
                    )}
                    {item.isBest && (
                      <span className="inline-block px-2 py-0.5 text-[10px] font-bold font-[family-name:var(--font-dm-sans)] bg-cta-500 text-white rounded-full uppercase tracking-wider">
                        Best
                      </span>
                    )}
                  </div>
                </div>

                {/* Menu info */}
                <div className="mt-3 px-1">
                  <h4 className="text-sm font-semibold text-dark-800 font-[family-name:var(--font-dm-sans)]">
                    {item.name}
                  </h4>
                  <p className="text-xs text-gray-500 mt-0.5">{item.nameKo}</p>
                  {item.description && (
                    <p className="text-xs text-gray-400 mt-1.5 leading-relaxed line-clamp-2">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            ))}

            {/* Empty state */}
            {filteredItems.length === 0 && (
              <div className="w-full py-16 text-center text-gray-400 text-sm">
                해당 카테고리의 메뉴가 준비 중입니다.
              </div>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
