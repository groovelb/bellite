# Bellite Design Direction

> **"Your Daily Encore"** - 발레가 끝나도, 구겨지지 않는 당신의 선을 위해.

---

## Visual Concept

**"The Unwrinkled Line"** - 구겨지지 않는 선

발레의 절제된 우아함과 도시적 세련됨의 조화.
자수 기법을 형상화한 섬세한 디테일과 군더더기 없는 실루엣으로
'발레를 아는 사람'만이 공유하는 내재적 자부심을 표현합니다.

---

## Color Palette: "Light & Shadow"

2색 + 1 액센트로 제한. 그래디언트/글로우/블러 금지.

### Primary Colors

| Token | Name | Hex | RGB | 용도 |
|-------|------|-----|-----|------|
| `soul` | Ballet Pink | #F5DDD4 | 245, 221, 212 | 라이트 배경, 발레리나의 살결과 토슈즈 |
| `urban` | Deep Black | #0F0F0F | 15, 15, 15 | 다크 배경, 도심의 밤 |

### Accent Color

| Token | Name | Hex | RGB | 용도 |
|-------|------|-----|-----|------|
| `ribbon` | Rose Gold | #C9A89D | 201, 168, 157 | 액센트, 자수 로고, CTA |

### Extended Palette

| Token | Hex | 용도 |
|-------|-----|------|
| `soul.light` | #FAF0ED | 카드 배경, 호버 상태 |
| `soul.muted` | #E8CCC2 | 비활성 상태, 보조 요소 |
| `urban.soft` | #2A2A2A | 보조 배경, 카드 (다크 모드) |
| `urban.muted` | #4A4A4A | 비활성 텍스트 (다크 모드) |

### Mode별 적용

**Light Mode (기본)**
- 배경: Ballet Pink (#F5DDD4)
- 텍스트: Deep Black (#0F0F0F)
- 보조 텍스트: Deep Black 70%
- 액센트: Rose Gold (#C9A89D)

**Dark Mode**
- 배경: Deep Black (#0F0F0F)
- 텍스트: Ballet Pink (#F5DDD4)
- 보조 텍스트: Ballet Pink 70%
- 액센트: Rose Gold (#C9A89D)

---

## Typography

### Display Font: Chandia

**자수 기법을 형상화한 셰리프 필기체**

- 브랜드명, 헤드라인, 슬로건에 사용
- 근육을 빚어내는 인고의 시간과 수공예 정신 표현
- 우아하고 유려한 곡선으로 발레의 선(Line) 연상

```css
font-family: 'Chandia', Georgia, 'Times New Roman', serif;
```

### Body Font: Pretendard Variable

**한글/영문 혼용 최적화 가변 폰트**

- 본문, UI 요소, 캡션에 사용
- 가독성과 현대적 세련됨
- 다양한 weight 지원으로 위계 표현

```css
font-family: 'Pretendard Variable', Pretendard, -apple-system, sans-serif;
```

### Typography Scale

| Variant | Font | Size | Weight | Line Height | 용도 |
|---------|------|------|--------|-------------|------|
| h1 | Chandia | 4.5rem (72px) | 400 | 1.1 | 히어로 헤드라인 |
| h2 | Chandia | 3rem (48px) | 400 | 1.15 | 섹션 타이틀 |
| h3 | Chandia | 2.25rem (36px) | 400 | 1.2 | 서브 헤드라인 |
| h4 | Chandia | 1.75rem (28px) | 400 | 1.3 | 카드 타이틀 |
| h5 | Pretendard | 1.25rem (20px) | 600 | 1.4 | 레이블 |
| h6 | Pretendard | 1rem (16px) | 600 | 1.5 | 소제목 |
| body1 | Pretendard | 1.125rem (18px) | 400 | 1.7 | 본문 (주요) |
| body2 | Pretendard | 1rem (16px) | 400 | 1.7 | 본문 (보조) |
| caption | Pretendard | 0.75rem (12px) | 400 | 1.5 | 캡션, 레이블 |

---

## Visual Metaphor

### The Unwrinkled Moment

1. **Transition (전환)**
   - 스튜디오를 나서며 가방을 메는 순간
   - 가방의 하단 라인이 수평을 유지
   - 모델의 어깨가 곧게 펴지는 찰나

2. **Archive (보관)**
   - 가방을 열었을 때
   - 복잡한 소지품 사이에서도 구겨짐 없이
   - 정갈하게 놓인 토슈즈와 리본의 대비

3. **Professional (프로페셔널)**
   - 사무실 책상 옆에 놓인 가방
   - 흐트러짐 없이 서 있는 모습
   - 그 곁에서 당당하게 작업하는 디자이너

---

## Design Principles

### 1. Unbroken Line (무너지지 않는 실루엣)
- 기하학적 형태, sharp corners (border-radius: 0)
- 수평/수직 라인 강조
- 그리드 기반 정렬

### 2. Thoughtful Archive (구겨지지 않는 보관)
- 정돈된 레이아웃, 명확한 위계
- 충분한 여백으로 콘텐츠 분리
- 복잡함 속의 질서

### 3. Internalized Discipline (내재적 자부심)
- 화려한 장식 배제, 절제된 우아함
- 자수 로고처럼 섬세한 디테일
- '아는 사람만 아는' 미묘한 아름다움

---

## Motion Principles

- **Easing**: `cubic-bezier(0.4, 0, 0.2, 1)` - 부드럽고 우아한 전환
- **Duration**: 300ms (기본), 600ms (강조), 200ms (미세)
- **금지**: 점멸, 급격한 변화, 과도한 bounce

---

## Icon

**Library**: `lucide-react`

- 1.5px 스트로크로 브랜드 라인 스타일과 일치
- 미니멀하고 절제된 형태
- 경량, 트리쉐이킹 지원

---

## MUI Theme Token Mapping

```js
// 색상 토큰
palette: {
  primary: { main: '#0F0F0F' },      // Deep Black
  secondary: { main: '#C9A89D' },    // Rose Gold (Accent)
  background: {
    default: '#F5DDD4',              // Ballet Pink
    paper: '#FAF0ED',                // Soul Light
  },
  text: {
    primary: '#0F0F0F',              // Deep Black
    secondary: '#0F0F0FB3',          // 70% opacity
  },
  brand: {
    soul: '#F5DDD4',
    urban: '#0F0F0F',
    ribbon: '#C9A89D',
  }
}

// 타이포그래피
typography: {
  fontFamily: 'Pretendard Variable, sans-serif',
  h1: { fontFamily: 'Chandia, serif' },
  h2: { fontFamily: 'Chandia, serif' },
  h3: { fontFamily: 'Chandia, serif' },
  h4: { fontFamily: 'Chandia, serif' },
}

// 형태
shape: { borderRadius: 0 }
```

---

## Vibe Coding Prompt

```
Bellite 브랜드 스타일로 [컴포넌트명]을 만들어줘.

컬러:
- 배경: Ballet Pink (#F5DDD4)
- 텍스트: Deep Black (#0F0F0F)
- 액센트: Rose Gold (#C9A89D)

타이포그래피:
- 헤드라인: Chandia (셰리프 필기체)
- 본문: Pretendard Variable

스타일:
- border-radius: 0 (sharp corners)
- 절제된 우아함, 화려한 장식 배제
- 충분한 여백, 명확한 위계
- "구겨지지 않는 선" 메타포 반영
```
