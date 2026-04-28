// Nutrition types
export interface NutritionInfo {
  calories: number | null;
  sodium: number | null;
  sugar: number | null;
  saturatedFat: number | null;
  protein: number | null;
  caffeine: number | null;
  allergens: string | null;
}

// Menu types
export interface MenuItem {
  id: string;
  name: string;
  nameKo: string;
  category: MenuCategory;
  image: string;
  description?: string;
  isNew?: boolean;
  isBest?: boolean;
  nutrition?: NutritionInfo | null;
}

export type MenuCategory =
  | "coffee"
  | "beverage"
  | "blended"
  | "bottle"
  | "bakery"
  | "ice-cream"
  | "md";

export interface MenuCategoryInfo {
  id: MenuCategory;
  label: string;
  labelKo: string;
}

// Bean types
export interface CoffeeBean {
  id: string;
  name: string;
  nameKo: string;
  origin: string;
  blend: string;
  roastLevel: string;
  agtron: string;
  flavors: string[];
  description: string;
  image: string;
}

// Store types
export interface Store {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  hasDriveThru?: boolean;
}

// News types
export interface NewsItem {
  id: string;
  title: string;
  date: string;
  category: "notice" | "news" | "event";
  thumbnail?: string;
  excerpt: string;
  content?: string;
}

// Franchise types
export interface FranchiseStrength {
  number: string;
  title: string;
  description: string;
  image: string;
}

export interface OpeningStep {
  step: number;
  title: string;
  details: string[];
  isHighlighted?: boolean;
}

export interface CostItem {
  category: string;
  cost10: string;
  cost15: string;
  note?: string;
}

export interface InquiryFormData {
  name: string;
  phone: string;
  preferredArea: string;
  estimatedBudget: string;
  hasStore: boolean;
  referralSource: string;
  locationType: "general" | "special";
  details: string;
  agreePrivacy: boolean;
}

// Navigation types
export interface NavItem {
  label: string;
  href: string;
  submenu?: SubNavItem[];
}

export interface SubNavItem {
  label: string;
  href: string;
}

// Global location
export interface GlobalLocation {
  country: string;
  countryKo: string;
  flag: string;
  city: string;
  description: string;
  lat: number;
  lng: number;
}

// Calibration city type — 캘리브레이션 페이지에서 관리되는 도시 데이터
export type LocationCategory = "blushaak-done" | "blushaak-wip" | "photo-done" | "photo-wip";

export interface CalibrationCity {
  id: string; // 고유 ID (uuid 또는 slug)
  name: string; // 영문 도시명 (e.g. "Jakarta")
  nameKo: string; // 한글 도시명 (e.g. "자카르타")
  category: LocationCategory;
  lat: number; // 위도 (Globe3D용)
  lng: number; // 경도 (Globe3D용)
  mapX: number; // 2D 지도 위 X% (0~100)
  mapY: number; // 2D 지도 위 Y% (0~100)
}
