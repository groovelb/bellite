import { useRef } from 'react';
import { Box, Typography } from '@mui/material';
import { ChevronDown } from 'lucide-react';
import { SplitScreen } from '../../components/layout/SplitScreen';
import StickyBackground from '../../components/layout/StickyBackground';
import VideoScrubbing from '../../components/media/VideoScrubbing';
import { Parallax } from '../../components/string-tune/scroll/Parallax';
import landingContent from '../../data/landingPageContent.json';
import { displayFontFamily } from '../../styles/themes/theme';

// 이미지 import (Vite 정적 에셋)
import heroBgImage from '../../assets/bg/hero_bg_2.jpeg';
import heroBgVideo from '../../assets/bg/hero_bg_optimized.mp4';

/**
 * HeroSection - Section 1: 브랜드 아이덴티티 & 미션
 *
 * StickyBackground + SplitScreen 레이아웃으로 브랜드 아이덴티티를 전달합니다.
 *
 * 스크롤 동작:
 * 1. [Phase 1] 배경 고정, 콘텐츠가 하단에서 상단으로 스크롤
 * 2. [Phase 2] 콘텐츠가 상단에 도달하면 전체 섹션이 스크롤
 *
 * Props:
 * @param {string} backgroundMode - 배경 모드 ('image' | 'video') [Optional, 기본값: 'image']
 * @param {number} scrollMultiplier - 스크롤 높이 배율 [Optional, 기본값: 2]
 *
 * Example usage:
 * <HeroSection />
 * <HeroSection backgroundMode="video" />
 */

// JSON에서 섹션 데이터 추출
const sectionData = landingContent.sections.find(s => s.id === 'hero');

// 브랜드 콘텐츠
const CONTENT = {
  brand: landingContent.meta.brand,
  headline: sectionData.content.h1,
  subheadline: sectionData.content.h2,
};

// 설정값
const CONFIG = {
  backgroundImage: heroBgImage,
  backgroundVideo: heroBgVideo,
  overlayOpacity: 0.5,
  showScrollIndicator: true,
};

/**
 * 좌측 패널: 브랜드 로고 (내부 중앙 정렬)
 */
function LeftPanel() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* 브랜드 로고 - h1 variant + Chandia 폰트 + 느린 패럴랙스 */}
      <Parallax speed={0.3}>
        <Typography
          variant="h1"
          component="h1"
          sx={{
            fontFamily: displayFontFamily,
            color: 'brand.soul',
            textShadow: '0 4px 30px rgba(0, 0, 0, 0.4)',
            animation: 'fadeInUp 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
            '@keyframes fadeInUp': {
              '0%': {
                opacity: 0,
                transform: 'translateY(40px)',
              },
              '100%': {
                opacity: 1,
                transform: 'translateY(0)',
              },
            },
          }}
        >
          {CONTENT.brand}
        </Typography>
      </Parallax>
    </Box>
  );
}

/**
 * 우측 패널: 슬로건 + 설명 (내부 중앙 정렬)
 */
function RightPanel() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
      }}
    >
      {/* 메인 슬로건 - h2 variant (Adamina) + 중간 패럴랙스 */}
      <Parallax speed={0.5}>
        <Typography
          variant="h2"
          component="h2"
          sx={{
            color: 'brand.soul',
            mb: 1,
            textShadow: '0 2px 20px rgba(0, 0, 0, 0.3)',
            animation: 'fadeInUp 1.2s cubic-bezier(0.4, 0, 0.2, 1) 0.2s both',
            '@keyframes fadeInUp': {
              '0%': {
                opacity: 0,
                transform: 'translateY(40px)',
              },
              '100%': {
                opacity: 1,
                transform: 'translateY(0)',
              },
            },
          }}
        >
          {CONTENT.headline}
        </Typography>
      </Parallax>

      {/* 서브 헤드라인 - body1 variant (Pretendard) + 빠른 패럴랙스 */}
      <Parallax speed={0.7}>
        <Typography
          variant="h5"
          component="p"
          sx={{
            color: 'brand.soul',
            opacity: 0.95,
            textShadow: '0 1px 10px rgba(0, 0, 0, 0.2)',
            animation: 'fadeInUp 1.2s cubic-bezier(0.4, 0, 0.2, 1) 0.4s both',
          }}
        >
          {CONTENT.subheadline}
        </Typography>
      </Parallax>
    </Box>
  );
}

/**
 * 이미지 배경 컴포넌트
 */
function ImageBackground() {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        backgroundImage: `url(${CONFIG.backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    />
  );
}

/**
 * 비디오 배경 컴포넌트 (스크롤 스크러빙)
 * 브라우저 크기에 관계없이 항상 컨테이너를 완전히 채움
 */
function VideoBackground({ containerRef }) {
  return (
    <VideoScrubbing
      src={CONFIG.backgroundVideo}
      containerRef={containerRef}
      startInView
      ratio="3/2"
      sx={{
        objectFit: 'cover',
      }}
    />
  );
}

/**
 * 스크롤 인디케이터
 */
function ScrollIndicator() {
  return (
    <Box
      sx={{
        position: 'absolute',
        bottom: { xs: 24, sm: 32, md: 40, lg: 48 },
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        animation: 'fadeIn 1s cubic-bezier(0.4, 0, 0.2, 1) 1s both',
        '@keyframes fadeIn': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        cursor: 'pointer',
        transition: 'opacity 0.3s ease',
        '&:hover': {
          opacity: 0.8,
          '& .scroll-arrow': {
            transform: 'translateY(4px)',
          },
        },
      }}
    >
      {/* 스크롤 텍스트 - caption variant */}
      <Typography
        variant="caption"
        sx={{
          color: 'brand.soul',
          opacity: 0.6,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          mb: 0.75,
        }}
      >
        Scroll
      </Typography>
      <Box
        className="scroll-arrow"
        sx={{
          color: 'brand.soul',
          opacity: 0.7,
          transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          animation: 'gentleBounce 2.5s ease-in-out infinite',
          '@keyframes gentleBounce': {
            '0%, 100%': {
              transform: 'translateY(0)',
            },
            '50%': {
              transform: 'translateY(6px)',
            },
          },
        }}
      >
        <ChevronDown size={20} strokeWidth={1.5} />
      </Box>
    </Box>
  );
}

function HeroSection({ backgroundMode = 'image', scrollMultiplier = 2 }) {
  const sectionRef = useRef(null);

  // 배경 요소 렌더링
  const backgroundElement = backgroundMode === 'video'
    ? <VideoBackground containerRef={sectionRef} />
    : <ImageBackground />;

  return (
    <Box ref={sectionRef}>
      <StickyBackground
        background={backgroundElement}
        scrollMultiplier={scrollMultiplier}
        contentStart="visible"
        contentEnd="top"
        contentOffset={7}
        overlayStyle={{
          background: `linear-gradient(
            to top,
            rgba(15, 15, 15, 0.6) 0%,
            rgba(15, 15, 15, 0.2) 50%,
            transparent 100%
          )`,
        }}
      >
        {/* SplitScreen 콘텐츠 */}
        <Box
          sx={{
            // GNB와 동일한 px (4단계)
            px: { xs: 3, sm: 4, md: 6, lg: 8 },
            // 하단 여백 (4단계)
            pb: { xs: 10, sm: 12, md: 14, lg: 16 },
          }}
        >
          <SplitScreen
            left={<LeftPanel />}
            right={<RightPanel />}
            ratio="45:55"
            stackAt="sm"
            stackOrder="normal"
            leftSx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              py: { xs: 3, sm: 4, md: 5, lg: 6 },
            }}
            rightSx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              py: { xs: 3, sm: 4, md: 5, lg: 6 },
            }}
          />
        </Box>

        {/* 스크롤 인디케이터 */}
        {CONFIG.showScrollIndicator && <ScrollIndicator />}
      </StickyBackground>
    </Box>
  );
}

export default HeroSection;
