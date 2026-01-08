import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import { Copy, Image, Video } from 'lucide-react';
import {
  DocumentTitle,
  PageContainer,
  SectionTitle,
} from '../../components/storybookDocumentation';
import AspectMedia from '../../components/media/AspectMedia';
import { mediaAssets } from '../../data/mediaAssets';

export default {
  title: 'Data/Media Assets',
  parameters: {
    layout: 'padded',
  },
};

// 에셋 데이터 구조 (새로운 디렉토리 기준)
const assetCategories = {
  hero: {
    name: 'Hero Background',
    description: 'HeroSection 배경용 이미지/비디오',
    path: 'src/assets/hero/',
    images: [
      { src: mediaAssets.hero.images.bg1, name: 'hero_bg_1.jpeg', ratio: '16/9', usage: 'Hero 배경 이미지 1' },
      { src: mediaAssets.hero.images.bg2, name: 'hero_bg_2.jpeg', ratio: '16/9', usage: 'Hero 배경 이미지 2 (기본)' },
      { src: mediaAssets.hero.images.bgPng, name: 'hero_bg.png', ratio: '16/9', usage: 'Hero 배경 PNG' },
    ],
    videos: [
      { src: mediaAssets.hero.videos.bg, name: 'hero_bg.mp4', ratio: '16/9', usage: 'Hero 배경 비디오 (원본)' },
      { src: mediaAssets.hero.videos.bg3x2, name: 'hero_bg_3x2.mp4', ratio: '3/2', usage: 'Hero 배경 비디오 (3:2)' },
      { src: mediaAssets.hero.videos.bgOptimized, name: 'hero_bg_optimized.mp4', ratio: '16/9', usage: 'Hero 배경 비디오 (최적화, 기본)' },
    ],
  },
  silhouette: {
    name: 'Silhouette Section',
    description: 'SilhouetteSection 슬라이드용 이미지/비디오',
    path: 'src/assets/silhouette/',
    images: [
      ...mediaAssets.silhouette.slideArray.map((slide, idx) => ({
        src: slide.image,
        name: `s${idx + 1}.jpeg`,
        ratio: '3/2',
        usage: slide.id.replace(/([A-Z])/g, ' $1').trim(),
      })),
      { src: mediaAssets.silhouette.extras.clothBgPink, name: 'cloth_bg_pink.png', ratio: '1/1', usage: '핑크 천 배경' },
      { src: mediaAssets.silhouette.extras.productShotBlack, name: 'producut_shot_black_1.png', ratio: '1/1', usage: '블랙 제품샷' },
    ],
    videos: mediaAssets.silhouette.slideArray.map((slide, idx) => ({
      src: slide.video,
      name: `s${idx + 1}.mp4`,
      ratio: '3/2',
      usage: `${slide.id.replace(/([A-Z])/g, ' $1').trim()} 스크러빙 비디오`,
    })),
  },
  insideMood: {
    name: 'InsideMood Section',
    description: 'InsideMoodSection 스크러빙 비디오',
    path: 'src/assets/inside-mood/',
    images: [],
    videos: [
      { src: mediaAssets.insideMood.video, name: 'moodbaord.mp4', ratio: '3/2', usage: '무드보드 스크러빙 비디오' },
    ],
  },
  signature: {
    name: 'Signature Section',
    description: 'SignatureSection 무드보드/디테일 이미지',
    path: 'src/assets/signature/',
    images: [
      { src: mediaAssets.signature.images.aerialShot, name: 'aerial-shot.jpeg', ratio: '16/9', usage: '에어리얼 샷 (Archive)' },
      { src: mediaAssets.signature.images.moodboard1, name: 'moodbaord1.jpeg', ratio: '4/3', usage: '무드보드 이미지 1 (Signature)' },
      { src: mediaAssets.signature.images.moodboard2, name: 'moodbaord2.jpeg', ratio: '4/3', usage: '무드보드 이미지 2' },
    ],
    videos: [],
  },
};

/**
 * 에셋 카드 컴포넌트
 */
const AssetCard = ({ asset, type, basePath, onCopy }) => {
  const importPath = `import asset from '${basePath}${asset.name}';`;

  return (
    <Box sx={{ position: 'relative' }}>
      <Box sx={{ position: 'relative', bgcolor: 'grey.100' }}>
        <AspectMedia
          type={type}
          src={asset.src}
          alt={asset.name}
          aspectRatio="auto"
          isAutoPlay={type === 'video'}
          isMuted
          isLoop={type === 'video'}
        />
        <IconButton
          size="small"
          onClick={() => onCopy(importPath, asset.name)}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            bgcolor: 'rgba(0,0,0,0.6)',
            color: 'white',
            '&:hover': { bgcolor: 'rgba(0,0,0,0.8)' },
          }}
        >
          <Copy size={14} />
        </IconButton>
      </Box>
      <Stack spacing={0.5} sx={{ mt: 1 }}>
        <Typography variant="caption" sx={{ fontWeight: 600, fontFamily: 'monospace' }} noWrap>
          {asset.name}
        </Typography>
        <Stack direction="row" spacing={0.5} alignItems="center">
          <Chip
            icon={type === 'video' ? <Video size={10} /> : <Image size={10} />}
            label={asset.ratio}
            size="small"
            variant="outlined"
            sx={{ fontSize: 10 }}
          />
        </Stack>
        <Typography variant="caption" color="text.secondary" sx={{ fontSize: 11 }}>
          {asset.usage}
        </Typography>
      </Stack>
    </Box>
  );
};

/**
 * 카테고리별 에셋 그리드
 */
const CategoryAssets = ({ category, onCopy }) => {
  const { images, videos, path } = category;

  return (
    <Box sx={{ mb: 4 }}>
      {/* 이미지 */}
      {images.length > 0 && (
        <>
          <Typography variant="subtitle2" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
            <Image size={16} /> Images ({images.length})
          </Typography>
          <Grid container spacing={2} sx={{ mb: 3 }}>
            {images.map((asset) => (
              <Grid size={{ xs: 6, sm: 4, md: 3 }} key={asset.name}>
                <AssetCard asset={asset} type="image" basePath={path} onCopy={onCopy} />
              </Grid>
            ))}
          </Grid>
        </>
      )}

      {/* 비디오 */}
      {videos.length > 0 && (
        <>
          <Typography variant="subtitle2" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
            <Video size={16} /> Videos ({videos.length})
          </Typography>
          <Grid container spacing={2}>
            {videos.map((asset) => (
              <Grid size={{ xs: 6, sm: 4, md: 3 }} key={asset.name}>
                <AssetCard asset={asset} type="video" basePath={path} onCopy={onCopy} />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Box>
  );
};

/**
 * Media Assets 문서
 */
export const Docs = {
  render: () => {
    const [activeTab, setActiveTab] = useState(0);
    const [snackbar, setSnackbar] = useState({ open: false, message: '' });

    const categoryKeys = Object.keys(assetCategories);
    const activeCategory = assetCategories[categoryKeys[activeTab]];

    const handleCopy = (text, name) => {
      navigator.clipboard.writeText(text);
      setSnackbar({ open: true, message: `${name} import 경로 복사됨` });
    };

    // 전체 에셋 카운트
    const totalImages = Object.values(assetCategories).reduce((sum, cat) => sum + cat.images.length, 0);
    const totalVideos = Object.values(assetCategories).reduce((sum, cat) => sum + cat.videos.length, 0);

    return (
      <>
        <DocumentTitle
          title="Media Assets"
          status="Available"
          note={`${totalImages} images, ${totalVideos} videos`}
          brandName="Bellite"
          systemName="Data"
          version="1.0"
        />
        <PageContainer>
          {/* 제목 + 개요 */}
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
            Media Assets
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            Bellite 프로젝트에서 사용하는 이미지 및 비디오 에셋 카탈로그입니다.
          </Typography>

          {/* 통계 */}
          <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
            <Chip icon={<Image size={14} />} label={`${totalImages} Images`} />
            <Chip icon={<Video size={14} />} label={`${totalVideos} Videos`} />
          </Stack>

          {/* 탭 */}
          <Tabs
            value={activeTab}
            onChange={(_, v) => setActiveTab(v)}
            sx={{ mb: 3, borderBottom: 1, borderColor: 'divider' }}
          >
            {categoryKeys.map((key) => (
              <Tab
                key={key}
                label={
                  <Stack direction="row" spacing={1} alignItems="center">
                    <span>{assetCategories[key].name}</span>
                    <Chip
                      label={assetCategories[key].images.length + assetCategories[key].videos.length}
                      size="small"
                      sx={{ height: 18, fontSize: 10 }}
                    />
                  </Stack>
                }
              />
            ))}
          </Tabs>

          {/* 카테고리 설명 */}
          <Box sx={{ p: 2, bgcolor: 'grey.50', border: '1px solid', borderColor: 'divider', mb: 3 }}>
            <Stack direction="row" spacing={2} alignItems="flex-start">
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                  {activeCategory.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {activeCategory.description}
                </Typography>
                <Typography variant="caption" sx={{ fontFamily: 'monospace', color: 'secondary.main', mt: 0.5, display: 'block' }}>
                  {activeCategory.path}
                </Typography>
              </Box>
            </Stack>
          </Box>

          {/* 에셋 그리드 */}
          <CategoryAssets category={activeCategory} onCopy={handleCopy} />

          {/* 사용법 */}
          <SectionTitle title="Usage" description="에셋 import 방법" />
          <Box
            component="pre"
            sx={{
              backgroundColor: 'grey.100',
              p: 2,
              fontSize: 12,
              fontFamily: 'monospace',
              overflow: 'auto',
            }}
          >
{`// 중앙 집중화된 미디어 에셋 import
import { mediaAssets } from '@/data/mediaAssets';

// 사용 예시 - 이미지
<img src={mediaAssets.hero.image} alt="Hero" />

// 사용 예시 - 비디오
<video src={mediaAssets.hero.video} autoPlay muted loop />

// AspectMedia 컴포넌트와 함께 사용
import AspectMedia from '@/components/media/AspectMedia';

<AspectMedia
  src={mediaAssets.hero.image}
  alt="Hero background"
  aspectRatio="16/9"
/>

<AspectMedia
  type="video"
  src={mediaAssets.hero.video}
  aspectRatio="16/9"
  isAutoPlay
  isMuted
  isLoop
/>

// Silhouette 슬라이드 에셋 순회
{mediaAssets.silhouette.slideArray.map(slide => (
  <AspectMedia
    key={slide.id}
    type="video"
    src={slide.video}
    aspectRatio="3/2"
  />
))}`}
          </Box>
        </PageContainer>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={2000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          message={snackbar.message}
        />
      </>
    );
  },
};
