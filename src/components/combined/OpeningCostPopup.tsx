"use client";

import { Fragment, useEffect, useMemo, useState } from "react";
import Button from "@/components/ui/Button";
import { COST_TABLE } from "@/lib/franchiseData";

const SESSION_STORAGE_KEY = "blushaak-opening-cost-popup-seen";

const POPUP_CATEGORIES = [
  "가맹비",
  "교육비",
  "인테리어",
  "기기 및 장비 (2G 기준)",
  "초도비품",
] as const;

const POPUP_NOTES: Partial<Record<(typeof POPUP_CATEGORIES)[number], string>> = {
  "가맹비": "한시적 면제 중 (정가 10,000,000원)",
  "교육비": "한시적 면제 중 (정가 3,000,000원)",
  "기기 및 장비 (2G 기준)": "오븐기/비닝 쇼케이스/그라인더 3대 포함",
};

const EQUIPMENT_SUPPORT_LABEL = "커피머신 지원";

const TOTALS = {
  10: "72,300,000",
  15: "84,800,000",
};

function formatCellValue(_: string, value: string) {
  return value;
}

export default function OpeningCostPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [openNotes, setOpenNotes] = useState<Record<string, boolean>>({
    "기기 및 장비 (2G 기준)": true,
  });

  const popupRows = useMemo(
    () => COST_TABLE.filter((item) => POPUP_CATEGORIES.includes(item.category as (typeof POPUP_CATEGORIES)[number])),
    []
  );

  useEffect(() => {
    const hasSeenPopup = window.sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (hasSeenPopup) {
      return;
    }

    window.sessionStorage.setItem(SESSION_STORAGE_KEY, "true");
    const frameId = window.requestAnimationFrame(() => {
      setIsOpen(true);
    });

    return () => window.cancelAnimationFrame(frameId);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      document.body.style.removeProperty("overflow");
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleConsultClick = () => {
    setIsOpen(false);
    setTimeout(() => {
      document.getElementById("inquiry")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 150);
  };

  const toggleNote = (category: string) => {
    setOpenNotes((prev) => ({ ...prev, [category]: !prev[category] }));
  };

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-blu-900/70 px-4 py-6 backdrop-blur-[3px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="opening-cost-popup-title"
    >
      <div className="relative w-full max-w-4xl overflow-hidden rounded-[32px] border border-white/20 bg-white shadow-[0_30px_80px_rgba(6,27,49,0.35)]">
        <div className="bg-gradient-to-r from-blu-700 via-blu-600 to-cyan-500 px-6 py-6 text-white sm:px-8">
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="팝업 닫기"
            className="absolute right-5 top-5 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
          <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.24em] text-white/75">
            Opening Benefit
          </p>
          <h2 id="opening-cost-popup-title" className="pr-12 text-2xl font-black leading-tight sm:text-[32px]">
            신규 가맹 혜택 | 최대 2300만원 지원
          </h2>
        </div>

        <div className="max-h-[calc(100vh-180px)] overflow-y-auto px-4 py-5 sm:px-8 sm:py-7">
          <div className="overflow-hidden rounded-3xl border border-blu-100 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-sm">
                <thead>
                  <tr className="bg-blu-50 text-dark-800">
                    <th className="w-[32%] px-5 py-4 text-center text-xs font-bold tracking-[0.08em] sm:text-sm">
                      구분
                    </th>
                    <th className="px-5 py-4 text-center text-xs font-bold tracking-[0.08em] sm:text-sm">
                      10평 일반형
                    </th>
                    <th className="px-5 py-4 text-center text-xs font-bold tracking-[0.08em] sm:text-sm">
                      15평 일반형
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-blu-100 bg-gradient-to-r from-blu-600 via-blu-500 to-cyan-500 text-white">
                    <td colSpan={3} className="px-5 py-4">
                      <div className="flex flex-col items-center justify-center gap-2 text-center sm:flex-row sm:gap-3">
                        <span className="inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-white/90">
                          신규 가맹 혜택
                        </span>
                        <span className="text-base font-black sm:text-lg">
                          {EQUIPMENT_SUPPORT_LABEL}
                        </span>
                      </div>
                    </td>
                  </tr>
                  {popupRows.map((item) => {
                    const note = POPUP_NOTES[item.category as keyof typeof POPUP_NOTES];
                    const isExempted = item.category === "가맹비" || item.category === "교육비";
                    const isEquipment = item.category === "기기 및 장비 (2G 기준)";
                    const isOpenNote = !!openNotes[item.category];

                    return (
                      <Fragment key={item.category}>
                        <tr className="border-t border-gray-100 bg-white">
                          <td className="px-5 py-4 text-center font-semibold text-dark-800">
                            <div className="flex flex-col items-center justify-center gap-2">
                              <div className="flex items-center justify-center gap-2">
                                <span>{item.category}</span>
                                {note && !isEquipment && (
                                  <button
                                    type="button"
                                    onClick={() => toggleNote(item.category)}
                                    aria-label={`${item.category} 설명 보기`}
                                    className={`inline-flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold transition-colors ${
                                      isOpenNote
                                        ? "bg-blu-500 text-white"
                                        : "bg-gray-200 text-gray-600 hover:bg-blu-100 hover:text-blu-600"
                                    }`}
                                  >
                                    ?
                                  </button>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-4 text-center text-dark-800">
                            {isExempted ? (
                              <div className="flex flex-col items-center gap-1">
                                <span className="text-xs text-gray-300 line-through">
                                  {item.category === "가맹비" ? "10,000,000" : "3,000,000"}
                                </span>
                                <span className="font-bold text-cta-500">{formatCellValue(item.category, item.cost10)}</span>
                              </div>
                            ) : (
                              <div className={isEquipment ? "flex flex-col gap-1" : ""}>
                                <span className={isEquipment ? "block w-full text-center font-semibold" : ""}>
                                  {formatCellValue(item.category, item.cost10)}
                                </span>
                                {isEquipment && note && (
                                  <span className="w-full pr-1 text-right text-xs font-normal leading-relaxed text-gray-500 sm:pr-4">
                                    {note}
                                  </span>
                                )}
                              </div>
                            )}
                          </td>
                          <td className="px-5 py-4 text-center text-dark-800">
                            {isExempted ? (
                              <div className="flex flex-col items-center gap-1">
                                <span className="text-xs text-gray-300 line-through">
                                  {item.category === "가맹비" ? "10,000,000" : "3,000,000"}
                                </span>
                                <span className="font-bold text-cta-500">{formatCellValue(item.category, item.cost15)}</span>
                              </div>
                            ) : (
                              <div className={isEquipment ? "flex flex-col gap-1" : ""}>
                                <span className={isEquipment ? "block w-full text-center font-semibold" : ""}>
                                  {formatCellValue(item.category, item.cost15)}
                                </span>
                                {isEquipment && note && (
                                  <span className="w-full pr-1 text-right text-xs font-normal leading-relaxed text-gray-500 sm:pr-4">
                                    {note}
                                  </span>
                                )}
                              </div>
                            )}
                          </td>
                        </tr>
                        {note && !isEquipment && isOpenNote && (
                          <tr className="border-t border-blu-100 bg-blu-50/70">
                            <td
                              colSpan={3}
                              className="px-6 py-3 text-center text-xs font-medium leading-relaxed text-blu-700 sm:text-sm"
                            >
                              {note}
                            </td>
                          </tr>
                        )}
                      </Fragment>
                    );
                  })}
                  <tr className="bg-blu-600 text-white">
                    <td className="px-5 py-4 text-center text-sm font-bold sm:text-base">합계</td>
                    <td className="px-5 py-4 text-center text-sm font-black sm:text-base">{TOTALS[10]}</td>
                    <td className="px-5 py-4 text-center text-sm font-black sm:text-base">{TOTALS[15]}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <p className="mt-4 text-center text-xs leading-relaxed text-gray-500 sm:text-sm">
            * 상기 금액은 부가세 별도이며, 매장 상황에 따라 변동될 수 있습니다. * 별도공사비 제외
          </p>

          <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Button type="button" variant="ghost" className="border border-gray-200 px-5 py-3 text-sm text-gray-600 hover:bg-gray-50" onClick={() => setIsOpen(false)}>
              닫기
            </Button>
            <Button type="button" variant="primary" className="px-6 py-3 text-sm font-bold shadow-[0_12px_30px_rgba(26,115,181,0.24)]" onClick={handleConsultClick}>
              창업 상담 문의하기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
