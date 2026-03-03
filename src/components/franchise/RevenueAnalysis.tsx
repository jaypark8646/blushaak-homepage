"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { PIE_CHART_DATA, REVENUE_TABLE } from "@/lib/franchiseData";

/* ──────────── Revenue Breakdown Bar ──────────── */
function RevenueBar() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="mb-16 md:mb-20">
      <div className="mb-4">
        <p className="text-sm text-gray-400 font-[family-name:var(--font-dm-sans)]">
          {REVENUE_TABLE.title}
        </p>
        <p className="text-xs text-gray-400">{REVENUE_TABLE.subtitle}</p>
      </div>

      {/* Segmented bar */}
      <div className="w-full h-14 sm:h-16 rounded-xl overflow-hidden flex">
        {REVENUE_TABLE.items.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ width: 0 }}
            animate={isInView ? { width: `${item.percentage}%` } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.2 + index * 0.1, ease: "easeOut" }}
            className="h-full flex items-center justify-center relative"
            style={{ backgroundColor: item.color }}
          >
            <span className="text-white text-xs sm:text-sm font-bold whitespace-nowrap">
              {item.percentage}%
            </span>
          </motion.div>
        ))}
      </div>

      {/* Labels below */}
      <div className="flex mt-3 gap-1">
        {REVENUE_TABLE.items.map((item) => (
          <div
            key={item.label}
            className="text-center"
            style={{ width: `${item.percentage}%` }}
          >
            <p className="text-xs sm:text-sm font-medium text-dark-700">{item.label}</p>
            <p className="text-xs text-gray-400">{item.amount}원</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ──────────── Pie Chart (SVG) ──────────── */
function PieChart() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const total = PIE_CHART_DATA.reduce((sum, d) => sum + d.value, 0);
  const cx = 120;
  const cy = 120;
  const r = 100;

  // Compute pie segments
  let cumulative = 0;
  const segments = PIE_CHART_DATA.map((d) => {
    const startAngle = (cumulative / total) * 360;
    cumulative += d.value;
    const endAngle = (cumulative / total) * 360;
    return { ...d, startAngle, endAngle };
  });

  function polarToCartesian(centerX: number, centerY: number, radius: number, angleDeg: number) {
    const angleRad = ((angleDeg - 90) * Math.PI) / 180;
    return {
      x: centerX + radius * Math.cos(angleRad),
      y: centerY + radius * Math.sin(angleRad),
    };
  }

  function describeArc(startAngle: number, endAngle: number) {
    const start = polarToCartesian(cx, cy, r, endAngle);
    const end = polarToCartesian(cx, cy, r, startAngle);
    const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;
    return `M ${cx} ${cy} L ${start.x} ${start.y} A ${r} ${r} 0 ${largeArcFlag} 0 ${end.x} ${end.y} Z`;
  }

  return (
    <div ref={ref} className="flex flex-col sm:flex-row items-center gap-8 sm:gap-12">
      <div className="flex-shrink-0">
        <svg width="240" height="240" viewBox="0 0 240 240">
          {segments.map((seg, index) => (
            <motion.path
              key={seg.label}
              d={describeArc(seg.startAngle, seg.endAngle)}
              fill={seg.color}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={
                isInView
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0.8 }
              }
              transition={{
                duration: 0.5,
                delay: 0.1 * index,
                ease: "easeOut",
              }}
              style={{ transformOrigin: `${cx}px ${cy}px` }}
              stroke="white"
              strokeWidth="2"
            />
          ))}
          {/* Center circle (donut hole) */}
          <circle cx={cx} cy={cy} r="45" fill="white" />
          <text
            x={cx}
            y={cy - 6}
            textAnchor="middle"
            fill="#2A2A2A"
            fontSize="11"
            fontWeight="600"
          >
            매출구성
          </text>
          <text
            x={cx}
            y={cy + 12}
            textAnchor="middle"
            fill="#6B7280"
            fontSize="9"
          >
            비율
          </text>
        </svg>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-x-8 gap-y-3">
        {PIE_CHART_DATA.map((d) => (
          <div key={d.label} className="flex items-center gap-2.5">
            <div
              className="w-3 h-3 rounded-full flex-shrink-0"
              style={{ backgroundColor: d.color }}
            />
            <div>
              <span className="text-sm font-medium text-dark-700">{d.label}</span>
              <span className="text-sm text-gray-400 ml-1.5">{d.value}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ──────────── Bar Chart ──────────── */
const BAR_DATA = [
  { label: "블루샥", value: 8500, color: "#1A73B5", highlight: true },
  { label: "A 브랜드", value: 5200, color: "#B8DEF5" },
  { label: "B 브랜드", value: 4800, color: "#B8DEF5" },
  { label: "C 브랜드", value: 4200, color: "#B8DEF5" },
  { label: "D 브랜드", value: 3800, color: "#B8DEF5" },
];

function BarChart() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const maxValue = Math.max(...BAR_DATA.map((d) => d.value));
  const chartHeight = 220;

  return (
    <div ref={ref}>
      <h4 className="text-base sm:text-lg font-bold text-dark-800 mb-6">
        카페 프랜차이즈 연평균 매출 비교{" "}
        <span className="text-xs font-normal text-gray-400">(만원)</span>
      </h4>
      <div className="flex items-end gap-4 sm:gap-6">
        {BAR_DATA.map((bar, index) => {
          const barHeight = (bar.value / maxValue) * chartHeight;
          return (
            <div key={bar.label} className="flex flex-col items-center flex-1">
              {/* Value */}
              <motion.span
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                className={`text-xs sm:text-sm font-bold mb-2 ${
                  bar.highlight ? "text-blu-500" : "text-gray-400"
                }`}
              >
                {bar.value.toLocaleString()}
              </motion.span>

              {/* Bar */}
              <motion.div
                initial={{ height: 0 }}
                animate={isInView ? { height: barHeight } : { height: 0 }}
                transition={{
                  duration: 0.7,
                  delay: 0.2 + index * 0.1,
                  ease: "easeOut",
                }}
                className={`w-full rounded-t-lg ${bar.highlight ? "shadow-lg" : ""}`}
                style={{
                  backgroundColor: bar.color,
                  minWidth: "36px",
                }}
              />

              {/* Label */}
              <p
                className={`mt-3 text-xs sm:text-sm text-center ${
                  bar.highlight ? "font-bold text-blu-500" : "text-gray-400"
                }`}
              >
                {bar.label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ──────────── Main Component ──────────── */
export default function RevenueAnalysis() {
  return (
    <section className="py-24 md:py-32 bg-warm-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Title */}
        <ScrollReveal>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-dark-800 text-center mb-6">
            매출 구조 분석
          </h2>
        </ScrollReveal>

        {/* Top descriptions */}
        <ScrollReveal delay={0.1}>
          <div className="max-w-3xl mx-auto text-center mb-16 md:mb-20">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-5 border border-gray-100">
                <h3 className="text-lg font-bold text-dark-800 mb-2">
                  3WAY 매출 모델
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  홀, 테이크아웃, 배달 서비스의 최적화된 동선 설계로 최소 인력 운영 가능
                </p>
              </div>
              <div className="bg-white rounded-xl p-5 border border-gray-100">
                <h3 className="text-lg font-bold text-dark-800 mb-2">
                  안정적인 수익
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  저가 브랜드 대비 높은 객단가와 퀄리티로 월 매출 기준 약 30% 내외의 순수익 구조 지향
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Revenue breakdown bar */}
        <ScrollReveal delay={0.15}>
          <RevenueBar />
        </ScrollReveal>

        {/* Pie chart + Bar chart grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-16 md:mb-20">
          <ScrollReveal delay={0.1}>
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100">
              <h4 className="text-base sm:text-lg font-bold text-dark-800 mb-6">
                매출 구성 비율
              </h4>
              <PieChart />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100">
              <BarChart />
            </div>
          </ScrollReveal>
        </div>

        {/* Big emphasis text */}
        <ScrollReveal>
          <div className="text-center">
            <p className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-dark-800 leading-snug">
              어떤 브랜드를 선택하느냐에 따라
              <br />
              순수익은{" "}
              <span className="text-blu-500">2배 차이</span>
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
