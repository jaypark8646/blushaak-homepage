import type { Metadata } from "next";
import Link from "next/link";
import { GNB, Footer } from "@/components/layout";
import NutritionBoard from "./NutritionBoard";
import OriginBoard from "./OriginBoard";

export const metadata: Metadata = {
  title: "게시판 | Blu Shaak COFFEE",
  description:
    "블루샥 영양 성분, 원산지 표시 등 매장 정보를 확인하실 수 있습니다.",
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

const pick = (v: string | string[] | undefined): string | undefined =>
  Array.isArray(v) ? v[0] : v;

export default async function BbsBoardPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const boTable = pick(params.bo_table);
  const wrId = pick(params.wr_id);

  // 영양 성분표
  if (boTable === "menu01") {
    return <NutritionBoard />;
  }

  // 원산지 표시판
  if (boTable === "b_news" && wrId === "109") {
    return <OriginBoard />;
  }

  return <LegacyBoardFallback boTable={boTable} wrId={wrId} />;
}

function LegacyBoardFallback({
  boTable,
  wrId,
}: {
  boTable?: string;
  wrId?: string;
}) {
  const hint = boTable
    ? `"${boTable}${wrId ? ` · #${wrId}` : ""}" 게시판이 아직 준비되지 않았거나 이동되었습니다.`
    : "게시판 정보가 올바르지 않습니다.";

  return (
    <>
      <GNB isScrolled={false} />
      <main className="flex min-h-screen flex-col items-center justify-center bg-warm-50 px-4 pt-[72px]">
        <div className="max-w-md rounded-2xl border border-warm-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blu-50 text-blu-600">
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 9v4M12 17h.01" />
              <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
            </svg>
          </div>
          <h1 className="text-xl font-semibold text-dark-800">
            요청하신 게시판을 찾을 수 없습니다
          </h1>
          <p className="mt-2 text-sm text-gray-500">{hint}</p>
          <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
            <Link
              href="/"
              className="rounded-full bg-blu-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-blu-700"
            >
              홈으로
            </Link>
            <Link
              href="/menu"
              className="rounded-full border border-warm-200 bg-white px-5 py-2 text-sm font-medium text-dark-800 transition hover:border-blu-300"
            >
              메뉴 보기
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
