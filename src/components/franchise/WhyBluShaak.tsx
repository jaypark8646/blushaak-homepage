"use client";

import ScrollReveal from "@/components/ui/ScrollReveal";
import { WHY_BLU_SHAAK } from "@/lib/franchiseData";

export default function WhyBluShaak() {
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Title */}
        <ScrollReveal>
          <h2 className="font-[family-name:var(--font-playfair-display)] text-4xl sm:text-5xl md:text-6xl font-bold text-dark-800 text-center mb-16 md:mb-20">
            Why Blu Shaak?
          </h2>
        </ScrollReveal>

        {/* 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {WHY_BLU_SHAAK.map((item, index) => (
            <ScrollReveal key={item.number} delay={0.1 * index}>
              <div className="group bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
                {/* Image */}
                <div className="h-[200px] w-full overflow-hidden">
                  <img src={`/images/franchise/why-${index + 1}.jpg`} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8">
                  {/* Number badge */}
                  <div className="w-10 h-10 rounded-full bg-blu-500 flex items-center justify-center mb-4">
                    <span className="text-white text-sm font-bold font-[family-name:var(--font-dm-sans)]">
                      {item.number}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-bold text-dark-800 mb-3 group-hover:text-blu-500 transition-colors">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
