"use client";

import { GNB } from "@/components/layout/GNB";
import { FloatingSidebar } from "@/components/layout/FloatingSidebar";
import { useScrollPosition } from "@/hooks/useScrollPosition";

import BrandHero from "@/components/brand/BrandHero";
import BrandIntro from "@/components/brand/BrandIntro";
import AppStoreCards from "@/components/brand/AppStoreCards";
import CoffeeBeans from "@/components/brand/CoffeeBeans";
import BrandDirection from "@/components/brand/BrandDirection";
import MenuCarousel from "@/components/brand/MenuCarousel";
import InstagramFeed from "@/components/brand/InstagramFeed";
import NewsPreview from "@/components/brand/NewsPreview";

export default function BrandPageClient() {
  const { isScrolled } = useScrollPosition();

  return (
    <>
      <GNB isScrolled={isScrolled} />
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
      <FloatingSidebar variant="brand" />
    </>
  );
}
