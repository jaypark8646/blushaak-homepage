"use client";

import React, { useState } from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { COST_TABLE } from "@/lib/franchiseData";

export default function CostTable() {
  const [openNotes, setOpenNotes] = useState<Record<string, boolean>>({});

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
                    const hasNote = !!item.note;
                    const isOpen = !!openNotes[item.category];

                    return (
                      <React.Fragment key={item.category}>
                        <tr className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                          {/* Category + ? button */}
                          <td className="px-3 sm:px-6 py-3 sm:py-4 font-medium text-dark-800 text-center">
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
                          </td>

                          {/* 10평 */}
                          <td className="px-3 sm:px-6 py-4 text-center text-dark-700">
                            {isFirst ? (
                              <div className="flex flex-col items-center gap-1">
                                <span className="line-through text-gray-300 text-xs">
                                  10,000,000
                                </span>
                                <span className="font-semibold">{item.cost10}</span>
                              </div>
                            ) : (
                              <span>{displayCost(item.cost10)}</span>
                            )}
                          </td>

                          {/* 15평 */}
                          <td className="px-3 sm:px-6 py-4 text-center text-dark-700">
                            {isFirst ? (
                              <div className="flex flex-col items-center gap-1">
                                <span className="line-through text-gray-300 text-xs">
                                  10,000,000
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
                                한시적 할인 중 (정가 10,000,000원)
                              </div>
                            </td>
                          </tr>
                        )}

                        {/* Note row — 토글 */}
                        {hasNote && isOpen && (
                          <tr className="bg-blu-50/60 border-b border-blu-100">
                            <td colSpan={3} className="px-4 sm:px-8 py-2.5 text-xs text-blu-700 leading-relaxed text-center">
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
