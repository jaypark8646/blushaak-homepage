"use client";

import React, { useState } from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { COST_TABLE } from "@/lib/franchiseData";

export default function CostTable() {
  const highlightedCategory = "기기 및 장비 (2G 기준)";
  const [openNotes, setOpenNotes] = useState<Record<string, boolean>>({
    [highlightedCategory]: true,
  });

  const toggleNote = (category: string) => {
    setOpenNotes((prev) => ({ ...prev, [category]: !prev[category] }));
  };

  const parseNumber = (val: string) => {
    const n = parseInt(val.replace(/,/g, ""), 10);
    return isNaN(n) ? 0 : n;
  };

  const total10 = COST_TABLE.reduce((sum, item) => sum + parseNumber(item.cost10), 0);
  const total15 = COST_TABLE.reduce((sum, item) => sum + parseNumber(item.cost15), 0);

  const formatNumber = (n: number) => {
    if (n === 0) return "";
    return n.toLocaleString();
  };

  const displayCost = (val: string) => {
    if (val === "-") return "";
    return val;
  };

  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-5xl mx-auto px-4">
        <ScrollReveal>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-dark-800 text-center mb-16 md:mb-20">
            개설 비용
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="mb-6 rounded-3xl border border-blu-100 bg-gradient-to-br from-blu-600 via-blu-500 to-cyan-500 p-[1px] shadow-lg shadow-blu-100/80">
            <div className="rounded-[23px] bg-white/95 p-5 sm:p-6">
              <div className="grid gap-4 lg:grid-cols-[1.35fr_0.95fr]">
                <div className="rounded-2xl bg-gradient-to-r from-blu-600 via-blu-500 to-cyan-500 px-5 py-5 text-white sm:px-6">
                  <p className="inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-white/90">
                    신규 가맹 혜택
                  </p>
                  <p className="mt-4 text-[32px] font-black leading-none sm:text-[42px]">
                    최대 2300만원
                  </p>
                  <p className="mt-2 text-xl font-bold sm:text-2xl">
                    지원
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                  <div className="rounded-2xl border border-cyan-100 bg-white px-5 py-4">
                    <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-cyan-700">
                      한시적 추가 혜택
                    </p>
                    <p className="mt-2 text-base font-bold text-dark-800">
                      가맹비 · 교육비 면제
                    </p>
                    <p className="mt-1 text-base font-bold text-dark-800">
                      커피머신 지원
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-xs sm:text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-center px-3 sm:px-6 py-3 sm:py-4 font-semibold text-dark-700 text-xs sm:text-sm w-2/5">
                      구분
                    </th>
                    <th className="text-center px-3 sm:px-6 py-3 sm:py-4 font-semibold text-dark-700 text-xs sm:text-sm">
                      10평 일반형
                    </th>
                    <th className="text-center px-3 sm:px-6 py-3 sm:py-4 font-semibold text-dark-700 text-xs sm:text-sm">
                      15평 일반형
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {COST_TABLE.map((item) => {
                    const isFirst = item.category === "가맹비";
                    const isEducation = item.category === "교육비";
                    const isHighlighted = item.category === highlightedCategory;
                    const hasNote = !!item.note;
                    const isOpen = !!openNotes[item.category];

                    return (
                      <React.Fragment key={item.category}>
                        <tr
                          className={`border-b transition-colors ${
                            isHighlighted
                              ? "border-blu-100 bg-gradient-to-r from-blu-50 via-white to-cyan-50 hover:from-blu-100 hover:to-cyan-100"
                              : "border-gray-100 hover:bg-gray-50/50"
                          }`}
                        >
                          {/* Category + ? button */}
                          <td className="px-3 sm:px-6 py-3 sm:py-4 font-medium text-dark-800 text-center">
                            <div className="flex flex-col items-center gap-2 sm:flex-row sm:justify-center">
                              {isHighlighted && (
                                <span className="inline-flex items-center gap-1 rounded-full bg-blu-500 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white shadow-sm">
                                  <svg
                                    aria-hidden="true"
                                    viewBox="0 0 20 20"
                                    className="h-3.5 w-3.5"
                                    fill="currentColor"
                                  >
                                    <path d="M3 8.75A1.75 1.75 0 0 1 4.75 7h10.5A1.75 1.75 0 0 1 17 8.75V10H3V8.75Z" />
                                    <path d="M4 11.5h5.25V17H5.75A1.75 1.75 0 0 1 4 15.25V11.5Zm6.75 0H16v3.75A1.75 1.75 0 0 1 14.25 17h-3.5v-5.5Z" />
                                    <path d="M10 7a.75.75 0 0 1-.75-.75V4.9a1.4 1.4 0 1 0-2.8 0 .75.75 0 0 1-1.5 0 2.9 2.9 0 1 1 5.05 1.95A.74.74 0 0 1 10 7Zm0 0a.75.75 0 0 0 .75-.75V4.9a1.4 1.4 0 1 1 2.8 0 .75.75 0 0 0 1.5 0A2.9 2.9 0 1 0 10 6.85V7Z" />
                                  </svg>
                                  혜택
                                </span>
                              )}
                              <div className="flex items-center justify-center gap-1.5">
                                <span>{item.category}</span>
                                {hasNote && (
                                  <button
                                    onClick={() => toggleNote(item.category)}
                                    className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold transition-colors flex-shrink-0 ${
                                      isOpen
                                        ? "bg-blu-500 text-white"
                                        : "bg-gray-200 text-gray-500 hover:bg-blu-100 hover:text-blu-600"
                                    }`}
                                    aria-label="상세 내용 보기"
                                  >
                                    ?
                                  </button>
                                )}
                              </div>
                            </div>
                          </td>

                          {/* 10평 */}
                          <td
                            className={`px-3 sm:px-6 py-4 text-center ${
                              isHighlighted ? "font-bold text-dark-900" : "text-dark-700"
                            }`}
                          >
                            {isFirst ? (
                              <div className="flex flex-col items-center gap-1">
                                <span className="line-through text-gray-300 text-xs">
                                  10,000,000
                                </span>
                                <span className="font-semibold">{item.cost10}</span>
                              </div>
                            ) : isEducation ? (
                              <div className="flex flex-col items-center gap-1">
                                <span className="line-through text-gray-300 text-xs">
                                  3,000,000
                                </span>
                                <span className="font-semibold">{item.cost10}</span>
                              </div>
                            ) : (
                              <span>{displayCost(item.cost10)}</span>
                            )}
                          </td>

                          {/* 15평 */}
                          <td
                            className={`px-3 sm:px-6 py-4 text-center ${
                              isHighlighted ? "font-bold text-dark-900" : "text-dark-700"
                            }`}
                          >
                            {isFirst ? (
                              <div className="flex flex-col items-center gap-1">
                                <span className="line-through text-gray-300 text-xs">
                                  10,000,000
                                </span>
                                <span className="font-semibold">{item.cost15}</span>
                              </div>
                            ) : isEducation ? (
                              <div className="flex flex-col items-center gap-1">
                                <span className="line-through text-gray-300 text-xs">
                                  3,000,000
                                </span>
                                <span className="font-semibold">{item.cost15}</span>
                              </div>
                            ) : (
                              <span>{displayCost(item.cost15)}</span>
                            )}
                          </td>
                        </tr>

                        {/* 가맹비 할인 배너 */}
                        {isFirst && (
                          <tr>
                            <td colSpan={3} className="px-0 py-0">
                              <div className="bg-cta-500 text-white text-center py-2 text-xs sm:text-sm font-bold tracking-wide">
                                한시적 면제 중 (정가 10,000,000원)
                              </div>
                            </td>
                          </tr>
                        )}

                        {isEducation && (
                          <tr>
                            <td colSpan={3} className="px-0 py-0">
                              <div className="bg-cta-500 text-white text-center py-2 text-xs sm:text-sm font-bold tracking-wide">
                                한시적 면제 중 (정가 3,000,000원)
                              </div>
                            </td>
                          </tr>
                        )}

                        {/* Note row — 토글 */}
                        {hasNote && isOpen && (
                          <tr
                            className={`border-b ${
                              isHighlighted
                                ? "bg-blu-50 border-blu-100"
                                : "bg-blu-50/60 border-blu-100"
                            }`}
                          >
                            <td
                              colSpan={3}
                              className={`px-4 sm:px-8 py-2.5 text-center leading-relaxed ${
                                isHighlighted
                                  ? "text-sm font-semibold text-blu-700"
                                  : "text-xs text-blu-700"
                              }`}
                            >
                              {item.note}
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })}

                  {/* Total row */}
                  <tr className="bg-blu-500 text-white">
                    <td className="px-3 sm:px-6 py-3 sm:py-4 font-bold text-sm sm:text-base text-center">
                      합계
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-center font-bold text-sm sm:text-base">
                      {formatNumber(total10)}
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-center font-bold text-sm sm:text-base">
                      {formatNumber(total15)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <p className="mt-4 text-xs text-gray-400 text-center">
            * 상기 금액은 부가세 별도이며, 매장 상황에 따라 변동될 수 있습니다. &nbsp;* 별도공사비 제외
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
