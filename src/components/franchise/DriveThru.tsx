"use client";

import ScrollReveal from "@/components/ui/ScrollReveal";

export default function DriveThru() {
  return (
    <section className="py-24 md:py-32 bg-warm-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Title */}
        <ScrollReveal>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-dark-800 text-center mb-16 md:mb-20">
            드라이브 스루
          </h2>
        </ScrollReveal>

        {/* Row 1: Specialty DT */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center mb-16 md:mb-24">
          {/* Image placeholder */}
          <ScrollReveal direction="left">
            <div className="h-[280px] sm:h-[320px] rounded-2xl shadow-lg overflow-hidden">
              <img src="/images/franchise/dt-store.png" alt="블루샥 드라이브 스루 매장" className="w-full h-full object-cover" />
            </div>
          </ScrollReveal>

          {/* Text */}
          <ScrollReveal direction="right" delay={0.15}>
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-blu-500/10 text-blu-500 text-xs font-semibold tracking-wide mb-4">
                FIRST IN SPECIALTY
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-dark-800 mb-4">
                스페셜티 최초 DT
              </h3>
              <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-4">
                스페셜티 커피 프랜차이즈 최초로 블루샥 스페셜티 전용 드라이브스루 매장을 오픈하였습니다.
                브랜드와 가맹점의 동반 성장을 위해 블루샥은 끊임없이 혁신하고 도전합니다.
              </p>
            </div>
          </ScrollReveal>
        </div>

        {/* Row 2: Space Design */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* SVG DT Flow Diagram with car animation */}
          <ScrollReveal direction="left">
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100">
              <h4 className="text-lg font-bold text-dark-800 mb-6 text-center">
                DT 동선 설계
              </h4>
              <svg
                viewBox="0 0 400 240"
                className="w-full h-auto"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Road background */}
                <path
                  d="M40 180 C40 180, 100 180, 140 140 C180 100, 220 60, 280 60 C340 60, 360 100, 360 100"
                  stroke="#E5E7EB"
                  strokeWidth="28"
                  strokeLinecap="round"
                />

                {/* Road center line (dashed) */}
                <path
                  d="M40 180 C40 180, 100 180, 140 140 C180 100, 220 60, 280 60 C340 60, 360 100, 360 100"
                  stroke="#1A73B5"
                  strokeWidth="2"
                  strokeDasharray="8 6"
                  strokeLinecap="round"
                />

                {/* DT Store between station 2 and 3 */}
                <g transform="translate(185, 90)">
                  {/* Store building */}
                  <rect x="0" y="0" width="110" height="80" rx="5" fill="#1A73B5" opacity="0.08" stroke="#1A73B5" strokeWidth="1.5" />
                  {/* Roof */}
                  <rect x="0" y="-8" width="110" height="10" rx="3" fill="#1A73B5" opacity="0.2" />
                  {/* Windows row */}
                  <rect x="10" y="14" width="22" height="16" rx="2" fill="#87CEEB" opacity="0.5" />
                  <rect x="38" y="14" width="22" height="16" rx="2" fill="#87CEEB" opacity="0.5" />
                  <rect x="66" y="14" width="22" height="16" rx="2" fill="#87CEEB" opacity="0.5" />
                  {/* Door */}
                  <rect x="93" y="20" width="10" height="60" rx="2" fill="#1A73B5" opacity="0.25" />
                  {/* BLU SHAAK label */}
                  <text x="55" y="52" textAnchor="middle" fill="#1A73B5" fontSize="9" fontWeight="bold" fontFamily="'DM Sans', sans-serif">
                    BLU SHAAK
                  </text>
                  {/* DT label */}
                  <text x="55" y="70" textAnchor="middle" fill="#6B7280" fontSize="11" fontWeight="600" fontFamily="'Pretendard', sans-serif">
                    블루샥 DT점
                  </text>
                </g>

                {/* Animated car path */}
                <path
                  id="carPath"
                  d="M40 180 C40 180, 100 180, 140 140 C180 100, 220 60, 280 60 C340 60, 360 100, 360 100"
                  stroke="none"
                  fill="none"
                />

                {/* Animated car */}
                <g>
                  <animateMotion
                    dur="5s"
                    repeatCount="indefinite"
                    rotate="auto"
                  >
                    <mpath href="#carPath" />
                  </animateMotion>
                  {/* Car body */}
                  <rect x="-14" y="-6" width="28" height="12" rx="4" fill="#1A73B5" />
                  {/* Car top */}
                  <rect x="-8" y="-10" width="16" height="6" rx="2" fill="#3B9AE1" />
                  {/* Wheels */}
                  <circle cx="-8" cy="6" r="3" fill="#2A2A2A" />
                  <circle cx="8" cy="6" r="3" fill="#2A2A2A" />
                  <circle cx="-8" cy="6" r="1.5" fill="#6B7280" />
                  <circle cx="8" cy="6" r="1.5" fill="#6B7280" />
                  {/* Headlight */}
                  <rect x="12" y="-3" width="3" height="3" rx="1" fill="#FFD700" opacity="0.8" />
                </g>

                {/* Station markers */}
                {/* Entry */}
                <circle cx="40" cy="180" r="14" fill="#1A73B5" />
                <text x="40" y="184" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">
                  1
                </text>
                <text x="40" y="206" textAnchor="middle" fill="#2A2A2A" fontSize="11" fontWeight="600">
                  입장
                </text>

                {/* Order */}
                <circle cx="150" cy="132" r="14" fill="#3DCBA8" />
                <text x="150" y="136" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">
                  2
                </text>
                <text x="150" y="120" textAnchor="middle" fill="#2A2A2A" fontSize="11" fontWeight="600">
                  주문
                </text>

                {/* Pickup */}
                <circle cx="280" cy="60" r="14" fill="#F59E0B" />
                <text x="280" y="64" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">
                  3
                </text>
                <text x="280" y="48" textAnchor="middle" fill="#2A2A2A" fontSize="11" fontWeight="600">
                  수령
                </text>

                {/* Exit */}
                <circle cx="360" cy="100" r="14" fill="#D42B2B" />
                <text x="360" y="104" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">
                  4
                </text>
                <text x="360" y="126" textAnchor="middle" fill="#2A2A2A" fontSize="11" fontWeight="600">
                  퇴장
                </text>

                {/* Direction arrows */}
                <path d="M58 178 L80 170" stroke="#1A73B5" strokeWidth="1.5" markerEnd="url(#arrowhead)" />
                <defs>
                  <marker
                    id="arrowhead"
                    markerWidth="8"
                    markerHeight="6"
                    refX="8"
                    refY="3"
                    orient="auto"
                  >
                    <polygon points="0 0, 8 3, 0 6" fill="#1A73B5" />
                  </marker>
                </defs>
              </svg>
            </div>
          </ScrollReveal>

          {/* Text + small photos */}
          <ScrollReveal direction="right" delay={0.15}>
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-mint-500/10 text-mint-600 text-xs font-semibold tracking-wide mb-4">
                SPACE DESIGN
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-dark-800 mb-4">
                공간 설계 역량
              </h3>
              <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-6">
                차량 동선 최적화 및 주문 구조 설계를 통해
                복합시설 및 특수상권에서도 높은 완성도의 매장 구현이 가능합니다.
              </p>

              {/* Space design image */}
              <div className="rounded-xl overflow-hidden shadow-md">
                <img src="/images/franchise/space-design.png" alt="공간 설계 역량" className="w-full h-auto object-cover" />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
