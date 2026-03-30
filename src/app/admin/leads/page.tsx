import Link from "next/link";
import Button from "@/components/ui/Button";
import { isAdminAuthenticated, isAdminPasswordConfigured } from "@/lib/adminAuth";
import { getLeads, isGoogleSheetsConfigured } from "@/lib/googleSheets";
import { submitAdminLogin, submitAdminLogout } from "./actions";

export const dynamic = "force-dynamic";

interface AdminLeadsPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

function formatSubmittedAt(value: string) {
  if (!value) {
    return "-";
  }

  try {
    return new Intl.DateTimeFormat("ko-KR", {
      dateStyle: "short",
      timeStyle: "short",
      timeZone: "Asia/Seoul",
    }).format(new Date(value));
  } catch {
    return value;
  }
}

function formatUtm(utmSource: string, utmMedium: string, utmCampaign: string) {
  const entries = [
    utmSource && `source=${utmSource}`,
    utmMedium && `medium=${utmMedium}`,
    utmCampaign && `campaign=${utmCampaign}`,
  ].filter(Boolean);

  return entries.length > 0 ? entries.join(" / ") : "-";
}

export default async function AdminLeadsPage({ searchParams }: AdminLeadsPageProps) {
  const resolvedSearchParams = await searchParams;
  const authEnabled = isAdminPasswordConfigured();
  const isAuthenticated = await isAdminAuthenticated();
  const sheetsEnabled = isGoogleSheetsConfigured();

  if (!authEnabled) {
    return (
      <main className="min-h-screen bg-warm-50 px-4 py-16">
        <div className="mx-auto max-w-3xl rounded-3xl border border-orange-200 bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-bold text-dark-800">관리자 설정 필요</h1>
          <p className="mt-4 text-sm leading-6 text-gray-600">
            <code>ADMIN_PASSWORD</code> 환경변수가 없어서 관리자 페이지를 열 수 없다.
            <br />
            <code>.env.local</code>과 Vercel 대시보드에 동일한 값을 추가해야 한다.
          </p>
        </div>
      </main>
    );
  }

  if (!isAuthenticated) {
    const error = resolvedSearchParams.error;
    const hasError = (Array.isArray(error) ? error[0] : error) === "invalid_password";

    return (
      <main className="min-h-screen bg-warm-50 px-4 py-16">
        <div className="mx-auto max-w-md rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-bold text-dark-800">리드 관리자</h1>
          <p className="mt-3 text-sm leading-6 text-gray-600">
            비밀번호를 입력하면 저장된 상담 신청 내역을 확인할 수 있다.
          </p>
          <form action={submitAdminLogin} className="mt-8 space-y-4">
            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-medium text-dark-700">
                관리자 비밀번호
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-dark-800 outline-none transition focus:border-transparent focus:ring-2 focus:ring-blu-500"
              />
            </div>
            {hasError && (
              <p className="text-sm text-cta-500">비밀번호가 올바르지 않다.</p>
            )}
            <Button type="submit" variant="primary" size="lg" className="w-full">
              로그인
            </Button>
          </form>
        </div>
      </main>
    );
  }

  const leads = sheetsEnabled ? await getLeads() : [];

  return (
    <main className="min-h-screen bg-warm-50 px-4 py-10">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex flex-col gap-4 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-medium text-blu-500">ADMIN / LEADS</p>
            <h1 className="mt-1 text-3xl font-bold text-dark-800">상담 신청 관리</h1>
            <p className="mt-2 text-sm text-gray-600">
              총 {leads.length}건의 리드가 저장되어 있다.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/admin/leads/export"
              className="inline-flex items-center justify-center rounded-lg bg-blu-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blu-600"
            >
              CSV 다운로드
            </Link>
            <form action={submitAdminLogout}>
              <Button type="submit" variant="outline">
                로그아웃
              </Button>
            </form>
          </div>
        </div>

        {!sheetsEnabled && (
          <div className="rounded-2xl border border-orange-200 bg-orange-50 px-5 py-4 text-sm text-orange-700">
            Google Sheets 환경변수가 없어 저장된 데이터를 불러올 수 없다.
          </div>
        )}

        <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-100 text-left">
              <thead className="bg-gray-50">
                <tr className="text-xs font-semibold uppercase tracking-[0.08em] text-gray-500">
                  <th className="px-4 py-4">날짜</th>
                  <th className="px-4 py-4">이름</th>
                  <th className="px-4 py-4">전화</th>
                  <th className="px-4 py-4">지역</th>
                  <th className="px-4 py-4">유입경로</th>
                  <th className="px-4 py-4">UTM</th>
                  <th className="px-4 py-4">문의내용</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {leads.length > 0 ? (
                  leads.map((lead, index) => (
                    <tr key={`${lead.submittedAt}-${lead.phone}-${index}`} className="align-top text-sm text-gray-700">
                      <td className="px-4 py-4 whitespace-nowrap">{formatSubmittedAt(lead.submittedAt)}</td>
                      <td className="px-4 py-4 whitespace-nowrap font-semibold text-dark-800">{lead.name}</td>
                      <td className="px-4 py-4 whitespace-nowrap">{lead.phone}</td>
                      <td className="px-4 py-4 whitespace-nowrap">{lead.region || "-"}</td>
                      <td className="px-4 py-4 whitespace-nowrap">{lead.ref || "-"}</td>
                      <td className="px-4 py-4">{formatUtm(lead.utmSource, lead.utmMedium, lead.utmCampaign)}</td>
                      <td className="px-4 py-4 min-w-[280px] whitespace-pre-wrap break-words">{lead.message || "-"}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-4 py-12 text-center text-sm text-gray-500">
                      아직 저장된 상담 신청이 없다.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
