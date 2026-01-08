/**
 * Bellite Dark Theme Configuration
 *
 * 현재 라이트 테마와 동일한 값 사용
 * (브라우저 다크모드 강제 적용 방지)
 */

import theme, {
  BRAND_COLORS,
  palette,
  shadows,
  components,
  displayFontFamily,
  bodyFontFamily,
} from './theme';

// 라이트 테마와 동일
const darkTheme = theme;

export default darkTheme;

// 개별 토큰 내보내기 (호환성 유지)
export {
  palette as darkPalette,
  shadows as darkShadows,
  components as darkComponents,
  displayFontFamily,
  bodyFontFamily,
  BRAND_COLORS,
};
