import { Suspense } from "react";
import { Footer } from "@/components/layout/Footer";
import CombinedPageClient from "@/components/combined/CombinedPageClient";

export const metadata = {
  title: "BRAND & FRANCHISE | Blu Shaak COFFEE",
  description:
    "블루샥 커피 브랜드 소개 및 프랜차이즈 창업 안내 - Vacation in the CITY.",
};

export default function BrandPage() {
  return (
    <>
      <Suspense fallback={null}>
        <CombinedPageClient />
      </Suspense>
      <Footer />
    </>
  );
}
