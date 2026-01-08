import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import MarqueeText from '../../../components/typography/MarqueeText';

export default {
  title: 'Custom Component/Typography/MarqueeText',
  component: MarqueeText,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
## MarqueeText

스크롤 연동 무한 텍스트 애니메이션 컴포넌트입니다.

### 핵심 기능
- **스크롤 연동**: 페이지 스크롤에 따라 텍스트가 이동
- **Controlled/Uncontrolled**: 자체 스크롤 추적 또는 외부 scrollProgress 주입
- **방향 제어**: scrollDirection으로 스크롤 다운 시 이동 방향 설정
- **속도 조절**: speed prop으로 이동 속도 배율 조정

### 동작 모드
- **Uncontrolled (기본)**: 자체 컨테이너 기준 스크롤 추적
- **Controlled**: scrollProgress prop으로 부모의 Motion Value 사용

### 용도
- 섹션 타이틀 (SilhouetteSection)
- 브랜드 메시지 반복
- 장식적 텍스트 요소
        `,
      },
    },
  },
  argTypes: {
    children: {
      control: 'text',
      description: '표시할 텍스트',
      table: {
        type: { summary: 'string' },
      },
    },
    scrollDirection: {
      control: 'radio',
      options: ['left', 'right'],
      description: '스크롤 다운 시 텍스트 이동 방향',
      table: {
        type: { summary: "'left' | 'right'" },
        defaultValue: { summary: 'left' },
      },
    },
    speed: {
      control: { type: 'number', min: 0.1, max: 2, step: 0.1 },
      description: '스크롤 대비 이동 속도 배율',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0.5' },
      },
    },
    scrollProgress: {
      control: false,
      description: '외부 스크롤 진행도 (MotionValue, Controlled 모드)',
      table: {
        type: { summary: 'MotionValue<number>' },
      },
    },
    separator: {
      control: 'text',
      description: '텍스트 사이 구분자',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "' — '" },
      },
    },
    repeat: {
      control: { type: 'number', min: 3, max: 10, step: 1 },
      description: '텍스트 반복 횟수',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '6' },
      },
    },
    variant: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      description: 'Typography variant',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'h2' },
      },
    },
    letterSpacing: {
      control: 'text',
      description: '자간 (CSS letter-spacing)',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "'-0.03em'" },
      },
    },
  },
};

/** 스크롤 영역 래퍼 */
const ScrollArea = ({ children, height = '200vh' }) => (
  <Box sx={{ minHeight: height }}>
    <Box
      sx={{
        position: 'sticky',
        top: '40vh',
      }}
    >
      {children}
    </Box>
  </Box>
);

/** 기본 사용 - 스크롤하여 확인 */
export const Default = {
  args: {
    children: 'Unbroken Line',
    scrollDirection: 'left',
    speed: 0.5,
    separator: ' — ',
    repeat: 6,
    letterSpacing: '-0.03em',
  },
  render: (args) => (
    <ScrollArea>
      <Typography
        variant="caption"
        sx={{
          display: 'block',
          textAlign: 'center',
          mb: 2,
          color: 'text.secondary',
        }}
      >
        스크롤하여 텍스트 이동 확인
      </Typography>
      <MarqueeText {...args} />
    </ScrollArea>
  ),
};

/** 우측 방향 - 스크롤 다운 시 오른쪽으로 이동 */
export const RightDirection = {
  args: {
    children: 'Your Daily Encore',
    scrollDirection: 'right',
    separator: ' • ',
  },
  render: (args) => (
    <ScrollArea>
      <Typography
        variant="caption"
        sx={{
          display: 'block',
          textAlign: 'center',
          mb: 2,
          color: 'text.secondary',
        }}
      >
        스크롤 다운 → 오른쪽 이동 / 스크롤 업 → 왼쪽 이동
      </Typography>
      <MarqueeText {...args} />
    </ScrollArea>
  ),
};

/** 속도 비교 */
export const SpeedComparison = {
  render: () => (
    <ScrollArea height="300vh">
      <Stack spacing={4}>
        <Box>
          <Typography
            variant="caption"
            sx={{ px: 2, color: 'text.secondary', fontFamily: 'monospace' }}
          >
            speed: 0.3 (느림)
          </Typography>
          <MarqueeText speed={0.3}>Slow Movement</MarqueeText>
        </Box>
        <Box>
          <Typography
            variant="caption"
            sx={{ px: 2, color: 'text.secondary', fontFamily: 'monospace' }}
          >
            speed: 0.5 (기본)
          </Typography>
          <MarqueeText speed={0.5}>Normal Movement</MarqueeText>
        </Box>
        <Box>
          <Typography
            variant="caption"
            sx={{ px: 2, color: 'text.secondary', fontFamily: 'monospace' }}
          >
            speed: 1 (빠름)
          </Typography>
          <MarqueeText speed={1}>Fast Movement</MarqueeText>
        </Box>
      </Stack>
    </ScrollArea>
  ),
};

/** 반대 방향 조합 */
export const OppositeDirections = {
  render: () => (
    <ScrollArea height="300vh">
      <Stack spacing={4}>
        <Box>
          <Typography
            variant="caption"
            sx={{ px: 2, color: 'text.secondary', fontFamily: 'monospace' }}
          >
            scrollDirection: left
          </Typography>
          <MarqueeText scrollDirection="left">Unbroken Line</MarqueeText>
        </Box>
        <Box>
          <Typography
            variant="caption"
            sx={{ px: 2, color: 'text.secondary', fontFamily: 'monospace' }}
          >
            scrollDirection: right
          </Typography>
          <MarqueeText scrollDirection="right">Maintain the Line</MarqueeText>
        </Box>
      </Stack>
    </ScrollArea>
  ),
};

/** 다양한 구분자 */
export const Separators = {
  render: () => (
    <ScrollArea height="350vh">
      <Stack spacing={4}>
        <Box>
          <Typography
            variant="caption"
            sx={{ px: 2, color: 'text.secondary', fontFamily: 'monospace' }}
          >
            separator: " — " (기본)
          </Typography>
          <MarqueeText separator=" — ">Bellite</MarqueeText>
        </Box>
        <Box>
          <Typography
            variant="caption"
            sx={{ px: 2, color: 'text.secondary', fontFamily: 'monospace' }}
          >
            separator: " • "
          </Typography>
          <MarqueeText separator=" • ">Bellite</MarqueeText>
        </Box>
        <Box>
          <Typography
            variant="caption"
            sx={{ px: 2, color: 'text.secondary', fontFamily: 'monospace' }}
          >
            separator: " ✦ "
          </Typography>
          <MarqueeText separator=" ✦ ">Bellite</MarqueeText>
        </Box>
        <Box>
          <Typography
            variant="caption"
            sx={{ px: 2, color: 'text.secondary', fontFamily: 'monospace' }}
          >
            separator: "   /   "
          </Typography>
          <MarqueeText separator="   /   ">Bellite</MarqueeText>
        </Box>
      </Stack>
    </ScrollArea>
  ),
};

/** 다양한 Typography 크기 */
export const Sizes = {
  render: () => (
    <ScrollArea height="350vh">
      <Stack spacing={3}>
        {['h1', 'h2', 'h3', 'h4'].map((variant) => (
          <Box key={variant}>
            <Typography
              variant="caption"
              sx={{ px: 2, color: 'text.secondary', fontFamily: 'monospace' }}
            >
              variant: {variant}
            </Typography>
            <MarqueeText variant={variant}>Unbroken Line</MarqueeText>
          </Box>
        ))}
      </Stack>
    </ScrollArea>
  ),
};

/** Silhouette Section 스타일 */
export const SilhouetteSectionStyle = {
  render: () => (
    <ScrollArea height="250vh">
      <Box
        sx={{
          bgcolor: 'brand.soul',
          py: 6,
        }}
      >
        <MarqueeText scrollDirection="left" speed={1.2} separator=" — ">
          Unbroken Line
        </MarqueeText>
      </Box>
    </ScrollArea>
  ),
};

/** 다크 모드 (Footer 스타일) */
export const DarkMode = {
  render: () => (
    <ScrollArea height="250vh">
      <Box
        sx={{
          bgcolor: 'brand.urban',
          py: 6,
        }}
      >
        <MarqueeText
          scrollDirection="right"
          separator=" • "
          sx={{
            '& .MuiTypography-root': {
              color: 'brand.soul',
              opacity: 0.8,
            },
          }}
        >
          Your Daily Encore
        </MarqueeText>
      </Box>
    </ScrollArea>
  ),
};
