import { useRef } from 'react';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { motion, useScroll, useTransform } from 'framer-motion';
import VideoSlide from '../../components/media/VideoSlide';
import SectionTitle from '../../components/typography/SectionTitle';
import { BRAND_COLORS } from '../../styles/themes/theme';
import landingContent from '../../data/landingPageContent.json';

// 비디오 import (Vite 정적 에셋)
import s2Video1 from '../../assets/s2/s1.mp4';
import s2Video2 from '../../assets/s2/s2.mp4';
import s2Video3 from '../../assets/s2/s3.mp4';
import s2Video4 from '../../assets/s2/s4.mp4';

/**
 * SilhouetteSection - Section 2: 무너지지 않는 실루엣
 *
 * 일상과 발레의 동작이 겹쳐지는 찰나를 가로 스크롤로 표현합니다.
 * 가방의 무게 중심이 사용자의 바른 자세를 지지해주는 모습을 시각화합니다.
 *
 * 브랜드 핵심 가치:
 * - 무너지지 않는 선 (Unbroken Line)
 * - 내재적 자부심 (Internalized Discipline)
 *
 * Example usage:
 * <SilhouetteSection />
 */

// JSON에서 섹션 데이터 추출
const sectionData = landingContent.sections.find(s => s.id === 'silhouette');

// 비디오 파일명 → import 매핑
const VIDEO_MAP = {
  's1.mp4': s2Video1,
  's2.mp4': s2Video2,
  's3.mp4': s2Video3,
  's4.mp4': s2Video4,
};

// 슬라이드 데이터 (JSON + 비디오 매핑)
const SLIDES = sectionData.slides.map(slide => ({
  ...slide,
  videoSrc: VIDEO_MAP[slide.video],
}));

/**
 * VideoSlideContainer - 비디오 스크러빙 슬라이드 컨테이너
 *
 * - 뷰포트 진입 시 비디오 활성화
 * - 활성화 전: ribbon 배경색 플레이스홀더
 * - 세로 스크롤 진행도 기반 비디오 스크러빙
 * - 텍스트 오버레이 유지
 *
 * Props:
 * @param {Object} slide - 슬라이드 데이터 (videoSrc, titleEn, titleKo, description) [Required]
 * @param {string} width - 컨테이너 너비 [Optional, 기본값: '60vw']
 * @param {number} slideIndex - 슬라이드 인덱스 [Required]
 * @param {number} totalSlides - 전체 슬라이드 수 [Required]
 */
function VideoSlideContainer({ slide, width = '60vw', slideIndex, totalSlides }) {
  return (
    <VideoSlide
      src={slide.videoSrc}
      width={width}
      placeholderColor={BRAND_COLORS.ribbon}
      ratio="3/2"
      slideIndex={slideIndex}
      totalSlides={totalSlides}
    >
      {/* 텍스트 오버레이 */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          p: { xs: 3, sm: 4, md: 5 },
          background: 'linear-gradient(to top, rgba(15, 15, 15, 0.95) 0%, rgba(15, 15, 15, 0.7) 50%, rgba(15, 15, 15, 0.3) 80%, transparent 100%)',
          zIndex: 1,
        }}
      >
        {/* 영문 타이틀 - h3 variant (Adamina 세리프) */}
        <Typography
          component={motion.h3}
          variant="h3"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.75, once: true }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          sx={{
            fontWeight: 700,
            color: 'brand.soul',
            m: 0,
            mb: 2,
          }}
        >
          {slide.titleEn}
        </Typography>
        {/* 한글 설명 - body2 variant (Pretendard) */}
        <Typography
          component={motion.p}
          variant="body2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.75, once: true }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.4, 0, 0.2, 1] }}
          sx={{
            color: 'rgba(255, 241, 254, 0.85)',
            lineHeight: 1.6,
            m: 0,
            maxWidth: '480px',
          }}
        >
          {slide.description}
        </Typography>
      </Box>
    </VideoSlide>
  );
}

// 슬라이드 설정 (반응형)
const SLIDE_CONFIG = {
  mobile: { width: 85, gap: 3, padding: 4 },   // vw 단위
  desktop: { width: 60, gap: 2, padding: 3 },  // vw 단위
};

function SilhouetteSection() {
  const containerRef = useRef(null);
  const totalSlides = SLIDES.length;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // 반응형 슬라이드 설정
  const config = isMobile ? SLIDE_CONFIG.mobile : SLIDE_CONFIG.desktop;
  const slideWidth = `${config.width}vw`;
  const slideGap = `${config.gap}vw`;
  const slidePadding = `${config.padding}vw`;

  // 슬라이드 너비/간격/패딩 값 추출
  const slideWidthValue = config.width;
  const gapValue = config.gap;
  const paddingValue = config.padding;

  // 콘텐츠 너비 계산
  const totalGapWidth = gapValue * Math.max(0, totalSlides - 1);
  const contentWidth = (slideWidthValue * totalSlides) + totalGapWidth;

  // 스크롤 거리 계산
  const availableViewport = 100 - (paddingValue * 2);
  const scrollDistance = Math.max(0, contentWidth - availableViewport);
  const totalTrackWidth = contentWidth + (paddingValue * 2);
  const scrollHeight = Math.max(100, totalTrackWidth);

  // 스크롤 진행도 추적
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // 가로 이동 변환
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ['0vw', `${-scrollDistance}vw`]
  );

  return (
    <Box
      ref={containerRef}
      component="section"
      sx={{
        height: `${scrollHeight}vh`,
        position: 'relative',
      }}
    >
      {/* Sticky 컨테이너 - 헤더 + 슬라이드 트랙 */}
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: { xs: 4, md: 16 },
          py: { xs: 4, md: 6 },
        }}
      >
        {/* 섹션 타이틀 */}
        <SectionTitle title="Unbroken Line" />

        {/* 가로 슬라이드 트랙 */}
        <Box
          sx={{
            overflow: 'hidden',
          }}
        >
          <motion.div
            style={{
              x,
              display: 'flex',
              gap: slideGap,
              alignItems: 'center',
              paddingLeft: slidePadding,
              paddingRight: slidePadding,
            }}
          >
            {SLIDES.map((slide, index) => (
              <Box
                key={slide.id}
                sx={{
                  position: 'relative',
                  width: 'fit-content',
                  height: 'fit-content',
                  flexShrink: 0,
                }}
              >
                <VideoSlideContainer
                  slide={slide}
                  width={slideWidth}
                  slideIndex={index}
                  totalSlides={totalSlides}
                />
              </Box>
            ))}
          </motion.div>
        </Box>
      </Box>
    </Box>
  );
}

export default SilhouetteSection;
