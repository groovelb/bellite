import { useRef } from 'react';
import { Box } from '@mui/material';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * StickyBackground - 고정 배경 + 콘텐츠 스크롤 레이아웃
 *
 * 배경은 고정된 상태로 유지되고, 콘텐츠가 스크롤에 따라 이동합니다.
 * 콘텐츠가 목표 위치에 도달하면 전체 섹션이 함께 스크롤됩니다.
 *
 * 동작 흐름:
 * 1. [Phase 1] 배경 고정, 콘텐츠가 초기 위치에서 목표 위치로 이동
 * 2. [Phase 2] 콘텐츠가 목표에 도달하면 전체 섹션이 스크롤
 *
 * Props:
 * @param {React.ReactNode} background - 배경 요소 (이미지, 비디오 등) [Required]
 * @param {React.ReactNode} children - 스크롤될 콘텐츠 [Required]
 * @param {number} scrollMultiplier - 스크롤 높이 배율 (2 = 200vh) [Optional, 기본값: 2]
 * @param {string} contentStart - 콘텐츠 시작 위치 ('visible' | 'hidden' | 'center') [Optional, 기본값: 'visible']
 * @param {string} contentEnd - 콘텐츠 도착 위치 ('top' | 'center') [Optional, 기본값: 'top']
 * @param {number} contentOffset - 콘텐츠 상단/하단 오프셋 (vh 단위) [Optional, 기본값: 0]
 * @param {boolean} fadeIn - 콘텐츠 fade-in 효과 [Optional, 기본값: false]
 * @param {Object} overlayStyle - 배경 위 오버레이 스타일 [Optional]
 * @param {Object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * // 콘텐츠가 하단에서 상단으로 스크롤
 * <StickyBackground
 *   background={<img src="/bg.jpg" ... />}
 *   contentStart="visible"
 *   contentEnd="top"
 * >
 *   <Content />
 * </StickyBackground>
 */
function StickyBackground({
  background,
  children,
  scrollMultiplier = 2,
  contentStart = 'visible',
  contentEnd = 'top',
  contentOffset = 0,
  fadeIn = false,
  overlayStyle = {},
  sx = {},
}) {
  const containerRef = useRef(null);

  // 스크롤 진행도 추적
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // 콘텐츠 Y 위치 계산
  // visible: 0 → -70vh (하단에서 상단으로)
  // hidden: 100vh → 0 (화면 밖에서 안으로)
  // center: 0 → -50vh (중앙에서 상단으로)
  // 콘텐츠 이동 완료 시점 = sticky 해제 시점 (scrollYProgress = 1)
  const getContentYRange = () => {
    if (contentStart === 'hidden') {
      // 화면 밖에서 시작, 화면 안으로 이동
      const endY = contentEnd === 'center' ? '25vh' : `${contentOffset}vh`;
      return ['100vh', endY];
    } else if (contentStart === 'center') {
      // 중앙에서 시작, 상단으로 이동
      // 콘텐츠가 중앙(0)에서 상단(-50vh)으로 스크롤
      const moveDistance = contentEnd === 'center' ? 0 : 50;
      const endY = -moveDistance + contentOffset;
      return ['0vh', `${endY}vh`];
    } else {
      // 하단에서 시작 (visible), 상단으로 이동
      // 콘텐츠가 하단에 있다가 위로 스크롤
      const moveDistance = contentEnd === 'center' ? 35 : 70;
      const endY = -moveDistance + contentOffset;
      return ['0vh', `${endY}vh`];
    }
  };

  const contentY = useTransform(
    scrollYProgress,
    [0, 1],
    getContentYRange()
  );

  // 콘텐츠 opacity (선택적 fade-in)
  // 스크롤 초반 30%에서 fade-in 완료
  const contentOpacity = useTransform(
    scrollYProgress,
    [0, 0.3],
    fadeIn ? [0.3, 1] : [1, 1]
  );

  return (
    <Box
      ref={containerRef}
      component="section"
      sx={{
        // 스크롤 영역 높이 (scrollMultiplier * 100vh)
        height: `${scrollMultiplier * 100}vh`,
        position: 'relative',
        ...sx,
      }}
    >
      {/* Sticky 컨테이너 - 뷰포트에 고정 */}
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          overflow: 'hidden',
        }}
      >
        {/* 배경 레이어 */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 0,
          }}
        >
          {background}
        </Box>

        {/* 오버레이 레이어 (선택적) */}
        {overlayStyle && Object.keys(overlayStyle).length > 0 && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 1,
              ...overlayStyle,
            }}
          />
        )}

        {/* 콘텐츠 레이어 - 스크롤에 따라 이동 */}
        <motion.div
          style={{
            y: contentY,
            opacity: contentOpacity,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 2,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: contentStart === 'center' ? 'center' : (contentStart === 'visible' ? 'flex-end' : 'flex-start'),
          }}
        >
          {children}
        </motion.div>
      </Box>
    </Box>
  );
}

export default StickyBackground;
