/**
 * Bellite Theme Configuration
 *
 * "Your Daily Encore" - 발레가 끝나도, 구겨지지 않는 당신의 선을 위해.
 *
 * Light & Shadow 컬러 팔레트 기반의 우아한 브랜드 테마.
 * 2색 + 1 액센트 (그래디언트/글로우/블러 금지).
 *
 * ## 컬러 토큰
 * - Ballet Pink (#F5DDD4): 라이트 배경 (발레리나의 살결과 토슈즈)
 * - Deep Black (#0F0F0F): 다크 배경 / 라이트 모드 텍스트 (도심의 밤)
 * - Rose Gold (#C9A89D): 액센트 (자수 로고, CTA)
 *
 * ## 타이포그래피
 * - Display: Chandia (셰리프 필기체, 자수 기법 형상화)
 * - Body: Pretendard Variable (한글/영문 혼용 최적화)
 */

import { createTheme } from '@mui/material/styles';

// ============================================================
// Bellite Brand Colors (Light & Shadow)
// ============================================================
const BRAND_COLORS = {
  // Primary Colors
  soul: '#FDEFFB',           // Ballet Pink - 발레리나의 살결과 토슈즈
  urban: '#0F0F0F',          // Deep Black - 도심의 밤
  ribbon: '#f4d2ca',         // Rose Gold - 액센트, 자수 로고
  blush: '#D4B8BA',          // Soft Pink - 옅은 핑크, 강조용

  // Extended Palette
  soulLight: '#FAF0ED',      // 카드 배경, 호버 상태
  soulMuted: '#E8CCC2',      // 비활성 상태, 보조 요소
  urbanSoft: '#2A2A2A',      // 보조 배경 (다크 모드)
  urbanMuted: '#4A4A4A',     // 비활성 텍스트 (다크 모드)
};

// ============================================================
// 1. Palette (색상 토큰)
// ============================================================
const palette = {
  mode: 'light',

  // 브랜드 Primary - Deep Black (텍스트/아이콘/보더)
  primary: {
    light: '#3A3A3A',
    main: BRAND_COLORS.urban,        // #0F0F0F
    dark: '#000000',
    contrastText: BRAND_COLORS.soul,
  },

  // Secondary - Rose Gold (액센트/CTA)
  secondary: {
    light: '#D9BDB3',
    main: BRAND_COLORS.ribbon,       // #C9A89D
    dark: '#A88B80',
    contrastText: BRAND_COLORS.urban,
  },

  // 상태 색상 (브랜드 톤에 맞춰 조정)
  error: {
    light: '#E57373',
    main: '#C62828',
    dark: '#B71C1C',
    contrastText: '#FFFFFF',
  },

  warning: {
    light: '#FFB74D',
    main: '#EF6C00',
    dark: '#E65100',
    contrastText: '#FFFFFF',
  },

  info: {
    light: '#64B5F6',
    main: '#1976D2',
    dark: '#0D47A1',
    contrastText: '#FFFFFF',
  },

  success: {
    light: '#81C784',
    main: '#2E7D32',
    dark: '#1B5E20',
    contrastText: '#FFFFFF',
  },

  // Grey 스케일 (Warm Pink tone으로 조정)
  grey: {
    50: '#FDF8F6',
    100: '#FAF0ED',      // Soul Light
    200: '#F5DDD4',      // Ballet Pink
    300: '#E8CCC2',      // Soul Muted
    400: '#C9A89D',      // Rose Gold
    500: '#9C8A82',
    600: '#7A6B64',
    700: '#5A4D47',
    800: '#3A3330',
    900: '#0F0F0F',      // Deep Black
    A100: '#FAF0ED',
    A200: '#F5DDD4',
    A400: '#C9A89D',
    A700: '#5A4D47',
  },

  // 텍스트 색상
  text: {
    primary: BRAND_COLORS.urban,                    // #0F0F0F
    secondary: `${BRAND_COLORS.urban}B3`,           // 70% opacity
    disabled: `${BRAND_COLORS.urban}61`,            // 38% opacity
  },

  // 배경 색상
  background: {
    default: BRAND_COLORS.ribbon,         // #FDEFFB (Ballet Pink)
    paper: BRAND_COLORS.ribbon,      // #FAF0ED
  },

  // 구분선
  divider: `${BRAND_COLORS.urban}1A`,  // 10% opacity

  // 액션 상태 색상
  action: {
    active: `${BRAND_COLORS.urban}8A`,              // 54% opacity
    hover: `${BRAND_COLORS.urban}0A`,               // 4% opacity
    hoverOpacity: 0.04,
    selected: `${BRAND_COLORS.urban}14`,            // 8% opacity
    selectedOpacity: 0.08,
    disabled: `${BRAND_COLORS.urban}42`,            // 26% opacity
    disabledBackground: `${BRAND_COLORS.urban}1F`,  // 12% opacity
    disabledOpacity: 0.38,
    focus: `${BRAND_COLORS.urban}1F`,               // 12% opacity
    focusOpacity: 0.12,
    activatedOpacity: 0.12,
  },

  // 공통 색상
  common: {
    black: BRAND_COLORS.ribbon,
    white: BRAND_COLORS.ribbon,
  },

  // Bellite 커스텀 토큰
  brand: BRAND_COLORS,

  contrastThreshold: 3,
  tonalOffset: 0.2,
};

// ============================================================
// 2. Typography (타이포그래피 토큰)
// ============================================================
// 브랜드 로고용 (Chandia - 셰리프 필기체)
const displayFontFamily = [
  'Chandia',
  'Georgia',
  '"Times New Roman"',
  'serif',
].join(',');

// 헤드라인용 (Adamina - 클래식 세리프)
const headlineFontFamily = [
  'Adamina',
  'Georgia',
  '"Times New Roman"',
  'serif',
].join(',');

const bodyFontFamily = [
  '"Pretendard Variable"',
  'Pretendard',
  '-apple-system',
  'BlinkMacSystemFont',
  'system-ui',
  'Roboto',
  '"Helvetica Neue"',
  '"Segoe UI"',
  '"Apple SD Gothic Neo"',
  '"Noto Sans KR"',
  '"Malgun Gothic"',
  'sans-serif',
].join(',');

const typography = {
  fontFamily: bodyFontFamily,
  fontSize: 14,
  htmlFontSize: 16,

  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightBold: 700,

  // Headline Typography (Adamina - 클래식 세리프)
  // 반응형: xs → sm → md → lg
  h1: {
    fontFamily: headlineFontFamily,
    fontWeight: 400,
    fontSize: 'clamp(3.5rem, 8vw, 9rem)',  // 56px → 144px
    lineHeight: 1.1,
    letterSpacing: '-0.02em',
    // 브레이크포인트별 세부 조정
    '@media (max-width: 600px)': {
      fontSize: '3.5rem',      // 56px (xs)
    },
    '@media (min-width: 600px) and (max-width: 900px)': {
      fontSize: '5rem',        // 80px (sm)
    },
    '@media (min-width: 900px) and (max-width: 1200px)': {
      fontSize: '7rem',        // 112px (md)
    },
    '@media (min-width: 1200px)': {
      fontSize: '9rem',        // 144px (lg+)
    },
  },

  h2: {
    fontFamily: headlineFontFamily,
    fontWeight: 400,
    fontSize: 'clamp(1.75rem, 4vw, 4.5rem)',  // 28px → 72px
    lineHeight: 1.15,
    letterSpacing: '-0.02em',
    '@media (max-width: 600px)': {
      fontSize: '1.75rem',     // 28px (xs)
    },
    '@media (min-width: 600px) and (max-width: 900px)': {
      fontSize: '2.5rem',      // 40px (sm)
    },
    '@media (min-width: 900px) and (max-width: 1200px)': {
      fontSize: '3.5rem',      // 56px (md)
    },
    '@media (min-width: 1200px)': {
      fontSize: '4.5rem',      // 72px (lg+)
    },
  },

  h3: {
    fontFamily: headlineFontFamily,
    fontWeight: 400,
    fontSize: 'clamp(1.5rem, 3vw, 3rem)',  // 24px → 48px
    lineHeight: 1.2,
    letterSpacing: '-0.01em',
    '@media (max-width: 600px)': {
      fontSize: '1.5rem',      // 24px (xs)
    },
    '@media (min-width: 600px) and (max-width: 900px)': {
      fontSize: '2rem',        // 32px (sm)
    },
    '@media (min-width: 900px) and (max-width: 1200px)': {
      fontSize: '2.5rem',      // 40px (md)
    },
    '@media (min-width: 1200px)': {
      fontSize: '3rem',        // 48px (lg+)
    },
  },

  h4: {
    fontFamily: headlineFontFamily,
    fontWeight: 400,
    fontSize: 'clamp(1.25rem, 2vw, 2rem)',  // 20px → 32px
    lineHeight: 1.3,
    letterSpacing: '-0.01em',
    '@media (max-width: 600px)': {
      fontSize: '1.25rem',     // 20px (xs)
    },
    '@media (min-width: 600px) and (max-width: 900px)': {
      fontSize: '1.5rem',      // 24px (sm)
    },
    '@media (min-width: 900px) and (max-width: 1200px)': {
      fontSize: '1.75rem',     // 28px (md)
    },
    '@media (min-width: 1200px)': {
      fontSize: '2rem',        // 32px (lg+)
    },
  },

  h5: {
    fontFamily: bodyFontFamily,
    fontWeight: 600,
    fontSize: 'clamp(1rem, 1.5vw, 1.7rem)',  // 16px → 27px
    lineHeight: 1.4,
    letterSpacing: '0',
    '@media (max-width: 600px)': {
      fontSize: '1rem',        // 16px (xs)
    },
    '@media (min-width: 600px) and (max-width: 900px)': {
      fontSize: '1.25rem',     // 20px (sm)
    },
    '@media (min-width: 900px) and (max-width: 1200px)': {
      fontSize: '1.5rem',      // 24px (md)
    },
    '@media (min-width: 1200px)': {
      fontSize: '1.7rem',      // 27px (lg+)
    },
  },

  h6: {
    fontFamily: bodyFontFamily,
    fontWeight: 600,
    fontSize: '1rem',         // 16px (고정)
    lineHeight: 1.5,
    letterSpacing: '0',
  },

  // Body Typography (Pretendard)
  subtitle1: {
    fontFamily: bodyFontFamily,
    fontSize: '1rem',         // 16px
    fontWeight: 500,
    lineHeight: 1.5,
    letterSpacing: '0.01em',
  },

  subtitle2: {
    fontFamily: bodyFontFamily,
    fontSize: '0.875rem',     // 14px
    fontWeight: 500,
    lineHeight: 1.5,
    letterSpacing: '0.01em',
  },

  body1: {
    fontFamily: bodyFontFamily,
    fontSize: '1.125rem',     // 18px
    fontWeight: 400,
    lineHeight: 1.7,
    letterSpacing: '0',
    '@media (max-width: 600px)': {
      fontSize: '1rem',       // 16px (xs)
    },
  },

  body2: {
    fontFamily: bodyFontFamily,
    fontSize: '1rem',         // 16px
    fontWeight: 400,
    lineHeight: 1.7,
    letterSpacing: '0',
    '@media (max-width: 600px)': {
      fontSize: '0.9375rem',  // 15px (xs)
    },
  },

  button: {
    fontFamily: bodyFontFamily,
    fontSize: '0.875rem',     // 14px
    fontWeight: 500,
    lineHeight: 1.75,
    letterSpacing: '0.02em',
    textTransform: 'none',
  },

  caption: {
    fontFamily: bodyFontFamily,
    fontSize: '0.75rem',      // 12px
    fontWeight: 400,
    lineHeight: 1.5,
    letterSpacing: '0.02em',
  },

  overline: {
    fontFamily: bodyFontFamily,
    fontSize: '0.75rem',      // 12px
    fontWeight: 500,
    lineHeight: 2,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
  },
};

// ============================================================
// 3. Spacing (간격 토큰)
// ============================================================
const spacing = 8;

// ============================================================
// 4. Shape (모양 토큰)
// ============================================================
const shape = {
  borderRadius: 0,  // Sharp corners - "구겨지지 않는 선"
};

// ============================================================
// 5. Shadows (그림자 토큰)
// ============================================================
// Dimmed shadow - offset 없이 blur만 사용
const shadows = [
  'none',                                           // 0
  '0 0 12px rgba(15, 15, 15, 0.04)',               // 1 - sm
  '0 0 14px rgba(15, 15, 15, 0.05)',               // 2
  '0 0 16px rgba(15, 15, 15, 0.06)',               // 3 - md
  '0 0 18px rgba(15, 15, 15, 0.07)',               // 4
  '0 0 20px rgba(15, 15, 15, 0.08)',               // 5 - lg
  '0 0 22px rgba(15, 15, 15, 0.09)',               // 6
  '0 0 24px rgba(15, 15, 15, 0.10)',               // 7 - xl
  '0 0 26px rgba(15, 15, 15, 0.11)',               // 8
  '0 0 28px rgba(15, 15, 15, 0.12)',               // 9
  '0 0 30px rgba(15, 15, 15, 0.13)',               // 10
  '0 0 32px rgba(15, 15, 15, 0.14)',               // 11
  '0 0 34px rgba(15, 15, 15, 0.15)',               // 12
  '0 0 36px rgba(15, 15, 15, 0.16)',               // 13
  '0 0 38px rgba(15, 15, 15, 0.17)',               // 14
  '0 0 40px rgba(15, 15, 15, 0.18)',               // 15
  '0 0 42px rgba(15, 15, 15, 0.19)',               // 16
  '0 0 44px rgba(15, 15, 15, 0.20)',               // 17
  '0 0 46px rgba(15, 15, 15, 0.21)',               // 18
  '0 0 48px rgba(15, 15, 15, 0.22)',               // 19
  '0 0 50px rgba(15, 15, 15, 0.23)',               // 20
  '0 0 52px rgba(15, 15, 15, 0.24)',               // 21
  '0 0 54px rgba(15, 15, 15, 0.25)',               // 22
  '0 0 56px rgba(15, 15, 15, 0.26)',               // 23
  '0 0 58px rgba(15, 15, 15, 0.27)',               // 24
];

// ============================================================
// 6. Breakpoints (브레이크포인트)
// ============================================================
const breakpoints = {
  values: {
    xs: 0,
    sm: 600,
    md: 900,
    lg: 1200,
    xl: 1440,
  },
};

// ============================================================
// 7. Z-Index (레이어 순서)
// ============================================================
const zIndex = {
  mobileStepper: 1000,
  fab: 1050,
  speedDial: 1050,
  appBar: 1100,
  drawer: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500,
};

// ============================================================
// 8. Transitions (전환 효과)
// ============================================================
// 모션 원칙: 부드럽고 우아한 전환, 점멸 금지
const transitions = {
  duration: {
    shortest: 150,
    shorter: 200,
    short: 250,
    standard: 300,
    complex: 375,
    enteringScreen: 225,
    leavingScreen: 195,
    // Bellite custom - 우아한 전환
    slow: 600,
    slower: 900,
  },
  easing: {
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
    // Bellite - 부드러운 우아함
    elegant: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
};

// ============================================================
// 9. Components (컴포넌트 오버라이드)
// ============================================================
const components = {
  MuiCssBaseline: {
    styleOverrides: {
      body: {
        scrollbarWidth: 'thin',
        backgroundColor: BRAND_COLORS.ribbon,
      },
    },
  },
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: 0,
        textTransform: 'none',
      },
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: {
        borderRadius: 0,
        backgroundColor: BRAND_COLORS.soulLight,
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: 0,
      },
    },
  },
  MuiChip: {
    styleOverrides: {
      root: {
        borderRadius: 0,
      },
    },
  },
  MuiTextField: {
    styleOverrides: {
      root: {
        '& .MuiOutlinedInput-root': {
          borderRadius: 0,
        },
      },
    },
  },
};

// ============================================================
// Theme 생성
// ============================================================
const theme = createTheme({
  palette,
  typography,
  spacing,
  shape,
  shadows,
  breakpoints,
  zIndex,
  transitions,
  components,
});

export default theme;

// 개별 토큰 내보내기 (Storybook 문서화용)
export {
  BRAND_COLORS,
  palette,
  typography,
  spacing,
  shape,
  shadows,
  breakpoints,
  zIndex,
  transitions,
  components,
  displayFontFamily,
  headlineFontFamily,
  bodyFontFamily,
};
