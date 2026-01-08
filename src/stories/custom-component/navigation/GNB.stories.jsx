import Box from '@mui/material/Box';
import { GNB } from '../../../components/navigation/GNB';

export default {
  title: 'Custom Component/Navigation/GNB',
  component: GNB,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
## GNB - Bellite 글로벌 네비게이션 바

랜딩 페이지 상단에 고정되어 각 섹션으로 스크롤 앵커 기능을 제공합니다.

### 특징
- 좌측: Bellite 로고 (Chandia 폰트)
- 우측: 섹션 네비게이션 메뉴
- 데스크탑: 메뉴 직접 표시
- 모바일: 햄버거 메뉴 → Drawer
- 배경 투명, hover 시 배경 없음

### 메뉴 구성
- Silhouette → Section 2
- Archive → Section 3
- Signature → Section 4
- Story → Section 5

### 데이터 바인딩
- JSON: src/data/landingPageContent.json
        `,
      },
    },
  },
};

/** 기본 - 스크롤 앵커 기능은 LandingPage에서 확인 */
export const Default = {
  render: () => (
    <Box
      sx={{
        height: 400,
        bgcolor: 'brand.urban',
        position: 'relative',
      }}
    >
      <GNB />
    </Box>
  ),
};
