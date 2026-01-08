import { Box, Typography } from '@mui/material';
import { ContentArea } from './ContentArea';

export default {
  title: 'Custom Component/Container/ContentArea',
  component: ContentArea,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
## ContentArea

섹션 내부에서 콘텐츠의 최대 너비를 제한하고 중앙 정렬하는 컴포넌트입니다.

### 사용 사례

1. **SectionContainer 내부**: 풀블리드 섹션 내에서 일부 콘텐츠만 maxWidth 제한
2. **motion.section 내부**: framer-motion 애니메이션과 함께 사용
3. **독립 사용**: 단순 콘텐츠 영역 제한

### 예시

\`\`\`jsx
// 풀블리드 섹션 내에서 텍스트만 제한
<SectionContainer maxWidth={false} disableGutters>
  <FullWidthImage />
  <ContentArea maxWidth="md">
    <TextContent />
  </ContentArea>
</SectionContainer>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    maxWidth: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', false],
      description: 'Container 최대 너비',
    },
    disableGutters: {
      control: 'boolean',
      description: '좌우 거터(패딩) 제거',
    },
  },
};

// 샘플 콘텐츠
const SampleContent = ({ label = 'Content' }) => (
  <Box
    sx={{
      p: 4,
      bgcolor: 'brand.soul',
      border: '1px dashed',
      borderColor: 'brand.ribbon',
      textAlign: 'center',
    }}
  >
    <Typography variant="h6" color="brand.urban">
      {label}
    </Typography>
    <Typography variant="body2" color="text.secondary">
      콘텐츠 영역 (maxWidth 제한)
    </Typography>
  </Box>
);

export const Default = {
  args: {
    maxWidth: 'lg',
    disableGutters: false,
  },
  render: (args) => (
    <Box sx={{ bgcolor: 'grey.100', py: 4 }}>
      <ContentArea {...args}>
        <SampleContent label="Default ContentArea" />
      </ContentArea>
    </Box>
  ),
};

export const MaxWidthVariants = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, py: 4 }}>
      {['sm', 'md', 'lg', 'xl'].map((size) => (
        <Box key={size} sx={{ bgcolor: 'grey.100', py: 2 }}>
          <ContentArea maxWidth={size}>
            <SampleContent label={`maxWidth="${size}"`} />
          </ContentArea>
        </Box>
      ))}
    </Box>
  ),
};

export const InsideFullBleedSection = {
  render: () => (
    <Box
      sx={{
        bgcolor: 'brand.urban',
        py: 6,
      }}
    >
      {/* 풀블리드 이미지 영역 */}
      <Box
        sx={{
          height: 200,
          bgcolor: 'grey.700',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 4,
        }}
      >
        <Typography variant="h5" color="grey.400">
          Full Width Image Area
        </Typography>
      </Box>

      {/* 콘텐츠 영역만 maxWidth 제한 */}
      <ContentArea maxWidth="md">
        <Box sx={{ textAlign: 'center', color: 'brand.soul' }}>
          <Typography variant="h4" gutterBottom>
            Content with maxWidth
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.8 }}>
            풀블리드 섹션 내에서 텍스트 콘텐츠만 maxWidth="md"로 제한된 예시입니다.
          </Typography>
        </Box>
      </ContentArea>
    </Box>
  ),
};

export const ComparisonWithoutContentArea = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {/* ContentArea 없이 */}
      <Box sx={{ bgcolor: 'grey.100', py: 4 }}>
        <Typography variant="caption" sx={{ px: 2, display: 'block', mb: 2 }}>
          Without ContentArea (full width)
        </Typography>
        <SampleContent label="No ContentArea" />
      </Box>

      {/* ContentArea 사용 */}
      <Box sx={{ bgcolor: 'grey.100', py: 4 }}>
        <Typography variant="caption" sx={{ px: 2, display: 'block', mb: 2 }}>
          With ContentArea maxWidth="md"
        </Typography>
        <ContentArea maxWidth="md">
          <SampleContent label="ContentArea maxWidth='md'" />
        </ContentArea>
      </Box>
    </Box>
  ),
};
