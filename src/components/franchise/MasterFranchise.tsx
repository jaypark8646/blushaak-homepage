"use client";

import { motion } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { GLOBAL_LOCATIONS } from "@/lib/franchiseData";

function WorldMap() {
  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <svg
        viewBox="0 0 800 400"
        className="w-full h-auto"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Simplified world map - continent outlines */}
        {/* North America */}
        <path
          d="M80 80 C100 60, 140 50, 180 55 C200 58, 220 70, 230 90 C240 110, 235 130, 220 150 C210 160, 190 170, 170 175 C150 178, 130 175, 120 165 C100 155, 85 140, 80 120 Z"
          fill="#E8F4FC"
          stroke="#B8DEF5"
          strokeWidth="1"
        />
        {/* Central America */}
        <path
          d="M150 175 C155 180, 160 190, 155 200 C150 210, 145 215, 140 220 C138 225, 142 228, 148 230"
          fill="#E8F4FC"
          stroke="#B8DEF5"
          strokeWidth="1"
        />
        {/* South America */}
        <path
          d="M148 230 C165 235, 185 250, 195 270 C205 290, 200 310, 190 330 C180 345, 170 355, 160 360 C150 355, 145 340, 145 320 C142 300, 138 280, 140 260 C142 245, 145 235, 148 230 Z"
          fill="#E8F4FC"
          stroke="#B8DEF5"
          strokeWidth="1"
        />
        {/* Europe */}
        <path
          d="M350 60 C370 55, 390 58, 410 65 C420 70, 425 80, 420 90 C415 100, 405 105, 395 110 C380 115, 365 112, 355 105 C345 98, 340 85, 345 72 Z"
          fill="#E8F4FC"
          stroke="#B8DEF5"
          strokeWidth="1"
        />
        {/* Africa */}
        <path
          d="M370 130 C385 125, 405 128, 420 140 C435 155, 440 175, 435 200 C430 225, 420 250, 410 270 C400 285, 390 290, 380 285 C370 275, 365 260, 365 240 C365 220, 360 200, 358 180 C356 160, 360 140, 370 130 Z"
          fill="#E8F4FC"
          stroke="#B8DEF5"
          strokeWidth="1"
        />
        {/* Asia */}
        <path
          d="M430 55 C460 48, 500 50, 540 55 C580 60, 620 70, 650 85 C670 95, 680 110, 675 125 C670 140, 650 150, 630 155 C610 160, 580 158, 560 150 C540 145, 520 140, 500 135 C480 130, 460 120, 450 105 C440 90, 430 75, 430 55 Z"
          fill="#E8F4FC"
          stroke="#B8DEF5"
          strokeWidth="1"
        />
        {/* Korea */}
        <circle cx="625" cy="115" r="5" fill="#1A73B5" opacity="0.3" />
        {/* Southeast Asia / Indonesia */}
        <path
          d="M560 190 C575 185, 595 188, 610 195 C625 200, 640 210, 650 220 C660 230, 665 240, 660 245 C650 250, 635 248, 620 240 C605 232, 590 222, 575 215 C565 210, 558 200, 560 190 Z"
          fill="#E8F4FC"
          stroke="#B8DEF5"
          strokeWidth="1"
        />
        {/* Australia */}
        <path
          d="M600 290 C620 280, 660 278, 690 285 C710 290, 720 305, 715 320 C710 335, 695 345, 675 348 C655 350, 630 345, 615 335 C600 325, 590 310, 595 298 Z"
          fill="#E8F4FC"
          stroke="#B8DEF5"
          strokeWidth="1"
        />

        {/* Jakarta marker (Indonesia) - approximate position */}
        <g>
          <motion.circle
            cx="608"
            cy="225"
            r="12"
            fill="#1A73B5"
            opacity={0.15}
            animate={{
              r: [12, 20, 12],
              opacity: [0.15, 0.05, 0.15],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.circle
            cx="608"
            cy="225"
            r="6"
            fill="#1A73B5"
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <text x="608" y="250" textAnchor="middle" fill="#1A73B5" fontSize="11" fontWeight="600">
            Jakarta
          </text>
        </g>

        {/* Toronto marker (Canada) - approximate position */}
        <g>
          <motion.circle
            cx="185"
            cy="95"
            r="12"
            fill="#D42B2B"
            opacity={0.15}
            animate={{
              r: [12, 20, 12],
              opacity: [0.15, 0.05, 0.15],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
          <motion.circle
            cx="185"
            cy="95"
            r="6"
            fill="#D42B2B"
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
          <text x="185" y="120" textAnchor="middle" fill="#D42B2B" fontSize="11" fontWeight="600">
            Toronto
          </text>
        </g>

        {/* Korea home marker */}
        <g>
          <circle cx="625" cy="115" r="4" fill="#1A73B5" />
          <text x="625" y="140" textAnchor="middle" fill="#1A73B5" fontSize="9" fontWeight="600">
            HQ
          </text>
        </g>

        {/* Connection lines from Korea */}
        <path
          d="M625 115 Q600 170, 608 225"
          stroke="#1A73B5"
          strokeWidth="1"
          strokeDasharray="4 4"
          opacity="0.4"
        />
        <path
          d="M625 115 Q400 80, 185 95"
          stroke="#D42B2B"
          strokeWidth="1"
          strokeDasharray="4 4"
          opacity="0.4"
        />
      </svg>
    </div>
  );
}

export default function MasterFranchise() {
  return (
    <section id="global" className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Title */}
        <ScrollReveal>
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-dark-800 mb-4">
              마스터 프랜차이즈
            </h2>
            <p className="text-gray-500 text-base sm:text-lg max-w-2xl mx-auto">
              세계 속의 블루샥, 글로벌 파트너와 함께 성장합니다.
            </p>
          </div>
        </ScrollReveal>

        {/* Explanation */}
        <ScrollReveal delay={0.1}>
          <div className="max-w-3xl mx-auto mb-12 md:mb-16">
            <div className="bg-blu-50 rounded-2xl p-6 sm:p-8">
              <h3 className="text-lg font-bold text-blu-700 mb-3">
                Master Franchise란?
              </h3>
              <p className="text-blu-600/80 text-sm sm:text-base leading-relaxed">
                마스터 프랜차이즈는 해외 특정 지역에 대한 독점적 사업권을 파트너에게 부여하는 글로벌 확장 모델입니다.
                현지 파트너가 해당 국가/지역의 블루샥 브랜드 운영, 매장 개설, 하위 가맹점 관리를 총괄하며,
                본사는 브랜드 표준, 원두 공급, 교육 시스템을 지원합니다.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* World Map */}
        <ScrollReveal delay={0.15}>
          <div className="mb-16 md:mb-20">
            <WorldMap />
          </div>
        </ScrollReveal>

        {/* Overseas store cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {GLOBAL_LOCATIONS.map((location, index) => (
            <ScrollReveal key={location.country} delay={0.1 * index}>
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                {/* Store image */}
                <div className="h-[250px] sm:h-[300px] relative overflow-hidden">
                  <img
                    src={location.country === "Indonesia" ? "/images/franchise/global-indonesia.jpg" : "/images/franchise/global-canada.jpg"}
                    alt={location.countryKo}
                    className="w-full h-full object-cover"
                  />
                  {/* Flag overlay */}
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1.5 flex items-center gap-2">
                    <span className="text-xl">{location.flag}</span>
                    <span className="text-sm font-semibold text-dark-800">
                      {location.city}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl">{location.flag}</span>
                    <div>
                      <h3 className="text-xl font-bold text-dark-800">
                        {location.countryKo}
                      </h3>
                      <p className="text-sm text-gray-400 font-[family-name:var(--font-dm-sans)]">
                        {location.city}, {location.country}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {location.description}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
