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
