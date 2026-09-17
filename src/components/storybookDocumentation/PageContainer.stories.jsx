import Typography from '@mui/material/Typography';
import { PageContainer } from './PageContainer';
import { SectionTitle } from './SectionTitle';

/**
 * PageContainer 스토리 (문서용)
 *
 * Overview 문서의 최상위 컨테이너다. 스타터킷에서 그대로 가져와 쓴다.
 * 같은 이름의 브랜드용 컨테이너가 src/components/container에 따로 있다.
 */
export default {
  title: 'Common/PageContainer',
  component: PageContainer,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

/** 문서 한 장의 기본 폭과 여백 */
export const Default = {
  render: () => (
    <PageContainer>
      <Typography variant="h4" sx={ { fontWeight: 700, mb: 1 } }>
        Document Title
      </Typography>
      <SectionTitle title="첫 번째 절" description="상단 패딩은 고정 헤더 높이를 비워 둔다" />
      <Typography variant="body1" color="text.secondary">
        xl 이상에서는 최대 폭이 걸리고, 그 아래에서는 화면 폭을 그대로 쓴다.
      </Typography>
    </PageContainer>
  ),
};

/** 좁은 폭 */
export const Medium = {
  render: () => (
    <PageContainer maxWidth="md">
      <Typography variant="h4" sx={ { fontWeight: 700, mb: 1 } }>
        maxWidth=md
      </Typography>
      <Typography variant="body1" color="text.secondary">
        긴 글을 읽히는 문서에는 좁은 폭을 쓴다.
      </Typography>
    </PageContainer>
  ),
};
