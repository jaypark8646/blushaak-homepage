"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";

/* ──────────── Animated Counter ──────────── */
function AnimatedNumber({
  target,
  suffix = "",
  duration = 2000,
  isInView,
}: {
  target: number;
  suffix?: string;
  duration?: number;
  isInView: boolean;
}) {
  const [current, setCurrent] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!isInView || started.current) return;
    started.current = true;
    const startTime = performance.now();
    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
      else setCurrent(target);
    };
    requestAnimationFrame(step);
  }, [isInView, target, duration]);

  return (
    <span>
      {current.toLocaleString()}
      {suffix}
    </span>
  );
}

/* ──────────── Daily Sales Bar ──────────── */
function DailySalesChart({ isInView }: { isInView: boolean }) {
  // 일평균 커피 판매량 (잔) — 막대 시각화
  const days = ["월", "화", "수", "목", "금", "토", "일"];
  const values = [420, 390, 445, 410, 510, 620, 580];
  const maxVal = Math.max(...values);

  return (
    <div>
      <div className="flex items-end gap-2 h-28">
        {days.map((day, i) => (
          <div key={day} className="flex flex-col items-center flex-1 gap-1">
            <motion.div
              initial={{ height: 0 }}
              animate={isInView ? { height: `${(values[i] / maxVal) * 100}%` } : { height: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * i, ease: "easeOut" }}
              className="w-full rounded-t-md"
              style={{
                background:
                  values[i] === maxVal
                    ? "linear-gradient(to top, #1A73B5, #4FA8E0)"
                    : "linear-gradient(to top, #B8DEF5, #D6EEFB)",
              }}
            />
          </div>
        ))}
      </div>
      <div className="flex gap-2 mt-2">
        {days.map((day, i) => (
          <p key={day} className="flex-1 text-center text-[10px] text-gray-400">
            {day}
          </p>
        ))}
      </div>
    </div>
  );
}

/* ──────────── Cumulative Sales Line ──────────── */
function CumulativeChart({ isInView }: { isInView: boolean }) {
  const points = [120, 350, 680, 1200, 2000, 3400, 5500, 8800, 12000, 18000, 24000, 32000];
  const labels = ["'14", "'15", "'16", "'17", "'18", "'19", "'20", "'21", "'22", "'23", "'24", "'25"];
  const maxVal = Math.max(...points);
  const w = 280;
  const h = 100;
  const pad = 8;

  const coords = points.map((v, i) => ({
    x: pad + (i / (points.length - 1)) * (w - pad * 2),
    y: h - pad - ((v / maxVal) * (h - pad * 2)),
  }));

  const polyline = coords.map((p) => `${p.x},${p.y}`).join(" ");

  return (
    <div className="relative">
      <svg
        width="100%"
        viewBox={`0 0 ${w} ${h + 16}`}
        className="overflow-visible"
        preserveAspectRatio="none"
      >
        {/* Area fill */}
        <motion.polygon
          points={`${coords[0].x},${h - pad} ${polyline} ${coords[coords.length - 1].x},${h - pad}`}
          fill="#ffffff"
          fillOpacity={0.15}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        />
        {/* Line */}
        <motion.polyline
          points={polyline}
          fill="none"
          stroke="#ffffff"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
          transition={{ duration: 1.4, delay: 0.2, ease: "easeOut" }}
        />
        {/* Last dot */}
        <motion.circle
          cx={coords[coords.length - 1].x}
          cy={coords[coords.length - 1].y}
          r="5"
          fill="#ffffff"
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          transition={{ duration: 0.3, delay: 1.5 }}
          style={{ transformOrigin: `${coords[coords.length - 1].x}px ${coords[coords.length - 1].y}px` }}
        />
        {/* Year labels: first and last */}
        <text x={coords[0].x} y={h + 14} textAnchor="middle" fill="#B8DEF5" fontSize="9">
          {labels[0]}
        </text>
        <text x={coords[coords.length - 1].x} y={h + 14} textAnchor="middle" fill="#B8DEF5" fontSize="9">
          {labels[labels.length - 1]}
        </text>
      </svg>
    </div>
  );
}

/* ──────────── Main Component ──────────── */
export default function CoffeePrinciple() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-24 md:py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-16 md:mb-20">
            <p className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-blu-500 uppercase mb-4">
              Coffee First
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-dark-800 leading-tight mb-6">
              카페의 근본{" "}
              <span className="text-blu-500">'커피'</span>
              의<br />원칙을 지킵니다
            </h2>
            <p className="max-w-2xl mx-auto text-base sm:text-lg text-gray-500 leading-relaxed">
              카페라는 이름만 빌린 허술한 디저트 가게들이 넘쳐나던 그 시간에도,
              <br className="hidden sm:block" />
              블루샥은 커피 하나에 집중했습니다.
              <br />
              그 선택이 전국 200매장을 만들었고,
              <br className="hidden sm:block" />
              <strong className="text-dark-700">압도적인 커피 판매량</strong>으로 증명했습니다.
            </p>
          </div>
        </ScrollReveal>

        {/* Stats + Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Daily avg */}
          <ScrollReveal delay={0.1}>
            <div className="bg-gradient-to-br from-blu-50 to-white rounded-3xl p-8 border border-blu-100">
              <p className="text-sm font-semibold text-blu-500 tracking-widest uppercase mb-3">
                Daily Average
              </p>
              <div className="flex items-end gap-2 mb-6">
                <span className="text-5xl sm:text-6xl font-extrabold text-dark-800 leading-none tabular-nums">
                  <AnimatedNumber target={500} suffix="+" duration={1800} isInView={isInView} />
                </span>
                <span className="text-lg sm:text-xl font-bold text-gray-400 mb-1">잔</span>
              </div>
              <p className="text-sm text-gray-500 mb-6">매장당 커피 일평균 판매량</p>
              <DailySalesChart isInView={isInView} />
            </div>
          </ScrollReveal>

          {/* Cumulative */}
          <ScrollReveal delay={0.2}>
            <div className="bg-gradient-to-br from-blu-500 to-blu-700 rounded-3xl p-8 border border-blu-400">
              <p className="text-sm font-semibold text-blu-100 tracking-widest uppercase mb-3">
                Cumulative Sales
              </p>
              <div className="flex items-end gap-2 mb-6">
                <span className="text-5xl sm:text-6xl font-extrabold text-white leading-none tabular-nums">
                  <AnimatedNumber target={3200} suffix="만+" duration={2200} isInView={isInView} />
                </span>
                <span className="text-lg sm:text-xl font-bold text-blu-200 mb-1">잔</span>
              </div>
              <p className="text-sm text-blu-100 mb-6">블루샥 커피 누적 판매량</p>
              <CumulativeChart isInView={isInView} />
            </div>
          </ScrollReveal>
        </div>

        {/* Bottom emphasis */}
        <ScrollReveal delay={0.15}>
          <div className="mt-14 text-center">
            <p className="text-xl sm:text-2xl md:text-3xl font-extrabold text-dark-800">
              커피로 시작해{" "}
              <span className="text-blu-500">커피로 증명한</span> 브랜드
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
