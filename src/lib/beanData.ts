import { CoffeeBean } from "@/types";

export const COFFEE_BEANS: CoffeeBean[] = [
  {
    id: "night-blend",
    name: "Night Blend",
    nameKo: "나이트 블렌드",
    origin: "브라질 70% + 콜롬비아 30%",
    blend: "Brazil + Colombia",
    roastLevel: "약강배전",
    agtron: "Agtron #49",
    flavors: ["다크초콜릿", "카카오닙스", "몰트", "피넛", "브라운슈가"],
    description:
      "진한 향과 깊은 바디감에 깔끔한 여운을 남기는 밤바다 같은 풍미",
    image: "/images/beans/night-blend.jpg",
  },
  {
    id: "sunset-single",
    name: "Sunset Single Origin",
    nameKo: "선셋 싱글 오리진",
    origin: "에티오피아 100%",
    blend: "Ethiopia",
    roastLevel: "중약배전",
    agtron: "Agtron #60",
    flavors: ["자몽", "오렌지", "레몬그라스", "브라운슈가"],
    description:
      "단맛과 산미의 적절한 밸런스로 은은한 꽃향기와 과일 플레이버",
    image: "/images/beans/sunset-single.jpg",
  },
  {
    id: "decaffeine",
    name: "Decaffeine",
    nameKo: "디카페인",
    origin: "마운틴 워터 프로세싱 (멕시코 화산 빙하 물)",
    blend: "Mountain Water Process",
    roastLevel: "강중배전",
    agtron: "Agtron #40",
    flavors: ["아몬드", "카카오닙스", "바닐라", "초콜릿"],
    description:
      "카페인 제거율 98%로 부담 없이 즐길 수 있으며, 진한 향미와 깔끔한 여운",
    image: "/images/beans/decaffeine.jpg",
  },
  {
    id: "specialty-blend",
    name: "Specialty Blend",
    nameKo: "스페셜티 블렌드",
    origin: "코스타리카 + 과테말라",
    blend: "Costa Rica + Guatemala",
    roastLevel: "중배전",
    agtron: "Agtron #55",
    flavors: ["캐러멜", "견과류", "시트러스", "초콜릿"],
    description:
      "핸드픽 처리, 배치별 커핑 검증을 거친 프리미엄 블렌드",
    image: "/images/beans/specialty-blend.jpg",
  },
];
