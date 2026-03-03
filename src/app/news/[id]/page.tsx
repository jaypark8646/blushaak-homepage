import { SAMPLE_NEWS } from "@/lib/newsData";
import NewsDetailClient from "./NewsDetailClient";

export function generateStaticParams() {
  return SAMPLE_NEWS.map((news) => ({ id: news.id }));
}

export default function NewsDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return <NewsDetailClient params={params} />;
}
