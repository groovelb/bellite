# Project Rules

## META INSTRUCTION

- 이 문서와 참조된 모든 규칙은 프로젝트 법률이다
- 코드 작업 전 관련 규칙을 확인하고, 위반 가능성이 있으면 먼저 사용자에게 알려라
- 명시적 허용 없이 규칙을 위반하는 코드를 작성하지 마라
- **지시된 기능만 구현** - 요청하지 않은 기능을 임의로 추가하지 말 것

---

## Project Context

**Starter Kit** - React + MUI + Storybook 기반 UI 개발 환경

### 기술 스택
- React 19.x / MUI 7.x / Vite 7.x / Storybook 10.x

### Context & Reference (참조용, 규칙 아님)

현재 프로젝트: **Bellite**

- 브랜드 방향서: @docs/brand-direction.md
- 디자인 디렉션: @docs/design-direction.md
- 랜딩 페이지 구조: @docs/landing-page-structure.md
- 랜딩 페이지 내러티브: @docs/landng-page-narrative.md
- 랜딩 페이지 구현 계획: @docs/landing-page-implementation.md

---

## CRITICAL Rules

### MUI Grid Import (절대 위반 금지)

```jsx
// ❌ 금지
import Grid from '@mui/material/Grid2';

// ✅ 올바름
import Grid from '@mui/material/Grid';
```

```jsx
<Grid container spacing={2}>
  <Grid size={{ xs: 6, md: 8 }}>내용</Grid>
</Grid>
```

### 디자인 작업 시 frontend-design 스킬 사용

디자인 관련 작업(스타일링, 컴포넌트 생성, 반응형, 애니메이션)은 반드시 `frontend-design` 스킬 호출

---

## Sub Rules

### MUST (반드시 준수)
| 규칙 | 파일 |
|------|------|
| 코드 컨벤션 | `.claude/rules/code-convention.md` |
| 디자인 시스템 | `.claude/rules/design-system.md` |
| 디렉토리 구조 | `.claude/rules/project-directory.md` |

### SHOULD (관련 작업 시)
| 규칙 | 파일 |
|------|------|
| 컴포넌트 카탈로그 | `.claude/rules/components.md` |
| Storybook 작성 | `.claude/rules/storybook-writing.md` |
| 리팩토링 가이드 | `.claude/rules/easy-refactoring.md` |
| MUI 테마 | `.claude/rules/mui-theme.md` |

---

## Quick Reference

### Key Directories
```
src/
  components/    # 재사용 UI 컴포넌트
    layout/      # 레이아웃 (PhiSplit, AppShell 등)
    card/        # 카드 컴포넌트
    navigation/  # 네비게이션 (GNB 등)
  sections/      # 페이지 섹션
  templates/     # 컴포넌트 조합 템플릿
  pages/         # 페이지 레벨
  styles/        # 테마, 전역 스타일
```

### Commands
```bash
pnpm dev          # 개발 서버
pnpm storybook    # Storybook (포트 6006)
pnpm build        # 프로덕션 빌드
pnpm lint         # ESLint
```

---

## Workflow

### 코드 변경 전
1. 관련 규칙 확인 (CRITICAL + 해당 sub rule)
2. 기존 컴포넌트 재활용 가능 여부 확인 (`components.md`)
3. 규칙 충돌 시 → 사용자에게 먼저 알림

### 컴포넌트 작업
1. 기존 컴포넌트 탐색 → 재활용 우선
2. 새로 만들 경우 `project-directory.md` 참조
3. 아이콘: `lucide-react` 사용
4. 스타일: MUI `sx` prop 사용
5. Storybook 스토리 작성

### 규칙 충돌 시
1. 충돌 규칙과 내용 알림
2. 사용자 명시적 허용 전까지 진행 금지
