import { Footer } from "@/components/layout/Footer";
import FranchisePageClient from "@/components/franchise/FranchisePageClient";

export const metadata = {
  title: "FRANCHISE | Blu Shaak COFFEE",
  description:
    "블루샥 커피 프랜차이즈 창업 안내 - SCA 80점 스페셜티 원두, 본사 지원, 교육 시스템, 가맹 문의.",
};

export default function FranchisePage() {
  return (
    <>
      <FranchisePageClient />
      <Footer />
    </>
  );
}
