import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import localFont from "next/font/local";
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
      <body
        className={`${pretendard.variable} ${playfairDisplay.variable} ${dmSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
