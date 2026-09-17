# Bellite: Visual Direction

> 이 문서가 결정하는 것: 정체성과 화면이 어떻게 보이는가
> 입력: 01 3절 정체성, 02 2.1절 페이지, 02 4절 원칙 · 출력 대상: theme.js, /component-work, /layout-composer, /visual-asset-prompt (넘기는 항목은 이 문서 6절 표)

## 결정 현황

이 표의 확정 항목만 다음 문서가 그대로 인용한다. 잠정은 `(잠정)` 표시를 달고 인용하고, 미정은 인용하지 않는다.

| 섹션 | 상태 | 비고 |
|---|---|---|
| 1. 무드 | 확정 | 01 3.2절에서 파생 |
| 2. 레이아웃 전략 | 잠정 | 배정 미승인 (Q4) |
| 3.1 색 | 확정 | theme 실제 값 |
| 3.2 타이포 | 확정 | theme 실제 값 |
| 3.3 형태·표면·모션 | 확정 | theme 실제 값 |
| 4. 이미지·에셋 방향 | 잠정 | 에셋에서 역추출 (Q5) |
| 4.1 레퍼런스 | 미정 | 제공 자료 없음 |
| 5. 변경 토큰 요약 | 확정 | 현재값은 스타터킷 |
| 6. 다음 문서로 넘기는 것 | 확정 | |

문서 상태: 잠정 승인 (하드 게이트 충족)
개정: 2026-09-17 v1 · 변경: 기존 기획 문서 5종을 새 포맷으로 재구성 (교육 예제)

비고:

- **2절 잠정**: 아키타입 id는 `src/data/layoutTaxonomyData.js` 목록에서 골랐고, 구간별 배정은 섹션 코드의 레이아웃에서 추론했다 (Q4).
- **3절 값 출처**: `src/styles/themes/theme.js`의 palette, typography, spacing, shape, shadows, breakpoints, transitions, components와 `src/styles/tokens.js`의 간격 토큰.
- **테마 하나로 운영**: `src/styles/themes/darkTheme.js`가 라이트 테마를 그대로 다시 내보낸다. 브라우저 다크 모드가 강제로 끼어드는 것을 막으려는 선택이고, 그래서 이 문서에는 색 값이 한 벌만 있다.
- **원문과 달라진 색 값**: 원문 디자인 문서의 Ballet Pink `#F5DDD4`와 Rose Gold `#C9A89D`는 코드에서 `#FDEFFB`와 `#f4d2ca`로 바뀌어 있다. 코드 값을 기준으로 적었다.
- **악센트와 배경이 같은 값**: `secondary.main`과 `background.default`가 둘 다 `#f4d2ca`다. 액센트가 지면과 구분되지 않으므로 사용자 확인이 필요하다 (Q6).
- **분량**: 222줄(권장 200). 4절 에셋별 방향을 `appendix-asset-direction.md`로 분리 가능하다.
- **4절 잠정**: 원문의 이미지 카테고리 지시와 실제 에셋 폴더를 맞춰 역추출했다. 촬영 사양은 결과물에서 읽은 것이라 승인 전이다 (Q5).

---

## 1. 무드

- **키워드** (최대 5, 01 3.2절에서 파생): Editorial Ballet · Sharp Silhouette · Powder & Ink · Embroidered Detail · Cinematic Scroll
- **태도 선언** (최대 3): 형태를 각지게 두고 색으로만 부드럽게 만든다. 로고는 크게 박지 않고 한 땀처럼 놓는다. 장면은 끊지 않고 하나의 긴 호흡으로 잇는다.
- **하지 않는 것** (최대 5): 면으로 깔리는 그라디언트 · 글로우와 번짐 · 둥근 모서리 · 점멸과 과도한 바운스 · 프릴 같은 장식 요소

비고: 텍스트 가독성을 위한 어두운 오버레이는 예외다. 히어로 배경과 장면 영상 위 자막에만 쓴다. 스크롤 유도 표시의 작은 반복 움직임도 예외다.

---

## 2. 레이아웃 전략

구조:

| 페이지 (02 2.1절) | 공간 모델 | 아키타입 | 구분 언어 |
|---|---|---|---|
| Landing | 유동 | single-page-scroll + narrative-scroll (잠정) | 선 |
| 전역 레이어 | 고정 | off-canvas-panel + z-axis-layering (잠정) | 여백 |

콘텐츠 신호 (/layout-composer 입력):

| 페이지 | 밀도 | text / media / repeat / hierarchy |
|---|---|---|
| Landing | airy | mixed / dominant / many / two-tier |
| 전역 레이어 | compact | micro / none / few / flat |

- 공간 모델: 유동 / 고정 / 혼합. 아키타입: `src/data/layoutTaxonomyData.js`의 id. 구분 언어: 선 / 면 / 여백.
- 신호 값: text(none·micro·short·long·mixed), media(none·accent·balanced·dominant), repeat(single·few·many), hierarchy(flat·two-tier·deep).
- 구간별 아키타입 (Landing 내부, 잠정 Q4): Hero `video-hero` + `split-screen`, Value Pillars `feature-grid` + `column-grid`, Silhouette `pinned-section` + `horizontal-scroll`, Inside Mood `sticky-scroll-reveal` + `full-bleed-content`, Signature `alternating-rows` + `asymmetric-balance`, Origin `kinetic-type` + `scroll-triggered-reveal`, Daily Mood `broken-grid` + `coming-soon-teaser`.
- 전역 리듬: 구간은 대부분 화면 높이 한 장을 차지하고, 스크롤이 필요한 구간은 화면 높이의 배수로 늘려 고정 구간을 만든다. 구간 경계는 면이 아니라 1px 선과 넓은 여백으로 표시한다. 좌우 여백은 반응형 네 단계 토큰을 따르고, 대형 화면에서는 폭 상한 1440에서 콘텐츠를 멈춘다.

---

## 3. 토큰 방향

### 3.1 색 (역할 팔레트)

| 역할 | 이름 | 값 | MUI 토큰 | 근거 (01 3절) |
|---|---|---|---|---|
| 전경·텍스트 | Deep Black | `#0F0F0F` | `primary.main`, `text.primary` | 도시의 밤 |
| 배경·지면 | Rose Gold | `#f4d2ca` | `background.default`, `.paper` | 살결의 톤 |
| 어두운 면 위 글자 | Ballet Pink | `#FDEFFB` | `brand.soul` | 절제 |
| 강조 핑크 | Soft Pink | `#E4A8AA` | `brand.blush` | 표식의 색 |
| 카드 표면 | Soul Light | `#FAF0ED` | Paper 배경 오버라이드 | Thoughtful Archive |
| 구분선 | Deep Black 10% | `#0F0F0F1A` | `divider` | 선이 구분 언어 |
| 중간 톤 | Warm Pink Grey | `#FDF8F6` ~ `#0F0F0F` | `grey.50` ~ `grey.900` | 웜 뉴트럴 일관 |

비고:

- `secondary.main`도 Rose Gold와 같은 값이고, `common.black`과 `common.white`도 같은 값으로 지정돼 있다.
- 상태 색(error, warning, info, success)은 브랜드 색 밖에 따로 둔다. 브랜드 표면에는 쓰지 않는다.
- 확장 팔레트로 `soulMuted #E8CCC2`, `urbanSoft #2A2A2A`, `urbanMuted #4A4A4A`가 있다.

### 3.2 타이포

| 역할 | 서체 | 방향 (웨이트·크기·자간·행간) | MUI variant |
|---|---|---|---|
| 브랜드 로고 | Chandia 셰리프 필기체 | 400, 로고에만 직접 지정 | h1에 서체만 교체 |
| 디스플레이 | Adamina 세리프 | 400, 3.5~9rem, 자간 -0.02em | h1 |
| 구간 제목 | Adamina 세리프 | 400, 1.75~4.5rem, 행간 1.15 | h2 |
| 소제목 | Adamina 세리프 | 400, 1.25~3rem, 자간 -0.01em | h3, h4 |
| 라벨 | Pretendard Variable | 600, 1~1.7rem, 행간 1.4~1.5 | h5, h6 |
| 본문 | Pretendard Variable | 400, 1.125rem·1rem, 행간 1.7 | body1, body2 |
| 캡션 | Pretendard Variable | 400, 0.75rem, 자간 0.02em | caption |
| 오버라인 | Pretendard Variable | 500, 0.75rem, 자간 0.1em, 대문자 | overline |
| 버튼 | Pretendard Variable | 500, 0.875rem, 자연 케이스 | button |

비고:

- 세리프 폴백은 Georgia와 Times New Roman이다. 본문 폴백에는 한글 시스템 서체가 들어 있다.
- 서체가 세 벌인 이유: Chandia는 자수 필기체라 로고 한 곳에만 쓰고, 읽어야 하는 제목은 Adamina가 맡는다.
- 디스플레이 크기는 clamp와 브레이크포인트별 고정값을 함께 지정해 네 단계로 끊어 커진다.

### 3.3 형태·표면·모션

| 축 | 방향 | 값 |
|---|---|---|
| radius | 전부 각지게 | `shape.borderRadius: 0`, 기본 컴포넌트도 0 |
| elevation | 방향 없는 확산 그림자 | offset 0, blur 12~58px, 투명도 0.04~0.27 |
| 표면 | 지면보다 한 단계 밝은 핑크 | Paper 배경 `#FAF0ED` 고정 |
| 선 | 1px 한 종류만 | `divider` 10%, 구간 경계와 열 분할 |
| 간격 | 8px 그리드 | `spacing: 8`, 시멘틱 토큰 여섯 묶음 |
| 브레이크포인트 | 대형 화면 폭 상한 | 0 / 600 / 900 / 1200 / 1440 |
| 전환 템포 | 기본과 느린 강조 | standard 300, slow 600, slower 900 (ms) |
| 이징 | 점멸 없는 한 곡선 | `cubic-bezier(0.4, 0, 0.2, 1)` |
| 아이콘 | 가는 선 아이콘 | lucide-react, 1.5px 스트로크 |

비고: 시멘틱 간격 토큰은 inset, gap, stack, inline, section, page 여섯 묶음이고 대부분 8의 배수이며 최소 단위는 4px다. 이징은 기본 곡선과 별칭 하나가 같은 값이라 사실상 한 곡선만 쓴다.

---

## 4. 이미지·에셋 방향

| 에셋 유형 | 쓰이는 곳 | LOOK 키워드 (1~2) |
|---|---|---|
| 히어로 배경 영상 | Landing · Hero | cinematic street footage |
| 자세 장면 영상 | Landing · Silhouette | documentary handheld |
| 자세 장면 스틸 | Landing · Silhouette | editorial film photo |
| 내부 오브제 영상 | Landing · Inside Mood | top-down still life |
| 시그니처 디테일 컷 | Landing · Signature | macro texture photo |
| 일상 무드 컷 | Landing · Daily Mood | snapshot diary photo |

에셋별 방향 (에셋 유형마다 한 블록):

- **히어로 배경 영상**
  - FORMAT: 세로 화면을 채우는 풀블리드, 좌측 절반은 로고가 얹히므로 비워 둔다. 3:2 대체본을 함께 둔다
  - LOOK: cinematic street footage, 도심 저녁의 낮은 채도
  - SUBJECT: 도심 속 인물의 전신 뒷모습, 수직으로 곧게 선 자세
  - 하지 않는 것: 제품 클로즈업, 정면 얼굴, 밝은 원색
- **자세 장면 영상**
  - FORMAT: 3:2 고정, 하단 3분의 1은 자막이 얹히므로 인물을 상단에 둔다
  - LOOK: documentary handheld, 자연광
  - SUBJECT: 횡단보도, 지하철, 카페, 계단 네 장면. 일상 동작이 발레 동작과 겹치는 순간
  - 하지 않는 것: 무대 조명, 연습실 배경, 점프 같은 큰 동작
- **자세 장면 스틸**
  - FORMAT: 영상과 같은 3:2, 같은 장면의 대표 프레임
  - LOOK: editorial film photo, 낮은 채도
  - SUBJECT: 영상과 짝을 이루는 정지 컷. 영상과 구도가 같아야 한다
  - 현재 코드: 영상 활성화 전 자리는 단색이 대신하고, 스틸은 마지막 구간 갤러리에서 재사용된다
  - 하지 않는 것: 영상과 다른 구도, 다른 인물
- **내부 오브제 영상**
  - FORMAT: 화면을 채우는 풀블리드, 중앙에 문구가 얹히므로 중앙을 비운다
  - LOOK: top-down still life, 부드러운 확산광
  - SUBJECT: 토슈즈, 리본, 타이즈가 흩어진 탑 뷰에서 정돈된 내부로 이어지는 흐름
  - 하지 않는 것: 손이나 인물 등장, 강한 그림자
- **시그니처 디테일 컷**
  - FORMAT: 세로 비율, 대상이 화면의 절반 이상. 글과 어긋나게 짝지으므로 여백을 한쪽에 몬다
  - LOOK: macro texture photo, 측면 사광
  - SUBJECT: 자수 로고의 실 결, 처지지 않은 가방 하단 수평선, 원단의 광택
  - 하지 않는 것: 3D 렌더, 합성 배경, 정면 평면광
- **일상 무드 컷**
  - FORMAT: 제각각 비율 허용, 아홉 칸에 겹쳐 놓으므로 잘려도 읽히는 구도
  - LOOK: snapshot diary photo, 따뜻한 화이트 밸런스
  - SUBJECT: 아침, 책상, 통근, 발레 이후, 집. 아홉 칸 중 다섯 칸이 전용 컷이고 나머지는 다른 구간 컷을 재사용한다
  - 하지 않는 것: 제품 전면 노출, 스튜디오 배경

### 4.1 레퍼런스 (사용자 제공만)

해당 없음: 원문 5종에 사용자가 제공한 레퍼런스 파일이나 링크가 없다.

---

## 5. 변경 토큰 요약 (theme.js 입력)

| 토큰 경로 | 현재값 | 변경값 | 적용 대상 |
|---|---|---|---|
| `palette.primary.main` | `#0000FF` | `#0F0F0F` | 텍스트, 아이콘, 보더 |
| `palette.secondary.main` | blueGrey[900] `#263238` | `#f4d2ca` | 액센트 |
| `palette.background.default` | 미지정 (MUI 흰색) | `#f4d2ca` | 페이지 지면 |
| `palette.background.paper` | 미지정 (MUI 흰색) | `#f4d2ca` | Paper 기본값 |
| `palette.text.*` | 미지정 | 본문 100%, 보조 70%, 비활성 38% | 본문 위계 |
| `palette.grey.*` | 미지정 (MUI 쿨 그레이) | `#FDF8F6`(50) ~ `#0F0F0F`(900) | 보조 텍스트, 경계 |
| `palette.divider` | 미지정 | `#0F0F0F` 10% | 구간 경계, 열 분할 |
| `palette.brand.*` | 없음 | soul, urban, ribbon, blush 외 4종 | 브랜드 의미 토큰 (신설) |
| `palette.common.*` | 미지정 (흑백) | black·white 모두 `#f4d2ca` | 기본 대비색 (Q6) |
| `typography.fontFamily` | Pretendard Variable | Pretendard Variable (유지) | 본문, 라벨 |
| `typography.h1~h4.fontFamily` | Outfit + Pretendard 최고 웨이트 | Adamina 세리프 | 디스플레이와 제목 |
| `typography.h1` 크기·웨이트 | 900, 크기 미지정 | 400, 3.5~9rem 네 단계 | 브랜드 선언 |
| `typography.h5, h6` | 미지정 | Pretendard 600 | 라벨, 소제목 |
| `typography.body1` | 미지정 (MUI 1rem) | 1.125rem, 행간 1.7 | 본문 |
| `typography.button.textTransform` | 미지정 (MUI uppercase) | `none` | 모든 버튼 |
| `typography.overline` | 미지정 | 자간 0.1em, 대문자 | 구간 라벨 |
| `shape.borderRadius` | `0` | `0` (유지) | 전 컴포넌트 |
| `shadows` | offset 0, blur 높인 dimmed | blur 12~58px, 투명도 0.04~0.27 | Paper, 카드 |
| `spacing` | 미지정 (MUI 8) | `8` (유지) | 전역 |
| `breakpoints.values.xl` | 미지정 (MUI 1536) | `1440` | 대형 화면 폭 상한 |
| `transitions.duration.slow/slower` | 없음 | 600 / 900 | 느린 전환 2종 (신설) |
| `transitions.easing.elegant` | 없음 | `cubic-bezier(0.4, 0, 0.2, 1)` | 브랜드 전환 (신설) |
| `components.MuiPaper` | 미지정 | radius 0, 배경 `#FAF0ED` | Paper 표면 |
| `components.MuiButton` | 미지정 | radius 0, 자연 케이스 | 버튼 |
| `components.MuiCard` / `MuiChip` | 미지정 | radius 0 | 기본 컴포넌트 |
| `components.MuiTextField` | 미지정 | 외곽선 입력의 radius 0 | 폼 |
| `components.MuiCssBaseline` | 미지정 | body 배경 `#f4d2ca`, 얇은 스크롤바 | 전역 지면 |

비고: 현재값은 스타터킷 `component-work/resources/mui-theme.md` 기준이고, 그 문서가 정하지 않은 축은 "미지정"으로 적었다. 다크 테마는 라이트 테마를 그대로 쓰므로 별도 변경 표가 없다.

---

## 6. 다음 문서로 넘기는 것

| 받는 곳 | 가져가는 것 |
|---|---|
| theme.js 수정 | 5절 표 |
| /component-work | 3절 토큰 방향, 5절 표 |
| /layout-composer | 2절 두 표의 아키타입·콘텐츠 신호 |
| /visual-asset-prompt | 4절 개요 표와 에셋별 방향, 4.1절 |
