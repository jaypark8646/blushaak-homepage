import { NextResponse } from "next/server";
import { appendLead, isGoogleSheetsConfigured } from "@/lib/googleSheets";

export const dynamic = "force-dynamic";

interface CreateLeadRequest {
  name?: string;
  phone?: string;
  region?: string;
  message?: string;
  ref?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  page_url?: string;
}

function normalizeText(value: string | undefined) {
  return value?.trim() ?? "";
}

export async function POST(request: Request) {
  if (!isGoogleSheetsConfigured()) {
    return NextResponse.json(
      { message: "Google Sheets 환경변수가 설정되지 않았습니다." },
      { status: 503 },
    );
  }

  const body = (await request.json()) as CreateLeadRequest;
  const name = normalizeText(body.name);
  const phone = normalizeText(body.phone);
  const region = normalizeText(body.region);

  if (!name || !phone || !region) {
    return NextResponse.json(
      { message: "이름, 전화번호, 지역은 필수입니다." },
      { status: 400 },
    );
  }

  await appendLead({
    submittedAt: new Date().toISOString(),
    name,
    phone,
    region,
    message: normalizeText(body.message),
    ref: normalizeText(body.ref),
    utmSource: normalizeText(body.utm_source),
    utmMedium: normalizeText(body.utm_medium),
    utmCampaign: normalizeText(body.utm_campaign),
    pageUrl: normalizeText(body.page_url),
  });

  return NextResponse.json({ ok: true });
}
