import {
  FranchiseStrength,
  OpeningStep,
  CostItem,
  GlobalLocation,
} from "@/types";

export const FRANCHISE_STRENGTHS: FranchiseStrength[] = [
  {
    number: "01",
    title: "검증된 안정성",
    description: "전국 300개 매장 운영\n안정적인 매출 기반",
    image: "/images/franchise/strength-1.jpg",
  },
  {
    number: "02",
    title: "스페셜티 전문성",
    description: "SCA 기준 80점 이상 생두만 사용\n차별화된 커피 맛",
    image: "/images/franchise/strength-2.jpg",
  },
  {
    number: "03",
    title: "타협 없는 원재료",
    description: "스페셜티 생두 + 그라스페드 버터\n프랜차이즈임에도 고퀄리티 원재료",
    image: "/images/franchise/strength-3.jpg",
  },
  {
    number: "04",
    title: "체계적인 시스템",
    description: "홀 키오스크+테이크아웃+배달\n3WAY 매출, 효율적인 운영 구조",
    image: "/images/franchise/strength-4.jpg",
  },
  {
    number: "05",
    title: "본사 밀착 지원",
    description: "전담 슈퍼바이저 배치\n정기 점검 및 빠른 피드백",
    image: "/images/franchise/strength-5.jpg",
  },
  {
    number: "06",
    title: "트렌드 선도력",
    description: "두쫀쿠 등 품귀 메뉴 본사 차원 빠른 도입\n매출 증대 기회 선점",
    image: "/images/franchise/strength-6.jpg",
  },
];

export const WHY_BLU_SHAAK = [
  {
    number: "01",
    title: "타협 없는 'SCA 80점' 스페셜티",
    description:
      "전 세계 생산량 10% 미만의 스페셜티 생두만을 고집합니다. Q-Grader의 엄격한 커핑 테스트와 전량 핸드픽 과정을 거쳐, 프랜차이즈에서 구현하기 힘든 깊고 깨끗한 원두의 풍미를 실현했습니다.",
    image: "/images/franchise/why-1.jpg",
  },
  {
    number: "02",
    title: "시그니처 메뉴의 파워",
    description:
      "4시간 숙성 수제 '샥크림'을 활용한 샥라떼와 피넛라떼는 블루샥을 '줄 서는 카페'로 만든 핵심 동력입니다. 모방할 수 없는 수제 레시피는 강력한 충성 고객층을 형성합니다.",
    image: "/images/franchise/why-2.jpg",
  },
  {
    number: "03",
    title: "하이엔드 원재료 전략",
    description:
      "휘낭시에 등 전 베이커리에 100% 그라스페드 '앵커버터'를 사용합니다. 팜유와 마가린을 배제한 건강한 프리미엄 레시피로 매장 내 '직접 베이킹'을 통해 갓 구운 신선함만 제공합니다.",
    image: "/images/franchise/why-3.jpg",
  },
  {
    number: "04",
    title: "트렌드 리딩 시스템",
    description:
      "두바이 쫀득 쿠키 등 시장에서 가장 핫한 디저트를 본사가 직접 소싱하여 공급합니다. 개인 카페가 따라올 수 없는 속도로 유행 메뉴를 선점해 점주님께 추가 매출 기회를 제공합니다.",
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
        "국내 최대 규모의 '동원홈푸드' 물류망을 통해 주 6회 신속 배송 및 철저한 선도 관리를 보장합니다. 고품질 원재료가 매장까지 변함없이 배송되는 안정적 공급망을 구축했습니다.",
      icon: "logistics",
    },
    {
      title: "전문가 그룹의 밀착 케어",
      description:
        "업계 최고의 QC(품질관리) 시스템을 갖춘 '고메웍스', 주방 설계 전문가 '고려주방' 등 분야별 파트너와 함께합니다. 전담 슈퍼바이저가 주기적으로 방문하여 위생 교육 및 전산 관리를 통해 매장 운영의 고충을 즉각 해결합니다.",
      icon: "care",
    },
    {
      title: "브랜드 경험의 확장(IP 협업)",
      description:
        "'핑크퐁 아기상어', '차코랩' 등 대중적 인지도가 높은 브랜드와 지속적인 콜라보레이션을 진행합니다. 한정판 굿즈와 프로모션을 통해 신규 고객 유입을 극대화하고 브랜드의 가치를 높입니다.",
      icon: "brand",
    },
  ],
};

export const TRAINING_STEPS = [
  { step: 1, title: "이론교육", description: "에스프레소 머신과 그라인더의 이해\n매장관리 업무의 이해" },
  { step: 2, title: "커피및음료 전문교육", description: "매장오픈과 마감방법\n커피 추출 교육\n메뉴 제조실습 및 테이스팅" },
  { step: 3, title: "실전메뉴", description: "포스사용 및 실전 음료 제조 연습" },
  { step: 4, title: "베이커리 교육", description: "매장에서 직접 구워내는\n베이커리 교육" },
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
  { label: "순수익", value: 30, color: "#1A73B5" },
  { label: "식자재", value: 35, color: "#3DCBA8" },
  { label: "인건비", value: 20, color: "#F59E0B" },
  { label: "부대비용", value: 15, color: "#6B7280" },
];

export const REVENUE_TABLE = {
  title: "월매출 25,000,000원 기준",
  subtitle: "*15평 매장 기준",
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
    countryKo: "인도네시아 1호점",
    flag: "🇮🇩",
    city: "Jakarta · Central Park Mall",
    description:
      "블루샥은 인도네시아의 대표적인 랜드마크이자 핵심 상권인 자카르타 센트럴 파크몰(Central Park Mall)에 성공적으로 진출하며 글로벌 시장에 이름을 알렸습니다. 현지 고객들의 폭발적인 반응에 힘입어 자카르타 1호점의 성공적 런칭을 기록하였으며, 이를 발판 삼아 현재 자카르타 2호점까지 오픈하여 안정적으로 운영 중에 있습니다.",
    lat: -6.1751,
    lng: 106.79,
  },
  {
    country: "Indonesia2",
    countryKo: "인도네시아 2호점",
    flag: "🇮🇩",
    city: "Jakarta",
    description:
      "블루샥 인도네시아 2호점. 현지에서의 성공적인 안착을 바탕으로 두 번째 매장을 오픈하며 인도네시아 시장에서의 브랜드 입지를 더욱 확고히 하고 있습니다.",
    lat: -6.2,
    lng: 106.82,
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
