import { Box } from '@mui/material';
import InteractiveHotspot from './InteractiveHotspot';

// 예시 배경 이미지 URL
const sampleBgLight = 'linear-gradient(135deg, #F5DDD4 0%, #FAF0ED 100%)';
const sampleBgDark = 'linear-gradient(135deg, #0F0F0F 0%, #2A2A2A 100%)';

export default {
  title: 'Custom Component/InteractiveHotspot',
  component: InteractiveHotspot,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    position: {
      control: 'object',
      description: '핫스팟 위치 (x, y 퍼센트)',
    },
    label: {
      control: 'text',
      description: '툴팁 제목',
    },
    description: {
      control: 'text',
      description: '툴팁 설명',
    },
    tooltipPosition: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
      description: '툴팁 방향',
    },
    isActive: {
      control: 'boolean',
      description: '활성화 여부',
    },
    variant: {
      control: 'select',
      options: ['light', 'dark'],
      description: '스타일 변형',
    },
  },
  decorators: [
    (Story, context) => {
      const isDark = context.args.variant === 'dark';
      return (
        <Box
          sx={{
            position: 'relative',
            width: 400,
            height: 300,
            background: isDark ? sampleBgDark : sampleBgLight,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Story />
        </Box>
      );
    },
  ],
};

export const Default = {
  args: {
    position: { x: 50, y: 50 },
    label: '토슈즈 포켓',
    description: '독립된 수납 공간으로 소중한 토슈즈를 보호합니다.',
    tooltipPosition: 'top',
    isActive: true,
    variant: 'light',
  },
};

export const TooltipPositions = {
  render: () => (
    <Box
      sx={{
        position: 'relative',
        width: 500,
        height: 400,
        background: sampleBgLight,
      }}
    >
      <InteractiveHotspot
        position={{ x: 50, y: 20 }}
        label="상단 툴팁"
        description="tooltipPosition: bottom"
        tooltipPosition="bottom"
      />
      <InteractiveHotspot
        position={{ x: 50, y: 80 }}
        label="하단 툴팁"
        description="tooltipPosition: top"
        tooltipPosition="top"
      />
      <InteractiveHotspot
        position={{ x: 20, y: 50 }}
        label="좌측 툴팁"
        description="tooltipPosition: right"
        tooltipPosition="right"
      />
      <InteractiveHotspot
        position={{ x: 80, y: 50 }}
        label="우측 툴팁"
        description="tooltipPosition: left"
        tooltipPosition="left"
      />
    </Box>
  ),
  parameters: {
    layout: 'centered',
  },
  decorators: [],
};

export const DarkVariant = {
  args: {
    position: { x: 50, y: 50 },
    label: '노트북 섹션',
    description: '15인치 노트북을 안전하게 수납할 수 있는 패딩 처리된 공간입니다.',
    tooltipPosition: 'right',
    isActive: true,
    variant: 'dark',
  },
};

export const MultipleHotspots = {
  render: () => (
    <Box
      sx={{
        position: 'relative',
        width: 500,
        height: 350,
        background: sampleBgLight,
        border: '1px solid',
        borderColor: 'brand.ribbon',
      }}
    >
      <InteractiveHotspot
        position={{ x: 25, y: 30 }}
        label="토슈즈 포켓"
        description="독립된 수납 공간"
        tooltipPosition="right"
      />
      <InteractiveHotspot
        position={{ x: 70, y: 35 }}
        label="노트북 섹션"
        description="15인치 노트북 수납"
        tooltipPosition="left"
      />
      <InteractiveHotspot
        position={{ x: 40, y: 70 }}
        label="타이즈 파우치"
        description="습기 차단 소재"
        tooltipPosition="top"
      />
      <InteractiveHotspot
        position={{ x: 75, y: 75 }}
        label="텀블러 홀더"
        description="누수 방지 설계"
        tooltipPosition="top"
      />
    </Box>
  ),
  parameters: {
    layout: 'centered',
  },
  decorators: [],
};

export const LabelOnly = {
  args: {
    position: { x: 50, y: 50 },
    label: '메인 수납공간',
    tooltipPosition: 'top',
    isActive: true,
    variant: 'light',
  },
};
