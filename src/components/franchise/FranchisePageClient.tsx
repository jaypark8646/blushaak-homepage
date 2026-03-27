"use client";

import { GNB } from "@/components/layout/GNB";
import { FloatingSidebar } from "@/components/layout/FloatingSidebar";
import { useScrollPosition } from "@/hooks/useScrollPosition";

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

export default function FranchisePageClient() {
  const { isScrolled } = useScrollPosition();

  return (
    <>
      <GNB isScrolled={isScrolled} />

      <main>
        <FranchiseIntro />
        <WhyBluShaak />
        <HQSupport />
        <TrainingSystem />
        <RevenueAnalysis />
        <DriveThru />
        <FranchiseHistory />
        <div id="global">
          <MasterFranchise />
        </div>
        <OpeningProcedure />
        <CostTable />
        <div id="inquiry">
          <InquiryForm />
        </div>
      </main>

      <FloatingSidebar variant="franchise" />
    </>
  );
}
