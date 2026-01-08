import { Box, Typography } from '@mui/material';
import HorizontalScroll from './HorizontalScroll';

export default {
  title: 'Custom Component/Media/HorizontalScroll',
  component: HorizontalScroll,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
## HorizontalScroll

세로 스크롤을 가로 이동으로 변환하는 순수 컨테이너입니다.
주어진 콘텐츠만큼만 스크롤하고, 빈 공간 없이 다음 섹션으로 넘어갑니다.

### 특징
- 각 슬라이드는 내부 콘텐츠 크기에 맞춤 (fit-content)
- \`slideWidth\` prop으로 스크롤 계산 제어
- 빈 공간 없이 콘텐츠 끝까지만 스크롤
- framer-motion 기반 부드러운 스크롤 변환

### 스크롤 계산
\`\`\`
전체 트랙 너비 = totalSlides × slideWidth
스크롤 거리 = 트랙 너비 - 뷰포트(100vw)

예: 3슬라이드 × 80vw = 240vw
    스크롤 거리 = 240vw - 100vw = 140vw
    Transform: 0 → -140vw (빈 공간 없음)
\`\`\`

### 동작 원리
1. \`React.Children.count(children)\`로 슬라이드 수 자동 계산
2. 컨테이너 높이: \`slideCount × 100vh\`
3. 각 슬라이드: \`fit-content\` (콘텐츠 크기에 맞춤)
4. 세로 스크롤 진행도를 가로 이동으로 변환

### 주의사항
- 스토리북에서는 스크롤 영역이 제한되어 전체 인터랙션 확인이 어렵습니다.
- 실제 페이지에서 테스트를 권장합니다.
        `,
      },
    },
  },
  argTypes: {
    slideWidth: {
      control: 'text',
      description: '각 슬라이드의 콘텐츠 너비 (스크롤 계산용)',
      table: {
        defaultValue: { summary: '80vw' },
      },
    },
    backgroundColor: {
      control: 'color',
      description: '배경색',
      table: {
        defaultValue: { summary: 'transparent' },
      },
    },
  },
};

/**
 * 샘플 슬라이드 콘텐츠
 * fit-content 동작 확인을 위해 명시적 너비 설정
 */
const SampleSlide = ({ index, color, width = '80vw' }) => (
  <Box
    sx={{
      width,
      height: '80vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: color,
      borderRadius: 1,
    }}
  >
    <Typography
      sx={{
        fontFamily: 'Chandia, Georgia, serif',
        fontSize: { xs: '3rem', md: '5rem' },
        color: '#fff',
        opacity: 0.8,
      }}
    >
      Slide {index + 1}
    </Typography>
  </Box>
);

const slideColors = ['#2D3436', '#636E72', '#B2BEC3'];

/** 기본 - 3개 슬라이드 (80vw) */
export const Default = {
  args: {
    slideWidth: '80vw',
    backgroundColor: 'transparent',
  },
  render: (args) => (
    <HorizontalScroll
      slideWidth={args.slideWidth}
      backgroundColor={args.backgroundColor}
    >
      <HorizontalScroll.Slide>
        <SampleSlide index={0} color={slideColors[0]} />
      </HorizontalScroll.Slide>
      <HorizontalScroll.Slide>
        <SampleSlide index={1} color={slideColors[1]} />
      </HorizontalScroll.Slide>
      <HorizontalScroll.Slide>
        <SampleSlide index={2} color={slideColors[2]} />
      </HorizontalScroll.Slide>
    </HorizontalScroll>
  ),
};

/** 다양한 너비 - 60vw 슬라이드 */
export const NarrowSlides = {
  args: {
    slideWidth: '60vw',
    backgroundColor: '#1a1a1a',
  },
  render: (args) => (
    <HorizontalScroll
      slideWidth={args.slideWidth}
      backgroundColor={args.backgroundColor}
    >
      <HorizontalScroll.Slide>
        <SampleSlide index={0} color="#8B5CF6" width="60vw" />
      </HorizontalScroll.Slide>
      <HorizontalScroll.Slide>
        <SampleSlide index={1} color="#6366F1" width="60vw" />
      </HorizontalScroll.Slide>
      <HorizontalScroll.Slide>
        <SampleSlide index={2} color="#3B82F6" width="60vw" />
      </HorizontalScroll.Slide>
      <HorizontalScroll.Slide>
        <SampleSlide index={3} color="#0EA5E9" width="60vw" />
      </HorizontalScroll.Slide>
    </HorizontalScroll>
  ),
};

/** 2개 슬라이드 */
export const TwoSlides = {
  args: {
    slideWidth: '80vw',
    backgroundColor: 'transparent',
  },
  render: (args) => (
    <HorizontalScroll
      slideWidth={args.slideWidth}
      backgroundColor={args.backgroundColor}
    >
      <HorizontalScroll.Slide>
        <SampleSlide index={0} color="#059669" />
      </HorizontalScroll.Slide>
      <HorizontalScroll.Slide>
        <SampleSlide index={1} color="#10B981" />
      </HorizontalScroll.Slide>
    </HorizontalScroll>
  ),
};
