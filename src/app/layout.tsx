import type { Metadata } from "next";
import { Suspense } from "react";
import { Playfair_Display, DM_Sans } from "next/font/google";
import localFont from "next/font/local";
import TrackingCapture from "@/components/tracking/TrackingCapture";
import TrackingPixels from "@/components/tracking/TrackingPixels";
import "./globals.css";

const pretendard = localFont({
  src: [
    { path: "../../public/fonts/PretendardVariable.woff2", style: "normal" },
  ],
  variable: "--font-pretendard",
  display: "swap",
  fallback: ["-apple-system", "BlinkMacSystemFont", "system-ui", "sans-serif"],
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-display",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

// 네이버 애널리틱스(공동인증키 s_3fd0bdb9538b). 네이버 광고의 스크립트 설치 확인은
// 렌더링된 DOM이 아니라 초기 HTML 소스에서 <script> 태그를 찾으므로, next/script 를
// 거치지 않고 <head> 에 원본 태그 그대로 출력한다. 로더 → 초기화 순서는 두 태그가
// 모두 동기 스크립트이므로 파싱 순서로 보장된다.
const NAVER_WCS_INIT = `if(!window.wcs_add)window.wcs_add={};window.wcs_add["wa"]="s_3fd0bdb9538b";if(!window._nasa)window._nasa={};if(window.wcs){window.wcs.inflow();window.wcs_do();}`;

export const metadata: Metadata = {
  title: "Blu Shaak COFFEE | Vacation in the CITY",
  description:
    "블루샥 커피 - 도심 속 작은 바캉스. 바쁜 일상에서 잠시 쉬어가는 순간을 선물하는 스페셜티 카페. Crafted with Better Ingredients.",
  keywords: [
    "블루샥",
    "블루샥커피",
    "Blu Shaak",
    "스페셜티커피",
    "카페프랜차이즈",
    "커피프랜차이즈",
    "카페창업",
  ],
  openGraph: {
    title: "Blu Shaak COFFEE | Vacation in the CITY",
    description:
      "도심 속 작은 바캉스. 바쁜 일상에서 잠시 쉬어가는 순간을 선물하는 스페셜티 카페.",
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        {/* NAVER Analytics (wcslog / inflow) */}
        <script src="//wcs.naver.net/wcslog.js" />
        <script dangerouslySetInnerHTML={{ __html: NAVER_WCS_INIT }} />
      </head>
      <body
        className={`${pretendard.variable} ${playfairDisplay.variable} ${dmSans.variable} antialiased`}
      >
        <TrackingPixels />
        <Suspense fallback={null}>
          <TrackingCapture />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
