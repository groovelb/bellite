import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { Box } from '@mui/material';

/**
 * CustomCursor 컴포넌트
 * 
 * 마우스 커서를 벨라이트 브랜드 아이덴티티를 담은 발레 슈즈 아이콘으로 대체합니다.
 * framer-motion의 useSpring을 사용하여 부드럽고 우아한 움직임을 구현합니다.
 */
const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isActive, setIsActive] = useState(false); // 마우스가 화면 안에 있는지 여부

  // 마우스 위치 추적을 위한 motion value
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // 부드러운 움직임을 위한 spring 설정
  const springConfig = { damping: 25, stiffness: 200, restDelta: 0.001 };
  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isActive) setIsActive(true);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target) return;
      
      const computedStyle = window.getComputedStyle(target);
      const isPointer = computedStyle.cursor === 'pointer' || 
                        target.tagName === 'BUTTON' || 
                        target.tagName === 'A' ||
                        target.closest('button') ||
                        target.closest('a');
      setIsHovering(!!isPointer);
    };

    const handleMouseLeave = () => setIsActive(false);
    const handleMouseEnter = () => setIsActive(true);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [cursorX, cursorY, isActive]);

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: 0,
        height: 0,
        pointerEvents: 'none',
        zIndex: 9999,
      }}
    >
      <motion.div
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          opacity: isActive ? 1 : 0,
          scale: isActive ? 1 : 0.5,
        }}
        transition={{ duration: 0.3 }}
      >
        <motion.svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          animate={{
            scale: isHovering ? 1.2 : 1,
            rotate: isHovering ? 10 : 0,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          style={{
            filter: 'drop-shadow(0px 3px 6px rgba(0,0,0,0.15))',
          }}
        >
          {/* 발레 슈즈 실루엣 - 포인 슈즈의 날렵한 형태 */}
          <path
            d="M24 8C20 8 17 11 16 16C15 22 16 34 20 40C21 42 22.5 44 24 44C25.5 44 27 42 28 40C32 34 33 22 32 16C31 11 28 8 24 8Z"
            stroke="#0F0F0F"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          
          {/* 슈즈 입구 (발등 부분) */}
          <path
            d="M17 18C17 18 20 21 24 21C28 21 31 18 31 18"
            stroke="#0F0F0F"
            strokeWidth="1.5"
            strokeLinecap="round"
          />

          {/* X자 교차 리본 - 발레 슈즈의 핵심 디테일 */}
          <path
            d="M16 16L32 28"
            stroke="#0F0F0F"
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity="0.6"
          />
          <path
            d="M32 16L16 28"
            stroke="#0F0F0F"
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity="0.6"
          />

          {/* 발가락 부분 보강재 (Platform) 라인 */}
          <path
            d="M20 40C20 40 22 41 24 41C26 41 28 40 28 40"
            stroke="#0F0F0F"
            strokeWidth="1.2"
            strokeLinecap="round"
          />

          {/* 상단 묶음 리본 (Small bow) */}
          <path
            d="M24 8C24 8 22 4 19 6C17 7 19 9 24 9C29 9 31 7 29 6C26 4 24 8 24 8Z"
            stroke="#0F0F0F"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
      </motion.div>
    </Box>
  );
};

export default CustomCursor;
