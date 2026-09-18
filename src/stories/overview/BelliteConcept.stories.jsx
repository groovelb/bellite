import React from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
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
import theme from '../../styles/themes/theme.js';
import visualDirectionRaw from '../../../docs/bellite/03-visual-direction.md?raw';

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

/** theme 토큰 값. 손으로 적지 않고 theme 객체에서 읽는다 (src/styles/themes/theme.js) */
const PAL = theme.palette;
const TOKENS = {
  ink: { path: 'primary.main', value: PAL.primary.main },
  ground: { path: 'background.default', value: PAL.background.default },
  blush: { path: 'brand.blush', value: PAL.brand.blush },
  radius: { path: 'shape.borderRadius', value: String(theme.shape.borderRadius) },
};

/** 에셋 파일 URL. 인벤토리의 importKey로 찾는다 (07 Assets 페이지와 같은 방식) */
const ASSET_URLS = import.meta.glob(
  '../../assets/**/*.{png,jpg,jpeg,webp,avif,gif}',
  { eager: true, query: '?url', import: 'default' },
);

/**
 * 인벤토리에서 폴더·종류로 에셋을 고른다. 개수를 손으로 적지 않으려고 쓴다.
 *
 * @param {string} folder - 인벤토리의 folder 값 [Required]
 * @param {string} kind - 'image' 또는 'video' [Required]
 * @param {RegExp} match - 파일명 조건 [Optional, 기본값: null]
 * @returns {object[]} 인벤토리 항목 목록
 */
function pickAssets(folder, kind, match = null) {
  return assetInventory.items.filter(
    (item) => item.folder === folder && item.kind === kind && (!match || match.test(item.name)),
  );
}

const HERO_VIDEOS = pickAssets('hero', 'video');
const HERO_STILLS = pickAssets('hero', 'image');
const SCENE_VIDEOS = pickAssets('silhouette', 'video');
const SCENE_STILLS = pickAssets('silhouette', 'image', /^s\d/);
const INSIDE_VIDEOS = pickAssets('inside-mood', 'video');
const SIGNATURE_STILLS = pickAssets('signature', 'image');
const DAILY_STILLS = pickAssets('dialy-mood', 'image');

/** 의사결정 흐름 격자의 열. 왼쪽 결정이 오른쪽 값이 된다. */
const STAGES = [
  { key: 'plan', label: '기획', doc: '01' },
  { key: 'ux', label: 'UX', doc: '02' },
  { key: 'visual', label: '비주얼 디렉션', doc: '03' },
  { key: 'token', label: 'theme 토큰', doc: 'theme.js' },
  { key: 'direction', label: '에셋 방향', doc: '03 4절' },
  { key: 'asset', label: '에셋', doc: 'src/assets' },
];

/**
 * 의사결정 흐름 격자의 행. 스레드 하나가 결정 하나의 전파 경로다.
 * 노드는 짧은 라벨만 두고 근거 절과 값은 ref 에 둔다. null 은 그 단계에 결정이 없다는 뜻.
 */
const FLOW_THREADS = [
  {
    key: 'posture', name: '자세', stripe: PAL.primary.main,
    nodes: [
      { label: 'Unbroken Line: 무게를 받아도 수평을 지킨다', ref: '01 3.1' },
      { label: '세로 스크롤이 가로 이동으로 번역된다', ref: '02 1.2, 4절 원칙 3' },
      { label: 'Sharp Silhouette, 둥근 모서리는 하지 않는다', ref: '03 1절, 3.3' },
      { label: TOKENS.radius.path, ref: TOKENS.radius.value },
      { label: '자세 장면 영상·스틸: 3:2, 하단 3분의 1 비움', ref: '03 4절' },
      { label: `영상 ${ SCENE_VIDEOS.length } · 스틸 ${ SCENE_STILLS.length }`, ref: 'src/assets/silhouette' },
    ],
  },
  {
    key: 'archive', name: '보관', stripe: PAL.brand.urbanSoft,
    nodes: [
      { label: 'Thoughtful Archive: 소지품마다 제자리가 있다', ref: '01 3.1' },
      { label: 'StoragePoint · BalletObject, 데이터에만 있다', ref: '02 3.1' },
      { label: 'Inside Mood: sticky-scroll-reveal, full-bleed', ref: '03 2절 (잠정)' },
      { label: '토큰 없음', ref: 'landingPageContent.json storagePoints' },
      { label: '내부 오브제 영상: top-down, 중앙을 비운다', ref: '03 4절' },
      { label: `영상 ${ INSIDE_VIDEOS.length }`, ref: 'src/assets/inside-mood' },
    ],
  },
  {
    key: 'mark', name: '표식', stripe: PAL.brand.blush,
    nodes: [
      { label: 'Internalized Discipline: 아는 사람만 알아보는 표식', ref: '01 3.1' },
      { label: '안내는 선언이 끝난 뒤에 나타난다', ref: '02 4절 원칙 4' },
      { label: 'Embroidered Detail, 로고를 크게 박지 않는다', ref: '03 1절' },
      { label: TOKENS.blush.path, ref: TOKENS.blush.value },
      { label: '시그니처 디테일 컷: macro texture, 측면 사광', ref: '03 4절' },
      { label: `사진 ${ SIGNATURE_STILLS.length }`, ref: 'src/assets/signature' },
    ],
  },
  {
    key: 'tone', name: '색·톤', stripe: PAL.brand.soulMuted,
    nodes: [
      { label: '태도 키워드: 절제 · 우아함 · 도시적', ref: '01 3.2' },
      null,
      { label: 'Powder & Ink: 2색 팔레트, 그라디언트 없음', ref: '03 1절, 3.1' },
      { label: `${ TOKENS.ink.path } · ${ TOKENS.ground.path }`, ref: `${ TOKENS.ink.value } · ${ TOKENS.ground.value }` },
      { label: '히어로 배경 영상: 도심 저녁의 낮은 채도', ref: '03 4절' },
      { label: `영상 ${ HERO_VIDEOS.length } · 스틸 ${ HERO_STILLS.length }`, ref: 'src/assets/hero' },
    ],
  },
  {
    key: 'daily', name: '일상', stripe: PAL.brand.urbanMuted,
    nodes: [
      { label: '발레를 일상과 병행하는 사람', ref: '01 1절' },
      { label: '마지막 구간에 일상 장면이 겹쳐 놓인다', ref: '02 1.4' },
      { label: 'Daily Mood: broken-grid, coming-soon-teaser', ref: '03 2절 (잠정)' },
      null,
      { label: '일상 무드 컷: snapshot diary, 잘려도 읽히는 구도', ref: '03 4절' },
      { label: `사진 ${ DAILY_STILLS.length }`, ref: 'src/assets/dialy-mood' },
    ],
  },
];

/**
 * 03 4절 "에셋별 방향" 목록의 원문 줄을 꺼낸다. 문서를 복사하지 않고 raw import 를 자른다.
 *
 * @param {string} raw - 03-visual-direction.md 원문 [Required]
 * @param {string} heading - 시작 줄 [Required]
 * @param {string} until - 끝 줄 [Required]
 * @returns {string[]} 비어 있지 않은 줄
 */
function extractBlock(raw, heading, until) {
  const start = raw.indexOf(heading);
  if (start < 0) return [];
  const rest = raw.slice(start + heading.length);
  const end = rest.indexOf(until);
  return (end < 0 ? rest : rest.slice(0, end)).split('\n').map((line) => line.trimEnd()).filter(Boolean);
}

/**
 * 원문 줄을 유형별 블록 스택으로 묶는다. `- **유형**` 이 스택의 머리, `  - 키: 값` 이 블록 하나다.
 * SUBJECT 만 유형마다 값이 바뀌는 슬롯이고 나머지는 여섯 유형이 같은 틀로 쓰는 고정부다.
 *
 * @param {string[]} lines - extractBlock 결과 [Required]
 * @returns {object[]} [{ type, blocks: [{ key, value, line, isSlot }] }]
 */
function toBlocks(lines) {
  const stacks = [];
  lines.forEach((line) => {
    const head = line.match(/^- \*\*(.+)\*\*$/);
    if (head) {
      stacks.push({ type: head[1], blocks: [] });
      return;
    }
    const field = line.match(/^\s+- ([^:]+): (.+)$/);
    if (field && stacks.length > 0) {
      const key = field[1].trim();
      stacks[stacks.length - 1].blocks.push({
        key,
        value: field[2].trim(),
        line: line.trim(),
        isSlot: key === 'SUBJECT',
      });
    }
  });
  return stacks;
}

const TEMPLATE_STACKS = toBlocks(
  extractBlock(visualDirectionRaw, '에셋별 방향 (에셋 유형마다 한 블록):', '### 4.1'),
);

/**
 * 유형별 입력(SUBJECT 가 어디서 오는가)과 출력(결과 에셋). 키는 03 4절의 유형 이름 그대로다.
 * 개수는 assetInventory 에서 세고, 썸네일은 그 유형의 실제 파일을 쓴다.
 */
const TYPE_IO = {
  '히어로 배경 영상': {
    inputs: ['01 3.2 태도 키워드: 도시적', '02 1.1 단계 1: 도시 속 인물 영상'],
    items: HERO_VIDEOS,
    folder: 'src/assets/hero',
    thumb: 'src/assets/hero/hero_bg_2.jpeg',
    thumbNote: '같은 구간 정지 대체본',
  },
  '자세 장면 영상': {
    inputs: ['01 4.2 PostureScene (4건)', '02 1.2 단계 4: 네 장면 이름'],
    items: SCENE_VIDEOS,
    folder: 'src/assets/silhouette',
    thumb: 'src/assets/silhouette/s1.jpeg',
    thumbNote: '짝을 이루는 스틸',
  },
  '자세 장면 스틸': {
    inputs: ['자세 장면 영상 블록의 SUBJECT', '02 1.2 단계 3: 같은 구도'],
    items: SCENE_STILLS,
    folder: 'src/assets/silhouette',
    thumb: 'src/assets/silhouette/s2.jpeg',
    thumbNote: '',
  },
  '내부 오브제 영상': {
    inputs: ['01 4.2 BalletObject (8건)', '02 1.3 단계 2: 소지품 이름'],
    items: INSIDE_VIDEOS,
    folder: 'src/assets/inside-mood',
    thumb: '',
    thumbNote: '정지 컷 없음',
  },
  '시그니처 디테일 컷': {
    inputs: ['01 3.1 Internalized Discipline', '02 1.3 단계 5: 자수 설명'],
    items: SIGNATURE_STILLS,
    folder: 'src/assets/signature',
    thumb: 'src/assets/signature/aerial-shot.jpeg',
    thumbNote: '',
  },
  '일상 무드 컷': {
    inputs: ['01 1절: 발레를 일상과 병행', '02 1.4 단계 4: 겹쳐 놓인 장면'],
    items: DAILY_STILLS,
    folder: 'src/assets/dialy-mood',
    thumb: 'src/assets/dialy-mood/mood1_morning.jpeg',
    thumbNote: '',
  },
};

/** 인벤토리 경로를 실제 URL로 바꾼다. 없으면 null */
const thumbUrl = (path) => {
  const item = assetInventory.items.find((entry) => entry.path === path);
  return item ? ASSET_URLS[item.importKey] || null : null;
};

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

/**
 * 격자 셀 하나. 결정 라벨과 근거를 짧게 보여 준다.
 *
 * Props:
 * @param {object} node - { label, ref } 또는 null [Required]
 * @param {string} stripe - 스레드 색 [Required]
 *
 * Example usage:
 * <FlowCell node={ { label: '자세', ref: '01 3.1' } } stripe="#0F0F0F" />
 */
function FlowCell({ node, stripe }) {
  if (!node) {
    return <Box sx={ { minHeight: 56, border: 1, borderStyle: 'dashed', borderColor: 'divider', opacity: 0.6 } } />;
  }
  return (
    <Box
      sx={ {
        minHeight: 56,
        borderLeft: 4,
        borderColor: stripe,
        backgroundColor: 'brand.soulLight',
        px: 1,
        py: 0.75,
      } }
    >
      <Typography variant="caption" component="div" sx={ { fontWeight: 600, lineHeight: 1.35 } }>
        { node.label }
      </Typography>
      <Typography variant="caption" component="div" color="text.secondary" sx={ { fontFamily: 'monospace', fontSize: 10 } }>
        { node.ref }
      </Typography>
    </Box>
  );
}

/**
 * 템플릿 블록 하나. SUBJECT(슬롯)는 채운 색, 나머지 고정부는 외곽선.
 *
 * Props:
 * @param {object} block - { key, value, line, isSlot } [Required]
 *
 * Example usage:
 * <TemplateBlock block={ { key: 'LOOK', value: 'macro texture photo', line: '', isSlot: false } } />
 */
function TemplateBlock({ block }) {
  return (
    <Box
      title={ block.line }
      sx={ {
        px: 1,
        py: 0.5,
        mb: 0.5,
        border: 1,
        borderColor: block.isSlot ? 'brand.blush' : 'divider',
        backgroundColor: block.isSlot ? 'brand.blush' : 'transparent',
      } }
    >
      <Stack direction="row" spacing={ 1 } alignItems="flex-start">
        <Typography
          variant="caption"
          sx={ { fontFamily: 'monospace', fontWeight: 700, fontSize: 10, minWidth: 64, flexShrink: 0, pt: 0.25 } }
        >
          { block.key }
        </Typography>
        <Typography variant="caption" sx={ { lineHeight: 1.4, fontWeight: block.isSlot ? 600 : 400 } }>
          { block.value }
        </Typography>
      </Stack>
    </Box>
  );
}

/**
 * 템플릿 한 벌: 입력, 블록 스택, 출력.
 *
 * Props:
 * @param {string} type - 에셋 유형 이름 [Required]
 * @param {object[]} blocks - TemplateBlock 목록 [Required]
 * @param {object} io - { inputs, items, folder, thumb, thumbNote } [Required]
 *
 * Example usage:
 * <TemplateStack type="일상 무드 컷" blocks={ blocks } io={ TYPE_IO['일상 무드 컷'] } />
 */
function TemplateStack({ type, blocks, io }) {
  const url = io.thumb ? thumbUrl(io.thumb) : null;
  return (
    <Grid container spacing={ 2 } alignItems="flex-start">
      <Grid size={ { xs: 12, md: 3 } }>
        <Typography variant="overline" color="text.secondary" component="div">입력</Typography>
        { io.inputs.map((text) => (
          <Typography key={ text } variant="caption" component="div" sx={ { fontFamily: 'monospace', fontSize: 11, py: 0.25 } }>
            { text }
          </Typography>
        )) }
      </Grid>
      <Grid size={ { xs: 12, md: 6 } }>
        <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={ { mb: 0.5 } }>
          <Typography variant="subtitle2">{ type }</Typography>
          <Typography variant="caption" color="text.secondary">블록 { blocks.length }</Typography>
        </Stack>
        { blocks.map((block) => <TemplateBlock key={ block.line } block={ block } />) }
      </Grid>
      <Grid size={ { xs: 12, md: 3 } }>
        <Typography variant="overline" color="text.secondary" component="div">출력</Typography>
        { url ? (
          <Box
            component="img"
            src={ url }
            alt={ type }
            loading="lazy"
            sx={ { width: '100%', maxWidth: 180, aspectRatio: '4 / 3', objectFit: 'cover', display: 'block', mb: 0.5 } }
          />
        ) : (
          <Box
            sx={ {
              width: '100%',
              maxWidth: 180,
              aspectRatio: '4 / 3',
              border: 1,
              borderStyle: 'dashed',
              borderColor: 'divider',
              mb: 0.5,
            } }
          />
        ) }
        <Typography variant="caption" component="div" sx={ { fontWeight: 600 } }>
          { io.items.length }건{ io.thumbNote ? ` · ${ io.thumbNote }` : '' }
        </Typography>
        <Typography variant="caption" component="div" color="text.secondary" sx={ { fontFamily: 'monospace', fontSize: 10 } }>
          { io.folder }
        </Typography>
        <Typography variant="caption" component="div" color="text.secondary" sx={ { fontFamily: 'monospace', fontSize: 10 } }>
          { io.items.map((item) => item.name).join(' · ') }
        </Typography>
      </Grid>
    </Grid>
  );
}

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
        <Box sx={ { p: 2, mb: 6, border: '1px solid', borderColor: 'divider', backgroundColor: 'brand.soulLight' } }>
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

        <SectionTitle
          title="의사결정 흐름"
          description="왼쪽 결정이 오른쪽 값이 된다. 가치 하나가 토큰과 에셋 방향으로 동시에 내려간다"
        />
        <Box sx={ { overflowX: 'auto', mb: 1 } }>
          <Box sx={ { display: 'grid', gridTemplateColumns: '64px repeat(6, minmax(150px, 1fr))', columnGap: 1, rowGap: 1, minWidth: 1040 } }>
            <Box />
            { STAGES.map((stage) => (
              <Box key={ stage.key } sx={ { borderBottom: 2, borderColor: 'primary.main', pb: 0.5 } }>
                <Typography variant="subtitle2">{ stage.label }</Typography>
                <Typography variant="caption" color="text.secondary" sx={ { fontFamily: 'monospace' } }>
                  { stage.doc }
                </Typography>
              </Box>
            )) }
            { FLOW_THREADS.map((thread) => (
              <React.Fragment key={ thread.key }>
                <Box sx={ { display: 'flex', alignItems: 'center', borderLeft: 4, borderColor: thread.stripe, pl: 0.75 } }>
                  <Typography variant="subtitle2">{ thread.name }</Typography>
                </Box>
                { thread.nodes.map((node, index) => (
                  <FlowCell key={ `${ thread.key }-${ STAGES[index].key }` } node={ node } stripe={ thread.stripe } />
                )) }
              </React.Fragment>
            )) }
          </Box>
        </Box>
        <Typography variant="caption" color="text.secondary" component="div" sx={ { mb: 6 } }>
          점선 칸은 그 단계에 결정이 없다는 뜻이고, 토큰 값은 theme.js 객체에서 읽는다.
          03의 2절과 4절은 문서 자체가 잠정(Q4 · Q5)이라 그 칸의 근거도 잠정이다.
        </Typography>

        <SectionTitle
          title={ `템플릿 구성 (× ${ TEMPLATE_STACKS.length } 유형)` }
          description="03 4절 원문을 블록으로 나눴다. 외곽선 블록은 여섯 유형이 같은 틀로 쓰는 고정부, 채운 블록은 유형마다 값이 바뀌는 슬롯"
        />
        <Stack direction="row" spacing={ 2 } sx={ { mb: 3 } }>
          <Chip size="small" variant="outlined" label="고정: FORMAT · LOOK · 하지 않는 것" />
          <Chip size="small" variant="outlined" label="슬롯: SUBJECT" sx={ { backgroundColor: 'brand.blush' } } />
        </Stack>
        <Stack spacing={ 4 } sx={ { mb: 2 } }>
          { TEMPLATE_STACKS.map((stack) => (
            <TemplateStack
              key={ stack.type }
              type={ stack.type }
              blocks={ stack.blocks }
              io={ TYPE_IO[stack.type] }
            />
          )) }
        </Stack>
        <Typography variant="body2" color="text.secondary" sx={ { mb: 6 } }>
          프롬프트 템플릿 파일은 이 저장소에 없다. 반복 재활용되는 템플릿은 03 4절의 유형별 블록이고,
          블록에 마우스를 올리면 원문 줄이 보인다. 전문은{ ' ' }
          <StoryLink id="overview-bellite-03-visual-direction--docs">03 Visual Direction</StoryLink>에 있다.
        </Typography>

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

        <SectionTitle title="없는 것" description="저장소에 확인되지 않아 증거 표에 없음으로 남긴 항목" />
        <Stack spacing={ 1 } sx={ { mb: 6 } }>
          <Typography variant="body2">
            프롬프트 템플릿(E2): `docs/bellite/image-generation/` 폴더가 없다. 위 템플릿 구성 도식은 03 4절의
            유형별 블록을 대신 그린 것이다.
          </Typography>
          <Typography variant="body2">
            공통 스타일 규칙(E3)과 제품·대상별 스펙 슬롯(E4): 해당 문서가 없다. 슬롯의 출처는 문서 절 이름으로만
            적을 수 있고 값으로 치환되는 자리는 아니다.
          </Typography>
          <Typography variant="body2">
            생성 스크립트·파이프라인(E5): `scripts/`의 두 스크립트는 이미지 생성이 아니라 기존 파일을
            읽어 인벤토리·구조 데이터를 만드는 스크립트다. `src/guide/prompt-guide.md`(181줄)는
            컴포넌트 제작에 쓴 프롬프트 모음이고 이미지 프롬프트가 아니다.
          </Typography>
          <Typography variant="body2">
            토큰 ↔ 프롬프트 대응표(E7): 프롬프트 문서가 없어 theme 값과 대조할 상대가 없다. 격자의 theme 토큰
            열은 프롬프트가 아니라 에셋 방향과 나란히 놓인다.
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
          이 페이지의 두 도식과 표는 저장소의 문서·데이터·에셋에서 파생했다. 저장소 밖 자료는 쓰지 않았다.
        </Typography>
      </PageContainer>
    </>
  ),
};
