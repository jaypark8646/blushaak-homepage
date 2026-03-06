"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

interface CountryDot {
  name: string;
  nameKo: string;
  x: number;
  y: number;
  category: "blushaak-done" | "blushaak-wip" | "photo-done" | "photo-wip";
}

function latlngToPercent(lat: number, lng: number): { x: number; y: number } {
  const x = ((lng + 180) / 360) * 100;
  // world-map-clean.png (1280×712, aspect 1.798) displayed with object-cover
  // in inner container (aspect 3.657 = 16×1.6/7). Scale = 3.657/1.798 = 2.034
  // → top/bottom 25.42% of image is cropped; only middle 49.16% is visible
  // Visible latitude range: ~44.3°N to ~44.3°S
  const Y_CROP = 0.2542;
  const Y_SCALE = 0.4916;
  const y_img = (90 - lat) / 180;
  const y = Math.max(0, Math.min(100, (y_img - Y_CROP) / Y_SCALE * 100));
  return { x, y };
}

const COUNTRIES: CountryDot[] = [
  { name: "Indonesia", nameKo: "인도네시아", ...latlngToPercent(-2, 118), category: "blushaak-done" },
  { name: "Canada", nameKo: "캐나다", ...latlngToPercent(56, -106), category: "blushaak-done" },
  { name: "China", nameKo: "중국", ...latlngToPercent(35, 105), category: "blushaak-done" },
  { name: "Japan", nameKo: "일본", ...latlngToPercent(36, 138), category: "blushaak-wip" },
  { name: "USA", nameKo: "미국", ...latlngToPercent(38, -97), category: "blushaak-wip" },
  { name: "Vietnam", nameKo: "베트남", ...latlngToPercent(14, 108), category: "photo-done" },
  { name: "Australia", nameKo: "호주", ...latlngToPercent(-25, 134), category: "photo-done" },
  { name: "India", nameKo: "인도", ...latlngToPercent(20, 79), category: "photo-done" },
  { name: "Brunei", nameKo: "브루나이", ...latlngToPercent(4.5, 114.7), category: "photo-done" },
  { name: "Philippines", nameKo: "필리핀", ...latlngToPercent(13, 122), category: "photo-done" },
  { name: "Argentina", nameKo: "아르헨티나", ...latlngToPercent(-34, -64), category: "photo-done" },
  { name: "Kazakhstan", nameKo: "카자흐스탄", ...latlngToPercent(48, 68), category: "photo-wip" },
  { name: "Kyrgyzstan", nameKo: "키르기스스탄", ...latlngToPercent(41, 75), category: "photo-wip" },
];

const CATEGORY_COLORS: Record<string, string> = {
  "blushaak-done": "#1A73B5",
  "blushaak-wip": "#87CEEB",
  "photo-done": "#4B5563",
  "photo-wip": "#9CA3AF",
};

const COUNTRY_SUMMARY = [
  { key: "blushaak-done", label: "블루샥 완료", color: "#1A73B5", countries: "인도네시아, 캐나다, 중국" },
  { key: "blushaak-wip", label: "블루샥 논의중", color: "#87CEEB", countries: "일본, 미국" },
  {
    key: "photo-done",
    label: "포토시그니처 완료",
    color: "#4B5563",
    countries: "일본, 베트남, 호주, 인도, 브루나이, 필리핀, 인도네시아, 아르헨티나, 캐나다",
  },
  { key: "photo-wip", label: "포토시그니처 논의중", color: "#9CA3AF", countries: "카자흐스탄, 키르기스스탄" },
];

export default function WorldMap() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  // offsetX: percentage shift of the 160%-wide inner map.
  // Korea HQ is at SVG x = hq.x * 1.6 = 85.27 * 1.6 = 136.43
  // To center Korea at 50% of container: offsetX = 50 - 136.43 = -86
  const [offsetX, setOffsetX] = useState(-86);
  const isDragging = useRef(false);
  const lastPointerX = useRef(0);

  const hq = latlngToPercent(37.5665, 126.978);

  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    lastPointerX.current = e.clientX;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const dx = e.clientX - lastPointerX.current;
    lastPointerX.current = e.clientX;
    setOffsetX((prev) => Math.max(-120, Math.min(0, prev + dx * 0.12)));
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  return (
    <div ref={ref} className="relative w-full">
      {/* Map container */}
      <div
        className="relative w-full rounded-xl overflow-hidden shadow-sm border border-gray-100 cursor-grab active:cursor-grabbing select-none"
        style={{ aspectRatio: "16/7", backgroundColor: "#E8EEF4", touchAction: "none" }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        {/* 160%-wide inner map for panning */}
        <div
          className="absolute inset-y-0"
          style={{ width: "160%", left: `${offsetX}%` }}
        >
          <Image
            src="/images/franchise/world-map-clean.png"
            alt="World Map"
            fill
            className="object-cover"
            sizes="160vw"
            priority
          />

          {/* SVG overlay — viewBox 160x100 matches the 160% width */}
          <svg
            viewBox="0 0 160 100"
            preserveAspectRatio="none"
            className="absolute inset-0 w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {Object.entries(CATEGORY_COLORS).map(([key, color]) => (
                <radialGradient key={key} id={`glow-2d-${key}`}>
                  <stop offset="0%" stopColor={color} stopOpacity="0.7" />
                  <stop offset="40%" stopColor={color} stopOpacity="0.3" />
                  <stop offset="100%" stopColor={color} stopOpacity="0" />
                </radialGradient>
              ))}
              <radialGradient id="hq-glow-2d">
                <stop offset="0%" stopColor="#1A73B5" stopOpacity="0.5" />
                <stop offset="50%" stopColor="#1A73B5" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#1A73B5" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Connection lines from HQ */}
            {COUNTRIES.map((country, idx) => {
              const color = CATEGORY_COLORS[country.category];
              const isBlushaak = country.category.startsWith("blushaak");
              const cx = country.x * 1.6;
              const hqx = hq.x * 1.6;
              const midX = hqx + (cx - hqx) * 0.5;
              const midY = hq.y + (country.y - hq.y) * 0.5 - Math.abs(cx - hqx) * 0.05;
              return (
                <motion.g
                  key={`line-${country.name}`}
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 + idx * 0.06 }}
                >
                  <path
                    d={`M${hqx},${hq.y} Q${midX},${midY} ${cx},${country.y}`}
                    fill="none"
                    stroke={color}
                    strokeWidth={isBlushaak ? 0.2 : 0.15}
                    strokeDasharray={isBlushaak ? "none" : "0.6,0.4"}
                    opacity={isBlushaak ? 0.55 : 0.35}
                  />
                </motion.g>
              );
            })}

            {/* Country markers */}
            {COUNTRIES.map((country, idx) => {
              const color = CATEGORY_COLORS[country.category];
              const isBlushaak = country.category.startsWith("blushaak");
              const glowR = isBlushaak ? 2.5 : 1.8;
              const cx = country.x * 1.6;
              return (
                <motion.g
                  key={country.name}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 + idx * 0.05 }}
                >
                  <circle cx={cx} cy={country.y} r={glowR} fill={`url(#glow-2d-${country.category})`}>
                    <animate attributeName="r" values={`${glowR};${glowR + 1};${glowR}`} dur="3s" repeatCount="indefinite" begin={`${idx * 0.3}s`} />
                  </circle>
                  <circle cx={cx} cy={country.y} r={isBlushaak ? 0.6 : 0.4} fill={color}>
                    <animate attributeName="r" values={isBlushaak ? "0.6;0.8;0.6" : "0.4;0.55;0.4"} dur="2s" repeatCount="indefinite" begin={`${idx * 0.2}s`} />
                  </circle>
                  <circle cx={cx} cy={country.y} r={isBlushaak ? 0.22 : 0.15} fill="white" opacity="0.8" />
                  <text
                    x={cx}
                    y={country.y - (isBlushaak ? 1.8 : 1.4)}
                    textAnchor="middle"
                    fill={color}
                    fontSize={isBlushaak ? "1.5" : "1.2"}
                    fontWeight={isBlushaak ? "700" : "500"}
                    fontFamily="'Pretendard', 'Noto Sans KR', sans-serif"
                  >
                    {country.nameKo}
                  </text>
                </motion.g>
              );
            })}

            {/* Korea HQ */}
            <motion.g
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <circle cx={hq.x * 1.6} cy={hq.y} r="3.5" fill="url(#hq-glow-2d)">
                <animate attributeName="r" values="3.5;5;3.5" dur="2s" repeatCount="indefinite" />
              </circle>
              <circle cx={hq.x * 1.6} cy={hq.y} r="0.8" fill="#1A73B5" />
              <circle cx={hq.x * 1.6} cy={hq.y} r="0.35" fill="white" opacity="0.9" />
              <text
                x={hq.x * 1.6}
                y={hq.y - 2}
                textAnchor="middle"
                fill="#1A73B5"
                fontSize="1.6"
                fontWeight="800"
                fontFamily="'Pretendard', 'Noto Sans KR', sans-serif"
              >
                본사 HQ
              </text>
            </motion.g>
          </svg>
        </div>

        {/* Bottom-left: country text summary */}
        <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 bg-white/90 backdrop-blur-sm rounded-xl p-2 sm:p-3 max-w-[165px] sm:max-w-[240px] shadow-md pointer-events-none z-10">
          <p className="text-[8px] sm:text-[10px] font-bold text-gray-700 mb-1.5">진출 현황 요약</p>
          {COUNTRY_SUMMARY.map((info) => (
            <div key={info.key} className="mb-1">
              <div className="flex items-center gap-1 mb-0.5">
                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: info.color }} />
                <span className="text-[7px] sm:text-[9px] font-semibold" style={{ color: info.color }}>
                  {info.label}
                </span>
              </div>
              <p className="text-[7px] sm:text-[8px] text-gray-500 leading-relaxed pl-2.5">
                {info.countries}
              </p>
            </div>
          ))}
        </div>

        {/* Drag hint */}
        <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 bg-white/80 backdrop-blur-sm rounded-lg px-2 py-1 pointer-events-none z-10">
          <p className="text-[8px] sm:text-[9px] text-gray-400">← 드래그하여 이동 →</p>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mt-4">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full" style={{ backgroundColor: "#1A73B5" }} />
          <span className="text-xs text-gray-500">블루샥 완료</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full" style={{ backgroundColor: "#87CEEB" }} />
          <span className="text-xs text-gray-500">블루샥 논의중</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full" style={{ backgroundColor: "#4B5563" }} />
          <span className="text-xs text-gray-500">포토시그니처 완료</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full" style={{ backgroundColor: "#9CA3AF" }} />
          <span className="text-xs text-gray-500">포토시그니처 논의중</span>
        </div>
      </div>
    </div>
  );
}
