import { Box } from '@mui/material';
import ValuePillarsSection from './ValuePillarsSection';

export default {
  title: 'Section/Landing/ValuePillarsSection',
  component: ValuePillarsSection,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
## ValuePillarsSection (Section 2: The Three Promises)

Hero의 감성적 선언을 구체적인 약속으로 전환하는 브릿지 섹션입니다.

### 내러티브
> "Your Daily Encore"가 의미하는 세 가지 약속. 선언에서 증명으로 넘어가는 브릿지.

### 3가지 핵심 가치 (Pillars)
1. **Unbroken Line (무너지지 않는 실루엣)**: 가방 하단 처짐 방지 → Silhouette 섹션 연결
2. **Thoughtful Archive (구겨지지 않는 보관)**: 독립적인 수납 구조 → Archive 섹션 연결
3. **Internalized Discipline (내재적 자부심)**: 절제된 자수 로고 → Signature 섹션 연결

### 인터랙션
1. **순차적 진입**: 카드들이 stagger 애니메이션으로 fade-in + slide-up
2. **호버 효과**: 각 카드에 미세한 lift 효과 (y: -8px)

### 레이아웃
- 데스크탑: 3열 가로 배치
- 모바일: 수직 스택 배치

### 브랜드 컬러
- Ballet Pink (#FDEFFB): 배경
- Deep Black (#0F0F0F): 텍스트
- Rose Gold (#E9B8BD): 액센트, 순번, 구분선

### 데이터 바인딩
- JSON: src/data/landingPageContent.json (valuePillars 섹션)
        `,
      },
    },
  },
};

/**
 * 기본 - 스크롤하여 순차적 카드 진입 애니메이션 확인
 *
 * 스크롤하면:
 * 1. 헤더 텍스트가 fade-in
 * 2. 3개의 카드가 순차적으로 나타남 (stagger 0.15s)
 * 3. 카드 호버 시 미세한 lift 효과
 */
export const Default = {
  render: () => (
    <Box>
      {/* 스크롤 유도를 위한 상단 여백 */}
      <Box
        sx={{
          height: '30vh',
          bgcolor: 'brand.soul',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderBottom: '1px solid',
          borderColor: 'brand.ribbon',
          opacity: 0.3,
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
      <ValuePillarsSection />

      {/* 하단 여백 */}
      <Box sx={{ height: '30vh', bgcolor: 'brand.soul' }} />
    </Box>
  ),
};
