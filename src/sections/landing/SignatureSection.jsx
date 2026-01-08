import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { motion } from 'framer-motion';
import { SectionContainer } from '../../components/container/SectionContainer';
import landingContent from '../../data/landingPageContent.json';
import { mediaAssets } from '../../data/mediaAssets';

// Motion 컴포넌트
const MotionBox = motion.create(Box);
const MotionTypography = motion.create(Typography);
const MotionGrid = motion.create(Grid);

// 애니메이션 variants
const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

/**
 * SignatureSection - Section 3+4 통합: 구겨지지 않는 보관 & 심미적 표현
 *
 * 2x2 그리드 레이아웃으로 이미지와 텍스트를 교차 배치합니다.
 * - 좌상: 이미지 (Archive)
 * - 우상: 텍스트 (Archive - 구겨지지 않는 보관)
 * - 좌하: 텍스트 (Signature - 심미적 표현)
 * - 우하: 이미지 (Signature)
 *
 * Example usage:
 * <SignatureSection />
 */

// JSON에서 섹션 데이터 추출
const archiveData = landingContent.sections.find(s => s.id === 'archive');
const signatureData = landingContent.sections.find(s => s.id === 'signature');

// 브랜드 콘텐츠
const CONTENT = {
  archive: {
    h1: archiveData.content.h1,
    h2: archiveData.content.h2,
    description: archiveData.content.description,
  },
  signature: {
    h1: signatureData.content.h1,
    h2: signatureData.content.h2,
    description: signatureData.content.description,
  },
};

// 이미지 설정
const IMAGES = {
  archive: mediaAssets.signature.images.aerialShot,
  signature: mediaAssets.signature.images.moodboard1,
};

/**
 * TextBlock - 텍스트 콘텐츠 블록 (fade-in 효과 적용)
 */
function TextBlock({ h1, h2, description, align = 'left' }) {
  return (
    <MotionBox
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        px: { xs: 4, sm: 6, md: 8, lg: 10 },
        py: { xs: 6, md: 8 },
      }}
    >
      {/* H1 */}
      <MotionTypography
        component="h2"
        variants={fadeInUp}
        sx={{
          fontFamily: 'Adamina, Georgia, serif',
          fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem', lg: '2.25rem' },
          fontWeight: 700,
          color: 'brand.urban',
          lineHeight: 1.3,
          mb: 2,
          textAlign: align,
          wordBreak: 'keep-all',
        }}
      >
        {h1}
      </MotionTypography>

      {/* H2 */}
      <MotionTypography
        component="h3"
        variants={fadeInUp}
        sx={{
          fontFamily: 'Pretendard Variable, sans-serif',
          fontSize: { xs: '0.9rem', md: '1rem' },
          fontWeight: 500,
          color: 'brand.ribbon',
          letterSpacing: '0.02em',
          mb: 3,
          textAlign: align,
        }}
      >
        {h2}
      </MotionTypography>

      {/* Description */}
      <MotionTypography
        variants={fadeInUp}
        sx={{
          fontFamily: 'Pretendard Variable, sans-serif',
          fontSize: { xs: '0.875rem', md: '0.95rem' },
          fontWeight: 400,
          color: 'brand.urban',
          opacity: 0.75,
          lineHeight: 1.8,
          textAlign: align,
          wordBreak: 'keep-all',
          maxWidth: 480,
          mx: align === 'center' ? 'auto' : 0,
          ml: align === 'right' ? 'auto' : 0,
        }}
      >
        {description}
      </MotionTypography>
    </MotionBox>
  );
}

/**
 * ImageBlock - 이미지 블록 (fade-in 효과 적용)
 */
function ImageBlock({ image, alt }) {
  return (
    <MotionBox
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      sx={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        component="img"
        src={image}
        alt={alt}
        sx={{
          width: '100%',
          height: 'auto',
          display: 'block',
        }}
      />
    </MotionBox>
  );
}

function SignatureSection() {
  return (
    <SectionContainer maxWidth={false} disableGutters disablePadding>
      <Grid container>
        {/* 좌상: 이미지 (Archive) */}
        <Grid
          size={{ xs: 12, md: 6 }}
          sx={{ order: { xs: 1, md: 1 } }}
        >
          <ImageBlock image={IMAGES.archive} alt="발레 오브제 수납" />
        </Grid>

        {/* 우상: 텍스트 (Archive) */}
        <Grid
          size={{ xs: 12, md: 6 }}
          sx={{ order: { xs: 2, md: 2 } }}
        >
          <TextBlock
            h1={CONTENT.archive.h1}
            h2={CONTENT.archive.h2}
            description={CONTENT.archive.description}
            align="left"
          />
        </Grid>

        {/* 좌하: 텍스트 (Signature) */}
        <Grid
          size={{ xs: 12, md: 6 }}
          sx={{ order: { xs: 4, md: 3 } }}
        >
          <TextBlock
            h1={CONTENT.signature.h1}
            h2={CONTENT.signature.h2}
            description={CONTENT.signature.description}
            align="right"
          />
        </Grid>

        {/* 우하: 이미지 (Signature) */}
        <Grid
          size={{ xs: 12, md: 6 }}
          sx={{ order: { xs: 3, md: 4 } }}
        >
          <ImageBlock image={IMAGES.signature} alt="자수 디테일" />
        </Grid>
      </Grid>
    </SectionContainer>
  );
}

export default SignatureSection;
