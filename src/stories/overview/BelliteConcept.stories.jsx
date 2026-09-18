import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import {
  DocumentTitle,
  PageContainer,
  SectionTitle,
} from '../../components/storybookDocumentation';

export default {
  title: 'Overview/Bellite/09 Concept & Flow',
  parameters: {
    layout: 'padded',
  },
};

/** 웨비나 슬라이드(cases.js, content.js)에서 옮긴 컨셉. 값은 슬라이드 SSOT를 그대로 쓴다. */
const CONCEPT = {
  experiment: 'Prompt is new design token',
  subtitle: '기획 의도에 맞는 디자인 토큰과 브랜드 무드를 함께 관리',
  approach: '재료 먼저',
  frame: { name: '재료 먼저', oneLiner: '기획에 어울리는 재료에 집중하면 필요한 최소 UI가 떠오릅니다' },
  reserve: '예비 예제 (cases.js reserve: true, 썸네일 그리드 8번째 칸)',
};

/** 흐름 표. doc 은 문서 헤딩, artifact 는 파일 경로, story 는 스토리 id. */
const FLOW_ROWS = [
  {
    stage: '기획',
    decided: '01 1절 한 줄 요약, 4.2절 다루는 대상, 5절 핵심 과업',
    artifact: 'docs/bellite/01-project-summary.md',
    story: 'overview-bellite-01-project-summary--docs',
  },
  {
    stage: 'UX',
    decided: '02 1절 시나리오, 3절 데이터 모델, 5절 컴포넌트 리스트',
    artifact: 'docs/bellite/02-ux-flow.md',
    story: 'overview-bellite-02-ux-flow--docs',
  },
  {
    stage: '비주얼 디렉션',
    decided: '03 1절 무드, 3절 토큰 방향, 4절 이미지·에셋 방향 표',
    artifact: 'docs/bellite/03-visual-direction.md · src/styles/themes/theme.js',
    story: 'overview-bellite-03-visual-direction--docs',
  },
  {
    stage: '재료 준비',
    decided: '프롬프트 템플릿·생성 스크립트·리서치 문서는 저장소에 없음. 03 4절 표가 유일한 재료 방향 문서',
    artifact: 'src/assets/{hero, silhouette, inside-mood, signature, dialy-mood} (결과 에셋만 존재)',
    story: 'overview-bellite-07-assets--default',
  },
  {
    stage: '화면',
    decided: '02 5절 컴포넌트 리스트(신규 50 · 수정 9 · 재활용 21)가 섹션 컴포넌트로 조립',
    artifact: 'src/sections/landing/*.jsx · src/pages/LandingPage.jsx',
    story: 'custom-component-0-hierarchy--default',
  },
];

/** 증거 표. status 는 '있음' | '파생' | '없음'. */
const EVIDENCE_ROWS = [
  {
    id: 'E1',
    item: '에셋 유형별 FORMAT / LOOK 키워드 / SUBJECT 표',
    source: 'docs/bellite/03-visual-direction.md 4절 (에셋 유형 6종)',
    status: '있음',
    note: '',
  },
  {
    id: 'E2',
    item: '프롬프트 템플릿 (슬롯 구조, 예시, 네거티브)',
    source: '해당 없음',
    status: '없음',
    note: '`docs/bellite/image-generation/` 폴더 자체가 없다. 03 4절은 표와 서술뿐, 슬롯화된 템플릿이 아니다',
  },
  {
    id: 'E3',
    item: '공통 스타일 규칙 (배경, 조명, 색온도, 카메라, 패딩 수치)',
    source: '해당 없음',
    status: '없음',
    note: '`common-style.md` 류 파일 없음',
  },
  {
    id: 'E4',
    item: '제품·대상별 스펙이 프롬프트 슬롯으로',
    source: '해당 없음',
    status: '없음',
    note: '`product-specs.md` 없음. `src/guide/prompt-guide.md`는 컴포넌트를 만들 때 쓴 프롬프트 모음이지 이미지 프롬프트가 아니다',
  },
  {
    id: 'E5',
    item: '생성 스크립트·파이프라인 (모델명, 순서, dry-run, 레퍼런스 체인)',
    source: '해당 없음',
    status: '없음',
    note: '`scripts/`에는 `generate-asset-inventory.js`(에셋 목록 재생성)와 `generate-project-structure.js`만 있다. 둘 다 이미지 생성이 아니라 이미 있는 파일을 읽어 데이터를 만드는 스크립트다',
  },
  {
    id: 'E6',
    item: '생성 결과 에셋과 파일명 규칙',
    source: 'src/assets/{hero, silhouette, inside-mood, signature, dialy-mood} · src/data/assetInventory.js',
    status: '있음',
    note: '규칙적인 id 쌍(`{id}`/`{id}-1`) 명명은 없고 `hero_bg_2.jpeg`, `s1.mp4`처럼 의미 기반 파일명이다',
  },
  {
    id: 'E7',
    item: '토큰 ↔ 프롬프트 연결: theme 값이 프롬프트 색·광 규칙과 같은 값',
    source: '해당 없음',
    status: '없음',
    note: '프롬프트 문서가 없어 대조할 상대가 없다. 08 Domain Knowledge & Research의 "토큰 유래" 표는 원문 기획 문서 값과 코드 값을 대조한 것이지 이미지 프롬프트와의 대조가 아니다',
  },
  {
    id: 'E8',
    item: '무드보드·브랜드 컷 프롬프트 (제품 컷과 구분)',
    source: '해당 없음',
    status: '없음',
    note: '프롬프트 자체는 없다. 결과물인 무드 이미지는 07 Assets와 08 Research 페이지의 폴더별 그리드로 파생해 보여줄 수 있다',
  },
];

const STATUS_COLOR = { 있음: 'success', 파생: 'info', 없음: 'default' };

/** 03 4절 표를 그대로 파생한 것. 문장은 원문을 바꾸지 않는다. */
const ASSET_DIRECTION_ROWS = [
  { type: '히어로 배경 영상', usedIn: 'Landing · Hero', look: 'cinematic street footage' },
  { type: '자세 장면 영상', usedIn: 'Landing · Silhouette', look: 'documentary handheld' },
  { type: '자세 장면 스틸', usedIn: 'Landing · Silhouette', look: 'editorial film photo' },
  { type: '내부 오브제 영상', usedIn: 'Landing · Inside Mood', look: 'top-down still life' },
  { type: '시그니처 디테일 컷', usedIn: 'Landing · Signature', look: 'macro texture photo' },
  { type: '일상 무드 컷', usedIn: 'Landing · Daily Mood', look: 'snapshot diary photo' },
];

/**
 * 스토리 링크
 *
 * Props:
 * @param {string} id - 스토리 id (index.json 의 id) [Required]
 * @param {node} children - 링크 텍스트 [Required]
 */
function StoryLink({ id, children }) {
  return (
    <a href={ `?path=/story/${ id }` } target="_top" style={ { color: 'inherit' } }>
      { children }
    </a>
  );
}

export const Default = {
  render: () => (
    <>
      <DocumentTitle
        title="Concept & Flow"
        status="Available"
        note="웨비나 실험 C-3 'Prompt is new design token'과 이 저장소가 실제로 가진 증거"
        brandName="Design System"
        systemName="Bellite"
        version="1.0"
      />
      <PageContainer>
        <Typography variant="h4" sx={ { fontWeight: 700, mb: 1 } }>
          09 컨셉과 재료 흐름
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={ { mb: 4 } }>
          Prompt is new design token · 재료 먼저
        </Typography>

        <SectionTitle title="웨비나 컨셉" description="cases.js, content.js에서 옮긴 값" />
        <Box sx={ { p: 2, mb: 6, border: '1px solid', borderColor: 'divider', backgroundColor: 'background.paper' } }>
          <Typography variant="subtitle1" sx={ { fontWeight: 600 } }>
            { CONCEPT.experiment }
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={ { mb: 1 } }>
            { CONCEPT.subtitle }
          </Typography>
          <Typography variant="body2" sx={ { mb: 0.5 } }>
            갈래: { CONCEPT.approach } · 프레임: { CONCEPT.frame.name } ({ CONCEPT.frame.oneLiner })
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={ { display: 'block', mb: 2 } }>
            { CONCEPT.reserve }
          </Typography>
          <Typography variant="body2">
            이 예제가 이 컨셉의 증거인 이유: 03 4절이 에셋 유형 6종마다 FORMAT · LOOK · SUBJECT ·
            하지 않는 것을 표로 고정해 두었고, 이 표대로 만들어진 결과 에셋이 실제로
            src/assets/{'{'}hero, silhouette, inside-mood, signature, dialy-mood{'}'}에 있다. 다만 그 표에서
            프롬프트 템플릿이나 생성 스크립트로 이어지는 중간 단계는 저장소에 없다. 재료의
            "방향"은 있지만 "파이프라인"은 없다.
          </Typography>
        </Box>

        <SectionTitle title="흐름: 기획에서 화면까지" description="다섯 단계 표" />
        <TableContainer sx={ { mb: 6 } }>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={ { fontWeight: 600, width: '12%' } }>단계</TableCell>
                <TableCell sx={ { fontWeight: 600, width: '38%' } }>여기서 정한 것</TableCell>
                <TableCell sx={ { fontWeight: 600, width: '30%' } }>남긴 것</TableCell>
                <TableCell sx={ { fontWeight: 600 } }>보는 곳</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { FLOW_ROWS.map((row) => (
                <TableRow key={ row.stage }>
                  <TableCell sx={ { fontSize: 13, fontWeight: 600, verticalAlign: 'top' } }>{ row.stage }</TableCell>
                  <TableCell sx={ { fontSize: 13, verticalAlign: 'top' } }>{ row.decided }</TableCell>
                  <TableCell sx={ { fontFamily: 'monospace', fontSize: 11, verticalAlign: 'top' } }>{ row.artifact }</TableCell>
                  <TableCell sx={ { fontSize: 12, verticalAlign: 'top' } }>
                    <StoryLink id={ row.story }>바로가기</StoryLink>
                  </TableCell>
                </TableRow>
              )) }
            </TableBody>
          </Table>
        </TableContainer>

        <SectionTitle title="컨셉 증거" description="C-3 체크리스트 E1~E8" />
        <TableContainer sx={ { mb: 6 } }>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={ { fontWeight: 600, width: '8%' } }>항목</TableCell>
                <TableCell sx={ { fontWeight: 600, width: '32%' } }>저장소 근거</TableCell>
                <TableCell sx={ { fontWeight: 600, width: '12%' } }>상태</TableCell>
                <TableCell sx={ { fontWeight: 600 } }>비고</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { EVIDENCE_ROWS.map((row) => (
                <TableRow key={ row.id }>
                  <TableCell sx={ { fontSize: 13, fontWeight: 600, verticalAlign: 'top' } }>{ row.id }</TableCell>
                  <TableCell sx={ { fontFamily: 'monospace', fontSize: 11, verticalAlign: 'top' } }>{ row.source }</TableCell>
                  <TableCell sx={ { verticalAlign: 'top' } }>
                    <Chip size="small" label={ row.status } color={ STATUS_COLOR[row.status] } />
                  </TableCell>
                  <TableCell sx={ { fontSize: 12, verticalAlign: 'top' } }>{ row.note }</TableCell>
                </TableRow>
              )) }
            </TableBody>
          </Table>
        </TableContainer>

        <SectionTitle
          title="컨셉별 상세: 에셋 유형별 키워드 표 (03 4절 파생)"
          description="문장은 원문 그대로, 표만 재구성했다. 전체 FORMAT·SUBJECT·하지 않는 것은 03 Visual Direction 참조"
        />
        <TableContainer sx={ { mb: 2 } }>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={ { fontWeight: 600, width: '28%' } }>에셋 유형</TableCell>
                <TableCell sx={ { fontWeight: 600, width: '32%' } }>쓰이는 곳</TableCell>
                <TableCell sx={ { fontWeight: 600 } }>LOOK 키워드</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { ASSET_DIRECTION_ROWS.map((row) => (
                <TableRow key={ row.type }>
                  <TableCell sx={ { fontSize: 13, fontWeight: 600 } }>{ row.type }</TableCell>
                  <TableCell sx={ { fontSize: 13 } }>{ row.usedIn }</TableCell>
                  <TableCell sx={ { fontSize: 13, fontFamily: 'monospace' } }>{ row.look }</TableCell>
                </TableRow>
              )) }
            </TableBody>
          </Table>
        </TableContainer>
        <Typography variant="body2" color="text.secondary" sx={ { mb: 6 } }>
          유형별 FORMAT / SUBJECT / 하지 않는 것 전문은 <StoryLink id="overview-bellite-03-visual-direction--docs">03 Visual Direction</StoryLink>에서
          본다. 이 표에 슬롯(값의 출처)과 파이프라인(입력 / 출력 / 도구) 열이 없는 것은 원문에 그
          단계가 없기 때문이다.
        </Typography>

        <SectionTitle title="없는 것" description="저장소에 확인되지 않아 증거 표에 없음으로 남긴 항목" />
        <Stack spacing={ 1 } sx={ { mb: 6 } }>
          <Typography variant="body2">
            프롬프트 템플릿(E2): `docs/bellite/image-generation/` 폴더가 없다. 03 4절 표를 대신 키워드
            표로 보여준다.
          </Typography>
          <Typography variant="body2">
            공통 스타일 규칙(E3)과 제품·대상별 스펙 슬롯(E4): 해당 문서가 없다.
          </Typography>
          <Typography variant="body2">
            생성 스크립트·파이프라인(E5): `scripts/`의 두 스크립트는 이미지 생성이 아니라 기존 파일을
            읽어 인벤토리·구조 데이터를 만드는 스크립트다. `src/guide/prompt-guide.md`(181줄)는
            컴포넌트 제작에 쓴 프롬프트 모음이고 이미지 프롬프트가 아니다.
          </Typography>
          <Typography variant="body2">
            토큰 ↔ 프롬프트 대응표(E7): 프롬프트 문서가 없어 theme 값과 대조할 상대가 없다.
          </Typography>
          <Typography variant="body2">
            무드보드 프롬프트(E8): 결과 이미지만 있고 프롬프트는 없다. 결과물은
            {' '}<StoryLink id="overview-bellite-07-assets--default">07 Assets</StoryLink>와
            {' '}<StoryLink id="overview-bellite-08-domain-knowledge-research--default">08 Domain Knowledge & Research</StoryLink>에서
            이미 폴더별로 보여준다. 이 페이지는 08 페이지의 표를 복제하지 않고 링크만 한다.
          </Typography>
          <Typography variant="body2">
            사고 지도(thinking/bellite.js): 파일 자체가 없다(갤러리 전용 예제). 이 페이지는 사고 지도
            대응 절을 두지 않는다.
          </Typography>
        </Stack>

        <Typography variant="caption" color="text.secondary" sx={ { display: 'block' } }>
          이 페이지의 모든 표는 저장소의 문서·데이터·스크립트에서 파생했다. 저장소 밖 자료는 쓰지 않았다.
        </Typography>
      </PageContainer>
    </>
  ),
};
