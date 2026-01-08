import { Box } from '@mui/material';
import InsideMoodSection from './InsideMoodSection';

export default {
  title: 'Section/Landing/InsideMoodSection',
  component: InsideMoodSection,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
## InsideMoodSection (Section 4: 내부 오브제 무드보드)

Silhouette(외부)와 SignatureSection(상세) 사이의 분위기 전환 섹션입니다.

### 컨셉
- Silhouette: "가방 밖" - 일상 속 가방의 외부 모습
- InsideMood: "가방 안" - 발레 오브제들의 시적인 표현
- SignatureSection: 상세 기능 설명

### 비주얼
갤러리 같은 어두운 공간에서 발레 오브제 단어들이 떠다니는 느낌.
타이포그래피 중심의 미니멀하고 시적인 표현.

### 인터랙션
1. **떠다니는 단어들**: 발레 오브제 단어들이 parallax로 미세하게 이동
2. **중앙 텍스트**: 스크롤 시 fade-in
3. **상하 페이드**: 경계가 부드럽게 어두워짐

### 오브제 단어들
- Pointe Shoes / 토슈즈
- 리본 / Hairpins
- Tights / 레오타드
- 바디밴드 / Warmers

### 브랜드 컬러
- Deep Black (#0F0F0F): 배경
- Ballet Pink (#FDEFFB): 메인 텍스트
- Rose Gold (#E9B8BD): 오브제 단어들, 액센트
        `,
      },
    },
  },
};

/**
 * 기본 - 스크롤하여 parallax 효과 확인
 *
 * 스크롤하면:
 * 1. 떠다니는 오브제 단어들이 미세하게 이동
 * 2. 중앙 텍스트가 fade-in
 */
export const Default = {
  render: () => (
    <Box>
      {/* 스크롤 유도를 위한 상단 여백 */}
      <Box
        sx={{
          height: '50vh',
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
          ↓ 스크롤하여 효과 확인
        </Box>
      </Box>

      {/* 메인 섹션 */}
      <InsideMoodSection />

      {/* 하단 여백 */}
      <Box sx={{ height: '50vh', bgcolor: 'brand.soul' }} />
    </Box>
  ),
};
