"use client";

import { motion } from "framer-motion";
import { MenuItem } from "@/types";

interface MenuCardProps {
  item: MenuItem;
  onClick?: (item: MenuItem) => void;
}

export default function MenuCard({ item, onClick }: MenuCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group cursor-pointer"
      onClick={() => onClick?.(item)}
    >
      <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        {/* Image area */}
        <div className="relative aspect-square overflow-hidden bg-warm-50">
          <img
            src={item.image}
            alt={item.nameKo}
            className="absolute inset-0 w-full h-full object-contain p-3 transition-transform duration-500 group-hover:scale-105"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex gap-1.5">
            {item.isNew && (
              <span className="rounded-md bg-cta-500 px-2 py-0.5 text-[11px] font-bold text-white shadow-sm">
                NEW
              </span>
            )}
            {item.isBest && (
              <span className="rounded-md bg-blu-500 px-2 py-0.5 text-[11px] font-bold text-white shadow-sm">
                BEST
              </span>
            )}
          </div>

          {/* Nutrition indicator */}
          {item.nutrition && (
            <div className="absolute bottom-3 right-3 rounded-full bg-white/90 backdrop-blur-sm px-2 py-0.5 text-[10px] font-semibold text-blu-600 shadow-sm">
              영양정보
            </div>
          )}
        </div>

        {/* Info area */}
        <div className="p-4 text-center">
          <h3 className="text-base font-semibold text-dark-800">
            {item.nameKo}
          </h3>
          <p className="mt-0.5 text-xs font-medium text-gray-400 font-[family-name:var(--font-dm-sans)]">
            {item.name}
          </p>
          {item.description && (
            <p className="mt-2 text-sm leading-relaxed text-gray-500 line-clamp-2">
              {item.description}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
