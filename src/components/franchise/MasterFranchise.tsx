"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { GLOBAL_LOCATIONS } from "@/lib/franchiseData";
import type { CalibrationCity } from "@/types";

const Globe3D = dynamic(() => import("./Globe3D"), {
  ssr: false,
  loading: () => (
    <div className="w-full max-w-[600px] mx-auto aspect-square rounded-full bg-gray-100 animate-pulse" />
  ),
});

const WorldMap = dynamic(() => import("./WorldMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[300px] bg-gray-50 rounded-2xl animate-pulse" />
  ),
});

export default function MasterFranchise() {
  const [cities, setCities] = useState<CalibrationCity[] | null>(null);

  useEffect(() => {
    let active = true;

    const loadCalibrationCities = async () => {
      try {
        const response = await fetch("/data/calibration-cities.json", { cache: "no-store" });
        if (!response.ok) return;
        const json = await response.json();
        if (!Array.isArray(json)) return;
        if (active) {
          setCities(json as CalibrationCity[]);
        }
      } catch {
        // Ignore: components keep their internal fallback data.
      }
    };

    loadCalibrationCities();

    return () => {
      active = false;
    };
  }, []);

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
                브랜드 소유자(기업)가 진출하고 싶은 해외 현지 기업에게 독점적 사업 권한을 부여하여
                해당 지역에서 매장을 개설하고 운영할 수 있는 권한을 부여하는 방식입니다.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* 3D Globe */}
        <ScrollReveal delay={0.15}>
          <div className="mb-16 md:mb-20 bg-white rounded-3xl py-8 sm:py-12">
            <Globe3D cities={cities ?? undefined} />
            <p className="text-center text-gray-400 text-xs mt-4">
              드래그하여 지구본을 회전할 수 있습니다
            </p>
          </div>
        </ScrollReveal>

        {/* World Map Visualization */}
        <ScrollReveal delay={0.2}>
          <div className="mb-16 md:mb-20">
            <h3 className="text-xl sm:text-2xl font-bold text-dark-800 text-center mb-8">
              글로벌 진출 현황
            </h3>
            <div className="bg-white rounded-2xl p-4 sm:p-8 border border-gray-100 shadow-sm overflow-hidden">
              <WorldMap cities={cities ?? undefined} />
            </div>
          </div>
        </ScrollReveal>

        {/* Overseas store cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {GLOBAL_LOCATIONS.map((location, index) => (
            <ScrollReveal key={location.country} delay={0.1 * index}>
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                {/* Store image */}
                <div className="h-[250px] sm:h-[300px] relative overflow-hidden">
                  <img
                    src={location.country === "Indonesia" ? "/images/franchise/global-indonesia.png" : location.country === "Indonesia2" ? "/images/franchise/global-indonesia-2.jpg" : "/images/franchise/global-canada.png"}
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
