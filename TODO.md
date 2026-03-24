# TODO — 메뉴 영양성분 & 알레르기 모달 구현

## 작업 개요
메뉴 페이지(/menu)에서 각 메뉴 카드 클릭 시 영양성분(칼로리, 나트륨, 당류, 포화지방, 단백질, 카페인) 및 알레르기 유발물질을 모달로 표시. PDF 영양성분표 데이터 전체 반영.

## Tasks
- [x] Task 001 [codex]: MenuItem 타입에 nutrition 필드 추가 (types/index.ts)
- [x] Task 002 [codex]: menuData.ts 전체 메뉴에 영양성분 데이터 입력
- [x] Task 003 [codex]: NutritionModal 컴포넌트 구현 (src/components/menu/NutritionModal.tsx)
- [x] Task 004 [codex]: MenuCard 클릭 핸들러 + 모달 연동
- [ ] Task 005 [claude-sonnet]: 빌드 검증 + Vercel 배포
