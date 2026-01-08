import { Box, Typography } from '@mui/material';
import BlurRevealTypography from './BlurRevealTypography';

export default {
  title: 'Custom Component/Typography/BlurRevealTypography',
  component: BlurRevealTypography,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
## BlurRevealTypography

스크롤 진행에 따라 텍스트가 블러 상태에서 선명하게 전환되는 타이포그래피 컴포넌트입니다.

### 특징
- framer-motion \`useScroll\`, \`useTransform\` 기반
- 블러 → 선명 + 불투명도 증가 + 미세한 상승 효과
- 발레의 '선'이 점차 또렷해지는 순간을 시각적으로 표현

### 사용 섹션
- Section 5: Origin (Designer's Note) - 브랜드 기원 스토리텔링

### 기술 스택
- \`filter: blur()\` CSS 속성
- framer-motion scroll progress 연동
        `,
      },
    },
  },
  argTypes: {
    blurAmount: {
      control: { type: 'range', min: 0, max: 20, step: 1 },
      description: '초기 블러 정도 (px)',
    },
    startOpacity: {
      control: { type: 'range', min: 0, max: 1, step: 0.1 },
      description: '시작 불투명도 (0-1)',
    },
    children: {
      control: false,
      description: '블러 효과를 적용할 콘텐츠',
    },
  },
};

/** 스크롤하여 블러 해제 효과 확인 */
export const Default = {
  render: (args) => (
    <Box sx={{ minHeight: '200vh', bgcolor: 'brand.soul' }}>
      {/* 스크롤 유도 영역 */}
      <Box
        sx={{
          height: '60vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="body1"
          sx={{
            color: 'brand.urban',
            opacity: 0.5,
            fontFamily: 'Pretendard Variable, sans-serif',
          }}
        >
          ↓ 아래로 스크롤하세요
        </Typography>
      </Box>

      {/* 블러 리빌 영역 */}
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          px: 3,
        }}
      >
        <BlurRevealTypography {...args}>
          <Typography
            variant="h2"
            sx={{
              fontFamily: 'Chandia, Georgia, serif',
              fontSize: { xs: '2rem', md: '3rem' },
              color: 'brand.urban',
              textAlign: 'center',
              mb: 2,
            }}
          >
            레페토의 낭만과 보스턴백의 효율
          </Typography>
          <Typography
            variant="h3"
            sx={{
              fontFamily: 'Chandia, Georgia, serif',
              fontSize: { xs: '1.5rem', md: '2rem' },
              color: 'brand.ribbon',
              textAlign: 'center',
              mb: 4,
            }}
          >
            그 사이의 완벽한 답.
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontFamily: 'Pretendard Variable, sans-serif',
              fontSize: { xs: '1rem', md: '1.125rem' },
              color: 'brand.urban',
              textAlign: 'center',
              maxWidth: 600,
              lineHeight: 1.8,
              opacity: 0.8,
            }}
          >
            "왜 비싼 발레백에는 노트북이 들어가지 않을까?"
            이 질문에서 시작된 벨라이트는 디자이너의 눈과 발레인의 마음으로 완성되었습니다.
          </Typography>
        </BlurRevealTypography>
      </Box>
    </Box>
  ),
  args: {
    blurAmount: 10,
    startOpacity: 0.3,
  },
};

/** 강한 블러 효과 */
export const StrongBlur = {
  render: (args) => (
    <Box sx={{ minHeight: '200vh', bgcolor: 'brand.urban' }}>
      <Box
        sx={{
          height: '50vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="body2" sx={{ color: 'brand.soul', opacity: 0.5 }}>
          ↓ 스크롤
        </Typography>
      </Box>
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          px: 3,
        }}
      >
        <BlurRevealTypography {...args}>
          <Typography
            sx={{
              fontFamily: 'Chandia, Georgia, serif',
              fontSize: { xs: '2.5rem', md: '4rem' },
              color: 'brand.soul',
              textAlign: 'center',
            }}
          >
            Your Daily Encore.
          </Typography>
        </BlurRevealTypography>
      </Box>
    </Box>
  ),
  args: {
    blurAmount: 16,
    startOpacity: 0.2,
  },
};
