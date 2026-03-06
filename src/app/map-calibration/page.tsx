"use client";

import Image from "next/image";
import createGlobe from "cobe";
import { useEffect, useMemo, useRef, useState } from "react";
import type { CalibrationCity, LocationCategory } from "@/types";

const CATEGORY_META: Record<LocationCategory, { label: string; color: string }> = {
  "blushaak-done": { label: "blushaak-done", color: "#1A73B5" },
  "blushaak-wip": { label: "blushaak-wip", color: "#87CEEB" },
  "photo-done": { label: "photo-done", color: "#4B5563" },
  "photo-wip": { label: "photo-wip", color: "#9CA3AF" },
};

const CATEGORY_OPTIONS: LocationCategory[] = [
  "blushaak-done",
  "blushaak-wip",
  "photo-done",
  "photo-wip",
];

const MAP_IMAGE_ASPECT = 1200 / 849;
const MAP_VIEWPORT_ASPECT = 16 / 8;
const MAP_VISIBLE_Y_RATIO = MAP_IMAGE_ASPECT / MAP_VIEWPORT_ASPECT;
const MAP_Y_CROP = (1 - MAP_VISIBLE_Y_RATIO) / 2;
const DEG2RAD = Math.PI / 180;

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function roundTwo(value: number): number {
  return Math.round(value * 100) / 100;
}

function buildCityId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `city-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
}

function parseImportedCity(input: unknown): CalibrationCity | null {
  if (!input || typeof input !== "object") return null;

  const city = input as Partial<CalibrationCity>;
  const category = city.category;

  if (
    category !== "blushaak-done" &&
    category !== "blushaak-wip" &&
    category !== "photo-done" &&
    category !== "photo-wip"
  ) {
    return null;
  }

  const lat = Number(city.lat);
  const lng = Number(city.lng);
  const mapX = Number(city.mapX);
  const mapY = Number(city.mapY);

  if (
    Number.isNaN(lat) ||
    Number.isNaN(lng) ||
    Number.isNaN(mapX) ||
    Number.isNaN(mapY)
  ) {
    return null;
  }

  return {
    id: typeof city.id === "string" && city.id.trim() ? city.id : buildCityId(),
    name: typeof city.name === "string" ? city.name : "",
    nameKo: typeof city.nameKo === "string" ? city.nameKo : "",
    category,
    lat: roundTwo(lat),
    lng: roundTwo(lng),
    mapX: roundTwo(clamp(mapX, 0, 100)),
    mapY: roundTwo(clamp(mapY, 0, 100)),
  };
}

function mapPercentToLatLng(mapX: number, mapY: number): { lat: number; lng: number } {
  const x = clamp(mapX / 100, 0, 1);
  const yVisible = clamp(mapY / 100, 0, 1);
  const yImage = MAP_Y_CROP + yVisible * MAP_VISIBLE_Y_RATIO;

  const lat = 90 - yImage * 180;
  const lng0to360 = x * 360;
  const lng = lng0to360 > 180 ? lng0to360 - 360 : lng0to360;

  return { lat: roundTwo(lat), lng: roundTwo(lng) };
}

function latLngToMapPercent(lat: number, lng: number): { mapX: number; mapY: number } {
  const safeLat = clamp(lat, -90, 90);
  const lng0to360 = ((lng % 360) + 360) % 360;

  const x = lng0to360 / 360;
  const yImage = (90 - safeLat) / 180;
  const yVisible = (yImage - MAP_Y_CROP) / MAP_VISIBLE_Y_RATIO;

  return {
    mapX: roundTwo(clamp(x * 100, 0, 100)),
    mapY: roundTwo(clamp(yVisible * 100, 0, 100)),
  };
}

function projectPoint(
  lat: number,
  lng: number,
  phi: number,
  theta: number,
  cx: number,
  cy: number,
  r: number
) {
  const latR = lat * DEG2RAD;
  const lngR = lng * DEG2RAD;
  const dL = lngR - phi;

  const x = Math.cos(latR) * Math.sin(dL);
  const y3 = Math.sin(latR);
  const z3 = Math.cos(latR) * Math.cos(dL);

  const yy = y3 * Math.cos(theta) - z3 * Math.sin(theta);
  const zz = y3 * Math.sin(theta) + z3 * Math.cos(theta);

  return { x: cx + r * x, y: cy - r * yy, visible: zz > 0 };
}

function CalibrationGlobePreview({
  cities,
  selectedCityId,
}: {
  cities: CalibrationCity[];
  selectedCityId: string | null;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLCanvasElement>(null);
  const pointerDown = useRef(false);
  const pointerX = useRef(0);
  const phiRef = useRef(2.216);
  const citiesRef = useRef(cities);
  const selectedCityIdRef = useRef(selectedCityId);
  const [webglFailed, setWebglFailed] = useState(false);

  useEffect(() => {
    citiesRef.current = cities;
  }, [cities]);

  useEffect(() => {
    selectedCityIdRef.current = selectedCityId;
  }, [selectedCityId]);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const overlay = overlayRef.current;
    if (!container || !canvas || !overlay) return;

    let globe: ReturnType<typeof createGlobe> | null = null;
    const theta = 0.3;
    let currentPx = 0;
    let currentDpr = 1;

    const initialize = () => {
      const width = container.clientWidth;
      if (!width) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const px = Math.round(width * dpr);
      currentPx = px;
      currentDpr = dpr;

      canvas.width = px;
      canvas.height = px;
      overlay.width = px;
      overlay.height = px;

      if (globe) {
        globe.destroy();
      }

      try {
        globe = createGlobe(canvas, {
          devicePixelRatio: dpr,
          width: px,
          height: px,
          phi: phiRef.current,
          theta,
          dark: 0,
          diffuse: 1.2,
          mapSamples: 16000,
          mapBrightness: 6,
          baseColor: [1, 1, 1],
          glowColor: [0.85, 0.9, 1],
          markerColor: [0.7, 0.7, 0.7],
          markers: [],
          onRender: (state) => {
            if (!pointerDown.current) {
              phiRef.current += 0.0018;
            }
            state.phi = phiRef.current;

            const ctx = overlay.getContext("2d");
            if (!ctx || currentPx === 0) return;

            ctx.clearRect(0, 0, currentPx, currentPx);

            const cx = currentPx / 2;
            const cy = currentPx / 2;
            const r = currentPx * 0.37;

            citiesRef.current.forEach((city) => {
              const point = projectPoint(city.lat, city.lng, phiRef.current, theta, cx, cy, r);
              if (!point.visible) return;

              const meta = CATEGORY_META[city.category];
              const isSelected = city.id === selectedCityIdRef.current;
              const dotRadius = isSelected ? 5.5 : 4;

              ctx.save();
              ctx.beginPath();
              ctx.arc(point.x, point.y, dotRadius * currentDpr, 0, Math.PI * 2);
              ctx.fillStyle = meta.color;
              ctx.shadowColor = meta.color;
              ctx.shadowBlur = isSelected ? 14 : 8;
              ctx.globalAlpha = 0.95;
              ctx.fill();

              ctx.beginPath();
              ctx.arc(point.x, point.y, (dotRadius * 0.45) * currentDpr, 0, Math.PI * 2);
              ctx.fillStyle = "#ffffff";
              ctx.shadowBlur = 0;
              ctx.fill();

              if (isSelected) {
                ctx.beginPath();
                ctx.arc(point.x, point.y, 10 * currentDpr, 0, Math.PI * 2);
                ctx.strokeStyle = "rgba(15, 23, 42, 0.6)";
                ctx.lineWidth = 1.5 * currentDpr;
                ctx.stroke();
              }
              ctx.restore();
            });
          },
        });

        canvas.style.width = "100%";
        canvas.style.height = "100%";
      } catch {
        setWebglFailed(true);
      }
    };

    initialize();
    const resizeObserver = new ResizeObserver(() => initialize());
    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
      if (globe) {
        globe.destroy();
      }
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onPointerDown = (event: PointerEvent) => {
      pointerDown.current = true;
      pointerX.current = event.clientX;
    };

    const onPointerUp = () => {
      pointerDown.current = false;
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!pointerDown.current) return;
      phiRef.current += (event.clientX - pointerX.current) * 0.005;
      pointerX.current = event.clientX;
    };

    container.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointermove", onPointerMove);

    return () => {
      container.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  if (webglFailed) {
    return (
      <div className="flex aspect-square w-full items-center justify-center rounded-xl border border-slate-200 bg-slate-100 text-sm text-slate-500">
        WebGL을 사용할 수 없어 3D 미리보기를 표시할 수 없습니다.
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative mx-auto w-full max-w-[720px] cursor-grab select-none rounded-xl border border-slate-200 bg-white active:cursor-grabbing"
      style={{ aspectRatio: "1 / 1", touchAction: "none" }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <canvas ref={overlayRef} className="pointer-events-none absolute inset-0 h-full w-full" />
    </div>
  );
}

export default function MapCalibrationPage() {
  const mapRef = useRef<HTMLDivElement>(null);
  const dragState = useRef<{ cityId: string; moved: boolean } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [cities, setCities] = useState<CalibrationCity[]>([]);
  const [selectedCityId, setSelectedCityId] = useState<string | null>(null);
  const [importMessage, setImportMessage] = useState<string>("");
  const [previewMode, setPreviewMode] = useState<"map-2d" | "globe-3d">("map-2d");

  const selectedCity = useMemo(
    () => cities.find((city) => city.id === selectedCityId) ?? null,
    [cities, selectedCityId]
  );
  const citiesJson = useMemo(() => JSON.stringify(cities, null, 2), [cities]);

  const getMapPercentFromClient = (clientX: number, clientY: number) => {
    const rect = mapRef.current?.getBoundingClientRect();
    if (!rect || rect.width === 0 || rect.height === 0) {
      return null;
    }

    const x = clamp(((clientX - rect.left) / rect.width) * 100, 0, 100);
    const y = clamp(((clientY - rect.top) / rect.height) * 100, 0, 100);

    return { mapX: roundTwo(x), mapY: roundTwo(y) };
  };

  const addMarkerAt = (clientX: number, clientY: number) => {
    const position = getMapPercentFromClient(clientX, clientY);
    if (!position) return;
    const estimated = mapPercentToLatLng(position.mapX, position.mapY);

    const newCity: CalibrationCity = {
      id: buildCityId(),
      name: "",
      nameKo: "",
      category: "blushaak-done",
      lat: estimated.lat,
      lng: estimated.lng,
      mapX: position.mapX,
      mapY: position.mapY,
    };

    setCities((prev) => [...prev, newCity]);
    setSelectedCityId(newCity.id);
  };

  const handleMapClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (dragState.current?.moved) {
      dragState.current = null;
      return;
    }
    addMarkerAt(event.clientX, event.clientY);
  };

  const handleMapPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const active = dragState.current;
    if (!active) return;

    const position = getMapPercentFromClient(event.clientX, event.clientY);
    if (!position) return;

    active.moved = true;
    const estimated = mapPercentToLatLng(position.mapX, position.mapY);
    setCities((prev) =>
      prev.map((city) =>
        city.id === active.cityId
          ? {
              ...city,
              lat: estimated.lat,
              lng: estimated.lng,
              mapX: position.mapX,
              mapY: position.mapY,
            }
          : city
      )
    );
  };

  const handleMapPointerUp = () => {
    dragState.current = null;
  };

  const handleMarkerPointerDown = (
    event: React.PointerEvent<HTMLButtonElement>,
    cityId: string
  ) => {
    event.stopPropagation();
    event.preventDefault();
    dragState.current = { cityId, moved: false };
    setSelectedCityId(cityId);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const updateSelectedCity = (patch: Partial<CalibrationCity>) => {
    if (!selectedCityId) return;
    setCities((prev) =>
      prev.map((city) => (city.id === selectedCityId ? { ...city, ...patch } : city))
    );
  };

  const deleteSelectedCity = () => {
    if (!selectedCityId) return;

    setCities((prev) => prev.filter((city) => city.id !== selectedCityId));
    setSelectedCityId(null);
  };

  const handleDownloadJson = () => {
    const blob = new Blob([citiesJson], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `map-calibration-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
  };

  const handleImportButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleJsonFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    try {
      const text = await file.text();
      const parsed = JSON.parse(text) as unknown;

      if (!Array.isArray(parsed)) {
        throw new Error("JSON 루트는 배열이어야 합니다.");
      }

      const imported = parsed
        .map((item) => parseImportedCity(item))
        .filter((item): item is CalibrationCity => item !== null);

      if (imported.length !== parsed.length) {
        throw new Error("일부 항목 형식이 올바르지 않습니다.");
      }

      setCities(imported);
      setSelectedCityId(imported[0]?.id ?? null);
      setImportMessage(`${imported.length}개 마커를 불러왔습니다.`);
    } catch (error) {
      const message = error instanceof Error ? error.message : "JSON 파싱에 실패했습니다.";
      setImportMessage(`불러오기 실패: ${message}`);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-5">
          <h1 className="text-2xl font-bold text-slate-900">Map Calibration</h1>
          <p className="mt-1 text-sm text-slate-600">
            2D 지도에서 좌표를 캘리브레이션하고 3D 지구본에서 결과를 미리보기하세요.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_360px]">
          <section className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
            <div className="mb-3 inline-flex rounded-lg border border-slate-200 bg-slate-50 p-1">
              <button
                type="button"
                onClick={() => setPreviewMode("map-2d")}
                className={`rounded-md px-3 py-1.5 text-sm font-medium ${
                  previewMode === "map-2d"
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                2D 지도
              </button>
              <button
                type="button"
                onClick={() => setPreviewMode("globe-3d")}
                className={`rounded-md px-3 py-1.5 text-sm font-medium ${
                  previewMode === "globe-3d"
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                3D 지구본
              </button>
            </div>

            {previewMode === "map-2d" ? (
              <div
                ref={mapRef}
                className="relative overflow-hidden rounded-xl border border-slate-200 bg-slate-100"
                style={{ aspectRatio: "16 / 8", touchAction: "none" }}
                onClick={handleMapClick}
                onPointerMove={handleMapPointerMove}
                onPointerUp={handleMapPointerUp}
                onPointerLeave={handleMapPointerUp}
              >
                <Image
                  src="/images/franchise/world-map-outline.webp"
                  alt="World map calibration base"
                  fill
                  priority
                  sizes="(min-width: 1280px) 900px, 100vw"
                  className="object-cover"
                />

                {cities.map((city) => {
                  const meta = CATEGORY_META[city.category];
                  const isSelected = city.id === selectedCityId;

                  return (
                    <button
                      key={city.id}
                      type="button"
                      className="absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-md"
                      style={{
                        left: `${city.mapX}%`,
                        top: `${city.mapY}%`,
                        backgroundColor: meta.color,
                        outline: isSelected ? "3px solid rgba(15, 23, 42, 0.55)" : "none",
                        zIndex: isSelected ? 20 : 10,
                      }}
                      onPointerDown={(event) => handleMarkerPointerDown(event, city.id)}
                      onClick={(event) => {
                        event.stopPropagation();
                        setSelectedCityId(city.id);
                      }}
                      aria-label={city.nameKo || city.name || "marker"}
                      title={`${city.nameKo || "이름 없음"} (${city.mapX}%, ${city.mapY}%)`}
                    />
                  );
                })}
              </div>
            ) : (
              <CalibrationGlobePreview cities={cities} selectedCityId={selectedCityId} />
            )}

            <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-slate-500">
              <span>Markers: {cities.length}</span>
              {previewMode === "map-2d" ? (
                <>
                  <span>선택 후 드래그로 위치 이동</span>
                  <span>클릭 시 새 마커 추가 + lat/lng 자동 추정</span>
                </>
              ) : (
                <span>드래그로 지구본 회전</span>
              )}
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={handleDownloadJson}
                className="rounded-lg bg-slate-900 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
              >
                JSON 다운로드
              </button>
              <button
                type="button"
                onClick={handleImportButtonClick}
                className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-50"
              >
                JSON 불러오기
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="application/json,.json"
                className="hidden"
                onChange={handleJsonFileChange}
              />
            </div>
            {importMessage && <p className="mt-2 text-xs text-slate-600">{importMessage}</p>}
          </section>

          <aside className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
            {!selectedCity ? (
              <div className="space-y-3 text-sm text-slate-600">
                <p className="font-semibold text-slate-800">마커를 선택하세요</p>
                <p>
                  지도에서 마커를 클릭하면 도시명(한/영)과 카테고리를 편집할 수 있습니다.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-semibold text-slate-900">선택된 마커</p>
                  <p className="mt-1 text-xs text-slate-500">ID: {selectedCity.id}</p>
                </div>

                <label className="block">
                  <span className="mb-1 block text-xs font-medium text-slate-700">도시명 (영문)</span>
                  <input
                    type="text"
                    value={selectedCity.name}
                    onChange={(event) => updateSelectedCity({ name: event.target.value })}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:border-blu-500"
                    placeholder="Jakarta"
                  />
                </label>

                <label className="block">
                  <span className="mb-1 block text-xs font-medium text-slate-700">도시명 (한글)</span>
                  <input
                    type="text"
                    value={selectedCity.nameKo}
                    onChange={(event) => updateSelectedCity({ nameKo: event.target.value })}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:border-blu-500"
                    placeholder="자카르타"
                  />
                </label>

                <label className="block">
                  <span className="mb-1 block text-xs font-medium text-slate-700">카테고리</span>
                  <select
                    value={selectedCity.category}
                    onChange={(event) =>
                      updateSelectedCity({
                        category: event.target.value as LocationCategory,
                      })
                    }
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-blu-500"
                  >
                    {CATEGORY_OPTIONS.map((category) => (
                      <option key={category} value={category}>
                        {CATEGORY_META[category].label}
                      </option>
                    ))}
                  </select>
                </label>

                <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs text-slate-600">
                  <p>
                    mapX: <span className="font-semibold text-slate-800">{selectedCity.mapX}%</span>
                  </p>
                  <p>
                    mapY: <span className="font-semibold text-slate-800">{selectedCity.mapY}%</span>
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <label className="block">
                    <span className="mb-1 block text-xs font-medium text-slate-700">lat</span>
                    <input
                      type="number"
                      value={selectedCity.lat}
                      step="0.01"
                      min={-90}
                      max={90}
                      onChange={(event) => {
                        const value = Number(event.target.value);
                        if (Number.isNaN(value)) return;
                        const safeLat = roundTwo(clamp(value, -90, 90));
                        const projected = latLngToMapPercent(safeLat, selectedCity.lng);
                        updateSelectedCity({ lat: safeLat, mapX: projected.mapX, mapY: projected.mapY });
                      }}
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:border-blu-500"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-1 block text-xs font-medium text-slate-700">lng</span>
                    <input
                      type="number"
                      value={selectedCity.lng}
                      step="0.01"
                      min={-180}
                      max={180}
                      onChange={(event) => {
                        const value = Number(event.target.value);
                        if (Number.isNaN(value)) return;
                        const safeLng = roundTwo(clamp(value, -180, 180));
                        const projected = latLngToMapPercent(selectedCity.lat, safeLng);
                        updateSelectedCity({ lng: safeLng, mapX: projected.mapX, mapY: projected.mapY });
                      }}
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:border-blu-500"
                    />
                  </label>
                </div>

                <button
                  type="button"
                  onClick={deleteSelectedCity}
                  className="w-full rounded-lg bg-rose-600 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-rose-700"
                >
                  마커 삭제
                </button>
              </div>
            )}

            {cities.length > 0 && (
              <div className="mt-6 border-t border-slate-200 pt-4">
                <p className="mb-2 text-xs font-semibold text-slate-700">마커 목록</p>
                <div className="max-h-44 space-y-1 overflow-y-auto pr-1">
                  {cities.map((city) => {
                    const active = city.id === selectedCityId;
                    return (
                      <button
                        key={`list-${city.id}`}
                        type="button"
                        onClick={() => setSelectedCityId(city.id)}
                        className={`flex w-full items-center justify-between rounded-md px-2 py-1.5 text-left text-xs ${
                          active ? "bg-slate-100 text-slate-900" : "text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        <span className="truncate pr-2">{city.nameKo || city.name || "이름 없음"}</span>
                        <span className="shrink-0 text-[11px] text-slate-500">{city.mapX}, {city.mapY}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="mt-6 border-t border-slate-200 pt-4">
              <p className="mb-2 text-xs font-semibold text-slate-700">현재 데이터 (JSON)</p>
              <pre className="max-h-80 overflow-auto rounded-lg border border-slate-200 bg-slate-50 p-3 text-[11px] leading-5 text-slate-700">
                {citiesJson}
              </pre>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
