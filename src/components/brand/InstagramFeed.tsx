"use client";

import ScrollReveal from "@/components/ui/ScrollReveal";
import { useDragScroll } from "@/hooks/useDragScroll";

const INSTAGRAM_POSTS = [
  { id: 1, image: "/images/instagram/post-1.jpg" },
  { id: 2, image: "/images/instagram/post-2.jpg" },
  { id: 3, image: "/images/instagram/post-3.jpg" },
  { id: 4, image: "/images/instagram/post-4.jpg" },
  { id: 5, image: "/images/instagram/post-5.jpg" },
  { id: 6, image: "/images/instagram/post-6.jpg" },
  { id: 7, image: "/images/instagram/post-7.jpg" },
  { id: 8, image: "/images/instagram/post-8.jpg" },
];

export default function InstagramFeed() {
  const { ref, isDragging, handlers } = useDragScroll();

  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Title */}
        <ScrollReveal>
          <div className="flex items-center justify-center gap-3 mb-12 md:mb-16">
            {/* Instagram icon */}
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-dark-800"
            >
              <rect
                x="2"
                y="2"
                width="20"
                height="20"
                rx="5"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <circle
                cx="12"
                cy="12"
                r="5"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <circle cx="17.5" cy="6.5" r="1.25" fill="currentColor" />
            </svg>
            <h2 className="text-xl md:text-2xl font-semibold text-dark-800 font-[family-name:var(--font-dm-sans)]">
              @blushaak_coffee
            </h2>
          </div>
        </ScrollReveal>

        {/* Scrollable feed */}
        <ScrollReveal delay={0.1}>
          <div
            ref={ref}
            {...handlers}
            className="flex gap-4 md:gap-5 overflow-x-auto pb-4 select-none"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {INSTAGRAM_POSTS.map((post) => (
              <div
                key={post.id}
                className={`flex-shrink-0 group ${
                  isDragging ? "pointer-events-none" : ""
                }`}
              >
                <div
                  className="relative w-[220px] h-[220px] md:w-[250px] md:h-[250px] rounded-xl overflow-hidden cursor-pointer transition-transform duration-300 group-hover:scale-[1.04] shadow-sm"
                >
                  <img src={post.image} alt="Instagram post" className="absolute inset-0 w-full h-full object-cover" />
                  <div className="relative w-full h-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20">
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="white"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
