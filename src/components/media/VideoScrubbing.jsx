import { useRef, useEffect, useState, useCallback } from 'react';
import Box from '@mui/material/Box';

/**
 * VideoScrubbing Component
 * 스크롤 위치에 따라 비디오를 프레임 단위로 재생(스크러빙)하는 컴포넌트입니다.
 *
 * 성능 최적화:
 * - fastSeek() 사용 (지원 시): 가장 가까운 키프레임으로 빠른 이동
 * - Seek 큐 관리: 중복 seek 요청 방지, 마지막 요청만 처리
 * - seeking/seeked 이벤트 활용: seek 완료 후 다음 요청 처리
 * - 적응형 스로틀링: 스크롤 속도에 따른 동적 조절
 *
 * 비디오 인코딩 권장사항 (끊김 최소화):
 * ffmpeg -i input.mp4 -c:v libx264 -g 1 -keyint_min 1 -crf 23 -movflags +faststart output.mp4
 *
 * @param {string} src - 비디오 소스 경로 [Required]
 * @param {React.RefObject} containerRef - 스크롤 추적용 컨테이너 요소 [Optional]
 * @param {boolean} startInView - 뷰포트 상단에서 시작하는 경우 true [Optional, 기본값: false]
 * @param {string} ratio - 비디오 비율 (예: '16/9', '4/3', 'auto') [Optional, 기본값: 'auto']
 * @param {Object} sx - MUI sx 스타일 [Optional]
 * @param {Object} scrollRange - 스크롤 범위 매핑 { start: 0, end: 1 } [Optional]
 * @param {function} onProgressChange - 진행도 변경 콜백 (progress: 0-1) [Optional]
 * @param {boolean} useFastSeek - fastSeek 사용 여부 (정확도↓ 속도↑) [Optional, 기본값: true]
 * @param {string} scrollAxis - 스크롤 축 ('vertical' | 'horizontal') [Optional, 기본값: 'vertical']
 * @param {number} activateThreshold - 활성화 임계값 (0-1) [Optional, 기본값: 0.1]
 * @param {boolean} isActive - 외부에서 활성화 제어 [Optional, 기본값: true]
 * @param {number} externalProgress - 외부에서 전달하는 진행도 (0-1) [Optional]
 */
const VideoScrubbing = ({
  src,
  containerRef = null,
  startInView = false,
  ratio = 'auto',
  sx = {},
  scrollRange = { start: 0, end: 1 },
  onProgressChange,
  useFastSeek = true,
  scrollAxis = 'vertical',
  activateThreshold = 0.1,
  isActive = true,
  externalProgress = null,
  ...props
}) => {
  const videoRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);

  // Seek 상태 관리
  const seekStateRef = useRef({
    isSeeking: false,
    pendingTime: null,
    lastSeekTime: 0,
  });

  // 스크롤 속도 추적 (적응형 스로틀링용)
  const scrollVelocityRef = useRef({
    lastScrollY: 0,
    lastTime: 0,
    velocity: 0,
  });

  /**
   * 비디오 시간 설정 (seek 큐 관리)
   */
  const seekToTime = useCallback((targetTime) => {
    const video = videoRef.current;
    if (!video || !isVideoReady) return;

    const state = seekStateRef.current;

    // 이미 seeking 중이면 pending에 저장
    if (state.isSeeking) {
      state.pendingTime = targetTime;
      return;
    }

    // 너무 작은 변화는 무시 (1프레임 = ~0.033초)
    const threshold = 0.02;
    if (Math.abs(video.currentTime - targetTime) < threshold) {
      return;
    }

    state.isSeeking = true;
    state.lastSeekTime = Date.now();

    // fastSeek 사용 (지원 시) - 가장 가까운 키프레임으로 빠르게 이동
    if (useFastSeek && video.fastSeek) {
      video.fastSeek(targetTime);
    } else {
      video.currentTime = targetTime;
    }
  }, [isVideoReady, useFastSeek]);

  /**
   * 스크롤 진행도 계산
   */
  const calculateProgress = useCallback(() => {
    const video = videoRef.current;
    if (!video) return 0;

    let progress = 0;

    // 수평 스크롤 모드
    if (scrollAxis === 'horizontal') {
      const rect = video.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const elementWidth = rect.width;

      // 우측에서 진입 → 좌측으로 이동하는 진행도
      // elementLeft가 viewportWidth일 때 progress = 0
      // elementLeft + elementWidth가 0일 때 progress = 1
      progress = 1 - (rect.left + elementWidth) / (viewportWidth + elementWidth);
    }
    // 수직 스크롤 모드 (기존 로직)
    else {
      const windowHeight = window.innerHeight;

      if (containerRef && containerRef.current) {
        const container = containerRef.current;
        const rect = container.getBoundingClientRect();
        const containerHeight = container.offsetHeight;

        if (startInView) {
          progress = -rect.top / containerHeight;
        } else {
          const totalScrollRange = windowHeight + containerHeight;
          progress = (windowHeight - rect.top) / totalScrollRange;
        }
      } else {
        const rect = video.getBoundingClientRect();
        const videoHeight = video.offsetHeight;

        if (startInView) {
          progress = -rect.top / videoHeight;
        } else {
          const totalScrollRange = windowHeight + videoHeight;
          progress = (windowHeight - rect.top) / totalScrollRange;
        }
      }
    }

    // Apply scroll range mapping
    const { start, end } = scrollRange;
    progress = (progress - start) / (end - start);

    // Clamp between 0 and 1
    return Math.max(0, Math.min(1, progress));
  }, [containerRef, startInView, scrollRange, scrollAxis]);

  /**
   * 스크롤 속도 계산 (적응형 스로틀링용)
   */
  const updateScrollVelocity = useCallback(() => {
    const now = Date.now();
    const scrollY = window.scrollY;
    const ref = scrollVelocityRef.current;

    if (ref.lastTime > 0) {
      const dt = now - ref.lastTime;
      const dy = Math.abs(scrollY - ref.lastScrollY);
      ref.velocity = dy / dt; // pixels per ms
    }

    ref.lastScrollY = scrollY;
    ref.lastTime = now;
  }, []);

  // 비디오 초기화
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      video.currentTime = 0;
      setIsVideoReady(true);
    };

    const handleCanPlayThrough = () => {
      setIsVideoReady(true);
    };

    // seeked 이벤트: seek 완료 시 pending 처리
    const handleSeeked = () => {
      const state = seekStateRef.current;
      state.isSeeking = false;

      // pending이 있으면 처리
      if (state.pendingTime !== null) {
        const pendingTime = state.pendingTime;
        state.pendingTime = null;
        // 다음 프레임에서 처리 (브라우저에게 숨 쉴 틈 주기)
        requestAnimationFrame(() => seekToTime(pendingTime));
      }
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('canplaythrough', handleCanPlayThrough);
    video.addEventListener('seeked', handleSeeked);

    // 이미 로드된 경우
    if (video.readyState >= 1) {
      handleLoadedMetadata();
    }
    if (video.readyState >= 4) {
      handleCanPlayThrough();
    }

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('canplaythrough', handleCanPlayThrough);
      video.removeEventListener('seeked', handleSeeked);
    };
  }, [seekToTime]);

  // IntersectionObserver
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: activateThreshold }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [activateThreshold]);

  // 외부 진행도가 전달된 경우 직접 비디오 시간 업데이트
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isVideoReady || externalProgress === null) return;

    if (video.duration) {
      const targetTime = video.duration * externalProgress;
      seekToTime(targetTime);
    }
  }, [externalProgress, isVideoReady, seekToTime]);

  // 스크롤 이벤트 핸들링
  useEffect(() => {
    const video = videoRef.current;
    // isActive가 false이거나 externalProgress가 사용 중이면 내부 스크롤 추적 비활성화
    if (!video || !isInView || !isVideoReady || !isActive || externalProgress !== null) return;

    let animationFrameId = null;
    let lastUpdateTime = 0;

    const updateVideoTime = () => {
      const now = Date.now();

      // 적응형 스로틀링: 스크롤 속도에 따라 조절
      // 빠른 스크롤 시 업데이트 빈도 낮춤 (끊김 방지)
      const velocity = scrollVelocityRef.current.velocity;
      const baseThrottle = 16; // ~60fps
      const throttleDelay = velocity > 2 ? 32 : baseThrottle; // 빠른 스크롤 시 ~30fps

      if (now - lastUpdateTime < throttleDelay) {
        animationFrameId = requestAnimationFrame(updateVideoTime);
        return;
      }
      lastUpdateTime = now;

      updateScrollVelocity();

      const progress = calculateProgress();

      // Callback
      if (onProgressChange) {
        onProgressChange(progress);
      }

      // Update video time
      if (video.duration) {
        const targetTime = video.duration * progress;
        seekToTime(targetTime);
      }

      animationFrameId = requestAnimationFrame(updateVideoTime);
    };

    // 초기 실행
    animationFrameId = requestAnimationFrame(updateVideoTime);

    const handleScroll = () => {
      if (!animationFrameId) {
        animationFrameId = requestAnimationFrame(updateVideoTime);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isInView, isVideoReady, isActive, externalProgress, calculateProgress, updateScrollVelocity, seekToTime, onProgressChange]);

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '100%',
      }}
    >
      <Box
        component="video"
        ref={videoRef}
        muted
        playsInline
        preload="auto"
        sx={{
          width: '100%',
          height: ratio === 'auto' ? 'auto' : '100%',
          aspectRatio: ratio === 'auto' ? undefined : ratio,
          objectFit: ratio === 'auto' ? undefined : 'cover',
          display: 'block',
          position: 'relative',
          zIndex: 0,
          ...sx,
        }}
        {...props}
      >
        <source src={src} type="video/mp4" />
        <source src={src.replace('.mp4', '.webm')} type="video/webm" />
      </Box>
    </Box>
  );
};

export default VideoScrubbing;
