import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { StringTuneProvider } from '../src/components/string-tune';

import theme from '../src/styles/themes/theme.js';

/**
 * Chandia 폰트 로드 (Bellite 브랜드 Display 폰트)
 * - Chandia: 메인 Display 폰트
 * - Chandia Decorative: 장식용 스와시 폰트
 */
const loadChandiaFonts = async () => {
  const fonts = [
    { family: 'Chandia', url: '/src/assets/font/Chandia_PERSONAL_USE_ONLY.otf' },
    { family: 'Chandia Decorative', url: '/src/assets/font/ChandiaDecorative_PERSONAL_USE_ONLY.otf' },
  ];

  for (const { family, url } of fonts) {
    try {
      const fontFace = new FontFace(family, `url(${url}) format('opentype')`, {
        style: 'normal',
        weight: '400',
      });
      await fontFace.load();
      document.fonts.add(fontFace);
      console.log(`✓ ${family} font loaded`);
    } catch {
      console.warn(`⚠ ${family} font not found`);
    }
  }
};

loadChandiaFonts();

/** @type { import('@storybook/react-vite').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo',
    },
    options: {
      storySort: {
        order: [
          'Overview',
          'Style', ['Overview', 'Colors', 'Typography', 'Spacing', 'Icons'],
          'MUI Component',
          'Custom Component',
          'Template',
          'Section',
          'Page',
          'Test Data',
        ],
        method: 'alphabetical',
      },
    },
  },
  decorators: [
    (Story, context) => {
      // fullscreen 레이아웃에서는 패딩 제거
      const isFullscreen = context.parameters?.layout === 'fullscreen';

      return (
        <ThemeProvider theme={ theme }>
          <CssBaseline />
          <StringTuneProvider modules={['parallax']}>
            <div style={ { width: '100%', paddingTop: isFullscreen ? 0 : '40px' } }>
              { Story(context) }
            </div>
          </StringTuneProvider>
        </ThemeProvider>
      );
    },
  ],
};

export default preview;
