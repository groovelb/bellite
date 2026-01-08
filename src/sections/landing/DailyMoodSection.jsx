import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { SectionContainer } from '../../components/container/SectionContainer';
import BrokenGridGallery from '../../components/layout/BrokenGridGallery';
import { mediaAssets } from '../../data/mediaAssets';

/**
 * DailyMoodSection - Coming Soon 섹션 (브로큰 그리드)
 *
 * 9개의 이미지를 비정형 레이아웃으로 배치하여
 * 브랜드 무드를 시각적으로 표현합니다.
 *
 * 이미지 소스:
 * - daily-mood: 5개
 * - signature: 2개
 * - silhouette: 2개
 *
 * Example usage:
 * <DailyMoodSection />
 */

// 이미지 배치 설정 (브로큰 그리드 패턴)
// 9개 이미지를 화면 내에서 분산 배치
const GALLERY_ITEMS = [
  // daily-mood 이미지들
  {
    id: 'morning',
    src: mediaAssets.dailyMood.images.morning,
    alt: 'Morning ritual',
    size: 'md',
    position: { top: '8%', left: '5%', zIndex: 2, rotate: -1 },
  },
  {
    id: 'desk',
    src: mediaAssets.dailyMood.images.desk,
    alt: 'At the desk',
    size: 'sm',
    position: { top: '12%', left: '30%', zIndex: 1, rotate: 1 },
  },
  {
    id: 'commute',
    src: mediaAssets.dailyMood.images.commute,
    alt: 'Commute',
    size: 'xs',
    position: { top: '5%', right: '20%', zIndex: 3, rotate: -2 },
  },
  {
    id: 'afterBallet',
    src: mediaAssets.dailyMood.images.afterBallet,
    alt: 'After ballet',
    size: 'sm',
    position: { top: '55%', left: '8%', zIndex: 2, rotate: 2 },
  },
  {
    id: 'home',
    src: mediaAssets.dailyMood.images.home,
    alt: 'At home',
    size: 'md',
    position: { top: '58%', left: '28%', zIndex: 1, rotate: -1 },
  },
  // signature 이미지들
  {
    id: 'moodboard1',
    src: mediaAssets.signature.images.moodboard1,
    alt: 'Moodboard 1',
    size: 'sm',
    position: { top: '10%', right: '8%', zIndex: 2, rotate: 1 },
  },
  {
    id: 'moodboard2',
    src: mediaAssets.signature.images.moodboard2,
    alt: 'Moodboard 2',
    size: 'xs',
    position: { top: '42%', right: '12%', zIndex: 3, rotate: -1 },
  },
  // silhouette 이미지들
  {
    id: 's1',
    src: mediaAssets.silhouette.slides.crosswalk.image,
    alt: 'Silhouette 1',
    size: 'sm',
    position: { top: '32%', left: '5%', zIndex: 1, rotate: -1 },
  },
  {
    id: 's2',
    src: mediaAssets.silhouette.slides.subway.image,
    alt: 'Silhouette 2',
    size: 'md',
    position: { top: '55%', right: '5%', zIndex: 2, rotate: 1 },
  },
];

// 애니메이션 variants
const titleVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

function DailyMoodSection() {
  return (
    <SectionContainer
      maxWidth={false}
      disableGutters
      disablePadding
      sx={{
        // bgcolor: 'brand.soul',
        position: 'relative',
        overflow: 'hidden',
        height: '100vh',
      }}
    >
      {/* Coming Soon 타이틀 - 정중앙 */}
      <Box
        component={motion.div}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={titleVariants}
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          zIndex: 10,
        }}
      >
        <Typography
          component="h1"
          variant="h1"
          sx={{
            fontFamily: 'Adamina, Georgia, serif',
            fontSize: { xs: '2.5rem', sm: '4rem', md: '6rem', lg: '8rem' },
            fontWeight: 400,
            color: 'brand.urban',
            letterSpacing: '-0.03em',
            textTransform: 'uppercase',
          }}
        >
          Coming Soon
        </Typography>
      </Box>

      {/* 브로큰 그리드 갤러리 */}
      <BrokenGridGallery
        items={GALLERY_ITEMS}
        height={100}
        imageScale={0.7}
        spread={1}
      />
    </SectionContainer>
  );
}

export default DailyMoodSection;
