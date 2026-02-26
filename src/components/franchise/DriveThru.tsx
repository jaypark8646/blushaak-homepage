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
              <img src="/images/franchise/dt-store.jpg" alt="블루샥 드라이브 스루 매장" className="w-full h-full object-cover" />
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
                블루샥은 스페셜티 프랜차이즈 최초로 드라이브 스루(Drive-Thru) 매장을 운영합니다.
                고품질 스페셜티 커피를 차에서 내리지 않고 편리하게 즐길 수 있는 새로운 경험을 제공하며,
                드라이브 스루 매장은 일반 매장 대비 높은 회전율과 추가 매출을 기대할 수 있습니다.
              </p>
              <p className="text-gray-400 text-sm leading-relaxed">
                차량 이용 고객의 편의성을 극대화하여 출퇴근 시간대 피크 매출을 확보하고,
                테이크아웃 중심의 효율적인 운영이 가능합니다.
              </p>
            </div>
          </ScrollReveal>
        </div>

        {/* Row 2: Space Design */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* SVG S-curve path diagram */}
          <ScrollReveal direction="left">
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100">
              <h4 className="text-lg font-bold text-dark-800 mb-6 text-center">
                DT 동선 설계
              </h4>
              <svg
                viewBox="0 0 400 200"
                className="w-full h-auto"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Road background */}
                <path
                  d="M40 160 C40 160, 100 160, 140 120 C180 80, 220 40, 280 40 C340 40, 360 80, 360 80"
                  stroke="#E5E7EB"
                  strokeWidth="24"
                  strokeLinecap="round"
                />

                {/* Road center line (dashed) */}
                <path
                  d="M40 160 C40 160, 100 160, 140 120 C180 80, 220 40, 280 40 C340 40, 360 80, 360 80"
                  stroke="#1A73B5"
                  strokeWidth="2"
                  strokeDasharray="8 6"
                  strokeLinecap="round"
                />

                {/* Station markers */}
                {/* Entry */}
                <circle cx="40" cy="160" r="14" fill="#1A73B5" />
                <text x="40" y="164" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">
                  1
                </text>
                <text x="40" y="186" textAnchor="middle" fill="#2A2A2A" fontSize="11" fontWeight="600">
                  입장
                </text>

                {/* Order */}
                <circle cx="150" cy="112" r="14" fill="#3DCBA8" />
                <text x="150" y="116" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">
                  2
                </text>
                <text x="150" y="100" textAnchor="middle" fill="#2A2A2A" fontSize="11" fontWeight="600">
                  주문
                </text>

                {/* Pickup */}
                <circle cx="270" cy="40" r="14" fill="#F59E0B" />
                <text x="270" y="44" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">
                  3
                </text>
                <text x="270" y="28" textAnchor="middle" fill="#2A2A2A" fontSize="11" fontWeight="600">
                  수령
                </text>

                {/* Exit */}
                <circle cx="360" cy="80" r="14" fill="#D42B2B" />
                <text x="360" y="84" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">
                  4
                </text>
                <text x="360" y="106" textAnchor="middle" fill="#2A2A2A" fontSize="11" fontWeight="600">
                  퇴장
                </text>

                {/* Direction arrows */}
                <path d="M58 158 L80 150" stroke="#1A73B5" strokeWidth="1.5" markerEnd="url(#arrowhead)" />
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
                블루샥 본사는 DT 매장의 효율적인 동선 설계 노하우를 보유하고 있습니다.
                입장에서 퇴장까지 원활한 차량 흐름을 고려한 S-커브 동선으로
                고객 편의성과 매장 효율성을 동시에 확보합니다.
              </p>

              {/* 3 small circular photos */}
              <div className="flex gap-4">
                {["/images/franchise/strength-1.jpg", "/images/franchise/strength-2.jpg", "/images/franchise/strength-3.jpg"].map((src, i) => (
                  <div key={i} className="w-16 h-16 sm:w-20 sm:h-20 rounded-full shadow-md flex-shrink-0 overflow-hidden">
                    <img src={src} alt="" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
