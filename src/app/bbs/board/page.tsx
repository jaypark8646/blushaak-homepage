import type { Metadata } from "next";
import { Suspense } from "react";
import BbsBoardRouter from "./BbsBoardRouter";
import LegacyBoardFallback from "./LegacyBoardFallback";

export const metadata: Metadata = {
  title: "게시판 | Blu Shaak COFFEE",
  description:
    "블루샥 영양 성분, 원산지 표시 등 매장 정보를 확인하실 수 있습니다.",
};

export default function BbsBoardPage() {
  return (
    <Suspense fallback={<LegacyBoardFallback />}>
      <BbsBoardRouter />
    </Suspense>
  );
}
