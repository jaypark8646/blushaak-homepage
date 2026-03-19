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
      {/* Mobile: 양쪽 탭이 동시에 보이는 pill — 하단 바 바로 위 중앙 */}
      <div className="fixed bottom-[68px] left-1/2 -translate-x-1/2 z-50 md:hidden">
        <div className="flex items-center rounded-full bg-white shadow-[0_4px_20px_rgba(0,0,0,0.18)] ring-1 ring-black/10 overflow-hidden">
          <button
            onClick={scrollToTop}
            className={`px-5 py-2.5 text-[12px] font-bold tracking-wide transition-all ${
              currentSection === "brand"
                ? "bg-[#1A3A6B] text-white"
                : "text-gray-400"
            }`}
          >
            ↑ 브랜드
          </button>
          <div className="w-px h-4 bg-gray-200 flex-shrink-0" />
          <button
            onClick={scrollToFranchise}
            className={`px-5 py-2.5 text-[12px] font-bold tracking-wide transition-all ${
              currentSection === "franchise"
                ? "bg-[#1A3A6B] text-white"
                : "text-gray-400"
            }`}
          >
            창업정보 ↓
          </button>
        </div>
      </div>

      {/* Desktop: 좌측 하단 pill — 양쪽 탭 동시 표시 */}
      <div className="fixed bottom-8 left-4 xl:left-6 z-40 hidden md:block">
        <div className="flex items-center rounded-full bg-white shadow-lg ring-1 ring-black/10 overflow-hidden">
          <button
            onClick={scrollToTop}
            className={`px-4 py-2.5 text-[12px] font-bold tracking-wide transition-all ${
              currentSection === "brand"
                ? "bg-[#1A3A6B] text-white"
                : "text-gray-400 hover:text-[#1A3A6B]"
            }`}
          >
            ↑ 브랜드
          </button>
          <div className="w-px h-4 bg-gray-200 flex-shrink-0" />
          <button
            onClick={scrollToFranchise}
            className={`px-4 py-2.5 text-[12px] font-bold tracking-wide transition-all ${
              currentSection === "franchise"
                ? "bg-[#1A3A6B] text-white"
                : "text-gray-400 hover:text-[#1A3A6B]"
            }`}
          >
            창업정보 ↓
          </button>
        </div>
      </div>
    </>
  );
}
