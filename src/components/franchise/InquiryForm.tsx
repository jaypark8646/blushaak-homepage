"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import ToggleButton from "@/components/ui/ToggleButton";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { REFERRAL_SOURCES } from "@/lib/constants";

interface FormState {
  name: string;
  phone: string;
  preferredArea: string;
  estimatedBudget: string;
  preferredSize: string;
  ageGroup: string;
  hasFranchiseExp: string;
  openYear: string;
  openMonth: string;
  hasStore: string;
  referralSource: string;
  locationType: string;
  details: string;
  agreePrivacy: boolean;
}

const initialState: FormState = {
  name: "",
  phone: "",
  preferredArea: "",
  estimatedBudget: "",
  preferredSize: "10평대",
  ageGroup: "30대",
  hasFranchiseExp: "없음",
  openYear: "",
  openMonth: "",
  hasStore: "없음",
  referralSource: "",
  locationType: "일반상권",
  details: "",
  agreePrivacy: false,
};

export default function InquiryForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setForm((prev) => ({ ...prev, [name]: checked }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
    // Clear error on change
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof FormState, string>> = {};

    if (!form.name.trim()) newErrors.name = "성함을 입력해 주세요.";
    if (!form.phone.trim()) {
      newErrors.phone = "연락처를 입력해 주세요.";
    } else if (!/^[\d-]{10,13}$/.test(form.phone.replace(/\s/g, ""))) {
      newErrors.phone = "올바른 전화번호 형식을 입력해 주세요.";
    }
    if (!form.preferredArea.trim()) newErrors.preferredArea = "창업희망지역을 입력해 주세요.";
    if (!form.agreePrivacy) newErrors.agreePrivacy = "개인정보취급방침에 동의해 주세요.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    console.log("Franchise Inquiry Form Data:", form);
    alert("문의가 접수되었습니다");
    setForm(initialState);
  };

  const inputClasses =
    "w-full px-4 py-3 rounded-lg border border-gray-200 text-sm text-dark-800 placeholder:text-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blu-500 focus:border-transparent bg-white";

  const labelClasses = "block text-sm font-medium text-dark-700 mb-1.5";

  return (
    <section id="inquiry" className="py-24 md:py-32 bg-warm-50">
      <div className="max-w-2xl mx-auto px-4">
        {/* Title */}
        <ScrollReveal>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-dark-800 text-center mb-4">
            가맹 문의 신청
          </h2>
          <p className="text-gray-400 text-center mb-12 md:mb-16">
            아래 양식을 작성하시면 빠른 시일 내에 담당자가 연락드리겠습니다.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl p-6 sm:p-8 md:p-10 shadow-sm border border-gray-100"
            noValidate
          >
            <div className="space-y-6">
              {/* 성함 */}
              <div>
                <label htmlFor="name" className={labelClasses}>
                  성함 <span className="text-cta-500">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="홍길동"
                  className={`${inputClasses} ${errors.name ? "ring-2 ring-cta-500 border-transparent" : ""}`}
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-cta-500">{errors.name}</p>
                )}
              </div>

              {/* 연락처 */}
              <div>
                <label htmlFor="phone" className={labelClasses}>
                  연락처 <span className="text-cta-500">*</span>
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="010-1234-5678"
                  className={`${inputClasses} ${errors.phone ? "ring-2 ring-cta-500 border-transparent" : ""}`}
                />
                {errors.phone ? (
                  <p className="mt-1 text-xs text-cta-500">{errors.phone}</p>
                ) : (
                  <p className="mt-1 text-xs text-gray-400">
                    하이픈(-) 포함 입력 (예: 010-1234-5678)
                  </p>
                )}
              </div>

              {/* 창업희망지역 */}
              <div>
                <label htmlFor="preferredArea" className={labelClasses}>
                  창업희망지역 <span className="text-cta-500">*</span>
                </label>
                <input
                  id="preferredArea"
                  name="preferredArea"
                  type="text"
                  value={form.preferredArea}
                  onChange={handleChange}
                  placeholder="예: 서울 강남구"
                  className={`${inputClasses} ${errors.preferredArea ? "ring-2 ring-cta-500 border-transparent" : ""}`}
                />
                {errors.preferredArea && (
                  <p className="mt-1 text-xs text-cta-500">
                    {errors.preferredArea}
                  </p>
                )}
              </div>

              {/* 예상창업비용 */}
              <div>
                <label htmlFor="estimatedBudget" className={labelClasses}>
                  예상창업비용
                </label>
                <div className="relative">
                  <input
                    id="estimatedBudget"
                    name="estimatedBudget"
                    type="number"
                    value={form.estimatedBudget}
                    onChange={handleChange}
                    placeholder="5000"
                    className={`${inputClasses} pr-12`}
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-400">
                    만원
                  </span>
                </div>
              </div>

              {/* 창업희망 평수 */}
              <div>
                <label className={labelClasses}>창업희망 평수</label>
                <ToggleButton
                  options={["10평미만", "10평대", "20평대", "30평대 이상"]}
                  value={form.preferredSize}
                  onChange={(val) => setForm((prev) => ({ ...prev, preferredSize: val }))}
                />
              </div>

              {/* 연령대 */}
              <div>
                <label className={labelClasses}>연령대</label>
                <ToggleButton
                  options={["20대", "30대", "40대", "50대 이상"]}
                  value={form.ageGroup}
                  onChange={(val) => setForm((prev) => ({ ...prev, ageGroup: val }))}
                />
              </div>

              {/* 프랜차이즈 경험 */}
              <div>
                <label className={labelClasses}>프랜차이즈 경험</label>
                <ToggleButton
                  options={["있음", "없음"]}
                  value={form.hasFranchiseExp}
                  onChange={(val) => setForm((prev) => ({ ...prev, hasFranchiseExp: val }))}
                />
              </div>

              {/* 창업 오픈희망 시기 */}
              <div>
                <label className={labelClasses}>창업 오픈희망 시기</label>
                <div className="flex items-center gap-3">
                  <div className="relative flex-1">
                    <select
                      name="openYear"
                      value={form.openYear}
                      onChange={handleChange}
                      className={inputClasses}
                    >
                      <option value="">년도</option>
                      {[2026, 2027, 2028, 2029, 2030].map((y) => (
                        <option key={y} value={String(y)}>{y}년</option>
                      ))}
                    </select>
                  </div>
                  <div className="relative flex-1">
                    <select
                      name="openMonth"
                      value={form.openMonth}
                      onChange={handleChange}
                      className={inputClasses}
                    >
                      <option value="">월</option>
                      {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                        <option key={m} value={String(m)}>{m}월</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* 점포보유유무 */}
              <div>
                <label className={labelClasses}>점포보유유무</label>
                <ToggleButton
                  options={["없음", "있음"]}
                  value={form.hasStore}
                  onChange={(val) => setForm((prev) => ({ ...prev, hasStore: val }))}
                />
              </div>

              {/* 유입경로 */}
              <div>
                <label htmlFor="referralSource" className={labelClasses}>
                  유입경로
                </label>
                <select
                  id="referralSource"
                  name="referralSource"
                  value={form.referralSource}
                  onChange={handleChange}
                  className={inputClasses}
                >
                  <option value="">선택해 주세요</option>
                  {REFERRAL_SOURCES.map((source) => (
                    <option key={source} value={source}>
                      {source}
                    </option>
                  ))}
                </select>
              </div>

              {/* 예상상권타입 */}
              <div>
                <label className={labelClasses}>예상상권타입</label>
                <ToggleButton
                  options={["일반상권", "특수상권"]}
                  value={form.locationType}
                  onChange={(val) =>
                    setForm((prev) => ({ ...prev, locationType: val }))
                  }
                />
              </div>

              {/* 상세내용 */}
              <div>
                <label htmlFor="details" className={labelClasses}>
                  상세내용
                </label>
                <textarea
                  id="details"
                  name="details"
                  value={form.details}
                  onChange={handleChange}
                  rows={4}
                  placeholder="문의하실 내용을 자유롭게 작성해 주세요."
                  className={`${inputClasses} resize-none`}
                />
              </div>

              {/* Privacy agreement */}
              <div>
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    name="agreePrivacy"
                    checked={form.agreePrivacy}
                    onChange={handleChange}
                    className="mt-0.5 w-4 h-4 rounded border-gray-300 text-blu-500 focus:ring-blu-500 cursor-pointer"
                  />
                  <span className="text-sm text-gray-600 group-hover:text-dark-800 transition-colors">
                    개인정보취급방침을 읽었으며 이에 동의합니다.{" "}
                    <span className="text-cta-500">*</span>
                  </span>
                </label>
                {errors.agreePrivacy && (
                  <p className="mt-1 text-xs text-cta-500 ml-7">
                    {errors.agreePrivacy}
                  </p>
                )}
              </div>

              {/* Submit */}
              <Button
                type="submit"
                variant="cta"
                size="lg"
                className="w-full mx-auto block text-lg sm:text-xl py-5 sm:py-6 font-extrabold tracking-wide shadow-lg shadow-cta-300/50 hover:scale-[1.02] transition-transform"
              >
                🚀 창업 상담 문의하기
              </Button>
            </div>
          </form>
        </ScrollReveal>

        {/* Family Brand */}
        <ScrollReveal delay={0.2}>
          <div className="mt-10 rounded-2xl border border-blu-100 bg-white px-6 py-5 sm:px-8">
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-5">
              <span className="shrink-0 rounded-full bg-blu-50 px-3 py-1 text-[11px] font-bold tracking-wider text-blu-500 uppercase">
                Family Brand
              </span>
              <p className="text-[13px] text-gray-500 text-center sm:text-left">
                단디코리아의 또 다른 프랜차이즈{" "}
                <Link
                  href="https://photosignature.co.kr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-dark-800 underline underline-offset-2 decoration-blu-200 hover:decoration-blu-500 transition-colors"
                >
                  포토시그니처
                </Link>
                도 함께 만나보세요.
              </p>
              <Link
                href="https://photosignature.co.kr/"
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 inline-flex items-center gap-1 text-[13px] font-medium text-blu-500 hover:text-blu-600 transition-colors"
              >
                바로가기
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M4 3H11V10M11 3L3 11"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
