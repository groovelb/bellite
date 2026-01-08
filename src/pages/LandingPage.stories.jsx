import LandingPage from './LandingPage';

export default {
  title: 'Page/LandingPage',
  component: LandingPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
## Bellite Landing Page

브랜드 랜딩 페이지 전체 구성입니다.

### 섹션 구성 (5개)

1. **HeroSection** - 브랜드 아이덴티티 & 미션
   - Full-Screen Immersive Layout
   - "Your Daily Encore" 슬로건

2. **SilhouetteSection** - 무너지지 않는 실루엣
   - Horizontal Scroll Snap
   - 일상-발레 오버래핑 시리즈

3. **SignatureSection** - 구겨지지 않는 보관 & 심미적 표현
   - 2x2 그리드 레이아웃
   - 이미지/텍스트 교차 배치

4. **OriginSection** - 브랜드 기원
   - Scroll-Triggered Typography Reveal
   - 디자이너 노트

5. **FooterSection** - Maintain the Line
   - Minimal Layout with Fade-out
   - 브랜드 클로징

### 브랜드 컬러
- Ballet Pink: #F5DDD4
- Deep Black: #0F0F0F
- Rose Gold: #C9A89D

### 데이터 바인딩
- JSON: src/data/landingPageContent.json
        `,
      },
    },
  },
};

/** 전체 랜딩 페이지 */
export const Default = {
  render: () => <LandingPage />,
};
