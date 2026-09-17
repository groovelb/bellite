import Box from '@mui/material/Box';
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
import projectStructure from '../../data/projectStructure.js';
import { ASSEMBLY_STEPS } from './assemblySteps.js';

export default {
  title: 'Custom Component/0. Hierarchy',
  parameters: {
    layout: 'padded',
  },
};

// 스타터킷과 파일이 동일한 컴포넌트 (재활용)
const REUSE_NAMES = new Set([
  'CarouselContainer', 'FileDropzone', 'SearchBar', 'TagInput',
  'BentoGrid', 'FullPageContainer', 'PhiSplit', 'SplitScreen', 'bentoPresets',
  'AspectMedia', 'CarouselIndicator', 'ImageCarousel', 'NavMenu',
  'PageContainer', 'TreeNode', 'Indicator',
  'FitText', 'HighlightedTypography', 'InlineTypography',
  'StretchedHeadline', 'StyledParagraph', 'Title',
]);

// 같은 경로에 있으나 내용이 다른 컴포넌트 (수정)
const MODIFIED_NAMES = new Set([
  'CardContainer', 'CustomCard', 'SectionContainer', 'LineGrid',
  'ImageTransition', 'GNB', 'DocumentTitle', 'SectionTitle', 'QuotedContainer',
]);

// 파일 단위 diff 집계 (inv-components-Bellite.txt)
const DIFF_COUNTS = [
  { key: 'reuse', label: '재활용 (스타터킷과 동일)', count: 22, title: 'Component/…, Common/…' },
  { key: 'modified', label: '수정 (같은 경로, 내용 다름)', count: 9, title: 'Custom Component/…' },
  { key: 'new', label: '신규 (이 저장소에만)', count: 50, title: 'Custom Component/…, Section/…, Page/…' },
];

const BADGE = {
  reuse: { text: '스타터킷', color: 'text.disabled' },
  modified: { text: '수정', color: 'warning.dark' },
  new: { text: '신규', color: 'success.dark' },
};

// 스토리 파일 원본을 읽어 파일 이름과 Meta title을 잇는다.
// 컴포넌트와 스토리가 다른 폴더에 있어도 연결된다.
const storyModules = import.meta.glob('../../**/*.stories.jsx', {
  eager: true,
  query: '?raw',
  import: 'default',
});

/** Storybook이 title을 id로 바꾸는 규칙과 같은 정규화 */
const sanitize = (text) =>
  text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

/** 스토리 파일 원본에서 Meta title 한 줄을 뽑는다 */
const readTitle = (source) => {
  const match = source.match(/^\s{2}title:\s*'([^']+)'/m);
  return match ? match[1] : null;
};

const titleByName = {};
const allTitles = [];
for (const [path, source] of Object.entries(storyModules)) {
  const title = readTitle(source);
  if (!title) {
    continue;
  }
  allTitles.push(title);
  const base = path.split('/').pop().replace('.stories.jsx', '');
  if (!titleByName[base]) {
    titleByName[base] = title;
  }
}

/** title 첫 마디로 묶은 개수 */
const titleGroups = allTitles.reduce((acc, title) => {
  const head = title.includes('/') ? title.split('/')[0] : '(분류 없음)';
  acc[head] = (acc[head] || 0) + 1;
  return acc;
}, {});

/** 노드 하나의 분류를 정한다 */
const classify = (node) => {
  if (REUSE_NAMES.has(node.name)) {
    return 'reuse';
  }
  if (MODIFIED_NAMES.has(node.name)) {
    return 'modified';
  }
  return 'new';
};

/** 노드에 이어 붙일 스토리 id. 구조 데이터가 비면 title에서 만든다 */
const resolveStoryId = (node) => {
  if (node.storyId) {
    return node.storyId;
  }
  const title = titleByName[node.name];
  return title ? sanitize(title) : null;
};

/**
 * 스토리 링크. Storybook 프레임 밖으로 이동시키려고 target을 _top으로 둔다
 *
 * Props:
 * @param {array} stories - label과 id를 담은 배열 [Required]
 *
 * Example usage:
 * <StoryLinks stories={ step.stories } />
 */
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

/**
 * 계층 한 줄과 그 아래 가지
 *
 * Props:
 * @param {object} node - projectStructure의 노드 [Required]
 * @param {number} depth - 들여쓰기 깊이 [Optional, 기본값: 0]
 *
 * Example usage:
 * <HierarchyNode node={ projectStructure.root } />
 */
function HierarchyNode({ node, depth = 0 }) {
  const kind = classify(node);
  const badge = BADGE[kind];
  const storyId = resolveStoryId(node);
  const title = node.storyTitle || titleByName[node.name] || null;
  const children = node.ref ? [] : (node.children || []);

  return (
    <Box sx={ { ml: depth > 0 ? 2 : 0 } }>
      <Box
        sx={ {
          display: 'flex',
          alignItems: 'baseline',
          flexWrap: 'wrap',
          gap: 1,
          py: 0.5,
          px: 1,
          borderLeft: depth > 0 ? '1px solid' : 'none',
          borderColor: 'divider',
        } }
      >
        <Typography
          component="span"
          sx={ {
            fontFamily: 'monospace',
            fontSize: 13,
            fontWeight: children.length > 0 ? 600 : 400,
            color: 'text.primary',
          } }
        >
          { node.name }
        </Typography>
        <Typography component="span" sx={ { fontSize: 11, color: badge.color } }>
          { badge.text }
        </Typography>
        { node.category && (
          <Typography
            component="span"
            sx={ { fontFamily: 'monospace', fontSize: 11, color: 'text.disabled' } }
          >
            { node.category }
          </Typography>
        ) }
        { node.ref && (
          <Typography component="span" sx={ { fontSize: 11, color: 'text.disabled' } }>
            앞에서 이미 펼침
          </Typography>
        ) }
        { storyId && (
          <Box
            component="a"
            href={ `?path=/story/${storyId}` }
            target="_top"
            sx={ { fontSize: 11, color: 'primary.main' } }
          >
            { title || '스토리' }
          </Box>
        ) }
      </Box>

      { children.map((child, index) => (
        <HierarchyNode key={ `${child.name}-${index}` } node={ child } depth={ depth + 1 } />
      )) }
    </Box>
  );
}

/** 코드 분류와 스토리 분류를 한 화면에서 잇는 계층도 */
export const Default = {
  render: () => (
    <>
      <DocumentTitle
        title="Hierarchy"
        status="Available"
        note="페이지에서 섹션, 섹션에서 컴포넌트로 내려가는 조립 계층"
        brandName="Design System"
        systemName="Bellite"
        version="1.0"
      />
      <PageContainer>
        <Typography variant="h4" sx={ { fontWeight: 700, mb: 1 } }>
          Hierarchy
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={ { mb: 1 } }>
          <code>src/data/projectStructure.js</code> · 재생성: <code>pnpm generate-structure</code>
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={ { mb: 4 } }>
          분류는 스타터킷과의 파일 단위 diff 결과다. 스타터킷과 내용이 같으면 스타터킷, 같은 경로에서 내용이 다르면 수정,
          이 저장소에만 있으면 신규다. 이름 옆 링크를 누르면 그 스토리로 이동한다.
        </Typography>

        <SectionTitle title="코드 분류" description="파일 단위 diff 집계와 그에 대응하는 스토리 title" />
        <TableContainer sx={ { mb: 4 } }>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={ { fontWeight: 600, width: '30%' } }>분류</TableCell>
                <TableCell sx={ { fontWeight: 600, width: 80 } }>파일 수</TableCell>
                <TableCell sx={ { fontWeight: 600 } }>스토리 title</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { DIFF_COUNTS.map((row) => (
                <TableRow key={ row.key }>
                  <TableCell sx={ { fontSize: 13 } }>{ row.label }</TableCell>
                  <TableCell sx={ { fontFamily: 'monospace', fontSize: 13 } }>{ row.count }</TableCell>
                  <TableCell sx={ { fontFamily: 'monospace', fontSize: 12 } }>{ row.title }</TableCell>
                </TableRow>
              )) }
            </TableBody>
          </Table>
        </TableContainer>

        <SectionTitle
          title="스토리 title 분류"
          description={ `스토리 파일 ${allTitles.length}개를 title 첫 마디로 묶은 수` }
        />
        <TableContainer sx={ { mb: 4 } }>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={ { fontWeight: 600, width: '40%' } }>title 첫 마디</TableCell>
                <TableCell sx={ { fontWeight: 600 } }>스토리 수</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { Object.entries(titleGroups)
                .sort((a, b) => b[1] - a[1])
                .map(([head, count]) => (
                  <TableRow key={ head }>
                    <TableCell sx={ { fontFamily: 'monospace', fontSize: 13 } }>{ head }</TableCell>
                    <TableCell sx={ { fontFamily: 'monospace', fontSize: 13 } }>{ count }</TableCell>
                  </TableRow>
                )) }
            </TableBody>
          </Table>
        </TableContainer>

        <SectionTitle
          title="조립 순서"
          description="08 Domain Knowledge & Research와 같은 목록이다. 한 파일(assemblySteps.js)을 함께 읽는다"
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
              <Typography variant="caption" sx={ { fontSize: 12 } }>
                <StoryLinks stories={ step.stories } />
              </Typography>
            </Box>
          )) }
        </Stack>

        <SectionTitle
          title="조립 계층"
          description="App에서 시작해 페이지, 섹션, 컴포넌트 순으로 내려간다"
        />
        <Box sx={ { p: 2, border: '1px solid', borderColor: 'divider' } }>
          <HierarchyNode node={ projectStructure.root } />
        </Box>
      </PageContainer>
    </>
  ),
};
