import { Box, Typography } from '@mui/material';
import MaskRevealSection from './MaskRevealSection';

// 샘플 이미지 (실제 에셋으로 교체 필요)
import s2Image1 from '../../assets/s2/s2-1.png';
import s2Image2 from '../../assets/s2/s2-2.png';

export default {
  title: 'Custom Component/MaskRevealSection',
  component: MaskRevealSection,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
## MaskRevealSection

스크롤 기반 마스킹 전환 컴포넌트. 두 이미지가 중앙에서 확장되는 원형 마스크로 전환됩니다.

### 동작 흐름
1. **Phase 1**: 첫 번째 이미지 전체 표시
2. **Phase 2**: 스크롤 시 중앙에서 원형으로 확장되는 마스크 효과
3. **Phase 3**: 마스크 완료 후 두 번째 이미지 표시 + 핫스팟 활성화

### 스크롤 타이밍
- 0~15%: 텍스트 페이드인
- 10~60%: 마스크 확장 (0% → 150%)
- 30~60%: 첫 번째 이미지 페이드아웃
- 40~70%: 두 번째 이미지 페이드인
- 70% 이후: 핫스팟 활성화

### 재사용
이 컴포넌트는 범용적으로 재사용 가능합니다:
- Before/After 비교
- 제품 내부/외부 전환
- 스토리텔링 전환 효과
        `,
      },
    },
  },
  argTypes: {
    moodboardImage: {
      control: 'text',
      description: '첫 번째 이미지 URL',
    },
    revealImage: {
      control: 'text',
      description: '마스크 후 표시될 이미지 URL',
    },
    scrollHeight: {
      control: { type: 'number', min: 100, max: 400, step: 50 },
      description: '스크롤 영역 높이 (vh 단위)',
    },
    backgroundColor: {
      control: 'text',
      description: '배경색 (theme token)',
    },
    hotspots: {
      control: 'object',
      description: '핫스팟 데이터 배열',
    },
    content: {
      control: 'object',
      description: '텍스트 콘텐츠',
    },
  },
};

// 샘플 핫스팟 데이터
const sampleHotspots = [
  {
    position: { x: 25, y: 35 },
    label: '포인트 A',
    description: '첫 번째 핫스팟 설명입니다.',
    tooltipPosition: 'right',
  },
  {
    position: { x: 70, y: 40 },
    label: '포인트 B',
    description: '두 번째 핫스팟 설명입니다.',
    tooltipPosition: 'left',
  },
  {
    position: { x: 40, y: 70 },
    label: '포인트 C',
    description: '세 번째 핫스팟 설명입니다.',
    tooltipPosition: 'top',
  },
];

// 샘플 콘텐츠
const sampleContent = {
  sectionLabel: '섹션 라벨',
  h1: '메인 타이틀이 여기에 표시됩니다.',
  h2: '서브 타이틀 또는 부가 설명.',
  description: '더 자세한 설명이 필요한 경우 이 영역에 표시됩니다. 스크롤에 따라 자연스럽게 나타납니다.',
};

// 스크롤 데코레이터
const ScrollDecorator = (Story) => (
  <Box sx={{ bgcolor: 'brand.soul' }}>
    <Box
      sx={{
        height: '50vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography
        sx={{
          fontFamily: 'Pretendard Variable, sans-serif',
          fontSize: '1rem',
          color: 'brand.urban',
          opacity: 0.5,
        }}
      >
        스크롤하여 마스킹 효과 확인
      </Typography>
    </Box>

    <Story />

    <Box
      sx={{
        height: '50vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography
        sx={{
          fontFamily: 'Pretendard Variable, sans-serif',
          fontSize: '1rem',
          color: 'brand.urban',
          opacity: 0.5,
        }}
      >
        섹션 종료
      </Typography>
    </Box>
  </Box>
);

export const Default = {
  args: {
    moodboardImage: s2Image1,
    revealImage: s2Image2,
    hotspots: sampleHotspots,
    content: sampleContent,
    scrollHeight: 200,
    backgroundColor: 'brand.soul',
  },
  decorators: [ScrollDecorator],
};

export const WithoutHotspots = {
  args: {
    moodboardImage: s2Image1,
    revealImage: s2Image2,
    hotspots: [],
    content: sampleContent,
    scrollHeight: 150,
  },
  decorators: [ScrollDecorator],
};

export const MinimalContent = {
  args: {
    moodboardImage: s2Image1,
    revealImage: s2Image2,
    hotspots: [],
    content: {
      h1: '간결한 타이틀만 표시',
    },
    scrollHeight: 150,
  },
  decorators: [ScrollDecorator],
};

export const ExtendedScroll = {
  args: {
    moodboardImage: s2Image1,
    revealImage: s2Image2,
    hotspots: sampleHotspots,
    content: sampleContent,
    scrollHeight: 300,
  },
  decorators: [ScrollDecorator],
  parameters: {
    docs: {
      description: {
        story: '더 긴 스크롤 영역 (300vh)으로 천천히 전환되는 효과를 확인할 수 있습니다.',
      },
    },
  },
};
