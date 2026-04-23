"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { GNB, Footer } from "@/components/layout";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import {
  ALL_ALLERGENS,
  NUTRITION_CATEGORIES,
  NUTRITION_DISCLAIMER_NOTES,
  NUTRITION_ITEMS,
  NUTRITION_VERSION,
  NutritionCategory,
  NutritionItem,
} from "@/lib/nutritionBoardData";

type CaffeineFilter = "all" | "high" | "decaf";

function fmt(n: number | null | undefined): string {
  if (n === null || n === undefined) return "-";
  if (Number.isInteger(n)) return String(n);
  return n.toFixed(n < 1 && n > 0 ? 3 : 1).replace(/\.?0+$/, "") || "0";
}

function isDecaf(item: NutritionItem): boolean {
  return /디카페인/.test(item.name);
}

export default function NutritionBoard() {
  const { isScrolled } = useScrollPosition();
  const [activeCategory, setActiveCategory] = useState<NutritionCategory | "ALL">("ALL");
  const [query, setQuery] = useState("");
  const [caffeine, setCaffeine] = useState<CaffeineFilter>("all");
  const [allergenFilters, setAllergenFilters] = useState<Set<string>>(new Set());

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return NUTRITION_ITEMS.filter((item) => {
      if (activeCategory !== "ALL" && item.category !== activeCategory) return false;
      if (q && !item.name.toLowerCase().includes(q)) return false;
      if (caffeine === "high" && !item.highCaffeine) return false;
      if (caffeine === "decaf" && !isDecaf(item)) return false;
      if (allergenFilters.size > 0) {
        for (const a of allergenFilters) {
          if (item.allergens.includes(a)) return false;
        }
      }
      return true;
    });
  }, [activeCategory, query, caffeine, allergenFilters]);

  const toggleAllergen = (a: string) => {
    setAllergenFilters((prev) => {
      const next = new Set(prev);
      if (next.has(a)) next.delete(a);
      else next.add(a);
      return next;
    });
  };

  const resetFilters = () => {
    setActiveCategory("ALL");
    setQuery("");
    setCaffeine("all");
    setAllergenFilters(new Set());
  };

  const countByCategory = useMemo(() => {
    const counts: Record<string, number> = { ALL: NUTRITION_ITEMS.length };
    NUTRITION_ITEMS.forEach((i) => {
      counts[i.category] = (counts[i.category] || 0) + 1;
    });
    return counts;
  }, []);

  return (
    <>
      <GNB isScrolled={isScrolled} />

      <main className="min-h-screen bg-white pt-[72px]">
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-b from-blu-50 via-warm-50 to-white py-16 md:py-24">
          <div className="pointer-events-none absolute inset-0 opacity-[0.04]">
            <div className="absolute -left-20 -top-20 h-96 w-96 rounded-full bg-blu-500 blur-3xl" />
            <div className="absolute -bottom-32 -right-20 h-[500px] w-[500px] rounded-full bg-mint-500 blur-3xl" />
          </div>
          <div className="relative mx-auto max-w-6xl px-4">
            <div className="flex flex-col items-center text-center">
              <span className="mb-3 rounded-full bg-blu-100 px-4 py-1.5 text-xs font-medium tracking-wider text-blu-700 uppercase">
                Blu Shaak Nutrient · {NUTRITION_VERSION} ver
              </span>
              <h1 className="font-[family-name:var(--font-playfair-display)] text-4xl font-bold tracking-tight text-dark-800 md:text-6xl">
                영양 성분표
              </h1>
              <p className="mt-4 max-w-2xl text-sm text-gray-500 md:text-base">
                블루샥의 모든 메뉴를 투명하게. 어린이, 임산부, 카페인 민감자는 *표시된 고카페인 음료 섭취에 주의해 주세요.
              </p>
            </div>
          </div>
        </section>

        {/* Filter bar */}
        <section className="sticky top-[64px] z-30 border-b border-warm-200 bg-white/90 backdrop-blur">
          <div className="mx-auto max-w-6xl px-4 py-4">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              {/* Search */}
              <div className="relative w-full md:w-72">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="메뉴 검색 (예: 아메리카노)"
                  className="w-full rounded-full border border-warm-200 bg-white px-4 py-2 pl-10 text-sm outline-none transition focus:border-blu-400 focus:ring-2 focus:ring-blu-100"
                  type="search"
                />
                <svg
                  className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </div>

              {/* Caffeine pill group */}
              <div className="flex gap-1 rounded-full bg-warm-100 p-1 text-xs">
                {(
                  [
                    ["all", "전체"],
                    ["high", "고카페인*"],
                    ["decaf", "디카페인"],
                  ] as const
                ).map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => setCaffeine(key)}
                    className={`rounded-full px-3 py-1.5 font-medium transition ${
                      caffeine === key
                        ? "bg-white text-blu-700 shadow-sm"
                        : "text-gray-500 hover:text-dark-800"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {(activeCategory !== "ALL" ||
                query ||
                caffeine !== "all" ||
                allergenFilters.size > 0) && (
                <button
                  onClick={resetFilters}
                  className="text-xs font-medium text-gray-500 underline underline-offset-2 hover:text-dark-800"
                >
                  필터 초기화
                </button>
              )}
            </div>

            {/* Category tabs */}
            <div className="mt-3 -mx-4 overflow-x-auto px-4">
              <div className="flex gap-2 pb-1">
                <CategoryPill
                  active={activeCategory === "ALL"}
                  onClick={() => setActiveCategory("ALL")}
                  label="전체"
                  count={countByCategory.ALL}
                />
                {NUTRITION_CATEGORIES.map((cat) => (
                  <CategoryPill
                    key={cat.id}
                    active={activeCategory === cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    label={cat.labelKo}
                    sub={cat.label}
                    count={countByCategory[cat.id] || 0}
                  />
                ))}
              </div>
            </div>

            {/* Allergen filter */}
            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
              <span className="text-gray-500">알레르기 제외:</span>
              {ALL_ALLERGENS.map((a) => {
                const active = allergenFilters.has(a);
                return (
                  <button
                    key={a}
                    onClick={() => toggleAllergen(a)}
                    className={`rounded-full border px-2.5 py-1 font-medium transition ${
                      active
                        ? "border-cta-500 bg-cta-500 text-white"
                        : "border-warm-200 bg-white text-gray-600 hover:border-gray-400"
                    }`}
                  >
                    {a}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Results */}
        <section className="mx-auto max-w-6xl px-4 py-8 md:py-12">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <p className="text-lg font-medium text-dark-800">
                조건에 맞는 메뉴가 없습니다
              </p>
              <p className="mt-2 text-sm text-gray-500">다른 검색어나 필터를 시도해 보세요.</p>
              <button
                onClick={resetFilters}
                className="mt-4 rounded-full bg-blu-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-blu-700"
              >
                필터 초기화
              </button>
            </div>
          ) : (
            <>
              <div className="mb-4 flex items-baseline justify-between">
                <p className="text-sm text-gray-500">
                  <span className="font-semibold text-dark-800">{filtered.length}</span>개 메뉴
                </p>
              </div>

              {/* Mobile: cards */}
              <div className="grid gap-3 md:hidden">
                <AnimatePresence mode="popLayout">
                  {filtered.map((item) => (
                    <MobileCard key={`${item.category}-${item.name}`} item={item} />
                  ))}
                </AnimatePresence>
              </div>

              {/* Desktop: table */}
              <div className="hidden overflow-hidden rounded-2xl border border-warm-200 bg-white shadow-sm md:block">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-blu-600 text-white">
                        <th className="sticky left-0 z-10 bg-blu-600 px-4 py-3 text-left font-semibold">
                          구분
                        </th>
                        <th className="px-4 py-3 text-left font-semibold">음료명</th>
                        <th className="px-3 py-3 text-right font-semibold">
                          칼로리
                          <span className="block text-[10px] font-normal opacity-80">kcal</span>
                        </th>
                        <th className="px-3 py-3 text-right font-semibold">
                          나트륨
                          <span className="block text-[10px] font-normal opacity-80">mg</span>
                        </th>
                        <th className="px-3 py-3 text-right font-semibold">
                          당류
                          <span className="block text-[10px] font-normal opacity-80">g</span>
                        </th>
                        <th className="px-3 py-3 text-right font-semibold">
                          포화지방
                          <span className="block text-[10px] font-normal opacity-80">g</span>
                        </th>
                        <th className="px-3 py-3 text-right font-semibold">
                          단백질
                          <span className="block text-[10px] font-normal opacity-80">g</span>
                        </th>
                        <th className="px-3 py-3 text-right font-semibold">
                          카페인
                          <span className="block text-[10px] font-normal opacity-80">mg</span>
                        </th>
                        <th className="px-4 py-3 text-left font-semibold">알레르기</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map((item, idx) => {
                        const catLabel =
                          NUTRITION_CATEGORIES.find((c) => c.id === item.category)?.labelKo ??
                          item.category;
                        return (
                          <motion.tr
                            key={`${item.category}-${item.name}`}
                            layout
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.15 }}
                            className={`${
                              idx % 2 === 0 ? "bg-white" : "bg-warm-50/60"
                            } transition-colors hover:bg-blu-50/50`}
                          >
                            <td className="sticky left-0 bg-inherit px-4 py-3 align-top text-xs font-semibold text-blu-700">
                              {catLabel}
                            </td>
                            <td className="px-4 py-3 align-top">
                              <div className="flex items-center gap-1.5">
                                <span className="font-medium text-dark-800">{item.name}</span>
                                {item.highCaffeine && (
                                  <span
                                    title="고카페인 음료"
                                    className="inline-flex items-center rounded-full bg-cta-500/10 px-1.5 py-0.5 text-[10px] font-bold text-cta-500"
                                  >
                                    ＊
                                  </span>
                                )}
                                {isDecaf(item) && (
                                  <span className="inline-flex items-center rounded-full bg-mint-100 px-1.5 py-0.5 text-[10px] font-semibold text-mint-700">
                                    DECAF
                                  </span>
                                )}
                              </div>
                              {item.servingSize && (
                                <div className="mt-0.5 text-[10px] text-gray-400">
                                  1회 제공량 {item.servingSize}g
                                </div>
                              )}
                            </td>
                            <td className="px-3 py-3 text-right align-top font-mono tabular-nums text-dark-800">
                              {fmt(item.calories)}
                            </td>
                            <td className="px-3 py-3 text-right align-top font-mono tabular-nums text-gray-600">
                              {fmt(item.sodium)}
                            </td>
                            <td className="px-3 py-3 text-right align-top font-mono tabular-nums text-gray-600">
                              {fmt(item.sugar)}
                            </td>
                            <td className="px-3 py-3 text-right align-top font-mono tabular-nums text-gray-600">
                              {fmt(item.saturatedFat)}
                            </td>
                            <td className="px-3 py-3 text-right align-top font-mono tabular-nums text-gray-600">
                              {fmt(item.protein)}
                            </td>
                            <td className="px-3 py-3 text-right align-top font-mono tabular-nums text-gray-600">
                              {fmt(item.caffeine)}
                            </td>
                            <td className="px-4 py-3 align-top">
                              <div className="flex flex-wrap gap-1">
                                {item.allergens.length === 0 ? (
                                  <span className="text-xs text-gray-300">-</span>
                                ) : (
                                  item.allergens.map((a) => (
                                    <span
                                      key={a}
                                      className="rounded-full bg-warm-100 px-2 py-0.5 text-[11px] text-dark-700"
                                    >
                                      {a}
                                    </span>
                                  ))
                                )}
                              </div>
                            </td>
                          </motion.tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </section>

        {/* Disclaimer */}
        <section className="mx-auto max-w-6xl px-4 pb-20">
          <div className="rounded-2xl border border-warm-200 bg-warm-50/60 p-6 md:p-8">
            <div className="mb-4 flex items-center gap-2">
              <svg
                className="h-5 w-5 text-blu-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8v4M12 16h.01" />
              </svg>
              <h2 className="font-semibold text-dark-800">안내 사항</h2>
            </div>
            <ul className="space-y-2 text-sm text-gray-600">
              {NUTRITION_DISCLAIMER_NOTES.map((note, i) => (
                <li key={i} className="flex gap-2">
                  <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-blu-400" />
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

function CategoryPill({
  active,
  onClick,
  label,
  sub,
  count,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  sub?: string;
  count: number;
}) {
  return (
    <button
      onClick={onClick}
      className={`group flex flex-shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-medium transition ${
        active
          ? "border-blu-600 bg-blu-600 text-white shadow-sm"
          : "border-warm-200 bg-white text-gray-600 hover:border-blu-300 hover:text-blu-700"
      }`}
    >
      <span>{label}</span>
      {sub && (
        <span
          className={`hidden text-[10px] sm:inline ${active ? "opacity-80" : "opacity-50"}`}
        >
          {sub}
        </span>
      )}
      <span
        className={`rounded-full px-1.5 text-[10px] font-bold ${
          active ? "bg-white/20 text-white" : "bg-warm-100 text-gray-500"
        }`}
      >
        {count}
      </span>
    </button>
  );
}

function MobileCard({ item }: { item: NutritionItem }) {
  const catLabel =
    NUTRITION_CATEGORIES.find((c) => c.id === item.category)?.labelKo ?? item.category;
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      className="rounded-2xl border border-warm-200 bg-white p-4 shadow-sm"
    >
      <div className="mb-2 flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <div className="mb-1 inline-flex items-center gap-1 rounded-full bg-blu-50 px-2 py-0.5 text-[10px] font-semibold text-blu-700">
            {catLabel}
          </div>
          <div className="flex items-center gap-1.5">
            <h3 className="text-base font-semibold text-dark-800">{item.name}</h3>
            {item.highCaffeine && (
              <span className="text-cta-500" title="고카페인 음료">
                ＊
              </span>
            )}
            {isDecaf(item) && (
              <span className="rounded-full bg-mint-100 px-1.5 py-0.5 text-[9px] font-bold text-mint-700">
                DECAF
              </span>
            )}
          </div>
          {item.servingSize && (
            <p className="mt-0.5 text-[11px] text-gray-400">
              1회 제공량 {item.servingSize}g
            </p>
          )}
        </div>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2 border-t border-warm-100 pt-3 text-xs">
        <Stat label="칼로리" value={fmt(item.calories)} unit="kcal" />
        <Stat label="나트륨" value={fmt(item.sodium)} unit="mg" />
        <Stat label="당류" value={fmt(item.sugar)} unit="g" />
        <Stat label="포화지방" value={fmt(item.saturatedFat)} unit="g" />
        <Stat label="단백질" value={fmt(item.protein)} unit="g" />
        <Stat label="카페인" value={fmt(item.caffeine)} unit="mg" />
      </div>

      {item.allergens.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1 border-t border-warm-100 pt-3">
          <span className="text-[11px] text-gray-500">알레르기:</span>
          {item.allergens.map((a) => (
            <span
              key={a}
              className="rounded-full bg-warm-100 px-2 py-0.5 text-[11px] text-dark-700"
            >
              {a}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );
}

function Stat({ label, value, unit }: { label: string; value: string; unit: string }) {
  return (
    <div>
      <div className="text-[10px] text-gray-400">{label}</div>
      <div className="flex items-baseline gap-0.5">
        <span className="font-mono tabular-nums text-sm font-semibold text-dark-800">
          {value}
        </span>
        <span className="text-[9px] text-gray-400">{unit}</span>
      </div>
    </div>
  );
}
