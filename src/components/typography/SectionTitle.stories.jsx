import { Box } from '@mui/material';
import SectionTitle from './SectionTitle';

export default {
  title: 'Custom Component/Typography/SectionTitle',
  component: SectionTitle,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## SectionTitle

랜딩 페이지 섹션의 통일된 타이틀 스타일을 제공하는 컴포넌트입니다.

### 특징
- Adamina 세리프 폰트
- Bold (fontWeight: 700)
- 중앙 정렬 기본
- framer-motion 애니메이션 (whileInView)

### 사용처
- ValuePillarsSection: "The Three Promises"
- SilhouetteSection: "Unbroken Line"
        `,
      },
    },
  },
  argTypes: {
    title: {
      control: 'text',
      description: '타이틀 텍스트 (영문 권장)',
    },
    animate: {
      control: 'boolean',
      description: 'framer-motion 애니메이션 사용 여부',
    },
    align: {
      control: 'select',
      options: ['left', 'center', 'right'],
      description: '텍스트 정렬',
    },
  },
};

export const Default = {
  args: {
    title: 'Unbroken Line',
    animate: false,
    align: 'center',
  },
};

export const Variants = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, width: '100%', maxWidth: 800 }}>
      <SectionTitle title="The Three Promises" animate={false} />
      <SectionTitle title="Unbroken Line" animate={false} />
      <SectionTitle title="Thoughtful Archive" animate={false} />
    </Box>
  ),
};

export const Alignments = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, width: '100%', maxWidth: 800 }}>
      <SectionTitle title="Left Aligned" align="left" animate={false} />
      <SectionTitle title="Center Aligned" align="center" animate={false} />
      <SectionTitle title="Right Aligned" align="right" animate={false} />
    </Box>
  ),
};
