# Bellite Landing Page Implementation Plan

> 본 문서는 `landing-page-structure.md`를 기반으로 각 섹션의 레이아웃, 컴포넌트, 인터랙션 구현 방안을 정의합니다.

---

## Section Overview

| Section | UI Pattern | 기존 컴포넌트 | 신규 컴포넌트 |
|---------|------------|--------------|--------------|
| 1. Hero | Full-Screen Immersive | `FullPageContainer`, `GNB` | `HeroSection` |
| 2. Silhouette | Horizontal Scroll Snap | `ImageTransition`, `CarouselIndicator` | `HorizontalScrollSection` |
| 3. Archive | Masking Transition | `SectionContainer` | `MaskRevealSection`, `InteractiveHotspot` |
| 4. Signature | Asymmetric Bento Grid | `BentoGrid` | `ZoomCard` |
| 5. Origin | Typography Reveal | `SectionContainer` | `BlurRevealTypography` |
| 6. Footer | Fade-out Layout | - | `FadeOutFooter` |

---

## Section 1. Hero: Identity & Mission

### Layout
- `FullPageContainer` (100vh)
- 중앙 정렬, flex column

### Components
- `HeroSection` (신규): 대형 로고 + 슬로건 + 배경 이미지
- `GNB` (기존): 스크롤 시 로고 축소 후 sticky 고정

### Interaction
```
[Initial State]
- 화면 중앙에 대형 Bellite 로고 (Chandia 폰트)
- 배경: Mood Shot / Still-life 교차 fade

[On Scroll]
- 로고가 축소되며 상단 GNB 위치로 이동
- position: sticky로 고정
- framer-motion useScroll + useTransform
```

### Technical Stack
- `framer-motion`: `useScroll`, `useTransform`
- CSS: `position: sticky`, `transform: scale()`
- 배경 이미지: CSS `background-image` 또는 `<img>` with opacity transition

### Visual Assets
1. [Mood Shot] 도심 속 모델의 전신 뒷모습
2. [Still-life] 라이트 핑크 / 딥 블랙 제품 명암 대비

---

## Section 2. Outside: The Silhouette

### Layout
- Sticky Container (100vh)
- 내부 Horizontal Scroll Track

### Components
- `HorizontalScrollSection` (신규): 세로 스크롤 → 가로 슬라이드 변환
- `ImageTransition` (기존): opacity cross-fade
- `CarouselIndicator` (기존): 현재 위치 표시

### Interaction
```
[Scroll Hijacking]
1. 섹션 진입 시 화면 고정 (sticky)
2. 세로 스크롤량을 가로 진행도로 변환
3. 6개 이미지 순차 전환 (scroll-snap)

[Overlay Effect]
- 일상 이미지 위에 발레 실루엣 오버레이
- opacity: 0 → 0.7 애니메이션
```

### Technical Stack
- CSS: `scroll-snap-type: x mandatory`, `position: sticky`
- `framer-motion`: scroll progress → translateX
- `IntersectionObserver`: 섹션 진입/이탈 감지

### Visual Assets (6컷)
- 일상 3컷: 계단, 카페 주문, 지하철
- 발레 3컷: 레벨레, 폴드브라, 5번 자세

---

## Section 3. Inside: The Archive

### Layout
- `SectionContainer`
- 중앙 정렬, 3단계 상태 전환

### Components
- `MaskRevealSection` (신규): clip-path 마스킹 전환
- `InteractiveHotspot` (신규): 호버 시 툴팁 노출

### Interaction
```
[Phase 1] 무드보드
- 토슈즈, 리본, 타이즈 흩어진 탑뷰

[Phase 2] 마스킹 전환
- 스크롤 진행에 따라 가방 실루엣으로 clip-path

[Phase 3] 수납 디테일
- 가방 내부 이미지
- 핫스팟 활성화 (호버 시 툴팁)
```

### Technical Stack
- CSS: `clip-path: path()` 또는 SVG mask
- `framer-motion`: scroll progress → clip-path 변형
- Tooltip: `position: absolute` + conditional render

### Visual Assets (4컷)
1. [Mood Board] 발레 오브제 탑뷰
2. [Detail Storage] 가방 내부 수납 (3컷)

---

## Section 4. Style: The Signature

### Layout
- `BentoGrid` (기존) - Asymmetric Masonry

### Components
- `BentoGrid` (기존): 비대칭 그리드
- `ZoomCard` (신규): 호버 줌 + 캡션

### Interaction
```
[Hover Effect]
- scale: 1 → 1.03
- 캡션 fade-in (opacity + translateY)
- transition: 300ms ease-out
```

### Grid Configuration
```
┌──────────┬─────────────────┐
│  span:   │     span:       │
│  1x2     │     2x2         │
├──────────┼────────┬────────┤
│  span:   │ span:  │ span:  │
│  1x1     │ 1x1    │ 1x1    │
└──────────┴────────┴────────┘
```

### Technical Stack
- `BentoGrid` 컴포넌트 재사용
- `framer-motion`: `whileHover={{ scale: 1.03 }}`
- CSS: caption opacity/transform transition

### Visual Assets (4컷)
1. [Macro Shot] 자수 로고 초근접
2. [Functional Shot] 가방 하단 수평 라인
3. [Detail Shot] 원단 광택/부자재 (2컷)

---

## Section 5. Origin: Designer's Note

### Layout
- `SectionContainer`
- 중앙 Typography 중심

### Components
- `BlurRevealTypography` (신규): 스크롤 블러 해제

### Interaction
```
[Typography Reveal]
- filter: blur(10px) → blur(0)
- opacity: 0.3 → 1
- 스크롤 progress에 따라 보간

[Handwritten Overlay]
- SVG path 드로잉 애니메이션
- stroke-dasharray + stroke-dashoffset
```

### Technical Stack
- CSS: `filter: blur()`
- `framer-motion`: scroll progress → filter/opacity
- SVG: `pathLength` 애니메이션

### Visual Assets (1컷)
- [Concept Shot] 디자이너 작업대 무드

---

## Section 6. Footer: Maintain the Line

### Layout
- Minimal centered layout
- 전체 배경 이미지

### Components
- `FadeOutFooter` (신규): 점진적 어둡게 + 슬로건

### Interaction
```
[Progressive Darkening]
- 스크롤 진행에 따라 오버레이 opacity 증가
- linear-gradient: transparent → rgba(0,0,0,0.7)

[Slogan Reveal]
- opacity: 0 → 1
- translateY: 20px → 0
```

### Technical Stack
- CSS: `linear-gradient` overlay
- `framer-motion`: scroll progress → overlay opacity
- Typography: Chandia 폰트 슬로건

### Visual Assets (1컷)
- [Lifestyle Outro] 노을 아래 모델 뒷모습

---

## New Components Summary

### Sections (`src/sections/`)

| 컴포넌트 | 용도 | 주요 Props |
|----------|------|-----------|
| `HeroSection` | 풀스크린 히어로 + 로고 축소 | `logo`, `headline`, `subheadline`, `backgroundImages` |
| `HorizontalScrollSection` | 가로 스크롤 스냅 + 오버랩 | `items`, `overlayOpacity` |
| `MaskRevealSection` | clip-path 마스킹 전환 | `phases`, `maskShape` |
| `FadeOutFooter` | 점진적 어둡게 + 슬로건 | `slogan`, `backgroundImage` |

### Components (`src/components/`)

| 컴포넌트 | 위치 | 용도 | 주요 Props |
|----------|------|------|-----------|
| `InteractiveHotspot` | `components/shared/` | 호버 툴팁 핫스팟 | `position`, `label`, `description` |
| `ZoomCard` | `components/card/` | 호버 줌 + 캡션 | `image`, `caption`, `zoomScale` |
| `BlurRevealTypography` | `components/typography/` | 스크롤 블러 해제 | `children`, `blurAmount`, `threshold` |

---

## Technical Dependencies

| 패키지 | 용도 | 설치 여부 |
|--------|------|----------|
| `framer-motion` | 스크롤 애니메이션, 호버 효과 | 확인 필요 |
| `react-intersection-observer` | 섹션 진입 감지 | 확인 필요 |

### 설치 명령
```bash
pnpm add framer-motion react-intersection-observer
```

---

## File Structure

```
src/
  sections/
    landing/
      HeroSection.jsx
      HeroSection.stories.jsx
      HorizontalScrollSection.jsx
      HorizontalScrollSection.stories.jsx
      MaskRevealSection.jsx
      MaskRevealSection.stories.jsx
      FadeOutFooter.jsx
      FadeOutFooter.stories.jsx
  components/
    shared/
      InteractiveHotspot.jsx
      InteractiveHotspot.stories.jsx
    card/
      ZoomCard.jsx
      ZoomCard.stories.jsx
    typography/
      BlurRevealTypography.jsx
      BlurRevealTypography.stories.jsx
  pages/
    LandingPage.jsx
    LandingPage.stories.jsx
  data/
    landingPageContent.json
```

---

## Implementation Priority

1. **Phase 1: Core Layout**
   - HeroSection + GNB 스크롤 연동
   - FadeOutFooter

2. **Phase 2: Scroll Effects**
   - HorizontalScrollSection
   - BlurRevealTypography

3. **Phase 3: Interactive Elements**
   - MaskRevealSection + InteractiveHotspot
   - ZoomCard + BentoGrid 통합

4. **Phase 4: Integration**
   - LandingPage 조립
   - 반응형 대응
   - 성능 최적화
