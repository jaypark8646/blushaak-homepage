"use client";

import { useEffect, useRef, useState } from "react";
import { GNB } from "@/components/layout/GNB";
import { FloatingSidebar } from "@/components/layout/FloatingSidebar";
import { ScrollProgressBar } from "@/components/layout/ScrollProgressBar";
import { SectionJumpButtons } from "@/components/layout/SectionJumpButtons";
import { BrandFranchiseDivider } from "@/components/combined/BrandFranchiseDivider";
import OpeningCostPopup from "@/components/combined/OpeningCostPopup";
import { useScrollPosition } from "@/hooks/useScrollPosition";

// Brand sections
import BrandHero from "@/components/brand/BrandHero";
import BrandIntro from "@/components/brand/BrandIntro";
import CoffeeBeans from "@/components/brand/CoffeeBeans";
import BrandDirection from "@/components/brand/BrandDirection";
import CoffeePrinciple from "@/components/brand/CoffeePrinciple";
import MenuCarousel from "@/components/brand/MenuCarousel";
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

export default function CombinedPageClient() {
  const { isScrolled } = useScrollPosition();
  const franchiseRef = useRef<HTMLDivElement>(null);
  const postFranchiseRef = useRef<HTMLDivElement>(null);
  const [sidebarVariant, setSidebarVariant] = useState<"brand" | "franchise">("brand");

  useEffect(() => {
    const handleScroll = () => {
      if (!franchiseRef.current || !postFranchiseRef.current) return;

      const threshold = window.innerHeight / 2;
      const franchiseTop = franchiseRef.current.getBoundingClientRect().top;
      const postFranchiseTop = postFranchiseRef.current.getBoundingClientRect().top;
      const isFranchiseSection = franchiseTop <= threshold && postFranchiseTop > threshold;

      setSidebarVariant(isFranchiseSection ? "franchise" : "brand");
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <OpeningCostPopup />
      <ScrollProgressBar currentSection={sidebarVariant} />
      <GNB isScrolled={isScrolled} />

      <main className="pb-20 md:pb-0">
        <CoffeePrinciple />

        <BrandFranchiseDivider />

        <div ref={franchiseRef} id="franchise">
          <FranchiseIntro />
        </div>
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
        <div id="cost">
          <CostTable />
        </div>

        <div ref={postFranchiseRef}>
          <BrandHero />
        </div>
        <div>
          <BrandIntro />
        </div>
        <CoffeeBeans />
        <BrandDirection />
        <MenuCarousel />
        <NewsPreview />

        <div id="inquiry">
          <InquiryForm />
        </div>
      </main>

      <FloatingSidebar variant={sidebarVariant} />
      <SectionJumpButtons currentSection={sidebarVariant} />
    </>
  );
}
