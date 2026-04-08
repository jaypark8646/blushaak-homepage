# TODO — 메뉴 영양성분 & 알레르기 모달 구현

## 작업 개요
메뉴 페이지(/menu)에서 각 메뉴 카드 클릭 시 영양성분(칼로리, 나트륨, 당류, 포화지방, 단백질, 카페인) 및 알레르기 유발물질을 모달로 표시. PDF 영양성분표 데이터 전체 반영.

## Tasks
- [x] Task 001 [codex]: MenuItem 타입에 nutrition 필드 추가 (types/index.ts)
- [x] Task 002 [codex]: menuData.ts 전체 메뉴에 영양성분 데이터 입력 (데이터 없는 항목은 null 처리, 모달에서 "준비 중" 표시)
- [x] Task 003 [codex]: NutritionModal 컴포넌트 구현 (src/components/menu/NutritionModal.tsx)
- [x] Task 004 [codex]: MenuCard 클릭 핸들러 + 모달 연동
- [x] Task 005 [claude-sonnet]: 빌드 검증 완료 (Next.js 16.1.6 Turbopack, 24개 페이지 정상 생성)
- [x] Task 006 [codex]: GitHub Pages 배포 수정 (next.config.ts에 `output: 'export'`, `basePath: '/blushaak-homepage'` 추가 후 `out/` 생성 검증)

## 완료 기록 — UTM/Ref 광고 매체 트래킹
- [x] Task 007 [codex]: `ref`, `utm_source`, `utm_medium`, `utm_campaign` 전역 캡처 및 sessionStorage/cookie 30일 유지
- [x] Task 008 [codex]: 가맹 문의 폼을 Google Sheets 저장 API와 연결하고 ref/utm/page_url 포함 제출
- [x] Task 009 [codex]: `/admin/leads` 비밀번호 보호 페이지 및 CSV 다운로드 구현
- [x] Task 010 [codex]: Google Sheets/Admin 환경변수 설정 요청 문서 생성 및 Vercel 대응 빌드 구조 정리

## 완료 기록 — 홈페이지 리뉴얼 레이아웃
- [x] Task 011 [codex]: 홈페이지 섹션 순서를 BrandHero → CoffeePrinciple → Franchise 전체 → BrandIntro → CoffeeBeans → BrandDirection → Menu → News → 가맹 문의 폼 순으로 재배치
- [x] Task 012 [codex]: 홈페이지 자동 노출 개설비용 팝업 구현 (sessionStorage 세션당 1회, 혜택/비용표/토글 설명/CTA 스크롤 포함)
- [x] Task 013 [codex]: 섹션 재배치 후 사이드바/프로그레스바 섹션 판별 로직 보정
- [x] Task 014 [codex]: 개설비용 팝업 소개 문구 삭제 및 커피머신 지원 문구 상시 강조 노출

## 완료 기록 — franchise 페이지 섹션 조정
- [x] Task 015 [codex]: franchise 페이지에서 "Vacation in the CITY" 히어로 섹션(`FranchiseIntro`)을 개설 비용 섹션 아래로 이동

## 완료 기록 — 개설비용 팝업 후속 조정
- [x] Task 016 [codex]: OpeningCostPopup에서 `커피머신 지원`을 별도 혜택 행으로 분리하고 `오븐기/비닝 쇼케이스/그라인더 3대 포함`을 `기기 및 장비` 하위 포함 문구로 이동
- [x] Task 017 [codex]: franchise 개설비용 팝업에서 `전기증설/에어컨` 제거 및 `기기 및 장비 (2G 기준)` 금액/설명 강조 스타일을 일반 행 기준으로 정리

## 완료 기록 — Franchise 섹션 매장 사진 슬라이더
- [x] Task 018 [codex]: 홈페이지 `BrandFranchiseDivider` 우측에 매장 사진 5장 기반 스와이프/화살표 지원 캐러셀 추가 및 이미지 자산 정리

## 완료 기록 — 홈페이지 후속 수정
- [x] Task 019 [codex]: 개설비용 팝업 장비 포함 문구 우측 정렬 조정 및 `BrandFranchiseDivider` 캐러셀 이미지 렌더링 경로/레이아웃 보정

## 완료 기록 — 홈페이지 레이아웃 후속 수정
- [x] Task 020 [codex]: OpeningCostPopup에서 `기기 및 장비 (2G 기준)`의 `35,800,000` 금액 두 셀만 가운데 정렬되도록 조정
- [x] Task 021 [codex]: 홈페이지 `BrandFranchiseDivider` 기존 캐러셀을 프로젝트 내 매장 사진 파일 기반 사진 캐러셀로 교체
- [x] Task 022 [codex]: 메인 `BrandHero` 섹션을 개설비용 표(`CostTable`) 하단으로 이동하고 브랜드 섹션 전환 기준 보정
- [x] Task 023 [codex]: 홈페이지 첫 섹션을 `FranchiseIntro`로 재배치하고 `BrandFranchiseDivider` 텍스트를 제거해 사진 캐러셀만 남김
