"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { GNB, Footer, FloatingSidebar } from "@/components/layout";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Button from "@/components/ui/Button";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { Store } from "@/types";

const StoreMap = dynamic(() => import("@/components/store/StoreMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[60vh] items-center justify-center rounded-2xl bg-gray-50">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-200 border-t-blu-500" />
        <p className="text-sm text-gray-400">지도를 불러오는 중...</p>
      </div>
    </div>
  ),
});

const SAMPLE_STORES: Store[] = [
  {
    id: "gangnam",
    name: "블루샥 강남점",
    address: "서울특별시 강남구 테헤란로 152, 1층",
    phone: "02-1234-5678",
    lat: 37.5005,
    lng: 127.0365,
    hours: "매일 07:00 - 22:00",
  },
  {
    id: "haeundae",
    name: "블루샥 해운대점",
    address: "부산광역시 해운대구 해운대해변로 264, 1층",
    phone: "051-987-6543",
    lat: 35.1587,
    lng: 129.1604,
    hours: "매일 08:00 - 23:00",
    hasDriveThru: true,
  },
  {
    id: "hongdae",
    name: "블루샥 홍대점",
    address: "서울특별시 마포구 양화로 188, 1층",
    phone: "02-5678-1234",
    lat: 37.5563,
    lng: 126.9237,
    hours: "매일 07:30 - 22:30",
  },
];

export default function StorePage() {
  const { isScrolled } = useScrollPosition();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStoreId, setSelectedStoreId] = useState<string | undefined>();

  const filteredStores = SAMPLE_STORES.filter(
    (store) =>
      store.name.includes(searchQuery) || store.address.includes(searchQuery)
  );

  return (
    <>
      <GNB isScrolled={isScrolled} />

      <main className="min-h-screen bg-white pt-[72px]">
        {/* Hero section */}
        <section className="bg-gradient-to-b from-blu-50 to-white py-20">
          <div className="mx-auto max-w-7xl px-4">
            <ScrollReveal>
              <h1 className="text-center font-[family-name:var(--font-playfair-display)] text-5xl font-bold tracking-tight text-dark-800 md:text-6xl">
                STORE
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <p className="mt-4 text-center text-lg text-gray-500">
                가까운 블루샥 매장을 찾아보세요
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Search & Map section */}
        <section className="mx-auto max-w-7xl px-4 py-12">
          {/* Search bar */}
          <ScrollReveal delay={0.1}>
            <div className="mx-auto mb-8 flex max-w-xl gap-2">
              <input
                type="text"
                placeholder="지역, 매장명으로 검색"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition-all focus:border-blu-500 focus:ring-2 focus:ring-blu-100"
              />
              <Button variant="primary" size="md">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-1.5"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                검색
              </Button>
            </div>
          </ScrollReveal>

          {/* Google Map */}
          <ScrollReveal delay={0.2}>
            <div className="mb-12">
              <StoreMap
                stores={filteredStores}
                selectedStoreId={selectedStoreId}
                onStoreSelect={setSelectedStoreId}
              />
            </div>
          </ScrollReveal>

          {/* Store list */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredStores.map((store, index) => (
              <ScrollReveal key={store.id} delay={index * 0.1}>
                <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:shadow-md">
                  <div className="mb-3 flex items-start justify-between">
                    <h3 className="text-lg font-semibold text-dark-800">
                      {store.name}
                    </h3>
                    {store.hasDriveThru && (
                      <span className="rounded-full bg-mint-50 px-2.5 py-0.5 text-[11px] font-semibold text-mint-600">
                        DT
                      </span>
                    )}
                  </div>

                  <div className="space-y-2 text-sm text-gray-500">
                    <div className="flex items-start gap-2">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="mt-0.5 shrink-0 text-gray-400"
                      >
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                        <circle cx="12" cy="9" r="2.5" />
                      </svg>
                      <span>{store.address}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="shrink-0 text-gray-400"
                      >
                        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                      </svg>
                      <span>{store.phone}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="shrink-0 text-gray-400"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      <span>{store.hours}</span>
                    </div>
                  </div>

                  <div className="mt-5">
                    <Button variant="outline" size="sm" className="w-full">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="mr-1.5"
                      >
                        <polygon points="3 11 22 2 13 21 11 13 3 11" />
                      </svg>
                      길찾기
                    </Button>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {filteredStores.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-lg text-gray-400">
                검색 결과가 없습니다.
              </p>
            </div>
          )}
        </section>
      </main>

      <FloatingSidebar variant="brand" />
      <Footer />
    </>
  );
}
