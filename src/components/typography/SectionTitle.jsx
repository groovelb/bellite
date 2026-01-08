import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';

/**
 * SectionTitle - 섹션 타이틀 컴포넌트
 *
 * 랜딩 페이지 섹션의 통일된 타이틀 스타일을 제공합니다.
 * Adamina 세리프 폰트, bold, 중앙 정렬이 기본입니다.
 *
 * Props:
 * @param {string} title - 타이틀 텍스트 (영문 권장) [Required]
 * @param {boolean} animate - framer-motion 애니메이션 사용 여부 [Optional, 기본값: true]
 * @param {string} align - 텍스트 정렬 [Optional, 기본값: 'center']
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <SectionTitle title="Unbroken Line" />
 * <SectionTitle title="The Three Promises" animate={false} />
 */

const titleVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

function SectionTitle({ title, animate = true, align = 'center', sx = {} }) {
  const TitleComponent = animate ? motion.h2 : 'h2';
  const motionProps = animate
    ? {
        initial: 'hidden',
        whileInView: 'visible',
        viewport: { once: true, amount: 0.5 },
        variants: titleVariants,
      }
    : {};

  return (
    <Box
      sx={{
        textAlign: align,
        ...sx,
      }}
    >
      <Typography
        component={TitleComponent}
        {...motionProps}
        sx={{
          fontFamily: 'Adamina, Georgia, serif',
          fontSize: { xs: '1.75rem', sm: '2.25rem', md: '2.75rem' },
          fontWeight: 700,
          color: 'brand.urban',
          lineHeight: 1.25,
          letterSpacing: '-0.01em',
          m: 0,
        }}
      >
        {title}
      </Typography>
    </Box>
  );
}

export default SectionTitle;
