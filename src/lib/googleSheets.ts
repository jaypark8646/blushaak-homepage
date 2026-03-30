import { google, sheets_v4 } from "googleapis";

export const LEADS_SHEET_TITLE = "Leads";
export const LEADS_HEADER_ROW = [
  "날짜",
  "이름",
  "전화번호",
  "지역",
  "문의내용",
  "ref",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "페이지URL",
] as const;

export interface LeadRecord {
  submittedAt: string;
  name: string;
  phone: string;
  region: string;
  message: string;
  ref: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  pageUrl: string;
}

function getGoogleSheetsConfig() {
  const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, "\n");
  const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;

  return {
    privateKey,
    clientEmail,
    spreadsheetId,
    isConfigured: Boolean(privateKey && clientEmail && spreadsheetId),
  };
}

function createGoogleSheetsClient() {
  const config = getGoogleSheetsConfig();

  if (!config.isConfigured || !config.privateKey || !config.clientEmail || !config.spreadsheetId) {
    throw new Error("Google Sheets 환경변수가 설정되지 않았습니다.");
  }

  const auth = new google.auth.JWT({
    email: config.clientEmail,
    key: config.privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  return {
    spreadsheetId: config.spreadsheetId,
    sheets: google.sheets({ version: "v4", auth }),
  };
}

async function ensureLeadSheetExists(
  sheets: sheets_v4.Sheets,
  spreadsheetId: string,
) {
  const metadata = await sheets.spreadsheets.get({ spreadsheetId });
  const hasSheet = metadata.data.sheets?.some(
    (sheet) => sheet.properties?.title === LEADS_SHEET_TITLE,
  );

  if (!hasSheet) {
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: {
        requests: [
          {
            addSheet: {
              properties: {
                title: LEADS_SHEET_TITLE,
              },
            },
          },
        ],
      },
    });
  }
}

async function ensureLeadSheetHeader(
  sheets: sheets_v4.Sheets,
  spreadsheetId: string,
) {
  await ensureLeadSheetExists(sheets, spreadsheetId);

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${LEADS_SHEET_TITLE}!A1:J1`,
  });

  const currentHeader = response.data.values?.[0] ?? [];
  const needsHeader =
    currentHeader.length !== LEADS_HEADER_ROW.length ||
    LEADS_HEADER_ROW.some((header, index) => currentHeader[index] !== header);

  if (needsHeader) {
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `${LEADS_SHEET_TITLE}!A1:J1`,
      valueInputOption: "RAW",
      requestBody: {
        values: [Array.from(LEADS_HEADER_ROW)],
      },
    });
  }
}

function mapLeadToRow(lead: LeadRecord) {
  return [
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
  ];
}

function mapRowToLead(row: string[]) {
  return {
    submittedAt: row[0] ?? "",
    name: row[1] ?? "",
    phone: row[2] ?? "",
    region: row[3] ?? "",
    message: row[4] ?? "",
    ref: row[5] ?? "",
    utmSource: row[6] ?? "",
    utmMedium: row[7] ?? "",
    utmCampaign: row[8] ?? "",
    pageUrl: row[9] ?? "",
  } satisfies LeadRecord;
}

export function isGoogleSheetsConfigured() {
  return getGoogleSheetsConfig().isConfigured;
}

export async function appendLead(lead: LeadRecord) {
  const { sheets, spreadsheetId } = createGoogleSheetsClient();
  await ensureLeadSheetHeader(sheets, spreadsheetId);

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${LEADS_SHEET_TITLE}!A:J`,
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [mapLeadToRow(lead)],
    },
  });
}

export async function getLeads() {
  const { sheets, spreadsheetId } = createGoogleSheetsClient();
  await ensureLeadSheetHeader(sheets, spreadsheetId);

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${LEADS_SHEET_TITLE}!A2:J`,
  });

  return (response.data.values ?? []).map((row) => mapRowToLead(row));
}
