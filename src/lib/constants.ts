import { NavItem } from "@/types";

export const BRAND = {
  name: "Blu Shaak COFFEE",
  nameKo: "블루샥 커피",
  company: "주식회사 단디코리아",
  ceo: "김상윤",
  bizNumber: "543-87-01389",
  slogan: "Vacation in the CITY",
  subCopy: "Crafted with Better Ingredients.",
  concept:
    "도심 속 작은 바캉스 — 바쁜 일상에서 잠시 쉬어가는 순간을 선물하는 스페셜티 카페",
  philosophy:
    "저희가 사용할 수 있는 최상의 재료로 정성껏 만들었습니다",
  storeCount: "300",
  instagram: "@blushaak_coffee",
  instagramUrl: "https://www.instagram.com/blushaak_coffee",
  phone: "1644-8067",
  email: "tax@dandikorea.com",
  fax: "051-819-7861",
  headquarters: {
    seoul: "서울특별시 금천구 가산디지털1로 189, LG가산디지털센터 10F 1002호",
    busan:
      "부산광역시 해운대구 센텀중앙로 48, 8층 805,806호 (우동, 에이스하이테크21)",
  },
  copyright: "COPYRIGHT(c) 블루샥. ALL RIGHTS RESERVED.",
};

export const NAV_ITEMS: NavItem[] = [
  {
    label: "BRAND",
    href: "/brand",
    submenu: [
      { label: "Brand Story", href: "/brand#story" },
      { label: "Brand Vision", href: "/brand#vision" },
      { label: "Store Locator", href: "/store" },
      { label: "Head Office", href: "/brand#office" },
      { label: "프랜차이즈 소개", href: "/brand#franchise" },
      { label: "창업 비용", href: "/brand#cost" },
      { label: "창업 상담 문의", href: "/brand#inquiry" },
    ],
  },
  {
    label: "MENU",
    href: "/menu",
    submenu: [
      { label: "Coffee", href: "/menu?category=coffee" },
      { label: "Beverage", href: "/menu?category=beverage" },
      { label: "Blended", href: "/menu?category=blended" },
      { label: "Bottle", href: "/menu?category=bottle" },
      { label: "Bakery", href: "/menu?category=bakery" },
      { label: "Ice-cream", href: "/menu?category=ice-cream" },
      { label: "MD", href: "/menu?category=md" },
    ],
  },
  {
    label: "STORE",
    href: "/store",
  },
  {
    label: "NEWS",
    href: "/news",
    submenu: [
      { label: "Notice", href: "/news?tab=notice" },
      { label: "Event", href: "/news?tab=event" },
      { label: "Support", href: "/news?tab=support" },
    ],
  },
  {
    label: "STORE OWNER",
    href: "/store-owner",
  },
];

export const FOOTER_LINKS = [
  { label: "소식", href: "/news?tab=notice" },
  { label: "이벤트", href: "/news?tab=event" },
  { label: "제휴/제안", href: "/brand#office" },
  { label: "고객상담", href: "/news?tab=support" },
  { label: "개인정보 처리방침", href: "#" },
  { label: "이용약관", href: "#" },
];

export const BRAND_SIDEBAR_ITEMS = [
  { label: "가맹문의", sublabel: "1644-8067", href: "tel:1644-8067", icon: "phone" },
  { label: "블루샥 앱 주문", href: "#", icon: "app" },
  { label: "가까운 매장찾기", href: "/store", icon: "map" },
  { label: "문의/접수", href: "/news?tab=support", icon: "inquiry" },
  { label: "이벤트", href: "/news?tab=event", icon: "event" },
];

export const FRANCHISE_SIDEBAR_ITEMS = [
  { label: "가맹문의", sublabel: "1644-8067", href: "tel:1644-8067", icon: "phone" },
  { label: "창업 상담 문의", href: "/brand#inquiry", icon: "consult" },
  { label: "해외사업 문의", href: "/brand#global", icon: "global" },
];

export const REFERRAL_SOURCES = [
  "인터넷 검색",
  "SNS (인스타그램, 블로그 등)",
  "지인 소개",
  "매장 방문",
  "뉴스/기사",
  "창업 박람회",
  "기타",
];
