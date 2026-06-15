"use client";

import Image from "next/image";
import { GNB } from "@/components/layout";
import { useScrollPosition } from "@/hooks/useScrollPosition";

const challengeImage = {
  src: "/images/event/shaak-is-up-summer-shot.jpg",
  alt: "샥이즈업 인스타그램 챌린지 대표 이미지",
};

const campaignImages = [
  {
    src: "/images/event/shaak-is-up-01.jpg",
    alt: "블루샥 사이즈업 캠페인 메인 비주얼",
    label: "Campaign Visual 01",
  },
  {
    src: "/images/event/shaak-is-up-02.jpg",
    alt: "샥이즈업 인스타그램 챌린지 안내 비주얼",
    label: "Campaign Visual 02",
  },
];

const bestShotPrizes = [
  { rank: "1등", winner: "1명", prize: "아이패드 에어 (iPad Air)" },
  { rank: "2등", winner: "1명", prize: "디올 (Dior) 카드 지갑" },
  { rank: "3등", winner: "1명", prize: "에어팟 프로 (AirPods Pro)" },
];

const randomPrizes = [
  "뉴트리코어 영양제",
  "디디오랩 소형가전",
  "차코랩 X 블루샥 한정판 텀블러",
  "블루샥 앱 전용 금액권 (3만 원 / 2만 원 / 1만 원)",
];

const noticeItems = [
  "비공개 계정의 경우 게시물 확인이 어려워 추첨 대상에서 제외될 수 있습니다.",
  "챌린지 참여에 사용된 사진은 블루샥 마케팅 용도로 활용될 수 있습니다.",
  "당첨자 발표는 이벤트 종료 후 공식 홈페이지 및 인스타그램을 통해 공지됩니다.",
];

export default function ShaakIsUpPageClient() {
  const { isScrolled } = useScrollPosition();

  return (
    <>
      <GNB isScrolled={isScrolled} />

      <main className="min-h-screen overflow-hidden bg-[linear-gradient(180deg,#dff4ff_0%,#edf8ff_20%,#0d2f4f_52%,#071a2f_100%)] pt-[72px] text-dark-800">
        <section className="relative isolate">
          <div className="absolute inset-x-0 top-0 -z-10 h-[28rem] bg-[radial-gradient(circle_at_top_left,rgba(77,219,177,0.35),transparent_40%),radial-gradient(circle_at_top_right,rgba(46,156,223,0.4),transparent_36%),linear-gradient(180deg,#0b3152_0%,#1a73b5_44%,#58b2e7_100%)]" />
          <div className="absolute left-[-8rem] top-24 -z-10 h-56 w-56 rounded-full bg-white/15 blur-3xl" />
          <div className="absolute right-[-5rem] top-40 -z-10 h-64 w-64 rounded-full bg-mint-200/40 blur-3xl" />

          <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:px-10 lg:py-24">
            <div className="max-w-3xl">
              <span className="inline-flex rounded-full border border-white/25 bg-white/12 px-4 py-1 text-sm font-semibold tracking-[0.24em] text-white uppercase backdrop-blur-sm">
                Summer Campaign
              </span>
              <h1 className="mt-5 text-4xl font-black leading-tight text-white md:text-6xl">
                블루샥 음료 사이즈업!
                <br />
                <span className="text-mint-100">[SHAAK IS UP!]</span>
              </h1>
              <p className="mt-5 text-lg font-semibold text-blu-50 md:text-2xl">
                &quot;더 크게, 더 시원하게! 퀄리티는 그대로, 용량은 크게!&quot;
              </p>
              <div className="mt-8 space-y-4 text-base leading-8 text-white/92 md:text-lg">
                <p>안녕하세요, 블루샥입니다.</p>
                <p>
                  언제나 최고의 맛을 전해드리기 위해 고민하는 블루샥이 올여름
                  특별한 캠페인으로 찾아왔습니다.
                </p>
                <p>
                  매일 마시는 맛있는 음료를 일상에서 더 크고 넉넉하게 즐기실 수
                  있도록, 용량을 시원하게 키웠습니다.
                </p>
                <p>
                  블루샥의 프리미엄 음료를 더 커진 사이즈로 만나보세요.
                </p>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/20 bg-white/14 p-4 shadow-[0_30px_80px_rgba(6,27,49,0.28)] backdrop-blur-md md:p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.5rem] bg-white/18 p-5 text-white sm:col-span-2">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-mint-100">
                    참여 기간
                  </p>
                  <p className="mt-3 text-2xl font-black leading-snug md:text-3xl">
                    2026년 6월 30일 (화)
                    <br />
                    ~ 2026년 7월 31일 (금)
                  </p>
                </div>
                <div className="rounded-[1.5rem] bg-white p-5 text-dark-800">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blu-500">
                    필수 태그
                  </p>
                  <p className="mt-3 text-lg font-bold">@blushaak__coffee</p>
                </div>
                <div className="rounded-[1.5rem] bg-mint-50 p-5 text-dark-800">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-mint-700">
                    필수 해시태그
                  </p>
                  <p className="mt-3 text-lg font-bold leading-relaxed">
                    #블루샥 #블루샥커피 #샥이즈업
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-14 md:px-8 lg:px-10 lg:py-20">
          <div className="mb-10 max-w-3xl">
            <span className="inline-flex rounded-full bg-white px-4 py-1 text-sm font-semibold text-blu-700 ring-1 ring-blu-100">
              Campaign Story
            </span>
            <h2 className="mt-4 text-3xl font-black md:text-5xl">
              더 크게, 더 시원하게
              <br />
              블루샥의 여름을 담았습니다
            </h2>
            <div className="mt-6 space-y-3 text-base leading-8 text-gray-700 md:text-lg">
              <p>
                언제나 최고의 맛을 전해드리기 위해 고민하는 블루샥이
                올여름 특별한 캠페인으로 찾아왔습니다.
              </p>
              <p>
                매일 마시는 맛있는 음료를 일상에서 더 크고 넉넉하게 즐기실
                수 있도록, 용량을 시원하게 키웠습니다.
              </p>
            </div>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            {campaignImages.map((image) => (
              <article
                key={image.src}
                className="overflow-hidden rounded-[2rem] bg-white/90 shadow-[0_20px_48px_rgba(16,71,115,0.14)] ring-1 ring-white/70 backdrop-blur-sm"
              >
                <div className="relative aspect-[4/5]">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    priority
                  />
                </div>
                <div className="bg-[linear-gradient(135deg,#08233d_0%,#114a78_100%)] px-6 py-5 text-white">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-mint-100">
                    {image.label}
                  </p>
                  <p className="mt-2 text-lg font-bold leading-relaxed">
                    블루샥의 프리미엄 음료를 더 커진 사이즈로 만나보세요.
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-14 md:px-8 lg:px-10 lg:py-20">
          <div className="mb-10 max-w-3xl">
            <span className="inline-flex rounded-full bg-blu-100 px-4 py-1 text-sm font-semibold text-blu-700">
              Section 1
            </span>
            <h2 className="mt-4 text-3xl font-black md:text-5xl">
              샥이즈업(SHAAK IS UP)
              <br />
              인스타그램 챌린지
            </h2>
            <div className="mt-6 space-y-3 text-base leading-8 text-gray-700 md:text-lg">
              <p>
                더 커진 블루샥 음료와 함께하는 여러분의 시원한 일상을 공유해
                주세요!
              </p>
              <p>
                창의적인 연출샷도, 평범한 일상 속 인증샷도 모두 환영합니다.
              </p>
              <p>사이즈업을 체감할 수 있는 사진이면 당첨 확률 UP!</p>
            </div>
          </div>

          <article className="overflow-hidden rounded-[1.75rem] bg-white shadow-[0_18px_40px_rgba(16,71,115,0.12)] ring-1 ring-blu-100">
            <div className="relative aspect-[4/5] w-full">
              <Image
                src={challengeImage.src}
                alt={challengeImage.alt}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 960px, 100vw"
              />
            </div>
          </article>

          <div className="mt-10 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="rounded-[2rem] bg-white p-6 shadow-[0_16px_36px_rgba(16,71,115,0.08)] ring-1 ring-blu-100 md:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blu-500">
                참여 기간
              </p>
              <p className="mt-3 text-2xl font-black leading-snug md:text-3xl">
                2026년 6월 30일 (화) ~ 2026년 7월 31일 (금)
              </p>
            </div>

            <div className="rounded-[2rem] bg-[#e9f8ff] p-6 shadow-[0_16px_36px_rgba(16,71,115,0.08)] ring-1 ring-white md:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blu-700">
                참여 방법
              </p>
              <ol className="mt-4 space-y-4 text-base leading-7 text-gray-700">
                <li>
                  1. 더 크고 넉넉해진 블루샥 음료와 함께하는 일상을 내
                  취향껏 촬영한다.
                </li>
                <li>
                  2. 필수 해시태그 및 공식 계정을 태그하여 개인
                  인스타그램(게시물 또는 스토리)에 업로드하면 끝!
                </li>
              </ol>
              <div className="mt-6 rounded-[1.5rem] bg-white p-5 ring-1 ring-blu-100">
                <p className="font-semibold text-blu-700">필수 태그</p>
                <p className="mt-1 text-lg font-bold text-dark-800">
                  @blushaak__coffee
                </p>
                <p className="mt-4 font-semibold text-blu-700">필수 해시태그</p>
                <p className="mt-1 text-lg font-bold text-dark-800">
                  #블루샥 #블루샥커피 #샥이즈업
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 pb-14 md:px-8 lg:px-10 lg:pb-20">
          <div className="relative overflow-hidden rounded-[2.25rem] bg-[linear-gradient(135deg,#061b31_0%,#104773_42%,#1a73b5_100%)] px-6 py-10 text-white shadow-[0_26px_60px_rgba(6,27,49,0.22)] md:px-10 md:py-12">
            <div className="absolute -right-12 top-0 h-40 w-40 rounded-full bg-mint-300/30 blur-3xl" />
            <div className="absolute left-1/3 bottom-0 h-32 w-32 rounded-full bg-white/10 blur-3xl" />

            <div className="relative">
              <span className="inline-flex rounded-full bg-white/12 px-4 py-1 text-sm font-semibold text-blu-50">
                Section 2
              </span>
              <h2 className="mt-4 text-3xl font-black md:text-5xl">
                역대급 경품 라인업
              </h2>

              <div className="mt-10">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🏆</span>
                  <h3 className="text-2xl font-black md:text-3xl">
                    베스트 인증샷 경품 (선정 3명)
                  </h3>
                </div>
                <div className="mt-6 grid gap-4 md:grid-cols-3">
                  {bestShotPrizes.map((item, index) => (
                    <article
                      key={item.rank}
                      className="rounded-[1.75rem] bg-white p-6 text-dark-800 shadow-[0_18px_30px_rgba(6,27,49,0.16)]"
                    >
                      <div className="flex items-center justify-between">
                        <span className="inline-flex rounded-full bg-blu-500 px-3 py-1 text-sm font-bold text-white">
                          {item.rank}
                        </span>
                        <span className="text-sm font-semibold text-gray-500">
                          {item.winner}
                        </span>
                      </div>
                      <p className="mt-5 text-4xl">
                        {index === 0 ? "👑" : index === 1 ? "💎" : "🎧"}
                      </p>
                      <p className="mt-4 text-xl font-black leading-snug">
                        {item.prize}
                      </p>
                    </article>
                  ))}
                </div>
              </div>

              <div className="mt-12 rounded-[2rem] bg-white/10 p-6 ring-1 ring-white/15 backdrop-blur-sm md:p-8">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🎲</span>
                  <h3 className="text-2xl font-black md:text-3xl">
                    행운의 랜덤 경품 (추첨 증정)
                  </h3>
                </div>
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  {randomPrizes.map((prize) => (
                    <div
                      key={prize}
                      className="rounded-[1.5rem] bg-white/12 px-5 py-4 text-base font-semibold text-white ring-1 ring-white/12"
                    >
                      {prize}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 pb-20 md:px-8 lg:px-10">
          <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,#08233d_0%,#0f3e68_52%,#15588d_100%)] p-6 text-white shadow-[0_16px_36px_rgba(6,27,49,0.22)] md:p-8">
            <h2 className="text-2xl font-black md:text-3xl">
              유의사항
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-white/78 md:text-base">
              캠페인 참여 전 아래 내용을 확인해 주세요. 보다 정확한 운영을 위해
              게시물 공개 여부와 태그 표기를 꼭 점검해 주셔야 합니다.
            </p>
            <ul className="mt-5 space-y-3 text-base leading-7 text-white/88">
              {noticeItems.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-2.5 w-2.5 flex-none rounded-full bg-mint-200" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
