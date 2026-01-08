import { useRef } from 'react';
import { Box, Typography } from '@mui/material';
import StickyBackground from '../../components/layout/StickyBackground';
import VideoScrubbing from '../../components/media/VideoScrubbing';
import landingContent from '../../data/landingPageContent.json';
import { mediaAssets } from '../../data/mediaAssets';

/**
 * InsideMoodSection - 내부 오브제 무드보드 (분위기 전환 섹션)
 *
 * Silhouette(외부)와 SignatureSection(상세) 사이의 브릿지 역할.
 * StickyBackground + VideoScrubbing으로 비디오 스크러빙 효과 적용.
 *
 * 스크롤 동작:
 * 1. [Phase 1] 배경 비디오 고정, 콘텐츠가 하단에서 중앙으로 스크롤
 * 2. [Phase 2] 콘텐츠가 중앙에서 상단으로 이동하며 비디오 스크러빙
 * 3. [Phase 3] 다음 섹션(SignatureSection)으로 자연스럽게 연결
 *
 * Props:
 * @param {number} scrollMultiplier - 스크롤 높이 배율 [Optional, 기본값: 1.5]
 *
 * Example usage:
 * <InsideMoodSection />
 * <InsideMoodSection scrollMultiplier={2} />
 */

// JSON에서 섹션 데이터 추출
const sectionData = landingContent.sections.find(s => s.id === 'insideMood');

// 브랜드 콘텐츠
const CONTENT = {
  sectionLabel: sectionData.content.sectionLabel,
  h1: sectionData.content.h1,
  subText: sectionData.content.subText,
};

// 설정값
const CONFIG = {
  backgroundVideo: mediaAssets.insideMood.video,
  overlayOpacity: 0.4,
};

/**
 * 비디오 배경 컴포넌트 (스크롤 스크러빙)
 */
function VideoBackground({ containerRef }) {
  return (
    <VideoScrubbing
      src={CONFIG.backgroundVideo}
      containerRef={containerRef}
      startInView
      ratio="16/9"
      sx={{
        objectFit: 'cover',
      }}
    />
  );
}

/**
 * CenterContent - 중앙 메인 콘텐츠
 * StickyBackground가 위치를 제어하므로 자체 애니메이션 없음
 */
function CenterContent() {
  return (
    <Box
      sx={{
        position: 'relative',
        zIndex: 2,
        textAlign: 'center',
        px: 3,
        py: { xs: 6, md: 8 },
      }}
    >
      {/* 메인 타이틀 */}
      <Typography
        component="h2"
        sx={{
          fontFamily: 'Adamina, Georgia, serif',
          fontSize: { xs: '1.75rem', sm: '2.25rem', md: '3rem', lg: '3.5rem' },
          fontWeight: 700,
          color: 'brand.urban',
          lineHeight: 1.2,
          mb: 3,
          letterSpacing: '-0.01em',
        }}
      >
        {CONTENT.h1}
      </Typography>

      {/* 서브 텍스트 */}
      <Typography
        sx={{
          fontFamily: 'Pretendard Variable, sans-serif',
          fontSize: { xs: '0.875rem', md: '1rem' },
          fontWeight: 400,
          color: 'brand.urban',
          opacity: 0.7,
          lineHeight: 1.8,
          maxWidth: 400,
          mx: 'auto',
          wordBreak: 'keep-all',
          whiteSpace: 'pre-line',
        }}
      >
        {CONTENT.subText}
      </Typography>
    </Box>
  );
}

function InsideMoodSection({ scrollMultiplier = 1.5 }) {
  const sectionRef = useRef(null);

  return (
    <Box ref={sectionRef}>
      <StickyBackground
        background={<VideoBackground containerRef={sectionRef} />}
        scrollMultiplier={scrollMultiplier}
        contentStart="center"
        contentEnd="top"
        contentOffset={10}
      >
        {/* 중앙 콘텐츠 */}
        <CenterContent />
      </StickyBackground>
    </Box>
  );
}

export default InsideMoodSection;
