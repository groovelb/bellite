import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
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

export default {
  title: 'Overview/Bellite/07 Assets',
  parameters: {
    layout: 'padded',
  },
};

// importKey를 실제 URL로 바꾸는 표. 인벤토리의 모든 항목을 한 번에 훑는다
const ASSET_URLS = import.meta.glob(
  '../../assets/**/*.{png,jpg,jpeg,webp,gif,svg,avif,mp4,webm,mp3,wav,woff,woff2}',
  { eager: true, query: '?url', import: 'default' },
);

// src/data/mediaAssets.js가 import해 등록한 파일 (25건)
const REGISTERED = new Set([
  'src/assets/hero/hero_bg_1.jpeg',
  'src/assets/hero/hero_bg_2.jpeg',
  'src/assets/hero/hero_bg.png',
  'src/assets/hero/hero_bg.mp4',
  'src/assets/hero/hero_bg_3x2.mp4',
  'src/assets/hero/hero_bg_optimized.mp4',
  'src/assets/silhouette/s1.jpeg',
  'src/assets/silhouette/s2.jpeg',
  'src/assets/silhouette/s3.jpeg',
  'src/assets/silhouette/s4.jpeg',
  'src/assets/silhouette/s1.mp4',
  'src/assets/silhouette/s2.mp4',
  'src/assets/silhouette/s3.mp4',
  'src/assets/silhouette/s4.mp4',
  'src/assets/silhouette/cloth_bg_pink.png',
  'src/assets/silhouette/producut_shot_black_1.png',
  'src/assets/inside-mood/moodbaord.mp4',
  'src/assets/signature/aerial-shot.jpeg',
  'src/assets/signature/moodbaord1.jpeg',
  'src/assets/signature/moodbaord2.jpeg',
  'src/assets/dialy-mood/mood1_morning.jpeg',
  'src/assets/dialy-mood/mood2_desk.jpeg',
  'src/assets/dialy-mood/mood3_commute.jpeg',
  'src/assets/dialy-mood/mood4_afet_ballete.jpeg',
  'src/assets/dialy-mood/mood5_home.jpeg',
]);

// 이 크기를 넘으면 미리 받지 않는다
const HEAVY_BYTES = 5 * 1024 * 1024;

const FOLDER_NOTES = {
  'src/assets/hero': '브랜드 선언 구간 배경. 기본값은 hero_bg_2.jpeg와 hero_bg_optimized.mp4',
  'src/assets/silhouette': '자세 장면 네 건의 스틸과 영상, 보조 컷 두 장',
  'src/assets/inside-mood': '내부 오브제 전환 구간의 배경 영상',
  'src/assets/signature': '보관과 자수 디테일 구간의 사진',
  'src/assets/dialy-mood': '마지막 구간의 일상 장면 다섯 컷',
  'src/assets/font': '브랜드 디스플레이 서체. @font-face로 불러온다',
  'src/assets/(root)': '프로젝트 템플릿에서 따라온 파일',
  'public/(root)': '빌드 산출물에 그대로 복사되는 공개 파일',
};

/** 항목의 실제 URL. public 파일은 인벤토리의 url을, 나머지는 glob 결과를 쓴다 */
const assetUrl = (item) => item.url || ASSET_URLS[item.importKey] || null;

/** 바이트를 MB 문자열로 */
const toMb = (bytes) => `${(bytes / 1048576).toFixed(2)}MB`;

/** 인벤토리 항목을 폴더 키로 묶는다 */
const groupKey = (item) => `${item.root}/${item.folder || '(root)'}`;

const GROUPS = assetInventory.items.reduce((acc, item) => {
  const key = groupKey(item);
  (acc[key] = acc[key] || []).push(item);
  return acc;
}, {});

const GROUP_ORDER = [
  'src/assets/hero',
  'src/assets/silhouette',
  'src/assets/inside-mood',
  'src/assets/signature',
  'src/assets/dialy-mood',
  'src/assets/font',
  'src/assets/(root)',
  'public/(root)',
];

/** 파일 이름 아래에 크기와 등록 여부를 적는 캡션 */
function AssetCaption({ item }) {
  const used = REGISTERED.has(item.path);
  return (
    <Stack spacing={ 0.25 }>
      <Typography
        variant="caption"
        sx={ {
          fontFamily: 'monospace',
          fontSize: 10,
          color: 'text.secondary',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        } }
      >
        { item.name }
      </Typography>
      <Typography
        variant="caption"
        sx={ { fontSize: 10, color: used ? 'success.dark' : 'text.disabled' } }
      >
        { used ? '사용' : '미등록' } · { toMb(item.bytes) }
      </Typography>
    </Stack>
  );
}

/**
 * 이미지 한 칸. 고정 비율 안에서 잘라 보여 준다
 *
 * Props:
 * @param {object} item - 인벤토리 항목 [Required]
 *
 * Example usage:
 * <ImageCell item={ item } />
 */
function ImageCell({ item }) {
  const src = assetUrl(item);
  return (
    <Stack spacing={ 0.75 }>
      <Box
        sx={ {
          width: '100%',
          aspectRatio: '4 / 3',
          backgroundColor: 'grey.100',
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
      <AssetCaption item={ item } />
    </Stack>
  );
}

/**
 * 영상 한 칸. 큰 파일은 미리 받지 않는다
 *
 * Props:
 * @param {object} item - 인벤토리 항목 [Required]
 *
 * Example usage:
 * <VideoCell item={ item } />
 */
function VideoCell({ item }) {
  const src = assetUrl(item);
  const heavy = item.bytes > HEAVY_BYTES;
  return (
    <Stack spacing={ 0.75 }>
      <Box sx={ { width: '100%', aspectRatio: '4 / 3', backgroundColor: 'grey.100', overflow: 'hidden' } }>
        { src && (
          <Box
            component="video"
            src={ src }
            controls
            muted
            playsInline
            preload={ heavy ? 'none' : 'metadata' }
            sx={ { width: '100%', height: '100%', objectFit: 'cover', display: 'block' } }
          />
        ) }
      </Box>
      <AssetCaption item={ item } />
      { heavy && (
        <Typography variant="caption" sx={ { fontSize: 10, color: 'warning.dark' } }>
          5MB 초과라 재생을 눌러야 받는다
        </Typography>
      ) }
    </Stack>
  );
}

/**
 * 서체와 미리보기가 없는 파일 표
 *
 * Props:
 * @param {array} items - 인벤토리 항목 배열 [Required]
 *
 * Example usage:
 * <FileTable items={ fonts } />
 */
function FileTable({ items }) {
  return (
    <TableContainer sx={ { mb: 6 } }>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell sx={ { fontWeight: 600, width: '45%' } }>file</TableCell>
            <TableCell sx={ { fontWeight: 600, width: 90 } }>kind</TableCell>
            <TableCell sx={ { fontWeight: 600, width: 90 } }>size</TableCell>
            <TableCell sx={ { fontWeight: 600 } }>등록</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { items.map((item) => (
            <TableRow key={ item.path }>
              <TableCell sx={ { fontFamily: 'monospace', fontSize: 12 } }>{ item.name }</TableCell>
              <TableCell sx={ { fontFamily: 'monospace', fontSize: 12 } }>{ item.kind }</TableCell>
              <TableCell sx={ { fontFamily: 'monospace', fontSize: 12 } }>{ toMb(item.bytes) }</TableCell>
              <TableCell sx={ { fontSize: 12, color: 'text.secondary' } }>
                { REGISTERED.has(item.path) ? '사용' : '미등록' }
              </TableCell>
            </TableRow>
          )) }
        </TableBody>
      </Table>
    </TableContainer>
  );
}

/** 폴더 한 절 */
function FolderSection({ groupKeyName, items }) {
  const images = items.filter((i) => i.kind === 'image');
  const videos = items.filter((i) => i.kind === 'video');
  const others = items.filter((i) => i.kind !== 'image' && i.kind !== 'video');
  const bytes = items.reduce((sum, i) => sum + i.bytes, 0);
  const note = FOLDER_NOTES[groupKeyName] || '';

  return (
    <Box>
      <SectionTitle
        title={ `${groupKeyName} · ${items.length}건 · ${toMb(bytes)}` }
        description={ `이미지 ${images.length} · 영상 ${videos.length} · 기타 ${others.length}${note ? ` · ${note}` : ''}` }
      />
      { images.length > 0 && (
        <Grid container spacing={ 2 } sx={ { mb: videos.length || others.length ? 3 : 6 } }>
          { images.map((item) => (
            <Grid key={ item.path } size={ { xs: 6, sm: 4, md: 3 } }>
              <ImageCell item={ item } />
            </Grid>
          )) }
        </Grid>
      ) }
      { videos.length > 0 && (
        <Grid container spacing={ 2 } sx={ { mb: others.length ? 3 : 6 } }>
          { videos.map((item) => (
            <Grid key={ item.path } size={ { xs: 12, sm: 6, md: 4 } }>
              <VideoCell item={ item } />
            </Grid>
          )) }
        </Grid>
      ) }
      { others.length > 0 && <FileTable items={ others } /> }
    </Box>
  );
}

/** 폴더별 에셋 카탈로그 */
export const Default = {
  render: () => {
    const total = assetInventory.items.length;
    const totalBytes = assetInventory.items.reduce((sum, i) => sum + i.bytes, 0);
    const usedCount = assetInventory.items.filter((i) => REGISTERED.has(i.path)).length;

    return (
      <>
        <DocumentTitle
          title="Assets"
          status="Available"
          note="폴더별 사진과 영상 전부, 그리고 서체 파일"
          brandName="Design System"
          systemName="Bellite"
          version="1.0"
        />
        <PageContainer>
          <Typography variant="h4" sx={ { fontWeight: 700, mb: 1 } }>
            Assets
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={ { mb: 1 } }>
            <code>src/data/assetInventory.js</code> · 재생성: <code>pnpm generate-assets</code>
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={ { mb: 4 } }>
            파일 { total }건 { toMb(totalBytes) } 전부를 폴더 순서대로 그린다. 그중 { usedCount }건이 <code>mediaAssets.js</code>에 등록되어 있고
            나머지는 미등록이다. 이미지는 4:3 고정 칸에 맞춰 잘라 보여 주고, 영상은 컨트롤로 연다. 5MB를 넘는 영상은 미리 받지 않는다.
          </Typography>

          { GROUP_ORDER.filter((key) => GROUPS[key]).map((key) => (
            <FolderSection key={ key } groupKeyName={ key } items={ GROUPS[key] } />
          )) }
        </PageContainer>
      </>
    );
  },
};
