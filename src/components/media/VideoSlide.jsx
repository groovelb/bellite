import { useRef, useState, useEffect, useCallback } from 'react';
import { Box } from '@mui/material';
import { motion } from 'framer-motion';
import VideoScrubbing from './VideoScrubbing';

/**
 * VideoSlide - 가로 스크롤용 비디오 슬라이드 컨테이너
 *
 * HorizontalScroll 내부에서 사용되는 비디오 슬라이드입니다.
 * 세로 스크롤 진행도를 기반으로 각 슬라이드 구간에서 비디오를 스크러빙합니다.
 *
 * 동작 흐름:
 * 1. 슬라이드가 뷰포트에 진입하면 활성화
 * 2. 활성화 전: placeholder 배경색 표시
 * 3. 활성화 후: 세로 스크롤 진행도에 따라 비디오 스크러빙
 * 4. 텍스트 오버레이 순차 애니메이션
 *
 * 진행도 계산 (뷰포트 기준):
 * - 4개 슬라이드일 때:
 *   - 슬라이드 0: 전체 스크롤 0~25% → 비디오 0~100%
 *   - 슬라이드 1: 전체 스크롤 25~50% → 비디오 0~100%
 *   - ...
 *
 * Props:
 * @param {string} src - 비디오 소스 경로 [Required]
 * @param {string} width - 슬라이드 너비 [Optional, 기본값: '60vw']
 * @param {string} placeholderColor - 플레이스홀더 배경색 [Optional, 기본값: '#C9A89D']
 * @param {number} activateThreshold - 활성화 임계값 (0-1) [Optional, 기본값: 0.01]
 * @param {React.ReactNode} children - 오버레이 콘텐츠 [Optional]
 * @param {string} ratio - 비디오 비율 [Optional, 기본값: '3/2']
 * @param {number} slideIndex - 슬라이드 인덱스 [Optional, 기본값: 0]
 * @param {number} totalSlides - 전체 슬라이드 수 [Optional, 기본값: 1]
 *
 * Example usage:
 * <VideoSlide src="/videos/video.mp4" slideIndex={0} totalSlides={4}>
 *   <TextOverlay>...</TextOverlay>
 * </VideoSlide>
 */
function VideoSlide({
  src,
  width = '60vw',
  placeholderColor = '#C9A89D',
  activateThreshold = 0.01,
  children,
  ratio = '3/2',
  slideIndex = 0,
  totalSlides = 1,
}) {
  const containerRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const [isActivated, setIsActivated] = useState(false);
  const [progress, setProgress] = useState(0);

  // HorizontalScroll의 스크롤 컨테이너(section) 찾기
  useEffect(() => {
    let parent = containerRef.current?.parentElement;
    while (parent) {
      if (parent.tagName === 'SECTION') {
        scrollContainerRef.current = parent;
        break;
      }
      parent = parent.parentElement;
    }
  }, []);

  /**
   * 세로 스크롤 기반 진행도 계산
   * HorizontalScroll의 전체 스크롤 진행도에서 이 슬라이드의 구간을 계산
   */
  const calculateScrollBasedProgress = useCallback(() => {
    if (!scrollContainerRef.current) return 0;

    const container = scrollContainerRef.current;
    const rect = container.getBoundingClientRect();
    const containerHeight = container.offsetHeight;
    const viewportHeight = window.innerHeight;

    // 세로 스크롤 진행도 (0~1)
    // container 상단이 뷰포트 상단에 있을 때 0
    // container 하단이 뷰포트 하단에 있을 때 1
    const scrollableDistance = containerHeight - viewportHeight;
    const scrolled = -rect.top;
    const overallProgress = Math.max(0, Math.min(1, scrolled / scrollableDistance));

    // 이 슬라이드의 구간에서의 진행도
    const slideStart = slideIndex / totalSlides;
    const slideEnd = (slideIndex + 1) / totalSlides;
    const slideRange = slideEnd - slideStart;

    const slideProgress = (overallProgress - slideStart) / slideRange;
    return Math.max(0, Math.min(1, slideProgress));
  }, [slideIndex, totalSlides]);

  // IntersectionObserver로 뷰포트 진입 감지
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // 뷰포트 진입 시 활성화 (한 번 활성화되면 유지)
        if (entry.isIntersecting) {
          setIsActivated(true);
        }
      },
      {
        threshold: activateThreshold,
      }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [activateThreshold]);

  // 스크롤 이벤트로 진행도 업데이트
  useEffect(() => {
    if (!isActivated) return;

    let animationFrameId = null;

    const updateProgress = () => {
      const newProgress = calculateScrollBasedProgress();
      setProgress(newProgress);
      animationFrameId = requestAnimationFrame(updateProgress);
    };

    animationFrameId = requestAnimationFrame(updateProgress);

    const handleScroll = () => {
      if (!animationFrameId) {
        animationFrameId = requestAnimationFrame(updateProgress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isActivated, calculateScrollBasedProgress]);

  return (
    // 외부 래퍼 - placeholder 배경색
    <Box
      ref={containerRef}
      sx={{
        width,
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '48px',
        backgroundColor: placeholderColor,
        aspectRatio: ratio,
      }}
    >
      {/* 비디오 컨테이너 - 활성화 시 페이드인 */}
      <Box
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: isActivated ? 1 : 0 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      >
        <VideoScrubbing
          src={src}
          ratio={ratio}
          externalProgress={isActivated ? progress : null}
          isActive={isActivated}
          scrollAxis="horizontal"
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </Box>

      {/* 오버레이 콘텐츠 (children) */}
      {children}
    </Box>
  );
}

export default VideoSlide;
