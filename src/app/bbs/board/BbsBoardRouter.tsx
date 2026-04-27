"use client";

import { useSearchParams } from "next/navigation";
import NutritionBoard from "./NutritionBoard";
import OriginBoard from "./OriginBoard";
import LegacyBoardFallback from "./LegacyBoardFallback";

const pick = (v: string | null): string | undefined => v ?? undefined;

export default function BbsBoardRouter() {
  const searchParams = useSearchParams();
  const boTable = pick(searchParams.get("bo_table"));
  const wrId = pick(searchParams.get("wr_id"));

  if (boTable === "menu01") {
    return <NutritionBoard />;
  }

  if (boTable === "b_news" && wrId === "109") {
    return <OriginBoard />;
  }

  return <LegacyBoardFallback boTable={boTable} wrId={wrId} />;
}
