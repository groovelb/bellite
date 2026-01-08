import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import BrokenGridGallery from '../../../components/layout/BrokenGridGallery';
import { mediaAssets } from '../../../data/mediaAssets';

export default {
  title: 'Custom Component/Layout/BrokenGridGallery',
  component: BrokenGridGallery,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
## BrokenGridGallery

비정형 레이아웃의 이미지 갤러리 컴포넌트입니다.

### 핵심 기능
- **브로큰 그리드**: 랜덤해 보이지만 계산된 규칙으로 배치
- **황금비율 기반**: 시각적 위계와 균형 유지
- **제어된 랜덤**: position, rotate, zIndex로 유기적 느낌
- **크기 프리셋**: xs, sm, md, lg, xl 5단계

### Props
- \`items\`: 갤러리 아이템 배열
- \`height\`: 컨테이너 높이 (vh)
- \`imageScale\`: 전체 이미지 크기 배율 (0.5~2)
- \`spread\`: 이미지 간 퍼짐 정도 (0.5~2)

### 배치 규칙
1. 기본 그리드 위에 absolute 포지션으로 배치
2. top/left/right/bottom으로 위치 지정
3. rotate로 미세한 회전 적용
4. zIndex로 레이어링
        `,
      },
    },
  },
  argTypes: {
    items: {
      control: false,
      description: '갤러리 아이템 배열 ({ id, src, alt, size, position })',
      table: {
        type: { summary: 'Array' },
      },
    },
    height: {
      control: { type: 'number', min: 50, max: 200, step: 10 },
      description: '컨테이너 높이 (vh 단위)',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '100' },
      },
    },
    imageScale: {
      control: { type: 'number', min: 0.3, max: 2, step: 0.1 },
      description: '전체 이미지 크기 배율',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '1' },
      },
    },
    spread: {
      control: { type: 'number', min: 0.5, max: 2, step: 0.1 },
      description: '이미지 간 퍼짐 정도 (중심에서 멀어지는 방향)',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '1' },
      },
    },
  },
};

// 샘플 아이템 데이터
const SAMPLE_ITEMS = [
  {
    id: 'item1',
    src: mediaAssets.dailyMood.images.morning,
    alt: 'Sample 1',
    size: 'md',
    position: { top: '5%', left: '5%', zIndex: 2, rotate: -2 },
  },
  {
    id: 'item2',
    src: mediaAssets.dailyMood.images.desk,
    alt: 'Sample 2',
    size: 'sm',
    position: { top: '10%', right: '8%', zIndex: 1, rotate: 1 },
  },
  {
    id: 'item3',
    src: mediaAssets.dailyMood.images.commute,
    alt: 'Sample 3',
    size: 'xs',
    position: { top: '45%', left: '35%', zIndex: 3, rotate: 0 },
  },
  {
    id: 'item4',
    src: mediaAssets.dailyMood.images.afterBallet,
    alt: 'Sample 4',
    size: 'sm',
    position: { top: '55%', left: '8%', zIndex: 2, rotate: 2 },
  },
  {
    id: 'item5',
    src: mediaAssets.dailyMood.images.home,
    alt: 'Sample 5',
    size: 'md',
    position: { top: '50%', right: '5%', zIndex: 1, rotate: -1 },
  },
];

/** 기본 사용 */
export const Default = {
  args: {
    items: SAMPLE_ITEMS,
    height: 100,
    imageScale: 1,
    spread: 1,
  },
};

/** 이미지 축소 (imageScale: 0.7) */
export const ScaledDown = {
  args: {
    items: SAMPLE_ITEMS,
    height: 100,
    imageScale: 0.7,
    spread: 1,
  },
  parameters: {
    docs: {
      description: {
        story: 'imageScale을 0.7로 설정하여 이미지를 30% 축소합니다.',
      },
    },
  },
};

/** 간격 확대 (spread: 1.3) */
export const SpreadOut = {
  args: {
    items: SAMPLE_ITEMS,
    height: 100,
    imageScale: 1,
    spread: 1.3,
  },
  parameters: {
    docs: {
      description: {
        story: 'spread를 1.3으로 설정하여 이미지 간격을 30% 확대합니다.',
      },
    },
  },
};

/** 축소 + 간격 확대 조합 */
export const ScaledAndSpread = {
  args: {
    items: SAMPLE_ITEMS,
    height: 100,
    imageScale: 0.7,
    spread: 1.2,
  },
  parameters: {
    docs: {
      description: {
        story: 'imageScale 0.7 + spread 1.2 조합으로 겹침을 최소화합니다.',
      },
    },
  },
};

/** 크기 프리셋 비교 */
export const SizePresets = {
  render: () => {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl'];
    const items = sizes.map((size, idx) => ({
      id: size,
      src: mediaAssets.dailyMood.images.morning,
      alt: size,
      size,
      position: {
        top: '40%',
        left: `${5 + idx * 18}%`,
        zIndex: 1,
        rotate: 0,
      },
    }));

    return (
      <Box sx={{ bgcolor: 'brand.soul' }}>
        <Box sx={{ p: 2, textAlign: 'center' }}>
          <Typography variant="caption" sx={{ color: 'text.secondary', fontFamily: 'monospace' }}>
            크기 프리셋: xs → sm → md → lg → xl
          </Typography>
        </Box>
        <BrokenGridGallery items={items} height={80} imageScale={1} />
      </Box>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '5가지 크기 프리셋 (xs, sm, md, lg, xl)을 나란히 비교합니다.',
      },
    },
  },
};

/** Coming Soon 스타일 (DailyMoodSection) */
export const ComingSoonStyle = {
  render: () => {
    const items = [
      {
        id: 'morning',
        src: mediaAssets.dailyMood.images.morning,
        alt: 'Morning',
        size: 'md',
        position: { top: '5%', left: '3%', zIndex: 2, rotate: -1 },
      },
      {
        id: 'desk',
        src: mediaAssets.dailyMood.images.desk,
        alt: 'Desk',
        size: 'sm',
        position: { top: '8%', left: '28%', zIndex: 1, rotate: 1 },
      },
      {
        id: 'commute',
        src: mediaAssets.dailyMood.images.commute,
        alt: 'Commute',
        size: 'xs',
        position: { top: '3%', right: '25%', zIndex: 3, rotate: -2 },
      },
      {
        id: 'moodboard1',
        src: mediaAssets.signature.images.moodboard1,
        alt: 'Moodboard 1',
        size: 'sm',
        position: { top: '10%', right: '5%', zIndex: 2, rotate: 1 },
      },
      {
        id: 'afterBallet',
        src: mediaAssets.dailyMood.images.afterBallet,
        alt: 'After ballet',
        size: 'sm',
        position: { top: '55%', left: '5%', zIndex: 2, rotate: 2 },
      },
      {
        id: 'home',
        src: mediaAssets.dailyMood.images.home,
        alt: 'Home',
        size: 'md',
        position: { top: '60%', left: '25%', zIndex: 1, rotate: -1 },
      },
      {
        id: 's1',
        src: mediaAssets.silhouette.slides.crosswalk.image,
        alt: 'Silhouette 1',
        size: 'sm',
        position: { top: '35%', left: '3%', zIndex: 1, rotate: -1 },
      },
      {
        id: 'moodboard2',
        src: mediaAssets.signature.images.moodboard2,
        alt: 'Moodboard 2',
        size: 'xs',
        position: { top: '45%', right: '8%', zIndex: 3, rotate: -1 },
      },
      {
        id: 's2',
        src: mediaAssets.silhouette.slides.subway.image,
        alt: 'Silhouette 2',
        size: 'md',
        position: { top: '58%', right: '3%', zIndex: 2, rotate: 1 },
      },
    ];

    return (
      <Box sx={{ bgcolor: 'brand.soul', position: 'relative' }}>
        {/* Coming Soon 타이틀 */}
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 10,
            textAlign: 'center',
          }}
        >
          <Typography
            component="h1"
            sx={{
              fontFamily: 'Adamina, Georgia, serif',
              fontSize: { xs: '2.5rem', sm: '4rem', md: '6rem' },
              fontWeight: 400,
              color: 'brand.urban',
              letterSpacing: '-0.03em',
              textTransform: 'uppercase',
            }}
          >
            Coming Soon
          </Typography>
        </Box>
        <BrokenGridGallery items={items} height={100} imageScale={0.7} spread={1.2} />
      </Box>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'DailyMoodSection에서 사용하는 "Coming Soon" 스타일입니다.',
      },
    },
  },
};

/** 다크 배경 */
export const DarkBackground = {
  args: {
    items: SAMPLE_ITEMS,
    height: 100,
    imageScale: 0.8,
    spread: 1.1,
  },
  render: (args) => (
    <Box sx={{ bgcolor: 'brand.urban' }}>
      <BrokenGridGallery {...args} />
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: 'brand.urban (다크) 배경에서의 갤러리 표시입니다.',
      },
    },
  },
};
