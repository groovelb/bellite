import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { motion } from 'framer-motion';
import { Minus, Archive, Sparkle } from 'lucide-react';
import { ContentArea } from '../../components/container/ContentArea';
import LineGrid from '../../components/layout/LineGrid';;
import landingContent from '../../data/landingPageContent.json';

/**
 * ValuePillarsSection - Section 2: The Three Promises (브릿지 섹션)
 *
 * Hero의 감성적 선언을 구체적인 약속으로 전환하는 브릿지 섹션입니다.
 * 3개의 핵심 가치를 수직형 카드 레이아웃으로 표현합니다.
 *
 * 동작 흐름:
 * 1. 섹션 진입 시 헤더 텍스트가 fade-in
 * 2. 3개의 카드가 순차적으로 slide-up + fade-in (stagger)
 * 3. 각 카드 호버 시 미세한 lift 효과
 *
 * 브랜드 핵심 가치:
 * - Unbroken Line: 무너지지 않는 실루엣 → Silhouette 섹션 연결
 * - Thoughtful Archive: 구겨지지 않는 보관 → Archive 섹션 연결
 * - Internalized Discipline: 내재적 자부심 → Signature 섹션 연결
 *
 * Example usage:
 * <ValuePillarsSection />
 */

// JSON에서 섹션 데이터 추출
const sectionData = landingContent.sections.find(s => s.id === 'valuePillars');

// 브랜드 콘텐츠
const CONTENT = {
  h1: sectionData.content.h1,
  pillars: sectionData.pillars,
};

// 아이콘 매핑
const ICON_MAP = {
  horizontalLine: Minus,
  archive: Archive,
  needle: Sparkle,
};

// 애니메이션 variants - 은은한 fade-in
const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

/**
 * PillarCard - 개별 가치 카드 컴포넌트
 *
 * Props:
 * @param {Object} pillar - pillar 데이터 [Required]
 * @param {number} index - 카드 인덱스 [Required]
 */
function PillarCard({ pillar, index }) {
  const IconComponent = ICON_MAP[pillar.icon] || Minus;

  return (
    <Box
      component={motion.article}
      variants={cardVariants}
      whileHover={{
        y: -8,
        transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
      }}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        px: { xs: 2, sm: 2.5, md: 3 },
        py: { xs: 3, sm: 4, md: 0 },
        position: 'relative',
        cursor: 'default',
      }}
    >
      {/* 순번 표시 */}
      <Typography
        component="span"
        sx={{
          fontFamily: 'Adamina, Georgia, serif',
          fontSize: '0.75rem',
          color: 'brand.ribbon',
          letterSpacing: '0.15em',
          mb: 1.5,
        }}
      >
        0{index + 1}
      </Typography>

      {/* 아이콘 */}
      <Box
        sx={{
          width: 44,
          height: 44,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 2,
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            inset: -3,
            border: '1px solid',
            borderColor: 'brand.ribbon',
            opacity: 0.2,
          },
        }}
      >
        <IconComponent
          size={22}
          strokeWidth={1.25}
          style={{ color: '#0F0F0F' }}
        />
      </Box>

      {/* 영문 타이틀 */}
      <Typography
        component="h3"
        sx={{
          fontFamily: 'Adamina, Georgia, serif',
          fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' },
          fontWeight: 700,
          color: 'brand.urban',
          letterSpacing: '0.02em',
          mb: 0.75,
        }}
      >
        {pillar.titleEn}
      </Typography>

      {/* 한글 타이틀 */}
      <Typography
        component="h4"
        sx={{
          fontFamily: 'Pretendard Variable, sans-serif',
          fontSize: { xs: '0.85rem', sm: '0.9rem', md: '1rem' },
          fontWeight: 600,
          color: 'brand.ribbon',
          letterSpacing: '0.04em',
          mb: 1.5,
        }}
      >
        {pillar.titleKo}
      </Typography>

      {/* 구분선 */}
      <Box
        sx={{
          width: 24,
          height: 1,
          bgcolor: 'brand.urban',
          opacity: 0.12,
          mb: 1.5,
        }}
      />

      {/* 설명 */}
      <Typography
        sx={{
          fontFamily: 'Pretendard Variable, sans-serif',
          fontSize: { xs: '0.8125rem', sm: '0.875rem', md: '0.9375rem' },
          fontWeight: 400,
          color: 'brand.urban',
          opacity: 0.65,
          lineHeight: 1.7,
          maxWidth: { xs: 280, md: 260 },
          wordBreak: 'keep-all',
        }}
      >
        {pillar.description}
      </Typography>
    </Box>
  );
}


function ValuePillarsSection() {
  return (
    <Box
      component={motion.section}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={sectionVariants}
      sx={{
        position: 'relative',
        py: { xs: 5, sm: 6, md: 7, lg: 8 },
        overflow: 'hidden',
        borderBottom: '1px solid',
        borderColor: 'brand.urban',
      }}
    >
      <ContentArea maxWidth="xl">
        <Box
          component={motion.div}
          variants={containerVariants}
        > 
          {/* 카드 그리드 */}
          <LineGrid
            container
            gap={0}
            borderColor="brand.urban"
            component={motion.div}
            variants={containerVariants}
          >
            {CONTENT.pillars.map((pillar, index) => (
              <Grid
                key={pillar.id}
                size={{ xs: 12, sm: 12, md: 4 }}
              >
                <PillarCard pillar={pillar} index={index} />
              </Grid>
            ))}
          </LineGrid>
        </Box>
      </ContentArea>
    </Box>
  );
}

export default ValuePillarsSection;
