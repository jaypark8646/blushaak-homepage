import { Footer } from "@/components/layout/Footer";
import BrandPageClient from "@/components/brand/BrandPageClient";

export const metadata = {
  title: "BRAND | Blu Shaak COFFEE",
  description:
    "블루샥 커피 브랜드 소개 - Vacation in the CITY. 도심 속 작은 바캉스, 스페셜티 커피와 인스토어 베이커리.",
};

export default function BrandPage() {
  return (
    <>
      <BrandPageClient />
      <Footer />
    </>
  );
}
