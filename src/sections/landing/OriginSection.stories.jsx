import { Box } from '@mui/material';
import OriginSection from './OriginSection';

export default {
  title: 'Section/Landing/OriginSection',
  component: OriginSection,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
## OriginSection (Section 6: Designer's Note)

트렌디한 "Text with Scroll Progress" 효과로 브랜드 스토리를 전달하는 섹션입니다.

### 컨셉
스크롤에 따라 각 단어의 opacity가 변화하며 "읽고 있는" 느낌을 연출합니다.
키네틱 타이포그래피 효과로 몰입감 있는 리딩 경험을 제공합니다.

### 인터랙션
1. **단어별 Reveal**: 스크롤 진행도에 따라 각 단어 opacity 0.15 → 1
2. **키네틱 Y 이동**: 활성화되는 단어가 미세하게 위로 올라옴
3. **프로그레스 바**: 하단에 스크롤 진행률 표시
4. **브랜드 서명**: 80% 스크롤 시점에 fade-in

### 기술 구현
- framer-motion useScroll, useTransform
- 텍스트를 단어 배열로 split
- 각 단어 인덱스 기반 스크롤 범위 계산
- Sticky 컨테이너 (200vh 높이)

### 브랜드 컬러
- Deep Black (#0F0F0F): 배경
- Ballet Pink (#FDEFFB): 텍스트
- Rose Gold (#E9B8BD): 따옴표 강조, 프로그레스 바
        `,
      },
    },
  },
};

/**
 * 기본 - 스크롤하여 Text Progress 효과 확인
 *
 * 스크롤하면:
 * 1. 각 단어가 순차적으로 밝아짐
 * 2. 하단에 프로그레스 바가 진행됨
 * 3. 마지막에 브랜드 서명이 나타남
 */
export const Default = {
  render: () => (
    <Box>
      {/* 상단 여백 */}
      <Box
        sx={{
          height: '30vh',
          bgcolor: 'brand.soul',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          component="span"
          sx={{
            fontFamily: 'Pretendard Variable, sans-serif',
            fontSize: '0.875rem',
            color: 'brand.urban',
            opacity: 0.5,
          }}
        >
          ↓ 천천히 스크롤하며 텍스트 효과 확인
        </Box>
      </Box>

      {/* 메인 섹션 */}
      <OriginSection />

      {/* 하단 여백 */}
      <Box sx={{ height: '30vh', bgcolor: 'brand.soul' }} />
    </Box>
  ),
};
