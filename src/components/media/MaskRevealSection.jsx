import { useRef } from 'react';
import { Box, Typography } from '@mui/material';
import { motion, useScroll, useTransform } from 'framer-motion';
import InteractiveHotspot from '../shared/InteractiveHotspot';

/**
 * MaskRevealSection - 스크롤 기반 마스킹 전환 컴포넌트
 *
 * 스크롤에 따라 첫 번째 이미지가 중앙에서 확장되는 원형 마스크로 전환되며,
 * 두 번째 이미지가 드러나는 효과를 제공합니다.
 * 선택적으로 핫스팟을 추가하여 인터랙티브한 정보 표시가 가능합니다.
 *
 * 동작 흐름:
 * 1. [Phase 1] 첫 번째 이미지 전체 표시
 * 2. [Phase 2] 스크롤 시 중앙에서 원형으로 확장되는 마스크 효과
 * 3. [Phase 3] 마스크 완료 후 두 번째 이미지 표시 + 핫스팟 활성화
 *
 * Props:
 * @param {string} moodboardImage - 첫 번째 이미지 URL [Required]
 * @param {string} revealImage - 마스크 후 표시될 이미지 URL [Required]
 * @param {array} hotspots - 핫스팟 데이터 배열 [Optional]
 * @param {object} content - 텍스트 콘텐츠 { sectionLabel, h1, h2, description } [Optional]
 * @param {number} scrollHeight - 스크롤 영역 높이 (vh 단위) [Optional, 기본값: 200]
 * @param {string} backgroundColor - 배경색 (theme token) [Optional, 기본값: 'brand.soul']
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <MaskRevealSection
 *   moodboardImage="/assets/before.jpg"
 *   revealImage="/assets/after.jpg"
 *   hotspots={[{ position: { x: 30, y: 40 }, label: '포인트', description: '설명' }]}
 *   content={{ h1: '제목', h2: '부제목' }}
 * />
 */
function MaskRevealSection({
  moodboardImage,
  revealImage,
  hotspots = [],
  content = {},
  scrollHeight = 200,
  backgroundColor = 'brand.soul',
  sx = {},
}) {
  const containerRef = useRef(null);

  // 스크롤 진행도 추적
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // 마스크 크기 (0% → 150% - 화면 전체 커버)
  const maskSize = useTransform(scrollYProgress, [0.1, 0.6], ['0%', '150%']);

  // 무드보드 불투명도 (1 → 0)
  const moodboardOpacity = useTransform(scrollYProgress, [0.3, 0.6], [1, 0]);

  // 리빌 이미지 불투명도 (0 → 1)
  const revealOpacity = useTransform(scrollYProgress, [0.4, 0.7], [0, 1]);

  // 텍스트 불투명도 (0 → 1 → 유지)
  const textOpacity = useTransform(scrollYProgress, [0, 0.15, 0.3], [0, 1, 1]);
  const textY = useTransform(scrollYProgress, [0, 0.15], [40, 0]);

  // 핫스팟 활성화 (스크롤 70% 이후)
  const hotspotsActive = useTransform(scrollYProgress, (v) => v > 0.7);

  return (
    <Box
      ref={containerRef}
      component="section"
      sx={{
        position: 'relative',
        height: `${scrollHeight}vh`,
        ...sx,
      }}
    >
      {/* Sticky 컨테이너 */}
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          width: '100%',
          overflow: 'hidden',
          bgcolor: backgroundColor,
        }}
      >
        {/* 첫 번째 이미지 (Phase 1) */}
        <Box
          component={motion.div}
          style={{ opacity: moodboardOpacity }}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(${moodboardImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />

        {/* 중앙 마스킹 원 (Phase 2) */}
        <Box
          component={motion.div}
          style={{
            width: maskSize,
            height: maskSize,
          }}
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            borderRadius: '50%',
            overflow: 'hidden',
          }}
        >
          <Box
            component={motion.div}
            style={{ opacity: revealOpacity }}
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '100vw',
              height: '100vh',
              backgroundImage: `url(${revealImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          />
        </Box>

        {/* 그라데이션 오버레이 */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `linear-gradient(
              180deg,
              rgba(245, 221, 212, 0.3) 0%,
              rgba(245, 221, 212, 0) 30%,
              rgba(245, 221, 212, 0) 70%,
              rgba(245, 221, 212, 0.4) 100%
            )`,
            pointerEvents: 'none',
          }}
        />

        {/* 텍스트 콘텐츠 */}
        <Box
          component={motion.div}
          style={{
            opacity: textOpacity,
            y: textY,
          }}
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            zIndex: 20,
            width: '100%',
            maxWidth: 700,
            px: 3,
          }}
        >
          {/* 섹션 라벨 */}
          {content.sectionLabel && (
            <Typography
              sx={{
                fontFamily: 'Pretendard Variable, sans-serif',
                fontSize: '0.7rem',
                fontWeight: 500,
                color: 'brand.ribbon',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                mb: 2,
              }}
            >
              {content.sectionLabel}
            </Typography>
          )}

          {/* H1 */}
          {content.h1 && (
            <Typography
              variant="h4"
              sx={{
                fontFamily: 'Pretendard Variable, sans-serif',
                fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.5rem' },
                fontWeight: 500,
                color: 'brand.urban',
                letterSpacing: '0.02em',
                lineHeight: 1.6,
                mb: 1.5,
              }}
            >
              {content.h1}
            </Typography>
          )}

          {/* H2 */}
          {content.h2 && (
            <Typography
              variant="body1"
              sx={{
                fontFamily: 'Pretendard Variable, sans-serif',
                fontSize: { xs: '0.85rem', sm: '0.95rem', md: '1rem' },
                fontWeight: 300,
                color: 'brand.urban',
                opacity: 0.7,
                letterSpacing: '0.01em',
                mb: 2,
              }}
            >
              {content.h2}
            </Typography>
          )}

          {/* Description */}
          {content.description && (
            <Typography
              variant="body2"
              sx={{
                fontFamily: 'Pretendard Variable, sans-serif',
                fontSize: { xs: '0.8rem', sm: '0.85rem', md: '0.9rem' },
                fontWeight: 400,
                color: 'brand.urban',
                opacity: 0.6,
                lineHeight: 1.8,
                maxWidth: 500,
                mx: 'auto',
              }}
            >
              {content.description}
            </Typography>
          )}
        </Box>

        {/* 핫스팟 (Phase 3) */}
        <motion.div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            pointerEvents: 'none',
          }}
        >
          {hotspots.map((hotspot, index) => (
            <HotspotWrapper
              key={index}
              hotspot={hotspot}
              isActiveSignal={hotspotsActive}
            />
          ))}
        </motion.div>
      </Box>
    </Box>
  );
}

/**
 * 핫스팟 래퍼 - framer-motion 값 구독
 */
function HotspotWrapper({ hotspot, isActiveSignal }) {
  // motion value를 React state로 변환
  const isActive = isActiveSignal;

  return (
    <motion.div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'auto',
      }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      <InteractiveHotspot
        position={hotspot.position}
        label={hotspot.label}
        description={hotspot.description}
        tooltipPosition={hotspot.tooltipPosition || 'top'}
        isActive={true}
        variant="light"
      />
    </motion.div>
  );
}

export default MaskRevealSection;
