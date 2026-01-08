import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * InteractiveHotspot - 이미지 위 인터랙티브 핫스팟
 *
 * 발레의 '포인트' 동작처럼 정교하게 위치한 인터랙티브 요소.
 * 호버 시 우아하게 펼쳐지는 툴팁으로 상세 정보를 전달합니다.
 *
 * 동작 흐름:
 * 1. 핫스팟 점이 부드럽게 맥동(pulse)하며 인터랙션 가능성을 암시
 * 2. 사용자가 핫스팟에 마우스를 올리면 점이 확장
 * 3. 툴팁이 지정된 방향에서 우아하게 나타남
 * 4. 마우스를 떼면 역순으로 사라짐
 *
 * Props:
 * @param {object} position - 핫스팟 위치 (x, y 퍼센트) [Required]
 * @param {string} label - 툴팁 제목 [Required]
 * @param {string} description - 툴팁 설명 [Optional]
 * @param {string} tooltipPosition - 툴팁 방향 'top' | 'bottom' | 'left' | 'right' [Optional, 기본값: 'top']
 * @param {boolean} isActive - 활성화 여부 [Optional, 기본값: true]
 * @param {string} variant - 스타일 변형 'light' | 'dark' [Optional, 기본값: 'light']
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <InteractiveHotspot
 *   position={{ x: 30, y: 45 }}
 *   label="토슈즈 포켓"
 *   description="독립된 수납 공간으로 소중한 토슈즈를 보호합니다."
 *   tooltipPosition="right"
 * />
 */
function InteractiveHotspot({
  position,
  label,
  description,
  tooltipPosition = 'top',
  isActive = true,
  variant = 'light',
  sx = {},
}) {
  const [isHovered, setIsHovered] = useState(false);

  // 색상 설정 (variant에 따라)
  const colors = {
    light: {
      dot: 'brand.ribbon',
      dotBg: 'brand.soul',
      ring: 'brand.ribbon',
      tooltipBg: 'brand.soul',
      tooltipBorder: 'brand.ribbon',
      text: 'brand.urban',
      textSecondary: 'text.secondary',
    },
    dark: {
      dot: 'brand.soul',
      dotBg: 'brand.urban',
      ring: 'brand.soul',
      tooltipBg: 'brand.urban',
      tooltipBorder: 'brand.ribbon',
      text: 'brand.soul',
      textSecondary: 'brand.soulMuted',
    },
  };

  const currentColors = colors[variant] || colors.light;

  // 툴팁 위치 및 애니메이션 설정
  const tooltipConfig = {
    top: {
      position: { bottom: '100%', left: '50%', transform: 'translateX(-50%)' },
      offset: { mb: 2 },
      initial: { opacity: 0, y: 8 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: 8 },
    },
    bottom: {
      position: { top: '100%', left: '50%', transform: 'translateX(-50%)' },
      offset: { mt: 2 },
      initial: { opacity: 0, y: -8 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -8 },
    },
    left: {
      position: { right: '100%', top: '50%', transform: 'translateY(-50%)' },
      offset: { mr: 2 },
      initial: { opacity: 0, x: 8 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: 8 },
    },
    right: {
      position: { left: '100%', top: '50%', transform: 'translateY(-50%)' },
      offset: { ml: 2 },
      initial: { opacity: 0, x: -8 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -8 },
    },
  };

  const config = tooltipConfig[tooltipPosition] || tooltipConfig.top;

  if (!isActive) return null;

  return (
    <Box
      component={motion.div}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        position: 'absolute',
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: 'translate(-50%, -50%)',
        zIndex: 10,
        cursor: 'pointer',
        ...sx,
      }}
    >
      {/* 핫스팟 점 */}
      <Box
        sx={{
          position: 'relative',
          width: 16,
          height: 16,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* 외곽 맥동 링 */}
        <Box
          component={motion.div}
          animate={{
            scale: isHovered ? 1.8 : [1, 1.4, 1],
            opacity: isHovered ? 0 : [0.6, 0, 0.6],
          }}
          transition={{
            duration: isHovered ? 0.3 : 2,
            repeat: isHovered ? 0 : Infinity,
            ease: 'easeInOut',
          }}
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            border: '1px solid',
            borderColor: currentColors.ring,
          }}
        />

        {/* 중앙 점 */}
        <Box
          component={motion.div}
          animate={{
            scale: isHovered ? 1.3 : 1,
          }}
          transition={{
            duration: 0.3,
            ease: [0.4, 0, 0.2, 1],
          }}
          sx={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            bgcolor: currentColors.dot,
            boxShadow: '0 0 12px rgba(201, 168, 157, 0.5)',
          }}
        />
      </Box>

      {/* 툴팁 */}
      <AnimatePresence>
        {isHovered && (
          <Box
            component={motion.div}
            initial={config.initial}
            animate={config.animate}
            exit={config.exit}
            transition={{
              duration: 0.25,
              ease: [0.4, 0, 0.2, 1],
            }}
            sx={{
              position: 'absolute',
              ...config.position,
              ...config.offset,
              width: 'max-content',
              maxWidth: 220,
              px: 2,
              py: 1.5,
              bgcolor: currentColors.tooltipBg,
              border: '1px solid',
              borderColor: currentColors.tooltipBorder,
              // Sharp corners - Bellite style
              borderRadius: 0,
            }}
          >
            {/* 라벨 */}
            <Typography
              sx={{
                fontFamily: 'Pretendard Variable, sans-serif',
                fontSize: '0.8rem',
                fontWeight: 600,
                color: currentColors.text,
                letterSpacing: '0.02em',
                mb: description ? 0.5 : 0,
              }}
            >
              {label}
            </Typography>

            {/* 설명 */}
            {description && (
              <Typography
                sx={{
                  fontFamily: 'Pretendard Variable, sans-serif',
                  fontSize: '0.7rem',
                  fontWeight: 400,
                  color: currentColors.textSecondary,
                  lineHeight: 1.5,
                  letterSpacing: '0.01em',
                }}
              >
                {description}
              </Typography>
            )}
          </Box>
        )}
      </AnimatePresence>
    </Box>
  );
}

export default InteractiveHotspot;
