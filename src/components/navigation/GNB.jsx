import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Menu, X } from 'lucide-react';
import landingContent from '../../data/landingPageContent.json';

/**
 * GNB - Bellite 브랜드 글로벌 네비게이션 바
 *
 * 랜딩 페이지 상단에 고정되어 각 섹션으로 스크롤 앵커 기능을 제공합니다.
 * HeroSection(100vh)을 지나면 나타납니다.
 *
 * 동작 방식:
 * 1. 초기 상태: 숨김 (HeroSection 영역)
 * 2. HeroSection 스크롤 완료 후: 부드럽게 나타남
 * 3. 좌측에 Bellite 로고 표시 (Chandia 폰트)
 * 4. 데스크탑: 우측에 섹션 메뉴 표시
 * 5. 모바일: 햄버거 아이콘 → Drawer
 * 6. 메뉴 클릭 시 해당 섹션으로 부드러운 스크롤
 *
 * Example usage:
 * <GNB />
 */

// 브랜드 콘텐츠
const CONTENT = {
  logo: landingContent.meta.brand,
};

// 네비게이션 메뉴 설정
const NAV_ITEMS = [
  { label: 'Silhouette', sectionId: 'silhouette' },
  { label: 'Signature', sectionId: 'signature' },
  { label: 'Story', sectionId: 'origin' },
];

// 설정값
const CONFIG = {
  height: 72,
  breakpoint: 'md',
};

function GNB() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(CONFIG.breakpoint));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  /**
   * 스크롤 위치에 따라 GNB 표시/숨김
   */
  useEffect(() => {
    const handleScroll = () => {
      // HeroSection 높이(100vh)를 지나면 표시
      const heroHeight = window.innerHeight;
      const scrollY = window.scrollY;
      setIsVisible(scrollY > heroHeight - CONFIG.height);
    };

    // 초기 체크
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /**
   * Drawer 열기/닫기
   */
  const handleDrawerToggle = () => {
    setDrawerOpen((prev) => !prev);
  };

  /**
   * 섹션으로 부드럽게 스크롤
   */
  const handleMenuClick = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - CONFIG.height;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
    }
    setDrawerOpen(false);
  };

  /**
   * Drawer 내부 콘텐츠
   */
  const drawerContent = (
    <Box sx={{ width: 280, bgcolor: 'brand.urban', height: '100%' }}>
      {/* Drawer Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: CONFIG.height,
          px: 3,
          borderBottom: '1px solid',
          borderColor: 'rgba(245, 221, 212, 0.1)',
        }}
      >
        <Typography
          sx={{
            fontFamily: 'Chandia, Georgia, serif',
            fontSize: '1.75rem',
            color: 'brand.soul',
          }}
        >
          {CONTENT.logo}
        </Typography>
        <IconButton onClick={handleDrawerToggle} sx={{ color: 'brand.soul' }}>
          <X size={24} />
        </IconButton>
      </Box>

      {/* Menu List */}
      <List sx={{ pt: 2 }}>
        {NAV_ITEMS.map((item) => (
          <ListItem key={item.sectionId} disablePadding>
            <ListItemButton
              onClick={() => handleMenuClick(item.sectionId)}
              sx={{
                py: 2,
                px: 3,
                '&:hover': {
                  bgcolor: 'transparent',
                },
              }}
            >
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontFamily: 'Pretendard Variable, sans-serif',
                  fontSize: '1rem',
                  fontWeight: 400,
                  color: 'brand.soul',
                  letterSpacing: '0.05em',
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <Box
        component="header"
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: theme.zIndex.appBar,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: CONFIG.height,
          px: { xs: 3, sm: 4, md: 6 },
          backgroundColor: 'transparent',
          // 스크롤 기반 fade in/out
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.3s ease',
          pointerEvents: isVisible ? 'auto' : 'none',
        }}
      >
        {/* Left: Logo */}
        <Typography
          component="h1"
          sx={{
            fontFamily: 'Chandia, Georgia, serif',
            fontSize: { xs: '2rem', md: '2.5rem' },
            fontWeight: 400,
            color: 'brand.soul',
            cursor: 'pointer',
            transition: 'opacity 0.2s ease',
            '&:hover': {
              opacity: 0.8,
            },
          }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          {CONTENT.logo}
        </Typography>

        {/* Right: Desktop Menu or Mobile Hamburger */}
        {isMobile ? (
          <IconButton
            onClick={handleDrawerToggle}
            aria-label="메뉴 열기"
            sx={{
              color: 'brand.soul',
              '&:hover': {
                bgcolor: 'transparent',
              },
            }}
          >
            <Menu size={28} />
          </IconButton>
        ) : (
          <Stack direction="row" spacing={4}>
            {NAV_ITEMS.map((item) => (
              <Typography
                key={item.sectionId}
                component="button"
                onClick={() => handleMenuClick(item.sectionId)}
                sx={{
                  fontFamily: 'Pretendard Variable, sans-serif',
                  fontSize: '0.9rem',
                  fontWeight: 400,
                  color: 'brand.soul',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  transition: 'color 0.2s ease',
                  '&:hover': {
                    color: 'brand.ribbon',
                  },
                }}
              >
                {item.label}
              </Typography>
            ))}
          </Stack>
        )}
      </Box>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', [CONFIG.breakpoint]: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 280,
            bgcolor: 'brand.urban',
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
}

export { GNB };
