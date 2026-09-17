import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {
  DocumentTitle,
  PageContainer,
  SectionTitle,
} from '../../components/storybookDocumentation';
import assetInventory from '../../data/assetInventory.js';
import landingContent from '../../data/landingPageContent.json';
import { BRAND_COLORS } from '../../styles/themes/theme';
import { ASSEMBLY_STEPS } from './assemblySteps.js';

export default {
  title: 'Overview/Bellite/08 Domain Knowledge & Research',
  parameters: {
    layout: 'padded',
  },
};

// 생성 이미지 미리보기 URL. 인벤토리의 importKey와 같은 키를 쓴다
const ASSET_URLS = import.meta.glob(
  '../../assets/**/*.{png,jpg,jpeg,webp,gif,svg}',
  { eager: true, query: '?url', import: 'default' },
);

/**
 * 학습 데이터 묶음.
 *
 * 발레 라이프스타일 가방 브랜드의 랜딩을 만들려고 읽힌 자료를 종류별로 묶었다.
 * 원천 5종은 새 기획 문서 3종으로 재구성한 뒤 삭제했다. 내용의 도착지는 B2 작업 보고서의 매핑 표를 옮긴 것이다.
 */
const KNOWLEDGE_SETS = [
  {
    name: '브랜드 방향',
    taught: '브랜드명 어원(Belle + Elite + Light), 창업 서사, 세 약속, 슬로건, 2색 팔레트',
    source: 'docs/brand-direction.md (삭제)',
    landed: '01 2절 배경, 01 3.1 핵심 가치, 01 1절 태그라인, 03 1절 무드',
    story: { label: '01 Project Summary', id: 'overview-bellite-01-project-summary--docs', docs: true },
  },
  {
    name: '디자인 방향',
    taught: '색 토큰, 서체 두 벌, 타이포 스케일, 모션 원칙, 아이콘 라이브러리, MUI 매핑',
    source: 'docs/design-direction.md (삭제)',
    landed: '03 3.1 색, 03 3.2 타이포, 03 3.3 형태와 모션, 03 5절 변경 토큰',
    story: { label: '03 Visual Direction', id: 'overview-bellite-03-visual-direction--docs', docs: true },
  },
  {
    name: '랜딩 구조',
    taught: '일곱 구간의 서사, UI 패턴, 카피, 필요한 컷 수, 구간별 인터랙션',
    source: 'docs/landing-page-structure.md (삭제)',
    landed: '02 1절 시나리오, 02 2.2 계층 트리, 03 2절 레이아웃, 03 4절 에셋',
    story: { label: '02 UX Flow', id: 'overview-bellite-02-ux-flow--docs', docs: true },
  },
  {
    name: '랜딩 서사',
    taught: '구간별 H1과 H2, 설명 문단, 이미지 카테고리와 촬영 목적',
    source: 'docs/landng-page-narrative.md (삭제)',
    landed: '02 1절 단계 표의 결과 칸, 03 4절 FORMAT과 SUBJECT',
    story: { label: '06 Content Data', id: 'overview-bellite-06-content-data--default' },
  },
  {
    name: '구현 노트',
    taught: '구간별 레이아웃, 계획 컴포넌트와 props, 스크롤 기법, 의존성',
    source: 'docs/landing-page-implementation.md (삭제)',
    landed: '02 4절 인터랙션 원칙, 02 5절 컴포넌트 리스트',
    story: { label: '0. Hierarchy', id: 'custom-component-0-hierarchy--default' },
  },
  {
    name: '랜딩 콘텐츠',
    taught: '구간 카피 8건, 핵심 약속 3건, 자세 장면 4건, 수납 포인트 4건, 발레 오브제 8건',
    source: 'src/data/landingPageContent.json',
    landed: '섹션 컴포넌트가 직접 읽는다. 수납 포인트와 발레 오브제는 아직 화면에 없다',
    story: { label: '05 Pillar Data', id: 'overview-bellite-05-pillar-data--default' },
  },
  {
    name: '미디어 매핑',
    taught: '구간 이름과 파일의 짝, 슬라이드 id와 영상 파일명 매핑, 기본값 지정',
    source: 'src/data/mediaAssets.js',
    landed: 'HeroSection과 SilhouetteSection이 이 표를 거쳐 파일에 닿는다',
    story: { label: '07 Assets', id: 'overview-bellite-07-assets--default' },
  },
  {
    name: '생성 이미지와 영상',
    taught: '도심 속 자세, 일상과 발레가 겹치는 네 장면, 내부 오브제, 자수 디테일, 일상 무드',
    source: 'src/assets/{hero, silhouette, inside-mood, signature, dialy-mood}',
    landed: '랜딩 일곱 구간의 배경과 격자',
    story: { label: '07 Assets', id: 'overview-bellite-07-assets--default' },
  },
  {
    name: '디자인 토큰',
    taught: '브랜드 색 네 개, 확장 팔레트, 서체 세 벌, 8px 간격 체계, 전환 길이 세 단계',
    source: 'src/styles/themes/theme.js · src/styles/tokens.js',
    landed: 'theme.palette.brand · typography · transitions · SPACING',
    story: { label: 'Style/Colors', id: 'style-colors--docs' },
  },
];

/**
 * 토큰 유래. 원문 문서가 정한 값과 코드에 남은 값이 다른 것을 나란히 둔다.
 * 값은 문자열로만 적는다. 스토리의 색은 전부 테마 토큰으로 칠한다.
 */
const TOKEN_ORIGINS = [
  { name: 'Ballet Pink', original: '#F5DDD4', code: BRAND_COLORS.soul, token: 'brand.soul' },
  { name: 'Rose Gold', original: '#C9A89D', code: BRAND_COLORS.ribbon, token: 'brand.ribbon · secondary.main · background.default' },
  { name: 'Deep Black', original: '#0F0F0F', code: BRAND_COLORS.urban, token: 'brand.urban · primary.main · text.primary' },
  { name: 'Soul Light', original: '#FAF0ED', code: BRAND_COLORS.soulLight, token: 'brand.soulLight · MuiPaper 배경' },
  { name: 'Soft Pink', original: '(원문에 없음)', code: BRAND_COLORS.blush, token: 'brand.blush' },
  { name: 'Display 서체', original: 'Chandia가 h1~h4', code: 'Chandia는 로고만, h1~h4는 Adamina', token: 'displayFontFamily · headlineFontFamily' },
  { name: 'h1 크기', original: '4.5rem 고정', code: '3.5rem~9rem 네 단계', token: 'typography.h1' },
  { name: '전환 길이', original: '300ms / 600ms / 200ms', code: 'standard 300 · slow 600 · slower 900', token: 'transitions.duration' },
  { name: '이징', original: 'cubic-bezier(0.4, 0, 0.2, 1)', code: '같음', token: 'transitions.easing.elegant' },
  { name: 'radius', original: '0', code: '0', token: 'shape.borderRadius' },
  { name: '다크 모드', original: '별도 색 규정', code: '라이트와 같은 테마를 다시 내보낸다', token: 'darkTheme' },
];

// 무드보드에 올릴 폴더 순서
const MOOD_FOLDERS = ['hero', 'silhouette', 'inside-mood', 'signature', 'dialy-mood'];

const MOOD_NOTES = {
  hero: '도심 속 인물의 뒷모습. 무너지지 않는 수직선을 먼저 보여 준다',
  silhouette: '일상 동작이 발레 동작과 겹치는 네 장면. 자세를 증명한다',
  'inside-mood': '가방을 열었을 때의 내부. 오브제가 제자리를 갖는 장면',
  signature: '자수 로고와 원단 질감의 근접 컷',
  'dialy-mood': '하루의 다섯 장면. 마지막 구간의 격자에 쓴다',
};

/** 자료 한 장 */
function MoodCell({ item }) {
  const src = ASSET_URLS[item.importKey] || item.url || '';
  return (
    <Stack spacing={ 0.75 }>
      <Box
        sx={ {
          width: '100%',
          aspectRatio: '4 / 3',
          backgroundColor: 'grey.100',
          border: '1px solid',
          borderColor: 'divider',
          overflow: 'hidden',
        } }
      >
        { src && (
          <Box
            component="img"
            src={ src }
            alt={ item.name }
            loading="lazy"
            sx={ { width: '100%', height: '100%', objectFit: 'cover', display: 'block' } }
          />
        ) }
      </Box>
      <Typography
        variant="caption"
        sx={ { fontFamily: 'monospace', fontSize: 10, color: 'text.secondary' } }
      >
        { item.name }
      </Typography>
    </Stack>
  );
}

/** 스토리 링크. Storybook 프레임 밖으로 이동시키려고 target을 _top으로 둔다 */
function StoryLinks({ stories }) {
  return (
    <>
      { stories.map((story, index) => (
        <span key={ story.id }>
          { index > 0 ? ' · ' : '' }
          <a href={ `?path=/${ story.docs ? 'docs' : 'story' }/${ story.id }` } target="_top">
            { story.label }
          </a>
        </span>
      )) }
    </>
  );
}

/** 무엇을 학습시켰고 그것이 어디로 흘러갔는가 */
export const Default = {
  render: () => {
    const moodItems = assetInventory.items.filter(
      (item) => item.kind === 'image' && MOOD_FOLDERS.includes(item.folder),
    );
    const videoCount = assetInventory.items.filter(
      (item) => item.kind === 'video' && MOOD_FOLDERS.includes(item.folder),
    ).length;
    const sections = landingContent.sections;
    const pillars = sections.find((s) => s.id === 'valuePillars').pillars;
    const slides = sections.find((s) => s.id === 'silhouette').slides;
    const storagePoints = sections.find((s) => s.id === 'archive').storagePoints;
    const objects = sections.find((s) => s.id === 'insideMood').floatingObjects;

    return (
      <>
        <DocumentTitle
          title="Domain Knowledge & Research"
          status="Available"
          note="발레 라이프스타일 가방 브랜드 랜딩을 위해 학습시킨 자료와 그 도착지"
          brandName="Design System"
          systemName="Bellite"
          version="1.0"
        />
        <PageContainer>
          <Typography variant="h4" sx={ { fontWeight: 700, mb: 1 } }>
            Domain Knowledge &amp; Research
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={ { mb: 4 } }>
            취미 발레와 통근을 겸하는 사람을 위한 가방이라는 주제를 다루려고 읽힌 자료를 모았다.
            원천 문서 5종은 새 기획 문서 3종으로 재구성한 뒤 지웠고, 여기에는 그 내용이 어느 절로 갔는지가 남아 있다.
          </Typography>

          <SectionTitle
            title="학습 데이터"
            description={ `${ KNOWLEDGE_SETS.length }묶음 · 무엇을 가르쳤고, 어디에서 왔으며, 어디로 흘러갔는가` }
          />
          <TableContainer sx={ { mb: 6 } }>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={ { fontWeight: 600, width: '12%' } }>이름</TableCell>
                  <TableCell sx={ { fontWeight: 600, width: '26%' } }>가르친 내용</TableCell>
                  <TableCell sx={ { fontWeight: 600, width: '20%' } }>출처</TableCell>
                  <TableCell sx={ { fontWeight: 600, width: '26%' } }>흘러간 곳</TableCell>
                  <TableCell sx={ { fontWeight: 600 } }>보이는 곳</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                { KNOWLEDGE_SETS.map((row) => (
                  <TableRow key={ row.name }>
                    <TableCell sx={ { fontSize: 13, fontWeight: 600, verticalAlign: 'top' } }>{ row.name }</TableCell>
                    <TableCell sx={ { fontSize: 13, verticalAlign: 'top' } }>{ row.taught }</TableCell>
                    <TableCell sx={ { fontFamily: 'monospace', fontSize: 11, verticalAlign: 'top' } }>{ row.source }</TableCell>
                    <TableCell sx={ { fontSize: 13, verticalAlign: 'top' } }>{ row.landed }</TableCell>
                    <TableCell sx={ { fontSize: 12, verticalAlign: 'top' } }>
                      <StoryLinks stories={ [row.story] } />
                    </TableCell>
                  </TableRow>
                )) }
              </TableBody>
            </Table>
          </TableContainer>

          <SectionTitle
            title="콘텐츠 데이터의 부피"
            description="src/data/landingPageContent.json이 실제로 담고 있는 레코드 수"
          />
          <TableContainer sx={ { mb: 6 } }>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={ { fontWeight: 600 } }>묶음</TableCell>
                  <TableCell sx={ { fontWeight: 600, width: 90 } }>건수</TableCell>
                  <TableCell sx={ { fontWeight: 600 } }>쓰이는 곳</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell sx={ { fontSize: 13 } }>구간 카피 (sections)</TableCell>
                  <TableCell sx={ { fontFamily: 'monospace', fontSize: 13 } }>{ sections.length }</TableCell>
                  <TableCell sx={ { fontSize: 13 } }>일곱 구간 컴포넌트가 직접 읽는다</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={ { fontSize: 13 } }>핵심 약속 (pillars)</TableCell>
                  <TableCell sx={ { fontFamily: 'monospace', fontSize: 13 } }>{ pillars.length }</TableCell>
                  <TableCell sx={ { fontSize: 13 } }>ValuePillarsSection</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={ { fontSize: 13 } }>자세 장면 (slides)</TableCell>
                  <TableCell sx={ { fontFamily: 'monospace', fontSize: 13 } }>{ slides.length }</TableCell>
                  <TableCell sx={ { fontSize: 13 } }>SilhouetteSection, 영상 네 편과 짝</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={ { fontSize: 13 } }>수납 포인트 (storagePoints)</TableCell>
                  <TableCell sx={ { fontFamily: 'monospace', fontSize: 13 } }>{ storagePoints.length }</TableCell>
                  <TableCell sx={ { fontSize: 13 } }>데이터에만 있다. 화면에 렌더되지 않는다</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={ { fontSize: 13 } }>발레 오브제 (floatingObjects)</TableCell>
                  <TableCell sx={ { fontFamily: 'monospace', fontSize: 13 } }>{ objects.length }</TableCell>
                  <TableCell sx={ { fontSize: 13 } }>데이터에만 있다. 화면에 렌더되지 않는다</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <SectionTitle
            title="생성한 무드 이미지"
            description={ `이미지 ${ moodItems.length }장과 영상 ${ videoCount }편. 브랜드 방향을 정한 뒤 이 컷들을 만들고, 여기서 색과 톤을 다시 뽑았다` }
          />
          { MOOD_FOLDERS.map((folder) => {
            const items = moodItems.filter((item) => item.folder === folder);
            if (items.length === 0) {
              return null;
            }
            return (
              <Box key={ folder } sx={ { mb: 4 } }>
                <Typography variant="subtitle1" sx={ { fontWeight: 600 } }>
                  { folder }
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={ { mb: 2 } }>
                  { MOOD_NOTES[folder] }
                </Typography>
                <Grid container spacing={ 2 }>
                  { items.map((item) => (
                    <Grid key={ item.path } size={ { xs: 6, sm: 4, md: 3 } }>
                      <MoodCell item={ item } />
                    </Grid>
                  )) }
                </Grid>
              </Box>
            );
          }) }

          <SectionTitle
            title="토큰 유래"
            description="원문 디자인 문서가 정한 값과 코드에 남은 값. 어긋나는 것은 코드를 기준으로 삼았다"
          />
          <TableContainer sx={ { mb: 6 } }>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={ { fontWeight: 600, width: '18%' } }>이름</TableCell>
                  <TableCell sx={ { fontWeight: 600, width: '22%' } }>원문 값</TableCell>
                  <TableCell sx={ { fontWeight: 600, width: '26%' } }>코드 값</TableCell>
                  <TableCell sx={ { fontWeight: 600 } }>코드 토큰</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                { TOKEN_ORIGINS.map((row) => (
                  <TableRow key={ row.name }>
                    <TableCell sx={ { fontSize: 13, fontWeight: 600 } }>{ row.name }</TableCell>
                    <TableCell sx={ { fontFamily: 'monospace', fontSize: 12, color: 'text.secondary' } }>{ row.original }</TableCell>
                    <TableCell sx={ { fontFamily: 'monospace', fontSize: 12 } }>{ row.code }</TableCell>
                    <TableCell sx={ { fontFamily: 'monospace', fontSize: 11, color: 'text.secondary' } }>{ row.token }</TableCell>
                  </TableRow>
                )) }
              </TableBody>
            </Table>
          </TableContainer>

          <Typography variant="body2" color="text.secondary" sx={ { mb: 6 } }>
            알려진 충돌: <code>secondary.main</code>과 <code>background.default</code>가 같은 값이라 액센트가 지면과 구분되지 않는다.
            이 문서의 표와 격자는 그 조합을 쓰지 않고 <code>divider</code>와 <code>text.primary</code>로만 구분한다.
          </Typography>

          <SectionTitle
            title="조립 순서"
            description="브랜드 방향에서 시작해 랜딩까지 가는 다섯 단계. 각 단계의 결과를 스토리에서 볼 수 있다"
          />
          <Stack spacing={ 2 } sx={ { mb: 4 } }>
            { ASSEMBLY_STEPS.map((step) => (
              <Box
                key={ step.step }
                sx={ { p: 2, border: '1px solid', borderColor: 'divider', backgroundColor: 'background.paper' } }
              >
                <Typography variant="subtitle1" sx={ { fontWeight: 600 } }>
                  { step.step }. { step.title }
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={ { mb: 0.5 } }>
                  { step.what }
                </Typography>
                <Typography
                  variant="caption"
                  sx={ { fontFamily: 'monospace', fontSize: 11, color: 'text.disabled', display: 'block', mb: 0.5 } }
                >
                  { step.where }
                </Typography>
                <Typography variant="caption" sx={ { fontSize: 12 } }>
                  <StoryLinks stories={ step.stories } />
                </Typography>
              </Box>
            )) }
          </Stack>
        </PageContainer>
      </>
    );
  },
};
