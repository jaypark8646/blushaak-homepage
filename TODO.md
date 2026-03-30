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
