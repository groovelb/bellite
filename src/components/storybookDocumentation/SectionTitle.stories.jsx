import Typography from '@mui/material/Typography';
import { SectionTitle } from './SectionTitle';

/**
 * SectionTitle 스토리 (문서용)
 *
 * Overview 문서 안에서 절 제목과 설명을 그린다.
 * 같은 이름의 브랜드용 컴포넌트가 따로 있어 제목에 Docs를 붙였다.
 */
export default {
  title: 'Custom Component/7. Docs Tools/SectionTitle (Docs)',
  component: SectionTitle,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
};

/** 제목과 설명 */
export const Default = {
  args: {
    title: 'ValuePillar · 핵심 약속',
    description: 'sections[valuePillars].pillars · 3건 · 각 약속이 증명 구간 하나를 가리킨다',
  },
};

/** 아래에 내용을 두는 경우 */
export const WithChildren = {
  render: () => (
    <SectionTitle title="Assets" description="폴더별 파일 수와 용량">
      <Typography variant="body2" color="text.secondary">
        여기에 표나 격자가 들어간다.
      </Typography>
    </SectionTitle>
  ),
};
