"use client";

import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Button from "@/components/ui/Button";

export default function AppStoreCards() {
  return (
    <section className="py-20 md:py-24 bg-warm-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* App Order Card */}
          <ScrollReveal delay={0.05}>
            <div className="group relative bg-white rounded-2xl p-8 md:p-10 shadow-[0_2px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-start gap-6">
                {/* App icon placeholder */}
                <div
                  className="w-16 h-16 rounded-2xl flex-shrink-0 flex items-center justify-center"
                  style={{
                    background:
                      "linear-gradient(135deg, #1A73B5 0%, #2E9CDF 100%)",
                  }}
                >
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="5"
                      y="2"
                      width="14"
                      height="20"
                      rx="3"
                      stroke="white"
                      strokeWidth="1.5"
                    />
                    <circle cx="12" cy="18" r="1" fill="white" />
                    <path
                      d="M9 5h6"
                      stroke="white"
                      strokeWidth="1"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

                <div className="flex-1">
                  <h3 className="text-lg font-bold text-dark-800">
                    앱에서 만나는 블루샥
                  </h3>
                  <p className="text-sm text-gray-500 mt-1 font-[family-name:var(--font-dm-sans)]">
                    앱으로 주문하기
                  </p>
                  <p className="text-sm text-gray-400 mt-3 leading-relaxed">
                    블루샥 앱으로 간편하게 주문하고, 포인트 적립과 다양한 혜택을
                    누려보세요.
                  </p>
                  <div className="mt-5">
                    <Button variant="primary" size="sm">
                      앱 다운로드
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Store Locator Card */}
          <ScrollReveal delay={0.2}>
            <div className="group relative bg-white rounded-2xl p-8 md:p-10 shadow-[0_2px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-start gap-6">
                {/* Map pin icon placeholder */}
                <div
                  className="w-16 h-16 rounded-2xl flex-shrink-0 flex items-center justify-center"
                  style={{
                    background:
                      "linear-gradient(135deg, #3DCBA8 0%, #2DB89A 100%)",
                  }}
                >
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
                      stroke="white"
                      strokeWidth="1.5"
                      fill="none"
                    />
                    <circle cx="12" cy="9" r="2.5" stroke="white" strokeWidth="1.5" />
                  </svg>
                </div>

                <div className="flex-1">
                  <h3 className="text-lg font-bold text-dark-800">
                    가까운 블루샥 매장 찾기
                  </h3>
                  <p className="text-sm text-gray-500 mt-1 font-[family-name:var(--font-dm-sans)]">
                    Store Locator
                  </p>
                  <p className="text-sm text-gray-400 mt-3 leading-relaxed">
                    전국 300여 개 매장 중 가장 가까운 블루샥을 찾아보세요.
                    드라이브스루 매장도 확인할 수 있습니다.
                  </p>
                  <div className="mt-5">
                    <Link href="/store">
                      <Button variant="mint" size="sm">
                        매장 찾기
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
