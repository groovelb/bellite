import { useEffect } from 'react';
import { Box } from '@mui/material';
import { motion, useMotionValue, useTransform } from 'framer-motion';

/**
 * BrokenGridGallery - 브로큰 그리드 갤러리 컴포넌트
 *
 * 랜덤해 보이지만 계산된 규칙으로 배치되는 비정형 그리드 레이아웃입니다.
 * 황금비율과 제어된 오프셋을 사용하여 에디토리얼 스타일의 갤러리를 구현합니다.
 *
 * 배치 규칙:
 * 1. 기본 그리드(12컬럼) 위에 요소 배치
 * 2. 각 요소에 사전 정의된 offset 적용
 * 3. 크기 대비로 시각적 위계 형성
 * 4. 레이어링으로 깊이감 표현
 *
 * Props:
 * @param {Array} items - 갤러리 아이템 배열 [Required]
 *   - src: 이미지 소스
 *   - alt: 대체 텍스트
 *   - size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' (기본값: 'md')
 *   - position: { top, left, right, bottom, zIndex, rotate }
 * @param {number} height - 컨테이너 높이 (vh 단위) [Optional, 기본값: 100]
 * @param {number} imageScale - 전체 이미지 크기 배율 (0.5 ~ 2) [Optional, 기본값: 1]
 * @param {number} spread - 이미지 간 퍼짐 정도 (0.5 ~ 2) [Optional, 기본값: 1]
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <BrokenGridGallery
 *   items={[...]}
 *   height={120}
 *   imageScale={0.8}   // 이미지 20% 축소
 *   spread={1.2}       // 간격 20% 확대
 * />
 */

// 애니메이션 variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

// 크기별 스타일 프리셋 (vw 단위 기반)
const SIZE_PRESETS = {
  xs: { base: 10, mobile: 20 },  // vw
  sm: { base: 14, mobile: 28 },
  md: { base: 18, mobile: 35 },
  lg: { base: 24, mobile: 45 },
  xl: { base: 30, mobile: 55 },
};

/**
 * MouseParallax - 마우스 위치에 따라 움직이는 래퍼
 *
 * 마우스가 화면 중앙에서 벗어날수록 반대 방향으로 이동하여
 * 깊이감 있는 패럴랙스 효과를 제공합니다.
 *
 * @param {node} children - 래핑할 콘텐츠
 * @param {number} intensity - 이동 범위 (px 단위) [기본값: 15]
 */
function MouseParallax({ children, intensity = 15 }) {
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  // 마우스 위치(0~1)를 픽셀 오프셋으로 변환
  // 중앙(0.5)일 때 0, 가장자리일 때 ±intensity
  const x = useTransform(mouseX, [0, 0.5, 1], [intensity, 0, -intensity]);
  const y = useTransform(mouseY, [0, 0.5, 1], [intensity, 0, -intensity]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      // 마우스 위치를 0~1 범위로 정규화
      mouseX.set(e.clientX / window.innerWidth);
      mouseY.set(e.clientY / window.innerHeight);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      style={{ x, y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15 }}
    >
      {children}
    </motion.div>
  );
}

/**
 * GalleryItem - 개별 갤러리 아이템
 *
 * zIndex에 따라 패럴랙스 intensity가 달라짐:
 * - zIndex 1: 10px (멀리 있음, 적게 움직임)
 * - zIndex 2: 20px (중간)
 * - zIndex 3: 30px (가까이 있음, 많이 움직임)
 */
function GalleryItem({ item, imageScale = 1 }) {
  const {
    src,
    alt = '',
    size = 'md',
    position = {},
  } = item;

  const {
    top,
    left,
    right,
    bottom,
    zIndex = 1,
    rotate = 0,
  } = position;

  const sizePreset = SIZE_PRESETS[size] || SIZE_PRESETS.md;
  const scaledBase = sizePreset.base * imageScale;
  const scaledMobile = sizePreset.mobile * imageScale;

  // zIndex 기반 패럴랙스 강도 (깊이감)
  const parallaxIntensity = zIndex * 10;

  return (
    <Box
      component={motion.div}
      variants={itemVariants}
      sx={{
        position: 'absolute',
        top,
        left,
        right,
        bottom,
        transform: `rotate(${rotate}deg)`,
        zIndex,
        width: { xs: `${scaledMobile}vw`, md: `${scaledBase}vw` },
        maxWidth: { xs: 300, md: 500 },
      }}
    >
      <MouseParallax intensity={parallaxIntensity}>
        <Box
          component={motion.img}
          src={src}
          alt={alt}
          whileHover={{
            scale: 1.03,
            transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
          }}
          sx={{
            width: '100%',
            height: 'auto',
            display: 'block',
            cursor: 'pointer',
          }}
        />
      </MouseParallax>
    </Box>
  );
}

function BrokenGridGallery({
  items = [],
  height = 100,
  imageScale = 1,
  spread = 1,
  sx = {},
}) {
  // spread 적용된 아이템 위치 계산
  const spreadItems = items.map(item => {
    if (spread === 1) return item;

    const { position = {} } = item;
    const newPosition = { ...position };

    // 퍼센트 값 조정 (중심에서 멀어지는 방향으로)
    if (position.top) {
      const topVal = parseFloat(position.top);
      const fromCenter = topVal - 50;
      newPosition.top = `${50 + fromCenter * spread}%`;
    }
    if (position.left) {
      const leftVal = parseFloat(position.left);
      const fromCenter = leftVal - 50;
      newPosition.left = `${50 + fromCenter * spread}%`;
    }
    if (position.right) {
      const rightVal = parseFloat(position.right);
      newPosition.right = `${rightVal * spread}%`;
    }
    if (position.bottom) {
      const bottomVal = parseFloat(position.bottom);
      newPosition.bottom = `${bottomVal * spread}%`;
    }

    return { ...item, position: newPosition };
  });

  return (
    <Box
      component={motion.div}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      sx={{
        position: 'relative',
        width: '100%',
        height: `${height}vh`,
        overflow: 'hidden',
        ...sx,
      }}
    >
      {spreadItems.map((item, index) => (
        <GalleryItem
          key={item.id || index}
          item={item}
          imageScale={imageScale}
        />
      ))}
    </Box>
  );
}

export default BrokenGridGallery;
