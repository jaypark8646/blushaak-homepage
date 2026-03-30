import { NextResponse } from "next/server";
import { getLeads, isGoogleSheetsConfigured, LEADS_HEADER_ROW } from "@/lib/googleSheets";
import { isAdminAuthenticated } from "@/lib/adminAuth";

export const dynamic = "force-dynamic";

function escapeCsvValue(value: string) {
  const normalized = value.replace(/"/g, "\"\"");
  return `"${normalized}"`;
}

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  if (!isGoogleSheetsConfigured()) {
    return new NextResponse("Google Sheets is not configured.", { status: 503 });
  }

  const leads = await getLeads();
  const rows = [
    Array.from(LEADS_HEADER_ROW),
    ...leads.map((lead) => [
      lead.submittedAt,
      lead.name,
      lead.phone,
      lead.region,
      lead.message,
      lead.ref,
      lead.utmSource,
      lead.utmMedium,
      lead.utmCampaign,
      lead.pageUrl,
    ]),
  ];

  const csv = rows
    .map((row) => row.map((cell) => escapeCsvValue(String(cell ?? ""))).join(","))
    .join("\n");

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="blushaak-leads.csv"',
    },
  });
}
