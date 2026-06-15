import { Footer } from "@/components/layout";
import ShaakIsUpPageClient from "@/components/event/ShaakIsUpPageClient";

export const metadata = {
  title: "블루샥 음료 사이즈업! [SHAAK IS UP!] | Blu Shaak COFFEE",
  description:
    "언제나 최고의 맛을 전해드리기 위해 고민하는 블루샥의 SHAAK IS UP 캠페인 이벤트 페이지. 프리미엄 음료를 더 커진 사이즈로 만나보세요.",
};

export default function ShaakIsUpPage() {
  return (
    <>
      <ShaakIsUpPageClient />
      <Footer />
    </>
  );
}
