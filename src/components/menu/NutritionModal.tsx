"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MenuItem } from "@/types";

interface NutritionModalProps {
  item: MenuItem | null;
  onClose: () => void;
}

export default function NutritionModal({ item, onClose }: NutritionModalProps) {
  useEffect(() => {
    if (!item) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [item, onClose]);

  return (
    <AnimatePresence>
      {item && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="pointer-events-auto w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header with image */}
              <div className="relative h-56 overflow-hidden bg-warm-50">
                <img
                  src={item.image}
                  alt={item.nameKo}
                  className="absolute inset-0 h-full w-full object-contain p-4"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/40 transition-colors"
                  aria-label="닫기"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
                <div className="absolute bottom-4 left-4 right-4">
                  <h2 className="text-xl font-bold text-white">{item.nameKo}</h2>
                  <p className="text-sm text-white/80 font-[family-name:var(--font-dm-sans)]">{item.name}</p>
                </div>
              </div>

              {/* Nutrition content */}
              <div className="p-5">
                {item.nutrition ? (
                  <>
                    <h3 className="text-sm font-semibold text-dark-800 mb-3">영양성분 정보</h3>
                    <div className="space-y-2">
                      <NutritionRow
                        label="칼로리"
                        unit="kcal"
                        value={item.nutrition.calories}
                        highlight
                      />
                      <NutritionRow label="나트륨" unit="mg" value={item.nutrition.sodium} />
                      <NutritionRow label="당류" unit="g" value={item.nutrition.sugar} />
                      <NutritionRow label="포화지방" unit="g" value={item.nutrition.saturatedFat} />
                      <NutritionRow label="단백질" unit="g" value={item.nutrition.protein} />
                      <NutritionRow label="카페인" unit="mg" value={item.nutrition.caffeine} />
                    </div>

                    {/* Allergens */}
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="flex items-start gap-2">
                        <span className="text-sm text-gray-500 shrink-0">알레르기 유발물질</span>
                        <span className="text-sm font-medium text-dark-800 text-right flex-1">
                          {item.nutrition.allergens ?? "-"}
                        </span>
                      </div>
                    </div>

                    <p className="mt-4 text-[11px] text-gray-400 leading-relaxed">
                      * 표준 레시피 기준. 주문 내용 및 음료 사이즈에 따라 영양성분이 달라질 수 있습니다.
                    </p>
                  </>
                ) : (
                  <div className="py-6 text-center">
                    <p className="text-gray-400 text-sm">영양성분 정보가 준비 중입니다.</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function NutritionRow({
  label,
  unit,
  value,
  highlight,
}: {
  label: string;
  unit: string;
  value: number | null;
  highlight?: boolean;
}) {
  const displayValue = value !== null && value !== undefined ? value : null;

  return (
    <div className={`flex items-center justify-between py-1.5 ${highlight ? "border-b border-gray-100" : ""}`}>
      <span className={`text-sm ${highlight ? "font-semibold text-dark-800" : "text-gray-500"}`}>
        {label}
        <span className="text-xs ml-0.5 text-gray-400">({unit})</span>
      </span>
      <span className={`text-sm font-semibold ${highlight ? "text-blu-600 text-base" : "text-dark-700"}`}>
        {displayValue !== null ? displayValue : "-"}
      </span>
    </div>
  );
}
