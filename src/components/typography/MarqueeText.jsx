import { useRef } from 'react';
import { Box, Typography } from '@mui/material';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * MarqueeText - 스크롤 연동 무한 텍스트 컴포넌트
 *
 * 페이지 스크롤에 따라 텍스트가 수평으로 이동하는 키네틱 타이포그래피 효과입니다.
 * 스크롤 방향에 따라 텍스트 이동 방향이 결정됩니다.
 *
 * 동작 모드:
 * 1. Uncontrolled (기본): 자체 컨테이너 기준 스크롤 추적
 * 2. Controlled: 외부에서 scrollProgress prop으로 Motion Value 주입
 *
 * 동작 흐름:
 * 1. 스크롤 다운 → scrollDirection에 따라 텍스트 이동 (left 또는 right)
 * 2. 스크롤 업 → 반대 방향으로 텍스트 이동
 * 3. 스크롤 정지 → 텍스트도 정지
 *
 * Props:
 * @param {string} children - 표시할 텍스트 [Required]
 * @param {string} scrollDirection - 스크롤 다운 시 이동 방향 ('left' | 'right') [Optional, 기본값: 'left']
 * @param {number} speed - 스크롤 대비 이동 속도 배율 [Optional, 기본값: 0.5]
 * @param {MotionValue} scrollProgress - 외부 스크롤 진행도 (0-1) [Optional, Controlled 모드]
 * @param {string} separator - 텍스트 사이 구분자 [Optional, 기본값: ' — ']
 * @param {number} repeat - 텍스트 반복 횟수 [Optional, 기본값: 6]
 * @param {string} variant - Typography variant [Optional, 기본값: 'h2']
 * @param {string} letterSpacing - 자간 [Optional, 기본값: '-0.03em']
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * // Uncontrolled - 자체 스크롤 추적
 * <MarqueeText>Unbroken Line</MarqueeText>
 *
 * // Controlled - 부모의 스크롤 진행도 사용
 * const { scrollYProgress } = useScroll({ target: sectionRef });
 * <MarqueeText scrollProgress={scrollYProgress}>Unbroken Line</MarqueeText>
 */

function MarqueeText({
  children,
  scrollDirection = 'left',
  speed = 0.5,
  scrollProgress: externalScrollProgress,
  separator = ' — ',
  repeat = 6,
  variant = 'h2',
  letterSpacing = '-0.03em',
  sx = {},
}) {
  const containerRef = useRef(null);

  // Uncontrolled 모드: 자체 스크롤 추적
  const { scrollYProgress: internalScrollProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Controlled vs Uncontrolled 선택
  const scrollProgress = externalScrollProgress || internalScrollProgress;

  // 스크롤 진행도 → x 이동 변환
  // speed 0.5 = 스크롤 100% 시 텍스트 25% 이동
  const moveDistance = 50 * speed;

  const x = useTransform(
    scrollProgress,
    [0, 1],
    scrollDirection === 'left'
      ? [`0%`, `-${moveDistance}%`]
      : [`-${moveDistance}%`, `0%`]
  );

  // 반복 텍스트 생성 (이음새 없는 루프용)
  const repeatedText = Array(repeat)
    .fill(children)
    .join(separator) + separator;

  return (
    <Box
      ref={containerRef}
      sx={{
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        width: '100%',
        ...sx,
      }}
    >
      <motion.div
        style={{
          x,
          display: 'inline-flex',
        }}
      >
        {/* 메인 텍스트 */}
        <Typography
          component="span"
          variant={variant}
          sx={{
            fontFamily: 'Adamina, Georgia, serif',
            fontWeight: 700,
            color: 'brand.urban',
            lineHeight: 1.25,
            letterSpacing,
            display: 'inline-block',
          }}
        >
          {repeatedText}
        </Typography>

        {/* 이음새 없는 루프를 위한 복제본 */}
        <Typography
          component="span"
          variant={variant}
          aria-hidden="true"
          sx={{
            fontFamily: 'Adamina, Georgia, serif',
            fontWeight: 700,
            color: 'brand.urban',
            lineHeight: 1.25,
            letterSpacing,
            display: 'inline-block',
          }}
        >
          {repeatedText}
        </Typography>
      </motion.div>
    </Box>
  );
}

export default MarqueeText;
