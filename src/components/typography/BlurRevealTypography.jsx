import { useRef } from 'react';
import { Box } from '@mui/material';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * BlurRevealTypography - 스크롤 기반 블러 해제 타이포그래피
 *
 * 스크롤 진행에 따라 텍스트가 블러 상태에서 선명하게 전환됩니다.
 * 발레의 '선'이 점차 또렷해지는 순간을 시각적으로 표현합니다.
 *
 * 동작 흐름:
 * 1. 컴포넌트가 뷰포트에 진입하기 전 - 블러 상태 (filter: blur, opacity 낮음)
 * 2. 스크롤이 진행됨에 따라 - 점진적으로 블러 해제
 * 3. threshold 지점 도달 시 - 완전히 선명한 상태
 *
 * Props:
 * @param {node} children - 블러 효과를 적용할 콘텐츠 [Required]
 * @param {number} blurAmount - 초기 블러 정도 (px 단위) [Optional, 기본값: 10]
 * @param {number} startOpacity - 시작 불투명도 (0-1) [Optional, 기본값: 0.3]
 * @param {string} offset - 스크롤 감지 오프셋 [Optional, 기본값: "start end"]
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <BlurRevealTypography blurAmount={12}>
 *   <Typography variant="h2">섬세한 디테일</Typography>
 * </BlurRevealTypography>
 */
function BlurRevealTypography({
  children,
  blurAmount = 10,
  startOpacity = 0.3,
  offset = 'start end',
  sx,
}) {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: [offset, 'end start'],
  });

  // 블러 값 변환: blurAmount → 0
  const blur = useTransform(
    scrollYProgress,
    [0, 0.4, 0.6],
    [blurAmount, blurAmount * 0.3, 0]
  );

  // 불투명도 변환: startOpacity → 1
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.6],
    [startOpacity, 0.6, 1]
  );

  // Y축 이동: 미세한 상승 효과
  const y = useTransform(
    scrollYProgress,
    [0, 0.6],
    [20, 0]
  );

  return (
    <Box
      ref={containerRef}
      sx={{
        position: 'relative',
        ...sx,
      }}
    >
      <motion.div
        style={{
          filter: useTransform(blur, (v) => `blur(${v}px)`),
          opacity,
          y,
          willChange: 'filter, opacity, transform',
        }}
      >
        {children}
      </motion.div>
    </Box>
  );
}

export default BlurRevealTypography;
