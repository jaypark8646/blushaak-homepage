"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { GNB } from "@/components/layout/GNB";
import { FloatingSidebar } from "@/components/layout/FloatingSidebar";
import { useScrollPosition } from "@/hooks/useScrollPosition";

// Brand sections
import BrandHero from "@/components/brand/BrandHero";
import BrandIntro from "@/components/brand/BrandIntro";
import AppStoreCards from "@/components/brand/AppStoreCards";
import CoffeeBeans from "@/components/brand/CoffeeBeans";
import BrandDirection from "@/components/brand/BrandDirection";
import MenuCarousel from "@/components/brand/MenuCarousel";
import InstagramFeed from "@/components/brand/InstagramFeed";
import NewsPreview from "@/components/brand/NewsPreview";

// Franchise sections
import FranchiseIntro from "@/components/franchise/FranchiseIntro";
import WhyBluShaak from "@/components/franchise/WhyBluShaak";
import HQSupport from "@/components/franchise/HQSupport";
import TrainingSystem from "@/components/franchise/TrainingSystem";
import DriveThru from "@/components/franchise/DriveThru";
import MasterFranchise from "@/components/franchise/MasterFranchise";
import FranchiseHistory from "@/components/franchise/FranchiseHistory";
import RevenueAnalysis from "@/components/franchise/RevenueAnalysis";
import OpeningProcedure from "@/components/franchise/OpeningProcedure";
import CostTable from "@/components/franchise/CostTable";
import InquiryForm from "@/components/franchise/InquiryForm";

type Tab = "brand" | "franchise";

export default function CombinedPageClient() {
  const { isScrolled } = useScrollPosition();
  const searchParams = useSearchParams();
  const router = useRouter();

  const activeTab: Tab =
    searchParams.get("tab") === "franchise" ? "franchise" : "brand";

  const switchTab = (tab: Tab) => {
    const params = new URLSearchParams();
    if (tab === "franchise") params.set("tab", "franchise");
    router.push(`/brand${tab === "franchise" ? "?tab=franchise" : ""}`, {
      scroll: false,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <GNB isScrolled={isScrolled} />

      {/* Tab Toggle */}
      <div className="fixed top-[72px] left-0 right-0 z-40 flex justify-center bg-white/95 backdrop-blur-sm shadow-[0_1px_0_rgba(0,0,0,0.06)]">
        <div className="flex gap-0">
          <button
            onClick={() => switchTab("brand")}
            className={`relative px-10 py-3.5 text-[13px] font-semibold tracking-widest uppercase transition-colors font-[family-name:var(--font-dm-sans)] ${
              activeTab === "brand"
                ? "text-blu-500"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            Brand
            {activeTab === "brand" && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-blu-500 rounded-full" />
            )}
          </button>
          <div className="w-px my-3.5 bg-gray-200" />
          <button
            onClick={() => switchTab("franchise")}
            className={`relative px-10 py-3.5 text-[13px] font-semibold tracking-widest uppercase transition-colors font-[family-name:var(--font-dm-sans)] ${
              activeTab === "franchise"
                ? "text-blu-500"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            Franchise
            {activeTab === "franchise" && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-blu-500 rounded-full" />
            )}
          </button>
        </div>
      </div>

      {/* Content offset for tab bar (72px GNB + ~44px tab) */}
      <div className="pt-[44px]">
        {activeTab === "brand" && (
          <main>
            <BrandHero />
            <BrandIntro />
            <AppStoreCards />
            <CoffeeBeans />
            <BrandDirection />
            <MenuCarousel />
            <InstagramFeed />
            <NewsPreview />
          </main>
        )}

        {activeTab === "franchise" && (
          <main>
            <FranchiseIntro />
            <WhyBluShaak />
            <HQSupport />
            <TrainingSystem />
            <DriveThru />
            <div id="global">
              <MasterFranchise />
            </div>
            <FranchiseHistory />
            <RevenueAnalysis />
            <OpeningProcedure />
            <CostTable />
            <div id="inquiry">
              <InquiryForm />
            </div>
          </main>
        )}
      </div>

      <FloatingSidebar variant={activeTab} />
    </>
  );
}
