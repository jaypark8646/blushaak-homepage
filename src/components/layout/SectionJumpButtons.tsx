"use client";

interface SectionJumpButtonsProps {
  currentSection: "brand" | "franchise";
}

export function SectionJumpButtons({ currentSection }: SectionJumpButtonsProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToFranchise = () => {
    const el = document.getElementById("franchise");
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      {/* Desktop: bottom-left floating */}
      <div className="fixed bottom-8 left-4 xl:left-6 z-40 hidden md:flex flex-col gap-2">
        {currentSection === "brand" && (
          <button
            onClick={scrollToFranchise}
            className="flex items-center gap-2 rounded-full bg-white pl-4 pr-5 py-2.5 text-[13px] font-medium shadow-md ring-1 ring-black/5 text-gray-700 hover:text-blu-500 hover:ring-blu-200 hover:shadow-lg transition-all"
          >
            <span className="text-blu-400">↓</span>
            프랜차이즈 정보
          </button>
        )}
        {currentSection === "franchise" && (
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 rounded-full bg-white pl-4 pr-5 py-2.5 text-[13px] font-medium shadow-md ring-1 ring-black/5 text-gray-700 hover:text-blu-500 hover:ring-blu-200 hover:shadow-lg transition-all"
          >
            <span className="text-blu-400">↑</span>
            브랜드 스토리
          </button>
        )}
      </div>

      {/* Mobile: floating pill above the bottom nav */}
      <div className="fixed bottom-[72px] right-4 z-40 md:hidden">
        {currentSection === "brand" && (
          <button
            onClick={scrollToFranchise}
            className="flex items-center gap-1.5 rounded-full bg-white px-3.5 py-2 text-[12px] font-medium shadow-md ring-1 ring-black/5 text-gray-600"
          >
            <span className="text-blu-400">↓</span>
            창업 정보
          </button>
        )}
        {currentSection === "franchise" && (
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 rounded-full bg-white px-3.5 py-2 text-[12px] font-medium shadow-md ring-1 ring-black/5 text-gray-600"
          >
            <span className="text-blu-400">↑</span>
            브랜드
          </button>
        )}
      </div>
    </>
  );
}
