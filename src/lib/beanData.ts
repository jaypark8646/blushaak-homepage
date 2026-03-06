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
    image: "/images/beans/night-blend.png",
  },
  {
    id: "colombian-fruity",
    name: "Colombian Fruity",
    nameKo: "콜롬비안 프루티",
    origin: "콜롬비아 100%",
    blend: "Colombia",
    roastLevel: "중약배전",
    agtron: "Agtron #58",
    flavors: ["체리", "자몽", "오렌지", "브라운슈가"],
    description:
      "화사한 과일 풍미와 부드러운 산미가 조화로운 콜롬비아 싱글 오리진",
    image: "/images/beans/colombian-fruity.png",
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
    image: "/images/beans/decaffeine.png",
  },
];
