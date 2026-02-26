"use client";

import { MenuCategoryInfo } from "@/types";

interface CategoryTabsProps {
  categories: MenuCategoryInfo[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function CategoryTabs({
  categories,
  activeCategory,
  onCategoryChange,
}: CategoryTabsProps) {
  return (
    <div className="overflow-x-auto pb-2 scrollbar-hide">
      <div className="flex gap-2 min-w-max px-1">
        {/* All tab */}
        <button
          onClick={() => onCategoryChange("all")}
          className={`
            px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200
            font-[family-name:var(--font-dm-sans)] whitespace-nowrap cursor-pointer
            ${
              activeCategory === "all"
                ? "bg-blu-500 text-white shadow-sm"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }
          `}
        >
          All
        </button>

        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`
              px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200
              font-[family-name:var(--font-dm-sans)] whitespace-nowrap cursor-pointer
              ${
                activeCategory === category.id
                  ? "bg-blu-500 text-white shadow-sm"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }
            `}
          >
            {category.label}
          </button>
        ))}
      </div>
    </div>
  );
}
