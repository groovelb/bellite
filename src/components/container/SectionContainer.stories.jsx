import { Box, Typography } from '@mui/material';
import { SectionContainer } from './SectionContainer';

export default {
  title: 'Custom Component/Container/SectionContainer',
  component: SectionContainer,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
## SectionContainer

페이지 섹션을 감싸는 컨테이너입니다. MUI Container 기반으로 반응형 maxWidth와 패딩을 제공합니다.

### 사용 패턴

1. **기본 (패딩 + maxWidth)**: \`<SectionContainer maxWidth="md">\`
2. **풀블리드**: \`<SectionContainer maxWidth={false} disableGutters disablePadding>\`
3. **풀높이**: \`<SectionContainer fullHeight>\`

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| id | string | - | 섹션 ID (앵커 링크용) |
| maxWidth | 'sm'\\|'md'\\|'lg'\\|'xl'\\|false | 'xl' | Container 최대 너비 |
| disableGutters | boolean | false | 좌우 거터 제거 |
| disablePadding | boolean | false | 수직 패딩 제거 |
| py | number\\|object | { xs: 4, md: 6 } | 수직 패딩 커스텀 |
| spacing | number\\|object\\|null | null | Stack 간격 |
| bgcolor | string | - | 배경색 |
| fullHeight | boolean | false | 100vh + 중앙 정렬 |
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
    disablePadding: {
      control: 'boolean',
      description: '수직 패딩 제거',
    },
    fullHeight: {
      control: 'boolean',
      description: '100vh 최소 높이 + 중앙 정렬',
    },
    bgcolor: {
      control: 'text',
      description: '배경색 (MUI 토큰 또는 CSS)',
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
      섹션 콘텐츠 영역
    </Typography>
  </Box>
);

export const Default = {
  args: {
    maxWidth: 'lg',
    disableGutters: false,
    disablePadding: false,
    fullHeight: false,
  },
  render: (args) => (
    <SectionContainer {...args}>
      <SampleContent label="Default Section" />
    </SectionContainer>
  ),
};

export const MaxWidthVariants = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {['sm', 'md', 'lg', 'xl'].map((size) => (
        <SectionContainer key={size} maxWidth={size} py={2}>
          <SampleContent label={`maxWidth="${size}"`} />
        </SectionContainer>
      ))}
    </Box>
  ),
};

export const FullBleed = {
  render: () => (
    <SectionContainer maxWidth={false} disableGutters disablePadding>
      <Box
        sx={{
          bgcolor: 'brand.urban',
          color: 'brand.soul',
          p: 6,
          textAlign: 'center',
        }}
      >
        <Typography variant="h4">Full Bleed Section</Typography>
        <Typography variant="body1" sx={{ opacity: 0.8 }}>
          maxWidth=false, disableGutters, disablePadding
        </Typography>
      </Box>
    </SectionContainer>
  ),
};

export const FullHeight = {
  render: () => (
    <SectionContainer fullHeight bgcolor="brand.urban">
      <Box sx={{ textAlign: 'center', color: 'brand.soul' }}>
        <Typography variant="h3">Full Height Section</Typography>
        <Typography variant="body1" sx={{ opacity: 0.8, mt: 2 }}>
          100vh + 중앙 정렬
        </Typography>
      </Box>
    </SectionContainer>
  ),
};

export const WithSpacing = {
  render: () => (
    <SectionContainer maxWidth="md" spacing={4}>
      <SampleContent label="Item 1" />
      <SampleContent label="Item 2" />
      <SampleContent label="Item 3" />
    </SectionContainer>
  ),
};
