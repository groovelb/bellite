import { useRef } from 'react';
import { Box, Typography } from '@mui/material';
import { motion, useScroll, useTransform } from 'framer-motion';
import landingContent from '../../data/landingPageContent.json';

/**
 * OriginSection - Section 6: Designer's Note (브랜드 기원)
 *
 * 트렌디한 "Text with Scroll Progress" 효과로 브랜드 스토리를 전달합니다.
 * 스크롤에 따라 각 단어의 opacity가 변화하며 읽고 있는 느낌을 연출합니다.
 *
 * 동작 흐름:
 * 1. 스크롤 시작 - 모든 단어가 dimmed 상태 (opacity 0.15)
 * 2. 스크롤 진행 - 현재 위치의 단어가 밝아짐 (opacity 1)
 * 3. 지나간 단어 - 밝은 상태 유지
 * 4. 키네틱 타이포그래피 효과로 몰입감 있는 리딩 경험
 *
 * Example usage:
 * <OriginSection />
 */

// JSON에서 섹션 데이터 추출
const sectionData = landingContent.sections.find(s => s.id === 'origin');

// 핵심 메시지 (단순화)
const QUOTE_TEXT = sectionData.content.description;
const BRAND = landingContent.meta.brand;

// 텍스트를 단어 배열로 분리
const words = QUOTE_TEXT.split(' ');

/**
 * Word - 개별 단어 컴포넌트 (스크롤 기반 opacity)
 */
function Word({ word, index, totalWords, scrollProgress }) {
  // 각 단어의 활성화 범위 계산
  const wordStart = index / totalWords;
  const wordEnd = (index + 1) / totalWords;

  // 스크롤 진행도에 따른 opacity 변환
  const opacity = useTransform(
    scrollProgress,
    [wordStart - 0.05, wordStart, wordEnd],
    [0.15, 1, 1]
  );

  // 미세한 y 이동 (키네틱 효과)
  const y = useTransform(
    scrollProgress,
    [wordStart - 0.1, wordStart, wordStart + 0.1],
    [4, 0, 0]
  );

  return (
    <Box
      component={motion.span}
      style={{ opacity, y }}
      sx={{
        display: 'inline-block',
        mr: '0.3em',
        // 따옴표가 포함된 단어는 특별 스타일
        ...(word.includes('"') && {
          color: 'brand.ribbon',
        }),
      }}
    >
      {word}
    </Box>
  );
}

/**
 * ProgressIndicator - 스크롤 진행 표시
 */
function ProgressIndicator({ scrollProgress }) {
  const scaleX = useTransform(scrollProgress, [0, 1], [0, 1]);

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: 2,
        bgcolor: 'rgba(253, 239, 251, 0.1)',
        zIndex: 100,
      }}
    >
      <Box
        component={motion.div}
        style={{ scaleX, transformOrigin: 'left' }}
        sx={{
          height: '100%',
          bgcolor: 'brand.ribbon',
        }}
      />
    </Box>
  );
}

function OriginSection() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  return (
    <Box
      ref={sectionRef}
      component="section"
      sx={{
        position: 'relative',
        // 스크롤 여유를 위한 높이
        height: '200vh',
        bgcolor: 'brand.urban',
      }}
    >
      {/* Sticky 컨텐츠 컨테이너 */}
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          px: { xs: 4, sm: 6, md: 10 },
        }}
      >
        {/* 메인 텍스트 */}
        <Typography
          component="p"
          sx={{
            fontFamily: 'Pretendard Variable, sans-serif',
            fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.875rem', lg: '2.25rem' },
            fontWeight: 400,
            color: 'brand.soul',
            lineHeight: 1.7,
            textAlign: 'center',
            maxWidth: 900,
            wordBreak: 'keep-all',
          }}
        >
          {words.map((word, index) => (
            <Word
              key={index}
              word={word}
              index={index}
              totalWords={words.length}
              scrollProgress={scrollYProgress}
            />
          ))}
        </Typography>

        {/* 브랜드 서명 */}
        <Box
          component={motion.div}
          style={{
            opacity: useTransform(scrollYProgress, [0.8, 1], [0, 1]),
          }}
          sx={{
            mt: { xs: 6, md: 8 },
            textAlign: 'center',
          }}
        >
          <Typography
            sx={{
              fontFamily: 'Chandia, Georgia, serif',
              fontSize: { xs: '1.25rem', md: '1.5rem' },
              color: 'brand.soul',
              opacity: 0.6,
            }}
          >
            — {BRAND}
          </Typography>
        </Box>
      </Box>

      {/* 프로그레스 인디케이터 */}
      <ProgressIndicator scrollProgress={scrollYProgress} />
    </Box>
  );
}

export default OriginSection;
