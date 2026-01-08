import { Box, Typography, Container } from '@mui/material';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import landingContent from '../../data/landingPageContent.json';

/**
 * FooterSection - Section 6: Maintain the Line
 *
 * 브랜드 랜딩 페이지의 마지막을 장식하는 클로징 섹션입니다.
 * 미니멀한 레이아웃과 페이드 아웃 효과로 여운을 남깁니다.
 *
 * 브랜드 전용 섹션으로 내부에서 JSON 데이터를 직접 처리합니다.
 *
 * Example usage:
 * <FooterSection />
 */

// JSON에서 섹션 데이터 추출
const sectionData = landingContent.sections.find(s => s.id === 'footer');

// 브랜드 콘텐츠
const CONTENT = {
  h1: sectionData.content.h1,
  h2: sectionData.content.h2,
  brand: landingContent.meta.brand,
  tagline: 'Your Daily Encore',
};

function FooterSection() {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'brand.urban',
        overflow: 'hidden',
      }}
    >
      {/* 상단 그라데이션 (이전 섹션에서 자연스럽게 연결) */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 200,
          background: 'linear-gradient(to bottom, rgba(245, 221, 212, 0.1) 0%, transparent 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* 메인 콘텐츠 */}
      <Container maxWidth="md" sx={{ textAlign: 'center', py: 10 }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
          viewport={{ once: true }}
        >
          {/* 브랜드 슬로건 */}
          <Typography
            variant="h2"
            sx={{
              fontFamily: 'Chandia, Georgia, serif',
              fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
              fontWeight: 400,
              color: 'brand.soul',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              mb: 3,
            }}
          >
            {CONTENT.h1}
          </Typography>

          {/* 서브 메시지 */}
          <Typography
            variant="h5"
            sx={{
              fontFamily: 'Pretendard Variable, sans-serif',
              fontSize: { xs: '1rem', sm: '1.15rem', md: '1.25rem' },
              fontWeight: 300,
              color: 'brand.soul',
              opacity: 0.7,
              letterSpacing: '0.05em',
              mb: 8,
            }}
          >
            {CONTENT.h2}
          </Typography>

          {/* Rose Gold 구분선 */}
          <Box
            sx={{
              width: 60,
              height: 1,
              backgroundColor: 'brand.ribbon',
              mx: 'auto',
              mb: 4,
            }}
          />

          {/* 브랜드명 */}
          <Typography
            sx={{
              fontFamily: 'Chandia, Georgia, serif',
              fontSize: { xs: '1.5rem', md: '2rem' },
              fontWeight: 400,
              color: 'brand.ribbon',
              letterSpacing: '0.1em',
              mb: 1,
            }}
          >
            {CONTENT.brand}
          </Typography>

          {/* 태그라인 */}
          <Typography
            sx={{
              fontFamily: 'Pretendard Variable, sans-serif',
              fontSize: '0.75rem',
              fontWeight: 400,
              color: 'brand.soul',
              opacity: 0.5,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
            }}
          >
            {CONTENT.tagline}
          </Typography>
        </motion.div>
      </Container>

      {/* 하단 정보 */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          py: 4,
          textAlign: 'center',
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <Typography
            sx={{
              fontFamily: 'Pretendard Variable, sans-serif',
              fontSize: '0.7rem',
              fontWeight: 400,
              color: 'brand.soul',
              opacity: 0.3,
              letterSpacing: '0.1em',
            }}
          >
            © {currentYear} {CONTENT.brand}. All rights reserved.
          </Typography>
        </motion.div>
      </Box>

      {/* 하단 페이드 아웃 효과 */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 100,
          background: 'linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.3) 100%)',
          pointerEvents: 'none',
        }}
      />
    </Box>
  );
}

export default FooterSection;
