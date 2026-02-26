"use client";

import { useState } from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { COST_TABLE } from "@/lib/franchiseData";

export default function CostTable() {
  const [expandedNote, setExpandedNote] = useState<number | null>(null);

  // Calculate totals (only numeric values)
  const parseNumber = (val: string) => {
    const n = parseInt(val.replace(/,/g, ""), 10);
    return isNaN(n) ? 0 : n;
  };

  const total10 = COST_TABLE.reduce((sum, item) => sum + parseNumber(item.cost10), 0);
  const total15 = COST_TABLE.reduce((sum, item) => sum + parseNumber(item.cost15), 0);

  const formatNumber = (n: number) => {
    if (n === 0) return "-";
    return n.toLocaleString();
  };

  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-5xl mx-auto px-4">
        {/* Title */}
        <ScrollReveal>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-dark-800 text-center mb-16 md:mb-20">
            개설 비용
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left px-4 sm:px-6 py-4 font-semibold text-dark-700 min-w-[140px]">
                      구분
                    </th>
                    <th className="text-right px-4 sm:px-6 py-4 font-semibold text-dark-700 min-w-[120px]">
                      10평 일반형
                    </th>
                    <th className="text-right px-4 sm:px-6 py-4 font-semibold text-dark-700 min-w-[120px]">
                      15평 일반형
                    </th>
                    <th className="text-left px-4 sm:px-6 py-4 font-semibold text-dark-700 hidden lg:table-cell min-w-[200px]">
                      비고
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {COST_TABLE.map((item, index) => {
                    const isFirst = item.category === "가맹비";
                    const hasNote = !!item.note;

                    return (
                      <tr
                        key={item.category}
                        className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors"
                      >
                        {/* Category */}
                        <td className="px-4 sm:px-6 py-4 font-medium text-dark-800">
                          <div className="flex items-center gap-2">
                            {item.category}
                            {/* Mobile note toggle */}
                            {hasNote && (
                              <button
                                type="button"
                                onClick={() =>
                                  setExpandedNote(expandedNote === index ? null : index)
                                }
                                className="lg:hidden w-5 h-5 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center text-xs hover:bg-gray-200 transition-colors"
                                aria-label="비고 보기"
                              >
                                ?
                              </button>
                            )}
                          </div>

                          {/* Mobile expanded note */}
                          {hasNote && expandedNote === index && (
                            <p className="mt-2 text-xs text-gray-400 leading-relaxed lg:hidden">
                              {item.note}
                            </p>
                          )}
                        </td>

                        {/* 10평 */}
                        <td className="px-4 sm:px-6 py-4 text-right text-dark-700">
                          {isFirst ? (
                            <div className="flex flex-col items-end gap-1">
                              <span className="line-through text-gray-300 text-xs">
                                10,000,000
                              </span>
                              <div className="flex items-center gap-2">
                                <span className="font-semibold">{item.cost10}</span>
                                <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-bold bg-cta-500 text-white">
                                  한시적 할인
                                </span>
                              </div>
                            </div>
                          ) : (
                            <span>{item.cost10}</span>
                          )}
                        </td>

                        {/* 15평 */}
                        <td className="px-4 sm:px-6 py-4 text-right text-dark-700">
                          {isFirst ? (
                            <div className="flex flex-col items-end gap-1">
                              <span className="line-through text-gray-300 text-xs">
                                10,000,000
                              </span>
                              <div className="flex items-center gap-2">
                                <span className="font-semibold">{item.cost15}</span>
                                <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-bold bg-cta-500 text-white">
                                  한시적 할인
                                </span>
                              </div>
                            </div>
                          ) : (
                            <span>{item.cost15}</span>
                          )}
                        </td>

                        {/* Note (desktop) */}
                        <td className="px-4 sm:px-6 py-4 text-gray-400 text-xs hidden lg:table-cell">
                          {item.note || "-"}
                        </td>
                      </tr>
                    );
                  })}

                  {/* Total row */}
                  <tr className="bg-blu-500 text-white">
                    <td className="px-4 sm:px-6 py-4 font-bold text-base">
                      합계
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-right font-bold text-base">
                      {formatNumber(total10)}
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-right font-bold text-base">
                      {formatNumber(total15)}
                    </td>
                    <td className="px-4 sm:px-6 py-4 hidden lg:table-cell text-white/70 text-xs">
                      별도공사비 제외
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Disclaimer */}
          <p className="mt-4 text-xs text-gray-400 text-center">
            * 상기 금액은 부가세 별도이며, 매장 상황에 따라 변동될 수 있습니다.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
