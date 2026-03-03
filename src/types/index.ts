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
}

export type MenuCategory =
  | "new-best"
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
  phone: string;
  lat: number;
  lng: number;
  hours: string;
  hasDriveThru?: boolean;
}

// News types
export interface NewsItem {
  id: string;
  title: string;
  date: string;
  category: "notice" | "event" | "support";
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
