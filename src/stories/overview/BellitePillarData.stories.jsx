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

export default {
  title: 'Overview/Bellite/05 Pillar Data',
  parameters: {
    layout: 'padded',
  },
};

/** 섹션 id로 섹션 데이터를 찾는다 */
const findSection = (id) => landingContent.sections.find((s) => s.id === id);

/**
 * 객체 배열 표
 *
 * Props:
 * @param {array} rows - 표에 그릴 객체 배열 [Required]
 * @param {array} columns - 표시할 컬럼 키 목록 [Required]
 *
 * Example usage:
 * <ArrayTable rows={ pillars } columns={ ['id', 'titleKo'] } />
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
                <TableCell key={ c } sx={ { fontSize: 13, verticalAlign: 'top' } }>
                  { typeof r[c] === 'string' ? r[c] : JSON.stringify(r[c]) }
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
 * 약속과 증명 데이터 테이블
 *
 * 02 3.2절 이름 사전의 ValuePillar / PostureScene / StoragePoint / BalletObject
 * 네 대상이 여기에 모여 있다. 섹션 카피(BrandNarrative)는 06 Content Data가 맡는다.
 */
export const Default = {
  render: () => {
    const pillars = findSection('valuePillars').pillars;
    const slides = findSection('silhouette').slides;
    const storagePoints = findSection('archive').storagePoints;
    const floatingObjects = findSection('insideMood').floatingObjects;

    return (
      <>
        <DocumentTitle
          title="Pillar Data"
          status="Available"
          note="세 가지 약속과 그것을 증명하는 장면·수납·오브제 레코드"
          brandName="Design System"
          systemName="Bellite"
          version="1.0"
        />
        <PageContainer>
          <Typography variant="h4" sx={ { fontWeight: 700, mb: 1 } }>
            Pillar Data
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={ { mb: 1 } }>
            <code>src/data/landingPageContent.json</code>
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={ { mb: 4 } }>
            라벨은 02-ux-flow 3.2절 이름 사전을 그대로 쓴다. 카피와 섹션 메타는 06 Content Data에 있다.
          </Typography>

          <SectionTitle
            title="ValuePillar · 핵심 약속"
            description={ `sections[valuePillars].pillars · ${pillars.length}건 · 각 약속이 증명 구간 하나를 가리킨다` }
          />
          <ArrayTable
            rows={ pillars }
            columns={ ['id', 'titleEn', 'titleKo', 'description', 'icon', 'linkedSection'] }
          />

          <SectionTitle
            title="PostureScene · 자세 장면"
            description={ `sections[silhouette].slides · ${slides.length}건 · 일상 동작과 발레 동작이 겹치는 장면` }
          />
          <ArrayTable
            rows={ slides }
            columns={ ['id', 'titleEn', 'titleKo', 'value', 'image', 'video'] }
          />

          <SectionTitle
            title="PostureScene · 장면 설명"
            description="설명 문구가 길어 별도 표로 분리했다"
          />
          <ArrayTable rows={ slides } columns={ ['id', 'description'] } />

          <SectionTitle
            title="StoragePoint · 수납 포인트"
            description={ `sections[archive].storagePoints · ${storagePoints.length}건 · 데이터에만 존재하고 화면에 렌더되지 않는다` }
          />
          <ArrayTable rows={ storagePoints } columns={ ['id', 'title', 'description'] } />

          <SectionTitle
            title="BalletObject · 발레 오브제"
            description={ `sections[insideMood].floatingObjects · ${floatingObjects.length}건 · 데이터에만 존재하고 화면에 렌더되지 않는다` }
          />
          <ArrayTable
            rows={ floatingObjects }
            columns={ ['word', 'x', 'y', 'size', 'delay'] }
          />
        </PageContainer>
      </>
    );
  },
};
