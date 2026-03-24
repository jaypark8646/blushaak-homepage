import { Suspense } from "react";
import { Footer } from "@/components/layout/Footer";
import CombinedPageClient from "@/components/combined/CombinedPageClient";

export default function Home() {
  return (
    <>
      <Suspense fallback={null}>
        <CombinedPageClient />
      </Suspense>
      <Footer />
    </>
  );
}
