"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { GNB, Footer, FloatingSidebar } from "@/components/layout";
import ScrollReveal from "@/components/ui/ScrollReveal";
import CategoryTabs from "@/components/menu/CategoryTabs";
import MenuCard from "@/components/menu/MenuCard";
import { MENU_ITEMS, MENU_CATEGORIES } from "@/lib/menuData";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { Suspense } from "react";

function MenuPageContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const { isScrolled } = useScrollPosition();

  const filteredItems = useMemo(() => {
    if (activeCategory === "all") return MENU_ITEMS;
    return MENU_ITEMS.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  return (
    <>
      <GNB isScrolled={isScrolled} />

      <main className="min-h-screen bg-white pt-[72px]">
        {/* Hero section */}
        <section className="bg-gradient-to-b from-warm-50 to-white py-20">
          <div className="mx-auto max-w-7xl px-4">
            <ScrollReveal>
              <h1 className="text-center font-[family-name:var(--font-playfair-display)] text-5xl font-bold tracking-tight text-dark-800 md:text-6xl">
                MENU
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <p className="mt-4 text-center text-lg text-gray-500">
                블루샥만의 레시피로 완성한 메뉴
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Filter & grid section */}
        <section className="mx-auto max-w-7xl px-4 py-12">
          {/* Category tabs */}
          <ScrollReveal delay={0.1}>
            <div className="mb-10 flex justify-center">
              <CategoryTabs
                categories={MENU_CATEGORIES}
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
              />
            </div>
          </ScrollReveal>

          {/* Menu grid */}
          <motion.div
            layout
            className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4 md:gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => (
                <MenuCard key={item.id} item={item} />
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty state */}
          {filteredItems.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-lg text-gray-400">
                해당 카테고리에 메뉴가 없습니다.
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

export default function MenuPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-blu-500 border-t-transparent" />
        </div>
      }
    >
      <MenuPageContent />
    </Suspense>
  );
}
