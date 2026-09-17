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
import { mediaAssets } from '../../data/mediaAssets';

// 5MB를 넘는 파일 4개는 번들 인라인을 피하려고 ?url 로 불러온다
import heroBg2Url from '../../assets/hero/hero_bg_2.jpeg?url';
import heroBgOptimizedUrl from '../../assets/hero/hero_bg_optimized.mp4?url';
import insideMoodVideoUrl from '../../assets/inside-mood/moodbaord.mp4?url';
import silhouetteVideo3Url from '../../assets/silhouette/s3.mp4?url';

export default {
  title: 'Overview/Bellite/07 Assets',
  parameters: {
    layout: 'padded',
  },
};

const slides = mediaAssets.silhouette.slides;

/**
 * 에셋 카탈로그
 *
 * 사용 중 판정: src/data/mediaAssets.js 에 import 되어 등록된 파일.
 * 등록되지 않은 파일은 아래 Unregistered 표로 내린다.
 */
const ASSET_GROUPS = [
  {
    dir: 'src/assets/hero',
    label: 'Hero',
    note: '브랜드 선언 구간 배경. 기본값은 hero_bg_2.jpeg 와 hero_bg_optimized.mp4',
    items: [
      { name: 'hero_bg_1.jpeg', src: mediaAssets.hero.images.bg1, kind: 'image' },
      { name: 'hero_bg_2.jpeg', src: heroBg2Url, kind: 'image', large: true },
      { name: 'hero_bg.png', src: mediaAssets.hero.images.bgPng, kind: 'image' },
      { name: 'hero_bg.mp4', src: mediaAssets.hero.videos.bg, kind: 'video' },
      { name: 'hero_bg_3x2.mp4', src: mediaAssets.hero.videos.bg3x2, kind: 'video' },
      { name: 'hero_bg_optimized.mp4', src: heroBgOptimizedUrl, kind: 'video', large: true },
    ],
  },
  {
    dir: 'src/assets/silhouette',
    label: 'Silhouette',
    note: '자세 장면 네 건의 스틸과 영상, 그리고 보조 컷 두 장',
    items: [
      { name: 's1.jpeg', src: slides.crosswalk.image, kind: 'image' },
      { name: 's2.jpeg', src: slides.subway.image, kind: 'image' },
      { name: 's3.jpeg', src: slides.cafe.image, kind: 'image' },
      { name: 's4.jpeg', src: slides.stairs.image, kind: 'image' },
      { name: 's1.mp4', src: slides.crosswalk.video, kind: 'video' },
      { name: 's2.mp4', src: slides.subway.video, kind: 'video' },
      { name: 's3.mp4', src: silhouetteVideo3Url, kind: 'video', large: true },
      { name: 's4.mp4', src: slides.stairs.video, kind: 'video' },
      { name: 'cloth_bg_pink.png', src: mediaAssets.silhouette.extras.clothBgPink, kind: 'image' },
      { name: 'producut_shot_black_1.png', src: mediaAssets.silhouette.extras.productShotBlack, kind: 'image' },
    ],
  },
  {
    dir: 'src/assets/inside-mood',
    label: 'Inside Mood',
    note: '내부 오브제 전환 구간의 배경 영상',
    items: [
      { name: 'moodbaord.mp4', src: insideMoodVideoUrl, kind: 'video', large: true },
    ],
  },
  {
    dir: 'src/assets/signature',
    label: 'Signature',
    note: '보관과 자수 디테일 구간의 사진',
    items: [
      { name: 'aerial-shot.jpeg', src: mediaAssets.signature.images.aerialShot, kind: 'image' },
      { name: 'moodbaord1.jpeg', src: mediaAssets.signature.images.moodboard1, kind: 'image' },
      { name: 'moodbaord2.jpeg', src: mediaAssets.signature.images.moodboard2, kind: 'image' },
    ],
  },
  {
    dir: 'src/assets/dialy-mood',
    label: 'Daily Mood',
    note: '마지막 구간의 일상 장면 다섯 컷',
    items: [
      { name: 'mood1_morning.jpeg', src: mediaAssets.dailyMood.images.morning, kind: 'image' },
      { name: 'mood2_desk.jpeg', src: mediaAssets.dailyMood.images.desk, kind: 'image' },
      { name: 'mood3_commute.jpeg', src: mediaAssets.dailyMood.images.commute, kind: 'image' },
      { name: 'mood4_afet_ballete.jpeg', src: mediaAssets.dailyMood.images.afterBallet, kind: 'image' },
      { name: 'mood5_home.jpeg', src: mediaAssets.dailyMood.images.home, kind: 'image' },
    ],
  },
];

/** mediaAssets.js 에 등록되지 않은 파일 */
const UNREGISTERED = [
  {
    name: 'Chandia_PERSONAL_USE_ONLY.otf',
    dir: 'src/assets/font',
    note: 'index.html 과 .storybook/preview-head.html 의 @font-face 로 불러온다',
  },
  {
    name: 'ChandiaDecorative_PERSONAL_USE_ONLY.otf',
    dir: 'src/assets/font',
    note: '@font-face 로 선언되어 있고 sx 로 직접 지정할 때만 쓴다',
  },
  {
    name: 'react.svg',
    dir: 'src/assets',
    note: '프로젝트 템플릿에서 따라온 파일. 어디에서도 참조하지 않는다',
  },
];

/**
 * 라벨과 미디어를 세로로 쌓은 단일 셀. 원본 비율을 유지한다.
 *
 * Props:
 * @param {string} label - 파일 이름 [Required]
 * @param {string} src - 에셋 URL [Required]
 * @param {boolean} isVideo - 영상 여부 [Optional, 기본값: false]
 *
 * Example usage:
 * <AssetCell label="s1.mp4" src={ src } isVideo />
 */
function AssetCell({ label, src, isVideo = false }) {
  return (
    <Stack spacing={ 0.75 }>
      <Box
        sx={ {
          width: '100%',
          backgroundColor: 'grey.100',
          overflow: 'hidden',
          position: 'relative',
          lineHeight: 0,
        } }
      >
        { isVideo ? (
          <Box
            component="video"
            src={ src }
            controls
            muted
            playsInline
            preload="metadata"
            sx={ { width: '100%', height: 'auto', display: 'block' } }
          />
        ) : (
          <Box
            component="img"
            src={ src }
            alt={ label }
            loading="lazy"
            sx={ { width: '100%', height: 'auto', display: 'block' } }
          />
        ) }
      </Box>
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
        { label }
      </Typography>
    </Stack>
  );
}

/**
 * 등록되지 않은 파일 목록 표
 *
 * Props:
 * @param {array} rows - 파일 이름과 위치, 설명을 담은 배열 [Required]
 *
 * Example usage:
 * <UnregisteredTable rows={ UNREGISTERED } />
 */
function UnregisteredTable({ rows }) {
  return (
    <TableContainer sx={ { mb: 4 } }>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell sx={ { fontWeight: 600, width: '30%' } }>file</TableCell>
            <TableCell sx={ { fontWeight: 600, width: '20%' } }>dir</TableCell>
            <TableCell sx={ { fontWeight: 600 } }>note</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { rows.map((r) => (
            <TableRow key={ r.name }>
              <TableCell sx={ { fontFamily: 'monospace', fontSize: 12 } }>{ r.name }</TableCell>
              <TableCell sx={ { fontFamily: 'monospace', fontSize: 12 } }>{ r.dir }</TableCell>
              <TableCell sx={ { fontSize: 13, color: 'text.secondary' } }>{ r.note }</TableCell>
            </TableRow>
          )) }
        </TableBody>
      </Table>
    </TableContainer>
  );
}

/** 에셋 카탈로그 */
export const Default = {
  render: () => {
    const registeredCount = ASSET_GROUPS.reduce((sum, g) => sum + g.items.length, 0);

    return (
      <>
        <DocumentTitle
          title="Assets"
          status="Available"
          note="구간별 사진과 영상, 그리고 등록되지 않은 파일"
          brandName="Design System"
          systemName="Bellite"
          version="1.0"
        />
        <PageContainer>
          <Typography variant="h4" sx={ { fontWeight: 700, mb: 1 } }>
            Assets
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={ { mb: 1 } }>
            <code>src/data/mediaAssets.js</code> · <code>src/assets/</code>
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={ { mb: 4 } }>
            사용 중 판정 기준은 <code>mediaAssets.js</code> 등록 여부다. 등록된 { registeredCount }건을 구간별로 먼저 보이고,
            등록되지 않은 3건을 아래 표로 내린다. 모든 미디어는 원본 비율 그대로 표시하고, 영상은 자동 재생 대신 컨트롤로 연다.
          </Typography>

          <Typography variant="h5" sx={ { fontWeight: 700, mt: 2, mb: 2 } }>
            Registered in mediaAssets.js
          </Typography>

          { ASSET_GROUPS.map((group) => (
            <Box key={ group.dir }>
              <SectionTitle
                title={ `${group.label} · ${group.items.length}건` }
                description={ `${group.dir} · ${group.note}` }
              />
              <Grid container spacing={ 3 } sx={ { mb: 6 } }>
                { group.items.map((item) => (
                  <Grid key={ item.name } size={ { xs: 12, sm: 6, md: 4 } }>
                    <AssetCell
                      label={ item.large ? `${item.name} (5MB 초과, ?url)` : item.name }
                      src={ item.src }
                      isVideo={ item.kind === 'video' }
                    />
                  </Grid>
                )) }
              </Grid>
            </Box>
          )) }

          <Typography variant="h5" sx={ { fontWeight: 700, mt: 4, mb: 2, color: 'text.secondary' } }>
            Unregistered
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={ { mb: 3 } }>
            <code>mediaAssets.js</code> 에 등록되지 않은 파일이다. 서체 두 개는 스타일시트가 직접 불러오고, 나머지 하나는 어디에서도 쓰지 않는다.
          </Typography>
          <UnregisteredTable rows={ UNREGISTERED } />
        </PageContainer>
      </>
    );
  },
};
