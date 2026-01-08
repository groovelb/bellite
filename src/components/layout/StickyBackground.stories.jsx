import { Box, Typography } from '@mui/material';
import StickyBackground from './StickyBackground';

export default {
  title: 'Custom Component/Layout/StickyBackground',
  component: StickyBackground,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
## StickyBackground

고정 배경 위로 콘텐츠가 스크롤되는 레이아웃 컴포넌트입니다.

### 동작 원리
1. 배경이 고정된 상태로 콘텐츠가 초기 위치에서 목표 위치로 이동
2. 콘텐츠가 목표에 도달하는 순간 = sticky 해제 → 자연스러운 스크롤 연속성

### 스크롤 계산
\`\`\`
전체 높이 = scrollMultiplier × 100vh (기본값: 200vh)
0~100%: 콘텐츠가 이동하며, 100%에서 목표 도달과 동시에 sticky 해제
\`\`\`

### 콘텐츠 시작 모드
- **visible**: 콘텐츠가 하단에서 시작 (이미 보임), 상단으로 이동
- **hidden**: 콘텐츠가 화면 밖에서 시작, 화면 안으로 이동

### 특징
- framer-motion useScroll/useTransform 기반
- 배경 요소로 이미지, 비디오, 컴포넌트 등 자유롭게 사용 가능
- 오버레이 스타일 지원
- 선택적 콘텐츠 fade-in 애니메이션

### 주의사항
- 스토리북에서는 스크롤 영역이 제한되어 전체 인터랙션 확인이 어렵습니다.
- 실제 페이지에서 테스트를 권장합니다.
        `,
      },
    },
  },
  argTypes: {
    scrollMultiplier: {
      control: { type: 'number', min: 1.5, max: 4, step: 0.5 },
      description: '스크롤 높이 배율 (2 = 200vh)',
      table: {
        defaultValue: { summary: '2' },
      },
    },
    contentStart: {
      control: 'select',
      options: ['visible', 'hidden'],
      description: '콘텐츠 시작 상태',
      table: {
        defaultValue: { summary: 'visible' },
      },
    },
    contentEnd: {
      control: 'select',
      options: ['top', 'center'],
      description: '콘텐츠 도착 위치',
      table: {
        defaultValue: { summary: 'top' },
      },
    },
    contentOffset: {
      control: { type: 'number', min: -50, max: 50, step: 5 },
      description: '콘텐츠 상단/하단 오프셋 (vh 단위)',
      table: {
        defaultValue: { summary: '0' },
      },
    },
    fadeIn: {
      control: 'boolean',
      description: '콘텐츠 fade-in 효과',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
  },
};

/**
 * 샘플 배경 이미지 컴포넌트
 */
const SampleBackground = ({ color = '#2D3436' }) => (
  <Box
    sx={{
      width: '100%',
      height: '100%',
      backgroundColor: color,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Typography
      sx={{
        fontFamily: 'Chandia, Georgia, serif',
        fontSize: { xs: '4rem', md: '8rem' },
        color: 'rgba(255,255,255,0.1)',
        userSelect: 'none',
      }}
    >
      Background
    </Typography>
  </Box>
);

/**
 * 샘플 콘텐츠 컴포넌트
 */
const SampleContent = ({ title = 'Content Title', description }) => (
  <Box
    sx={{
      px: { xs: 3, md: 6 },
      pb: { xs: 8, md: 12 },
    }}
  >
    <Typography
      variant="h2"
      sx={{
        fontFamily: 'Chandia, Georgia, serif',
        color: '#F5DDD4',
        mb: 2,
        textShadow: '0 2px 20px rgba(0,0,0,0.3)',
      }}
    >
      {title}
    </Typography>
    <Typography
      variant="body1"
      sx={{
        color: 'rgba(245, 221, 212, 0.9)',
        maxWidth: 600,
      }}
    >
      {description || '이 콘텐츠는 스크롤에 따라 이동합니다. 콘텐츠가 목표 위치에 도달하면 전체 섹션이 함께 스크롤됩니다.'}
    </Typography>
  </Box>
);

/** 기본 - 하단에서 상단으로 */
export const Default = {
  args: {
    scrollMultiplier: 2,
    contentStart: 'visible',
    contentEnd: 'top',
    contentOffset: 0,
    fadeIn: false,
  },
  render: (args) => (
    <Box sx={{ height: '400vh' }}>
      <StickyBackground
        background={<SampleBackground />}
        scrollMultiplier={args.scrollMultiplier}
        contentStart={args.contentStart}
        contentEnd={args.contentEnd}
        contentOffset={args.contentOffset}
        fadeIn={args.fadeIn}
      >
        <SampleContent />
      </StickyBackground>

      {/* 다음 섹션 (스크롤 확인용) */}
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#F5DDD4',
        }}
      >
        <Typography variant="h4" sx={{ color: '#0F0F0F', opacity: 0.5 }}>
          Next Section
        </Typography>
      </Box>
    </Box>
  ),
};

/** 화면 밖에서 시작 (hidden) */
export const HiddenStart = {
  args: {
    scrollMultiplier: 2,
    contentStart: 'hidden',
    contentEnd: 'top',
    fadeIn: true,
  },
  parameters: {
    docs: {
      description: {
        story: `
\`contentStart="hidden"\`으로 설정하면 콘텐츠가 화면 밖(하단)에서 시작하여 스크롤에 따라 화면 안으로 들어옵니다.
\`fadeIn={true}\`와 함께 사용하면 더 부드러운 등장 효과를 줄 수 있습니다.
        `,
      },
    },
  },
  render: (args) => (
    <Box sx={{ height: '400vh' }}>
      <StickyBackground
        background={<SampleBackground color="#1a1a1a" />}
        scrollMultiplier={args.scrollMultiplier}
        contentStart={args.contentStart}
        contentEnd={args.contentEnd}
        fadeIn={args.fadeIn}
      >
        <SampleContent
          title="Reveal Content"
          description="이 콘텐츠는 화면 밖에서 시작하여 스크롤에 따라 나타납니다."
        />
      </StickyBackground>

      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#F5DDD4',
        }}
      >
        <Typography variant="h4" sx={{ color: '#0F0F0F', opacity: 0.5 }}>
          Next Section
        </Typography>
      </Box>
    </Box>
  ),
};

/** 오버레이 적용 */
export const WithOverlay = {
  args: {
    scrollMultiplier: 2,
    contentStart: 'visible',
  },
  render: (args) => (
    <Box sx={{ height: '400vh' }}>
      <StickyBackground
        background={<SampleBackground color="#1a1a1a" />}
        scrollMultiplier={args.scrollMultiplier}
        contentStart={args.contentStart}
        overlayStyle={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)',
        }}
      >
        <SampleContent />
      </StickyBackground>

      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#F5DDD4',
        }}
      >
        <Typography variant="h4" sx={{ color: '#0F0F0F', opacity: 0.5 }}>
          Next Section
        </Typography>
      </Box>
    </Box>
  ),
};

/** 중앙 정렬 도착 */
export const CenterEnd = {
  args: {
    scrollMultiplier: 2,
    contentStart: 'visible',
    contentEnd: 'center',
  },
  parameters: {
    docs: {
      description: {
        story: `
\`contentEnd="center"\`로 설정하면 콘텐츠가 화면 중앙에서 멈춥니다.
        `,
      },
    },
  },
  render: (args) => (
    <Box sx={{ height: '400vh' }}>
      <StickyBackground
        background={<SampleBackground color="#4A4A4A" />}
        scrollMultiplier={args.scrollMultiplier}
        contentStart={args.contentStart}
        contentEnd={args.contentEnd}
      >
        <SampleContent
          title="Center Position"
          description="이 콘텐츠는 화면 중앙에서 멈춥니다."
        />
      </StickyBackground>

      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#F5DDD4',
        }}
      >
        <Typography variant="h4" sx={{ color: '#0F0F0F', opacity: 0.5 }}>
          Next Section
        </Typography>
      </Box>
    </Box>
  ),
};

/** Bellite 스타일 */
export const BelliteStyle = {
  args: {
    scrollMultiplier: 2,
  },
  render: (args) => (
    <Box sx={{ height: '400vh' }}>
      <StickyBackground
        background={<SampleBackground color="#0F0F0F" />}
        scrollMultiplier={args.scrollMultiplier}
        contentStart="visible"
        contentEnd="top"
        contentOffset={15}
        overlayStyle={{
          background: `linear-gradient(
            to top,
            rgba(15, 15, 15, 0.6) 0%,
            rgba(15, 15, 15, 0.2) 50%,
            transparent 100%
          )`,
        }}
      >
        <Box sx={{ px: { xs: 3, md: 6 }, pb: { xs: 8, md: 12 } }}>
          <Typography
            variant="h1"
            sx={{
              fontFamily: 'Chandia, Georgia, serif',
              color: '#F5DDD4',
              fontSize: { xs: '3rem', md: '6rem' },
              mb: 2,
              textShadow: '0 4px 30px rgba(0,0,0,0.4)',
            }}
          >
            Bellite
          </Typography>
          <Typography
            variant="h4"
            sx={{
              color: 'rgba(245, 221, 212, 0.9)',
              fontWeight: 300,
              mb: 1,
            }}
          >
            Your Daily Encore.
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'rgba(245, 221, 212, 0.8)',
              maxWidth: 480,
            }}
          >
            발레가 끝나도, 구겨지지 않는 당신의 선을 위해.
          </Typography>
        </Box>
      </StickyBackground>

      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#F5DDD4',
        }}
      >
        <Typography variant="h4" sx={{ color: '#0F0F0F', opacity: 0.5 }}>
          Next Section
        </Typography>
      </Box>
    </Box>
  ),
};
