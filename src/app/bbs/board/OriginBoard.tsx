import { GNB, Footer } from "@/components/layout";
import { ORIGIN_ITEMS, ORIGIN_FOOTER_NOTE } from "@/lib/originBoardData";

export default function OriginBoard() {
  return (
    <>
      <GNB isScrolled={false} />

      <main className="min-h-screen bg-white pt-[72px]">
        <section className="mx-auto max-w-5xl px-4 py-10 md:py-16">
          {/* Header card */}
          <div className="rounded-3xl border border-warm-200 bg-white p-6 shadow-sm md:p-12">
            {/* Top bar */}
            <div className="flex items-center justify-between gap-4 pb-5">
              <h1 className="text-2xl font-extrabold tracking-tight text-dark-800 md:text-3xl">
                원산지 표시판
              </h1>
              <div className="flex items-center gap-2 text-blu-700">
                <svg
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden
                >
                  <path d="M12 3.5 3 20h18L12 3.5Zm0 4.3 5.9 10.7H6.1L12 7.8Z" />
                </svg>
                <span className="font-[family-name:var(--font-playfair-display)] text-xl font-semibold tracking-wide md:text-2xl">
                  Blu Shaak
                </span>
              </div>
            </div>

            <div className="h-px w-full bg-gradient-to-r from-blu-600 via-blu-300 to-transparent" />

            {/* List */}
            <ul className="mt-6 divide-y divide-warm-100 md:mt-10">
              {ORIGIN_ITEMS.map((item) => (
                <li
                  key={item.name}
                  className="grid grid-cols-1 gap-1 py-4 md:grid-cols-[minmax(180px,220px)_1fr] md:gap-6 md:py-5"
                >
                  <div className="font-bold text-blu-800 md:text-[15px]">
                    {item.name}
                  </div>
                  <div className="text-sm leading-relaxed text-gray-600 md:text-[15px]">
                    {item.origins}
                  </div>
                </li>
              ))}
            </ul>

            {/* Footer note */}
            <p className="mt-10 text-center text-xs text-gray-400 md:text-sm">
              {ORIGIN_FOOTER_NOTE}
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
