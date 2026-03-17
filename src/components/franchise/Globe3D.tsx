"use client";

import { useEffect, useRef, useState } from "react";
import createGlobe from "cobe";
import type { CalibrationCity, LocationCategory } from "@/types";

// ── Location categories ──────────────────────────────────────
const KOREA = { lat: 37.5665, lng: 126.978 };

// Colors per category
const CATEGORY_COLORS: Record<LocationCategory, string> = {
  "blushaak-done": "#1A73B5",  // 파란색
  "blushaak-wip": "#87CEEB",   // 하늘색
  "photo-done": "#4B5563",     // 진회색
  "photo-wip": "#9CA3AF",      // 회색
};

// Unique display locations for the globe (one per major city/country)
const FALLBACK_GLOBE_LOCATIONS: CalibrationCity[] = [
  // 블루샥 완료 (파란색)
  { id: "jakarta", lat: -6.1751, lng: 106.845, name: "Jakarta", nameKo: "자카르타", category: "blushaak-done", mapX: 79.68, mapY: 56.09 },
  { id: "toronto", lat: 43.6532, lng: -79.3832, name: "Toronto", nameKo: "토론토", category: "blushaak-done", mapX: 27.95, mapY: 14.94 },
  { id: "guangzhou", lat: 23.1291, lng: 113.2644, name: "Guangzhou", nameKo: "광저우", category: "blushaak-done", mapX: 81.46, mapY: 29.65 },
  // 블루샥 논의중 (하늘색)
  { id: "tokyo", lat: 35.6762, lng: 139.6503, name: "Tokyo", nameKo: "도쿄", category: "blushaak-wip", mapX: 88.79, mapY: 20.62 },
  { id: "los-angeles", lat: 34.0522, lng: -118.2437, name: "Los Angeles", nameKo: "LA", category: "blushaak-wip", mapX: 17.15, mapY: 23.92 },
  // 포토시그니처 완료 (진회색)
  { id: "ho-chi-minh", lat: 10.8231, lng: 106.6297, name: "Ho Chi Minh", nameKo: "호치민", category: "photo-done", mapX: 79.62, mapY: 42.2 },
  { id: "phu-quoc", lat: 10.227, lng: 103.9567, name: "Phu Quoc", nameKo: "푸꾸옥", category: "photo-done", mapX: 78.88, mapY: 42.87 },
  { id: "sydney", lat: -33.8688, lng: 151.2093, name: "Sydney", nameKo: "시드니", category: "photo-done", mapX: 92, mapY: 92.27 },
  { id: "brisbane", lat: -27.4698, lng: 153.0251, name: "Brisbane", nameKo: "브리즈번", category: "photo-done", mapX: 92.51, mapY: 85.1 },
  { id: "greater-noida", lat: 28.4744, lng: 77.504, name: "Greater Noida", nameKo: "그레이터노이다", category: "photo-done", mapX: 71.53, mapY: 23.45 },
  { id: "rimba", lat: 4.9404, lng: 114.9481, name: "Rimba", nameKo: "림바", category: "photo-done", mapX: 81.93, mapY: 48.82 },
  { id: "manila-area", lat: 14.6507, lng: 121.1029, name: "Manila Area", nameKo: "마닐라", category: "photo-done", mapX: 83.64, mapY: 37.91 },
  { id: "bandung", lat: -6.9175, lng: 107.6191, name: "Bandung", nameKo: "반둥", category: "photo-done", mapX: 79.89, mapY: 56.92 },
  { id: "buenos-aires", lat: -34.6037, lng: -58.3816, name: "Buenos Aires", nameKo: "부에노스아이레스", category: "photo-done", mapX: 33.78, mapY: 93.08 },
  // 포토시그니처 논의중 (회색)
  { id: "astana", lat: 51.1694, lng: 71.4491, name: "Astana", nameKo: "아스타나", category: "photo-wip", mapX: 69.85, mapY: 6.5 },
  { id: "bishkek", lat: 42.8746, lng: 74.5698, name: "Bishkek", nameKo: "비슈케크", category: "photo-wip", mapX: 70.71, mapY: 15.79 },
];

const CATEGORY_LABELS: Record<LocationCategory, string> = {
  "blushaak-done": "블루샥 완료",
  "blushaak-wip": "블루샥 논의중",
  "photo-done": "포토시그니처 완료",
  "photo-wip": "포토시그니처 논의중",
};

interface Globe3DProps {
  cities?: CalibrationCity[];
}

// ── Math helpers ───────────────────────────────────────────
const DEG2RAD = Math.PI / 180;

function projectPoint(
  lat: number,
  lng: number,
  phi: number,
  theta: number,
  cx: number,
  cy: number,
  r: number,
  elevation = 0
) {
  const latR = lat * DEG2RAD;
  const lngR = lng * DEG2RAD;
  const R = 1 + elevation;
  const dL = lngR - phi;

  const x = R * Math.cos(latR) * Math.sin(dL);
  const y3 = R * Math.sin(latR);
  const z3 = R * Math.cos(latR) * Math.cos(dL);

  const yy = y3 * Math.cos(theta) - z3 * Math.sin(theta);
  const zz = y3 * Math.sin(theta) + z3 * Math.cos(theta);

  return { x: cx + r * x, y: cy - r * yy, visible: zz > 0 };
}

function greatCircle(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
  n: number
) {
  const p1 = lat1 * DEG2RAD, l1 = lng1 * DEG2RAD;
  const p2 = lat2 * DEG2RAD, l2 = lng2 * DEG2RAD;
  const d = Math.acos(
    Math.min(1, Math.sin(p1) * Math.sin(p2) + Math.cos(p1) * Math.cos(p2) * Math.cos(l2 - l1))
  );
  if (d < 0.001) return [{ lat: lat1, lng: lng1 }];

  const pts: { lat: number; lng: number }[] = [];
  for (let i = 0; i <= n; i++) {
    const f = i / n;
    const A = Math.sin((1 - f) * d) / Math.sin(d);
    const B = Math.sin(f * d) / Math.sin(d);
    const x = A * Math.cos(p1) * Math.cos(l1) + B * Math.cos(p2) * Math.cos(l2);
    const y = A * Math.cos(p1) * Math.sin(l1) + B * Math.cos(p2) * Math.sin(l2);
    const z = A * Math.sin(p1) + B * Math.sin(p2);
    pts.push({
      lat: Math.atan2(z, Math.sqrt(x * x + y * y)) / DEG2RAD,
      lng: Math.atan2(y, x) / DEG2RAD,
    });
  }
  return pts;
}

function drawVisiblePath(
  ctx: CanvasRenderingContext2D,
  points: { x: number; y: number; visible: boolean }[]
) {
  let drawing = false;
  for (const p of points) {
    if (p.visible) {
      if (!drawing) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        drawing = true;
      } else {
        ctx.lineTo(p.x, p.y);
      }
    } else if (drawing) {
      ctx.stroke();
      drawing = false;
    }
  }
  if (drawing) ctx.stroke();
}

// ── Component ──────────────────────────────────────────────
export default function Globe3D({ cities }: Globe3DProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  // Initial phi centered on Seoul (126.978°E ≈ 2.216 rad)
  const phiRef = useRef(2.216);
  const thetaVal = 0.3;
  const pointerDown = useRef(false);
  const pointerX = useRef(0);
  const startTime = useRef(0);
  const [webglFailed, setWebglFailed] = useState(false);

  // All locations get arcs (both Blu Shaak and Photo Signature)
  const allLocations = cities && cities.length > 0 ? cities : FALLBACK_GLOBE_LOCATIONS;

  useEffect(() => {
    if (!canvasRef.current || !overlayRef.current || !containerRef.current) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const containerWidth = containerRef.current.clientWidth;
    const RENDER = Math.min(containerWidth, 700);
    const px = RENDER * dpr;

    overlayRef.current.width = px;
    overlayRef.current.height = px;

    startTime.current = Date.now();

    // Pre-compute arc paths for ALL locations (from Korea HQ)
    const arcPaths = allLocations.map((loc) =>
      greatCircle(KOREA.lat, KOREA.lng, loc.lat, loc.lng, 80)
    );

    let globe: ReturnType<typeof createGlobe>;
    try {
      globe = createGlobe(canvasRef.current, {
        devicePixelRatio: dpr,
        width: px,
        height: px,
        phi: phiRef.current,
        theta: thetaVal,
        dark: 0,
        diffuse: 1.2,
        mapSamples: 24000,
        mapBrightness: 6,
        baseColor: [1, 1, 1],
        markerColor: [0.2, 0.5, 0.9],
        glowColor: [0.85, 0.9, 1.0],
        markers: [
          { location: [KOREA.lat, KOREA.lng], size: 0.1 },
          ...allLocations.map((d) => ({
            location: [d.lat, d.lng] as [number, number],
            size: d.category.startsWith("blushaak") ? 0.06 : 0.03,
          })),
        ],
        onRender: (state) => {
          if (!pointerDown.current) {
            phiRef.current += 0.0003;
          }
          state.phi = phiRef.current;

          const ctx = overlayRef.current?.getContext("2d");
          if (!ctx) return;

          const cx = px / 2;
          const cy = px / 2;
          const r = px * 0.37;
          const time = (Date.now() - startTime.current) / 1000;

          ctx.clearRect(0, 0, px, px);

          // Overlay phi in sync with COBE (same rotation convention)
          const overlayPhi = phiRef.current;

          // Draw arcs for ALL locations (Blu Shaak + Photo Signature)
          allLocations.forEach((loc, arcIdx) => {
            const pts = arcPaths[arcIdx];
            const color = CATEGORY_COLORS[loc.category];
            const isBlushaak = loc.category.startsWith("blushaak");
            const isCompleted = loc.category.endsWith("-done");
            const projected = pts.map((p, i) => {
              const t = i / (pts.length - 1);
              const elev = (isBlushaak ? 0.15 : 0.10) * Math.sin(Math.PI * t);
              return projectPoint(p.lat, p.lng, overlayPhi, thetaVal, cx, cy, r, elev);
            });

            // Glow layer
            ctx.save();
            ctx.lineWidth = (isBlushaak ? 8 : 5) * dpr;
            ctx.strokeStyle = color;
            ctx.globalAlpha = isBlushaak ? 0.12 : 0.08;
            drawVisiblePath(ctx, projected);
            ctx.restore();

            // Main arc
            ctx.save();
            const lineW = isCompleted ? 3 : 2;
            ctx.lineWidth = lineW * dpr;
            ctx.strokeStyle = color;
            ctx.globalAlpha = isCompleted ? 0.8 : 0.45;
            if (!isBlushaak) {
              ctx.setLineDash([6 * dpr, 4 * dpr]);
            }
            if (isCompleted) {
              ctx.shadowColor = color;
              ctx.shadowBlur = isBlushaak ? 10 : 6;
            }
            drawVisiblePath(ctx, projected);
            ctx.restore();

            // Animated travelling dot (only for Blu Shaak arcs to reduce clutter)
            if (isBlushaak) {
              const speed = 0.15 + (arcIdx % 3) * 0.05;
              const dotT = (time * speed + arcIdx * 0.35) % 1;
              const dotIdx = Math.floor(dotT * (projected.length - 1));
              const dot = projected[dotIdx];
              if (dot?.visible) {
                ctx.save();
                ctx.beginPath();
                ctx.arc(dot.x, dot.y, 12 * dpr, 0, Math.PI * 2);
                ctx.fillStyle = color;
                ctx.globalAlpha = 0.3;
                ctx.fill();
                ctx.beginPath();
                ctx.arc(dot.x, dot.y, 4 * dpr, 0, Math.PI * 2);
                ctx.fillStyle = "#ffffff";
                ctx.globalAlpha = 1;
                ctx.fill();
                ctx.restore();
              }

              // Trail
              for (let i = 1; i <= 10; i++) {
                const ti = dotIdx - i * 2;
                if (ti >= 0 && ti < projected.length) {
                  const tp = projected[ti];
                  if (tp.visible) {
                    ctx.save();
                    ctx.beginPath();
                    ctx.arc(tp.x, tp.y, Math.max(1, (3.5 - i * 0.3) * dpr), 0, Math.PI * 2);
                    ctx.fillStyle = color;
                    ctx.globalAlpha = (1 - i / 10) * 0.4;
                    ctx.fill();
                    ctx.restore();
                  }
                }
              }
            }
          });

          // Draw glowing markers for ALL locations
          allLocations.forEach((loc) => {
            const p = projectPoint(loc.lat, loc.lng, overlayPhi, thetaVal, cx, cy, r);
            if (!p.visible) return;

            const color = CATEGORY_COLORS[loc.category];
            const isBlushaak = loc.category.startsWith("blushaak");
            const pulse = 0.5 + 0.5 * Math.sin(time * 2 + loc.lat);

            ctx.save();

            // Outer glow ring (pulsating)
            const glowSize = isBlushaak ? (12 + pulse * 6) : (8 + pulse * 4);
            ctx.beginPath();
            ctx.arc(p.x, p.y, glowSize * dpr, 0, Math.PI * 2);
            ctx.fillStyle = color;
            ctx.globalAlpha = isBlushaak ? 0.15 + pulse * 0.1 : 0.1 + pulse * 0.05;
            ctx.fill();

            // Second glow ring
            if (isBlushaak) {
              ctx.beginPath();
              ctx.arc(p.x, p.y, (20 + pulse * 8) * dpr, 0, Math.PI * 2);
              ctx.fillStyle = color;
              ctx.globalAlpha = 0.06;
              ctx.fill();
            }

            // Core dot
            const dotSize = isBlushaak ? 5 : 3.5;
            ctx.beginPath();
            ctx.arc(p.x, p.y, dotSize * dpr, 0, Math.PI * 2);
            ctx.fillStyle = color;
            ctx.globalAlpha = 0.9;
            ctx.shadowColor = color;
            ctx.shadowBlur = isBlushaak ? 15 : 8;
            ctx.fill();

            ctx.restore();
          });

          // HQ label
          const hqP = projectPoint(KOREA.lat, KOREA.lng, overlayPhi, thetaVal, cx, cy, r);
          if (hqP.visible) {
            ctx.save();
            ctx.textAlign = "center";
            ctx.shadowColor = "rgba(255,255,255,0.9)";
            ctx.shadowBlur = 6;

            const pulse = 0.5 + 0.5 * Math.sin(time * 3);
            ctx.beginPath();
            ctx.arc(hqP.x, hqP.y, (8 + pulse * 4) * dpr, 0, Math.PI * 2);
            ctx.strokeStyle = "#1a6bc4";
            ctx.lineWidth = 2 * dpr;
            ctx.globalAlpha = 0.6 - pulse * 0.3;
            ctx.stroke();

            ctx.font = `bold ${12 * dpr}px "Pretendard", "Noto Sans KR", sans-serif`;
            ctx.fillStyle = "#1a1a2e";
            ctx.globalAlpha = 1;
            ctx.fillText("본사 HQ", hqP.x, hqP.y - 16 * dpr);

            ctx.font = `${9 * dpr}px "DM Sans", sans-serif`;
            ctx.fillStyle = "#2563eb";
            ctx.globalAlpha = 0.9;
            ctx.fillText("Seoul", hqP.x, hqP.y + 24 * dpr);

            ctx.restore();
          }

          // City name labels for visible locations
          allLocations.forEach((loc) => {
            const p = projectPoint(loc.lat, loc.lng, overlayPhi, thetaVal, cx, cy, r);
            if (!p.visible) return;

            const isBlushaak = loc.category.startsWith("blushaak");
            // Only show labels for blushaak locations to reduce clutter
            if (!isBlushaak) return;

            ctx.save();
            ctx.textAlign = "center";
            ctx.shadowColor = "rgba(255,255,255,0.9)";
            ctx.shadowBlur = 6;

            ctx.font = `bold ${9 * dpr}px "Pretendard", "Noto Sans KR", sans-serif`;
            ctx.fillStyle = "#1a1a2e";
            ctx.globalAlpha = 0.85;
            ctx.fillText(loc.nameKo, p.x, p.y - 10 * dpr);

            ctx.restore();
          });
        },
      });
    } catch {
      setTimeout(() => setWebglFailed(true), 0);
      return;
    }

    const c = canvasRef.current;
    c.style.width = "100%";
    c.style.height = "100%";

    return () => { try { globe?.destroy(); } catch {} };
  }, [allLocations]);

  // Pointer interaction
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onDown = (e: PointerEvent) => {
      pointerDown.current = true;
      pointerX.current = e.clientX;
    };
    const onUp = () => {
      pointerDown.current = false;
    };
    const onMove = (e: PointerEvent) => {
      if (pointerDown.current) {
        phiRef.current += (e.clientX - pointerX.current) * 0.005;
        pointerX.current = e.clientX;
      }
    };

    el.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointermove", onMove);

    return () => {
      el.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  if (webglFailed) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500/20 to-blue-700/10 flex items-center justify-center mb-6">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#4A9FE5" strokeWidth="1.5">
            <circle cx="12" cy="12" r="10" />
            <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
        </div>
        <p className="text-gray-400 text-sm">Global Expansion from Seoul</p>
      </div>
    );
  }

  const GLOBE_CITY_SUMMARY = (Object.keys(CATEGORY_LABELS) as LocationCategory[]).map((key) => {
    const names = Array.from(new Set(allLocations.filter((city) => city.category === key).map((city) => city.nameKo)));
    const preview = names.slice(0, 4).join(", ");
    const tail = names.length > 4 ? ` 외 ${names.length - 4}곳` : "";
    return {
      label: CATEGORY_LABELS[key],
      color: CATEGORY_COLORS[key],
      cities: names.length > 0 ? `${preview}${tail}` : "-",
    };
  });

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-full max-w-[700px] mx-auto">
        <div
          ref={containerRef}
          className="relative mx-auto cursor-grab active:cursor-grabbing select-none w-full"
          style={{ aspectRatio: "1/1", touchAction: "none" }}
        >
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
          <canvas
            ref={overlayRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
          />
        </div>

        {/* Bottom-left city summary panel */}
        <div className="absolute bottom-4 left-2 sm:bottom-6 sm:left-4 bg-white/90 backdrop-blur-sm rounded-xl p-2 sm:p-3 max-w-[160px] sm:max-w-[220px] shadow-md pointer-events-none z-10">
          <p className="text-[8px] sm:text-[10px] font-bold text-gray-700 mb-1.5">도시 현황</p>
          {GLOBE_CITY_SUMMARY.map((info) => (
            <div key={info.label} className="mb-1">
              <div className="flex items-center gap-1 mb-0.5">
                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: info.color }} />
                <span className="text-[7px] sm:text-[9px] font-semibold" style={{ color: info.color }}>
                  {info.label}
                </span>
              </div>
              <p className="text-[7px] sm:text-[8px] text-gray-500 leading-relaxed pl-2.5">
                {info.cities}
              </p>
            </div>
          ))}
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
      <p className="text-xs text-gray-400 mt-2">드래그하여 지구본을 회전할 수 있습니다</p>
    </div>
  );
}
