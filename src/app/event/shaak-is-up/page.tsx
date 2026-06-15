import { Footer } from "@/components/layout";
import ShaakIsUpPageClient from "@/components/event/ShaakIsUpPageClient";

export const metadata = {
  title: "블루샥 음료 사이즈업! [SHAAK IS UP!] | Blu Shaak COFFEE",
  description:
    "더 크게, 더 시원하게! 퀄리티는 그대로, 용량은 크게! 블루샥 SHAAK IS UP 캠페인 이벤트 페이지.",
};

export default function ShaakIsUpPage() {
  return (
    <>
      <ShaakIsUpPageClient />
      <Footer />
    </>
  );
}
