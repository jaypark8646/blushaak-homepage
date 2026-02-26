import {
  FranchiseStrength,
  OpeningStep,
  CostItem,
  GlobalLocation,
} from "@/types";

export const FRANCHISE_STRENGTHS: FranchiseStrength[] = [
  {
    number: "01",
    title: "검증된 원두맛",
    description: "전국 300여 매장 운영, 검증된 원두 맛",
    image: "/images/franchise/strength-1.jpg",
  },
  {
    number: "02",
    title: "스페셜티 원두",
    description: "SCA 기준 80점 이상의 스페셜티 원두 사용",
    image: "/images/franchise/strength-2.jpg",
  },
  {
    number: "03",
    title: "다양한 선택지",
    description:
      "스페셜티 + 일반 커피 (2그라인더 체제), 두 종류의 맛을 즐길 수 있어 폭넓은 고객층 확보",
    image: "/images/franchise/strength-3.jpg",
  },
  {
    number: "04",
    title: "복합적인 카페",
    description:
      "커피 + 베이커리 + 디저트, 복합적인 카페 구성으로 매출 다변화",
    image: "/images/franchise/strength-4.jpg",
  },
];

export const WHY_BLU_SHAAK = [
  {
    number: "01",
    title: "타협 없는 'SCA 80점' 스페셜티",
    description:
      "전 세계 상위 5%만이 받을 수 있는 SCA(스페셜티커피협회) 등급 인증 획득. 프랜차이즈에서 구현하기 힘든 깊고 깨끗한 원두의 풍미를 블루샥은 전하고 있습니다.",
    image: "/images/franchise/why-1.jpg",
  },
  {
    number: "02",
    title: "시그니처 메뉴의 파워",
    description:
      '4시간 숙성 수제 "샥크림"을 활용한 시그니처라떼와 마스카르포네 크림 등 SNS 카페에도 없는 특별한 경험 제공. 한 번 먹어보면 팬이 될 맛입니다.',
    image: "/images/franchise/why-2.jpg",
  },
  {
    number: "03",
    title: "하이엔드 원재료 전략",
    description:
      "원유와 그라스페드버터를 비롯해 각 제품에 사용하는 원재료를 엄선하여 블루샥만의 높은 신선도와 프리미엄 레시피를 전합니다",
    image: "/images/franchise/why-3.jpg",
  },
  {
    number: "04",
    title: "트렌드 리딩 시스템",
    description:
      "부산, 춘천, 제주 등 시장에서 가장 빠르게 디저트를 발굴 및 직접 소화하여, 개인 카페에서의 속도와 매출을 신장하는 안정적인 숙도 마케팅 기획의 메커니즘",
    image: "/images/franchise/why-4.jpg",
  },
];

export const HQ_SUPPORT = {
  amounts: [
    { value: "500만원", label: "인테리어 지원" },
    { value: "500만원", label: "기기 지원" },
    { value: "200만원", label: "초도물류 지원" },
    { value: "3,000만원", label: "30평 기준 종합 지원" },
  ],
  items: [
    {
      title: "신뢰의 물류 파트너십",
      description:
        '국내 최대 규모의 "토탈프레시" 물류센터를 통해 주 4회 신속 배송. 철저한 온도 관리를 기반으로 한 콜드체인 배송 시스템으로 언제 어디서든 일관된 신선한 재료 공급',
      icon: "logistics",
    },
    {
      title: "전문가 그룹의 밀착 케어",
      description:
        "영업, 제조, QC(품질관리) 시스템을 체계적으로 구축. 개별 슈퍼바이저가 주기적으로 방문하여 교육 및 실전 관리를 통해 매장별 균일화된 고품질 서비스 실현",
      icon: "care",
    },
    {
      title: "브랜드 경험의 확장 (IP 협업)",
      description:
        '"팝콘즈 어거스트", "곽철이", 그 외 굿즈 프로모션 등 다양한 IP 라이센싱 굿즈 협업을 진행하여, 고객 경험을 극대화하는 브랜드 프로모션 마케팅',
      icon: "brand",
    },
  ],
};

export const TRAINING_STEPS = [
  { step: 1, title: "이론교육", description: "브랜드 이론 및 기본 교육" },
  { step: 2, title: "커피 & 음료 교육", description: "제조 실습 및 레시피 교육" },
  { step: 3, title: "CS 교육", description: "고객 서비스 교육" },
  { step: 4, title: "실전 배치", description: "실전 매장 근무 및 교육" },
  { step: 5, title: "베이커리 교육", description: "베이커리 제조 및 관리 교육" },
];

export const OPENING_STEPS: OpeningStep[] = [
  {
    step: 1,
    title: "1:1 창업 상담",
    details: [
      "브랜드 사업설명",
      "예비점주 예산자금 점검",
      "정보공개서 제공",
    ],
  },
  {
    step: 2,
    title: "상권 분석",
    details: [
      "점포위치 상권입지분석",
      "점포입지 선정",
      "내/외장 정보 실측",
      "예상 견적 브리핑",
    ],
  },
  {
    step: 3,
    title: "가맹계약 체결",
    details: ["부동산 계약 후 진행", "인테리어 도면 설계"],
  },
  {
    step: 4,
    title: "킥오프 미팅",
    details: [
      "공사&오픈스케줄 안내",
      "점포운영 안내",
      "광고 홍보 마케팅",
      "직원 모집",
    ],
  },
  {
    step: 5,
    title: "인테리어 공사",
    details: ["인테리어 착공", "내/외장 시공", "평균 25일 이내 작업"],
  },
  {
    step: 6,
    title: "인허가 & 업체 계약",
    details: [
      "위생교육 수료",
      "영업신고증/사업자등록증 발급",
      "기타 업체 계약 및 신청",
    ],
  },
  {
    step: 7,
    title: "오픈 지원",
    details: [
      "매장 상태 점검",
      "식자재 초도 입고",
      "오픈 교육",
    ],
  },
  {
    step: 8,
    title: "그랜드 오픈",
    details: [
      "슈퍼바이저 운영관리 지원",
      "지역 홍보 및 이벤트 진행",
      "점포 안정화",
    ],
    isHighlighted: true,
  },
];

export const COST_TABLE: CostItem[] = [
  {
    category: "가맹비",
    cost10: "5,000,000",
    cost15: "5,000,000",
    note: "한시적 할인 (정가 10,000,000원)",
  },
  {
    category: "교육비",
    cost10: "3,000,000",
    cost15: "3,000,000",
  },
  {
    category: "인테리어",
    cost10: "32,000,000",
    cost15: "44,500,000",
    note: "별도공사(파사드, 철거, 스피커 등) 10평 전면 3~4m 기준으로 평균 별도 공사비 1천5백~2천 예상",
  },
  {
    category: "전기증설/에어컨",
    cost10: "-",
    cost15: "-",
    note: "점주님 직접 가능",
  },
  {
    category: "기기 및 장비 (2G 기준)",
    cost10: "35,800,000",
    cost15: "35,800,000",
    note: "오븐기/비닝 쇼케이스/그라인더 3대 포함",
  },
  {
    category: "초도비품",
    cost10: "4,500,000",
    cost15: "4,500,000",
  },
  {
    category: "가구",
    cost10: "-",
    cost15: "-",
    note: "100만원(의자 4개, 테이블 1개 기준), 10평 이하 매장은 테이블 X, 15평 기준 테이블 3~4개 가능",
  },
  {
    category: "포스/키오스크",
    cost10: "-",
    cost15: "-",
    note: "일시불 및 할부가능(일시불시 대략 포스 100만원, 키오스크 200만원 측정)",
  },
  {
    category: "CCTV/인터넷/세스코/세무사",
    cost10: "-",
    cost15: "-",
    note: "지정업체 사용 or 직접 가능",
  },
];

export const PIE_CHART_DATA = [
  { label: "순수익", value: 25.4, color: "#1A73B5" },
  { label: "원료비", value: 30, color: "#3DCBA8" },
  { label: "수수료", value: 22.4, color: "#F59E0B" },
  { label: "임대료", value: 11.5, color: "#EF4444" },
  { label: "인건비", value: 7.1, color: "#8B5CF6" },
  { label: "기타비", value: 3.7, color: "#6B7280" },
];

export const REVENUE_TABLE = {
  title: "월매출 25,000,000원 기준",
  subtitle: "*15평 매장 기준 / 인건비급여 매출",
  items: [
    { label: "순수익", percentage: 30, amount: "7,500,000", color: "#1A73B5" },
    { label: "식자재", percentage: 35, amount: "8,750,000", color: "#3DCBA8" },
    { label: "인건비", percentage: 20, amount: "5,000,000", color: "#F59E0B" },
    { label: "부대비용", percentage: 15, amount: "3,750,000", color: "#6B7280" },
  ],
};

export const GLOBAL_LOCATIONS: GlobalLocation[] = [
  {
    country: "Indonesia",
    countryKo: "인도네시아",
    flag: "🇮🇩",
    city: "Jakarta",
    description:
      "자카르타의 랜드마크를 선점한 스페셜티의 자력. 블루샥은 인도네시아 글로벌 복합문화공간인 자카르타 Central Park Mall에 첫 해외 매장을 오픈하였습니다. 현지 고객들에게 블루샥만의 프리미엄 커피 경험을 전하고 있습니다.",
    lat: -6.1751,
    lng: 106.79,
  },
  {
    country: "Canada",
    countryKo: "캐나다",
    flag: "🇨🇦",
    city: "Toronto",
    description:
      "북미 시장의 중심, 캐나다 토론토에 상륙한 블루샥. 블루샥은 캐나다 토론토 번화가인 Yonge Street 부근에 첫 북미 매장을 오픈하였습니다. 현지 시장에서 한국 스페셜티 커피와 디저트를 선보이며 경쟁력을 입증하고 있습니다.",
    lat: 43.6532,
    lng: -79.3832,
  },
];
