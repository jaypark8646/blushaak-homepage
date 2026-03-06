"use client";

import ScrollReveal from "@/components/ui/ScrollReveal";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const HISTORY = [
  {
    year: "2019",
    items: ["블루샥 첫 매장 오픈"],
  },
  {
    year: "2021",
    items: ["가맹사업 시작", "수변공원DT 오픈 (첫 DT 매장)", "서김해DT 오픈"],
  },
  {
    year: "2022",
    items: ["카카오톡 선물하기 입점"],
  },
  {
    year: "2023",
    items: [
      "인도네시아 마스터 프랜차이즈 계약",
      "동김해DT 오픈",
      "IFS 프랜차이즈 창업박람회 참여 (1월, 10월)",
      "울산국제아트페어 참여",
      "블루샥 전용 앱 런칭",
      "씨라이프 아쿠아리움 협업",
    ],
  },
  {
    year: "2024",
    items: ["인도네시아 1호점 오픈", "사천DT 오픈", "핑크퐁 콜라보 진행"],
  },
  {
    year: "2025",
    items: ["인도네시아 2호점 오픈", "차코랩 텀블러 콜라보", "SKT T day 참여"],
  },
  {
    year: "2026",
    items: ["캐나다 1호점 오픈"],
    highlight: true,
  },
];

function HistoryItem({
  year,
  items,
  highlight,
  index,
}: {
  year: string;
  items: string[];
  highlight?: boolean;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -24 : 24 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="flex gap-4 sm:gap-6"
    >
      {/* Year badge */}
      <div className="flex flex-col items-center flex-shrink-0">
        <div
          className={`w-16 sm:w-20 text-center py-1.5 rounded-full text-xs sm:text-sm font-bold ${
            highlight
              ? "bg-blu-500 text-white shadow-md shadow-blu-200"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {year}
        </div>
        <div className="w-0.5 flex-1 mt-2 bg-gray-200" />
      </div>

      {/* Content */}
      <div className="pb-6 sm:pb-8 pt-1 flex-1">
        <ul className="space-y-1">
          {items.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span
                className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                  highlight ? "bg-blu-500" : "bg-gray-300"
                }`}
              />
              <span
                className={`text-sm sm:text-base leading-relaxed ${
                  highlight ? "text-blu-700 font-medium" : "text-gray-600"
                }`}
              >
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export default function FranchiseHistory() {
  return (
    <section className="py-24 md:py-32 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4">
        <ScrollReveal>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-dark-800 text-center mb-4">
            블루샥 연혁
          </h2>
          <p className="text-center text-gray-400 text-sm sm:text-base mb-14 md:mb-18">
            블루샥의 성장 발자취를 소개합니다.
          </p>
        </ScrollReveal>

        <div>
          {HISTORY.map((entry, idx) => (
            <HistoryItem
              key={entry.year}
              year={entry.year}
              items={entry.items}
              highlight={entry.highlight}
              index={idx}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
