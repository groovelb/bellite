import { Box, Typography } from '@mui/material';
import HeroSection from './HeroSection';

export default {
  title: 'Section/Landing/HeroSection',
  component: HeroSection,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
## HeroSection (Section 1: 브랜드 아이덴티티)

Bellite 랜딩 페이지의 히어로 섹션입니다.

### 스크롤 동작 (StickyBackground 패턴)
1. **Phase 1**: 배경이 고정된 상태에서 콘텐츠가 하단에서 상단으로 스크롤
2. **Phase 2**: 콘텐츠가 상단에 도달하면 전체 섹션이 함께 스크롤

### 레이아웃 (SplitScreen)
- **좌측 (45%)**: 브랜드 로고 (Chandia 폰트)
- **우측 (55%)**: 슬로건 + 서브헤드라인 (수직 레이아웃)
- 모바일에서 스택 레이아웃으로 전환 (stackAt: 'sm')

### 배경 모드
- **image** (기본): 정적 이미지 배경
- **video**: VideoScrubbing 컴포넌트를 사용한 스크롤 기반 비디오 재생

### 특징
- StickyBackground 컴포넌트 활용
- 스크롤 높이: scrollMultiplier × 100vh (기본 200vh)
- 배경 이미지/비디오 위 그라데이션 오버레이
- 우아한 staggered fade-in 애니메이션
- 스크롤 유도 인디케이터 (gentle bounce)

### 브랜드 메시지
- Logo: Bellite (Chandia)
- H1: Your Daily Encore. (Adamina)
- H2: 발레가 끝나도, 구겨지지 않는 당신의 선을 위해. (Pretendard)

### 브랜드 컬러
- Ballet Pink (#F5DDD4): 텍스트
- Deep Black (#0F0F0F): 오버레이
- Rose Gold (#C9A89D): 액센트

### 데이터 바인딩
- JSON: src/data/landingPageContent.json
- 이미지: src/assets/bg/hero_bg_2.jpeg
- 비디오: src/assets/bg/hero_bg.mp4
        `,
      },
    },
  },
  argTypes: {
    backgroundMode: {
      control: 'select',
      options: ['image', 'video'],
      description: '배경 모드 (이미지 또는 비디오)',
      table: {
        type: { summary: "'image' | 'video'" },
        defaultValue: { summary: 'image' },
      },
    },
    scrollMultiplier: {
      control: { type: 'number', min: 1.5, max: 4, step: 0.5 },
      description: '스크롤 높이 배율 (2 = 200vh)',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '2' },
      },
    },
  },
};

/** 기본 - 이미지 배경 */
export const Default = {
  args: {
    backgroundMode: 'image',
    scrollMultiplier: 2,
  },
  render: (args) => (
    <Box sx={{ height: '400vh' }}>
      <HeroSection {...args} />

      {/* 다음 섹션 (스크롤 확인용) */}
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'brand.soul',
        }}
      >
        <Typography variant="h4" sx={{ color: 'brand.urban', opacity: 0.5 }}>
          Next Section
        </Typography>
      </Box>
    </Box>
  ),
};

/** 이미지 배경 모드 */
export const ImageMode = {
  args: {
    backgroundMode: 'image',
    scrollMultiplier: 2,
  },
  render: (args) => (
    <Box sx={{ height: '400vh' }}>
      <HeroSection {...args} />
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'brand.soul',
        }}
      >
        <Typography variant="h4" sx={{ color: 'brand.urban', opacity: 0.5 }}>
          Scroll to see sticky background effect
        </Typography>
      </Box>
    </Box>
  ),
};

/** 비디오 배경 모드 (스크롤 스크러빙) */
export const VideoMode = {
  args: {
    backgroundMode: 'video',
    scrollMultiplier: 2,
  },
  parameters: {
    docs: {
      description: {
        story: `
비디오 배경 모드입니다. 스크롤에 따라 비디오가 프레임 단위로 재생됩니다.

**VideoScrubbing 설정:**
- \`startInView={true}\`: 뷰포트 상단에서 시작
- \`containerRef\`: 섹션 기준 스크롤 추적
- \`ratio="auto"\`: 원본 비율 유지
- \`objectFit: cover\`: 배경 꽉 채우기

**주의:** 스토리북에서는 스크롤 영역이 제한되어 비디오 스크러빙이 제대로 동작하지 않을 수 있습니다.
실제 페이지에서 테스트를 권장합니다.
        `,
      },
    },
  },
  render: (args) => (
    <Box sx={{ height: '400vh' }}>
      <HeroSection {...args} />
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'brand.urban',
        }}
      >
        <Typography variant="h4" sx={{ color: 'brand.soul', opacity: 0.5 }}>
          Scroll to see video scrubbing + sticky effect
        </Typography>
      </Box>
    </Box>
  ),
};

/** 긴 스크롤 (3x) */
export const LongScroll = {
  args: {
    backgroundMode: 'image',
    scrollMultiplier: 3,
  },
  parameters: {
    docs: {
      description: {
        story: `
scrollMultiplier=3으로 설정하여 더 긴 스크롤 구간을 가집니다.
콘텐츠가 더 천천히 상단으로 이동합니다.
        `,
      },
    },
  },
  render: (args) => (
    <Box sx={{ height: '500vh' }}>
      <HeroSection {...args} />
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'brand.soul',
        }}
      >
        <Typography variant="h4" sx={{ color: 'brand.urban', opacity: 0.5 }}>
          Longer scroll duration (3x)
        </Typography>
      </Box>
    </Box>
  ),
};
