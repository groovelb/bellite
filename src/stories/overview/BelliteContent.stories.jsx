import Box from '@mui/material/Box';
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
import landingContent from '../../data/landingPageContent.json';

// 구간을 대표하는 에셋을 행 옆에 그리기 위한 URL 표
const ASSET_URLS = import.meta.glob('../../assets/**/*.{png,jpg,jpeg}', {
  eager: true,
  query: '?url',
  import: 'default',
});

// 섹션 id와 에셋 폴더의 짝. mediaAssets.js의 묶음 이름을 따른다
const SECTION_COVER = {
  hero: '../../assets/hero/hero_bg_2.jpeg',
  silhouette: '../../assets/silhouette/s1.jpeg',
  insideMood: '../../assets/silhouette/cloth_bg_pink.png',
  signature: '../../assets/signature/aerial-shot.jpeg',
};

export default {
  title: 'Overview/Bellite/06 Content Data',
  parameters: {
    layout: 'padded',
  },
};

/**
 * 구간 대표 이미지 한 칸. 짝이 없는 구간은 빈 칸으로 둔다
 *
 * Props:
 * @param {string} sectionId - 섹션 id [Required]
 *
 * Example usage:
 * <SectionCover sectionId="hero" />
 */
function SectionCover({ sectionId }) {
  const src = ASSET_URLS[SECTION_COVER[sectionId]] || null;
  return (
    <Box sx={ { width: 72, aspectRatio: '4 / 3', backgroundColor: 'grey.100', overflow: 'hidden' } }>
      { src && (
        <Box
          component="img"
          src={ src }
          alt={ sectionId }
          loading="lazy"
          sx={ { width: '100%', height: '100%', objectFit: 'cover', display: 'block' } }
        />
      ) }
    </Box>
  );
}

/** 섹션 카피에서 뽑아 쓰는 키 순서 */
const COPY_KEYS = ['sectionLabel', 'h1', 'h2', 'message', 'subText', 'description'];

/**
 * 단순 key-value 표
 *
 * Props:
 * @param {object} data - 키와 값이 문자열인 객체 [Required]
 * @param {string} keyLabel - 키 컬럼 제목 [Optional, 기본값: 'key']
 * @param {string} valueLabel - 값 컬럼 제목 [Optional, 기본값: 'value']
 *
 * Example usage:
 * <KeyValueTable data={ meta } />
 */
function KeyValueTable({ data, keyLabel = 'key', valueLabel = 'value' }) {
  return (
    <TableContainer sx={ { mb: 4 } }>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell sx={ { fontWeight: 600, width: '25%' } }>{ keyLabel }</TableCell>
            <TableCell sx={ { fontWeight: 600 } }>{ valueLabel }</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { Object.entries(data).map(([k, v]) => (
            <TableRow key={ k }>
              <TableCell sx={ { fontFamily: 'monospace', fontSize: 13 } }>{ k }</TableCell>
              <TableCell sx={ { fontSize: 13, whiteSpace: 'pre-line' } }>{ String(v) }</TableCell>
            </TableRow>
          )) }
        </TableBody>
      </Table>
    </TableContainer>
  );
}

/**
 * 객체 배열 표
 *
 * Props:
 * @param {array} rows - 표에 그릴 객체 배열 [Required]
 * @param {array} columns - 표시할 컬럼 키 목록 [Required]
 *
 * Example usage:
 * <ArrayTable rows={ sections } columns={ ['id', 'name'] } />
 */
function ArrayTable({ rows, columns }) {
  return (
    <TableContainer sx={ { mb: 4 } }>
      <Table size="small">
        <TableHead>
          <TableRow>
            { columns.map((c) => (
              <TableCell key={ c } sx={ { fontWeight: 600 } }>{ c }</TableCell>
            )) }
          </TableRow>
        </TableHead>
        <TableBody>
          { rows.map((r, i) => (
            <TableRow key={ i } sx={ { '&:hover': { backgroundColor: 'action.hover' } } }>
              { columns.map((c) => (
                <TableCell key={ c } sx={ { fontSize: 13, verticalAlign: 'top', whiteSpace: 'pre-line' } }>
                  { r[c] === undefined ? '' : String(r[c]) }
                </TableCell>
              )) }
            </TableRow>
          )) }
        </TableBody>
      </Table>
    </TableContainer>
  );
}

/**
 * 브랜드 서사 데이터 테이블
 *
 * 02 3.2절 이름 사전의 BrandNarrative(브랜드 서사)가 여기에 모여 있다.
 * 반복 레코드(약속·장면·수납·오브제)는 05 Pillar Data가 맡는다.
 */
export const Default = {
  render: () => {
    const { meta, sections } = landingContent;

    const sectionRows = sections.map((s) => ({
      order: s.order,
      id: s.id,
      name: s.name,
      nameKo: s.nameKo || '',
      valueConnection: s.valueConnection || '',
    }));

    const copyRows = sections.map((s) => {
      const row = { id: s.id };
      for (const key of COPY_KEYS) {
        if (s.content && s.content[key] !== undefined) {
          row[key] = s.content[key];
        }
      }
      return row;
    });

    return (
      <>
        <DocumentTitle
          title="Content Data"
          status="Available"
          note="브랜드 메타와 구간별 카피"
          brandName="Design System"
          systemName="Bellite"
          version="1.0"
        />
        <PageContainer>
          <Typography variant="h4" sx={ { fontWeight: 700, mb: 1 } }>
            Content Data
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={ { mb: 1 } }>
            <code>src/data/landingPageContent.json</code>
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={ { mb: 4 } }>
            라벨은 02-ux-flow 3.2절 이름 사전을 그대로 쓴다. 반복 레코드는 05 Pillar Data에 있다.
          </Typography>

          <SectionTitle title="meta" description="브랜드 이름과 핵심 컨셉" />
          <KeyValueTable data={ meta } />

          <SectionTitle
            title="sections"
            description={ `구간 정의 ${sections.length}건 · order 순서와 증명 대상 연결` }
          />
          <TableContainer sx={ { mb: 4 } }>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={ { fontWeight: 600, width: 88 } }>미리보기</TableCell>
                  <TableCell sx={ { fontWeight: 600, width: 60 } }>order</TableCell>
                  <TableCell sx={ { fontWeight: 600 } }>id</TableCell>
                  <TableCell sx={ { fontWeight: 600 } }>name</TableCell>
                  <TableCell sx={ { fontWeight: 600 } }>valueConnection</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                { sectionRows.map((row) => (
                  <TableRow key={ row.id }>
                    <TableCell><SectionCover sectionId={ row.id } /></TableCell>
                    <TableCell sx={ { fontFamily: 'monospace', fontSize: 12 } }>{ row.order }</TableCell>
                    <TableCell sx={ { fontFamily: 'monospace', fontSize: 12 } }>{ row.id }</TableCell>
                    <TableCell sx={ { fontSize: 13 } }>{ row.name }{ row.nameKo ? ` (${row.nameKo})` : '' }</TableCell>
                    <TableCell sx={ { fontFamily: 'monospace', fontSize: 12 } }>{ row.valueConnection }</TableCell>
                  </TableRow>
                )) }
              </TableBody>
            </Table>
          </TableContainer>

          <SectionTitle
            title="BrandNarrative · 브랜드 서사"
            description="구간별 제목·부제·설명. 빈 칸은 그 구간에 없는 키다"
          />
          <ArrayTable
            rows={ copyRows }
            columns={ ['id', 'sectionLabel', 'h1', 'h2'] }
          />
          <ArrayTable
            rows={ copyRows }
            columns={ ['id', 'message', 'subText', 'description'] }
          />
        </PageContainer>
      </>
    );
  },
};
