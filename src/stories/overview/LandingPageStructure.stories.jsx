import { Box, Typography, Divider } from '@mui/material';
import { TreeNode } from '../../components/storybookDocumentation/TreeNode';

/**
 * LandingPage 컴포넌트 계층 구조
 *
 * 전체 랜딩 페이지의 섹션과 컴포넌트 구조를 한눈에 파악할 수 있습니다.
 */
export default {
  title: 'Overview/LandingPage Structure',
  parameters: {
    layout: 'padded',
  },
};

// LandingPage 전체 컴포넌트 계층 구조 (실제 코드 기반)
const LANDING_PAGE_STRUCTURE = {
  LandingPage: {
    GNB: {
      Typography: 'Logo (Bellite)',
      Stack: 'Desktop menu items',
      Drawer: 'Mobile navigation',
    },
    HeroSection: {
      StickyBackground: {
        VideoBackground: {
          VideoScrubbing: 'hero_bg_optimized.mp4',
        },
        ImageBackground: 'hero_bg_2.jpeg (fallback)',
      },
      SplitScreen: {
        LeftPanel: {
          Parallax: {
            Typography: 'Brand Logo (Chandia)',
          },
        },
        RightPanel: {
          Parallax: {
            Typography: 'Your Daily Encore.',
          },
          'Parallax (sub)': {
            Typography: '발레가 끝나도...',
          },
        },
      },
      ScrollIndicator: {
        ChevronDown: 'lucide-react',
      },
    },
    ValuePillarsSection: {
      ContentArea: {
        Typography: 'The Three Promises',
      },
      LineGrid: {
        'PillarCard (index 0)': {
          Minus: 'lucide-react icon',
          Typography: '무너지지 않는 실루엣',
        },
        'PillarCard (index 1)': {
          Archive: 'lucide-react icon',
          Typography: '구겨지지 않는 보관',
        },
        'PillarCard (index 2)': {
          Sparkle: 'lucide-react icon',
          Typography: '내재적 자부심',
        },
      },
    },
    SilhouetteSection: {
      MarqueeText: 'The Unwrinkled Line',
      'Box (sticky container)': {
        'Box (horizontal track)': {
          'VideoSlideContainer (crosswalk)': {
            VideoSlide: 's1.mp4',
            'Box (overlay)': 'Relevé at the Crosswalk',
          },
          'VideoSlideContainer (subway)': {
            VideoSlide: 's2.mp4',
            'Box (overlay)': 'Épaulement in the Subway',
          },
          'VideoSlideContainer (cafe)': {
            VideoSlide: 's3.mp4',
            'Box (overlay)': 'Tendu at the Cafe',
          },
          'VideoSlideContainer (stairs)': {
            VideoSlide: 's4.mp4',
            'Box (overlay)': 'Passé on the Stairs',
          },
        },
      },
    },
    InsideMoodSection: {
      StickyBackground: {
        VideoBackground: {
          VideoScrubbing: 'moodbaord.mp4',
        },
      },
      CenterContent: {
        MotionTypography: '당신의 낭만을 담는 공간.',
        MotionTypography_sub: '토슈즈, 리본, 타이즈...',
      },
    },
    SignatureSection: {
      SectionContainer: {
        'Grid (container)': {
          'TextBlock (archive)': {
            MotionTypography: '구겨지지 않는 당신의 낭만.',
          },
          'ImageBlock (archive)': {
            MotionBox: 'aerial-shot.jpeg',
          },
          'ImageBlock (signature)': {
            MotionBox: 'moodbaord1.jpeg',
          },
          'TextBlock (signature)': {
            MotionTypography: '드러나는 내면의 발레코어.',
          },
        },
      },
    },
    OriginSection: {
      'Box (sticky container)': {
        'motion.div': {
          'Word (map)': {
            'motion.span': 'Scroll-triggered opacity per word',
          },
        },
        ProgressIndicator: {
          'motion.div': 'Progress bar',
        },
      },
    },
    DailyMoodSection: {
      SectionContainer: {
        'motion.div': {
          Typography: 'Coming Soon',
        },
        BrokenGridGallery: {
          'items[0]': 'mood1_morning.jpeg',
          'items[1]': 'mood2_desk.jpeg',
          'items[2]': 'mood3_commute.jpeg',
          'items[3]': 'mood4_afet_ballete.jpeg',
          'items[4]': 'mood5_home.jpeg',
          'items[5]': 'moodbaord1.jpeg',
          'items[6]': 'moodbaord2.jpeg',
          'items[7]': 's1.jpeg',
          'items[8]': 's2.jpeg',
        },
      },
    },
  },
};

// 섹션별 파일 경로 매핑
const FILE_PATHS = {
  LandingPage: 'src/pages/LandingPage.jsx',
  GNB: 'src/components/navigation/GNB.jsx',
  HeroSection: 'src/sections/landing/HeroSection.jsx',
  ValuePillarsSection: 'src/sections/landing/ValuePillarsSection.jsx',
  SilhouetteSection: 'src/sections/landing/SilhouetteSection.jsx',
  InsideMoodSection: 'src/sections/landing/InsideMoodSection.jsx',
  SignatureSection: 'src/sections/landing/SignatureSection.jsx',
  OriginSection: 'src/sections/landing/OriginSection.jsx',
  DailyMoodSection: 'src/sections/landing/DailyMoodSection.jsx',
};

// 사용 컴포넌트 요약 (실제 import 기반)
const COMPONENT_SUMMARY = {
  Layout: ['SplitScreen', 'StickyBackground', 'SectionContainer', 'ContentArea', 'LineGrid', 'BrokenGridGallery'],
  Media: ['VideoScrubbing', 'VideoSlide'],
  Typography: ['MarqueeText'],
  Animation: ['Parallax', 'motion.div', 'motion.span'],
  Navigation: ['GNB'],
  'Internal Components': ['LeftPanel', 'RightPanel', 'ScrollIndicator', 'VideoBackground', 'ImageBackground', 'CenterContent', 'PillarCard', 'VideoSlideContainer', 'TextBlock', 'ImageBlock', 'Word', 'ProgressIndicator'],
};

// 외부 라이브러리
const EXTERNAL_LIBRARIES = {
  '@mui/material': {
    components: ['Box', 'Typography', 'Grid', 'Stack', 'Drawer', 'List', 'ListItem', 'ListItemButton', 'ListItemText', 'IconButton', 'Container', 'Divider', 'Collapse'],
    hooks: ['useTheme', 'useMediaQuery'],
    version: '^7.x',
  },
  'framer-motion': {
    components: ['motion'],
    hooks: ['useScroll', 'useTransform'],
    version: '^11.x',
  },
  'lucide-react': {
    icons: ['ChevronDown', 'Minus', 'Archive', 'Sparkle', 'Menu', 'X'],
    version: '^0.x',
  },
  '@fiddle-digital/string-tune': {
    modules: ['StringTune', 'StringParallax'],
    components: ['Parallax'],
    version: 'custom',
  },
};

export const Default = {
  render: () => (
    <Box sx={{ maxWidth: 900, mx: 'auto' }}>
      {/* 헤더 */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          LandingPage Component Structure
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Bellite 랜딩 페이지의 전체 컴포넌트 계층 구조입니다.
          노드를 클릭하여 하위 구조를 확인할 수 있습니다.
        </Typography>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* 파일 경로 */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
          Section File Paths
        </Typography>
        <Box sx={{ bgcolor: 'grey.50', p: 2, borderRadius: 1 }}>
          {Object.entries(FILE_PATHS).map(([name, path]) => (
            <Box key={name} sx={{ display: 'flex', gap: 2, py: 0.5 }}>
              <Typography
                sx={{
                  fontFamily: 'monospace',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: 'primary.main',
                  minWidth: 180,
                }}
              >
                {name}
              </Typography>
              <Typography
                sx={{
                  fontFamily: 'monospace',
                  fontSize: '13px',
                  color: 'text.secondary',
                }}
              >
                {path}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* 사용 컴포넌트 요약 */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
          Used Components by Category
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
          {Object.entries(COMPONENT_SUMMARY).map(([category, components]) => (
            <Box key={category} sx={{ minWidth: 150 }}>
              <Typography
                sx={{
                  fontSize: '12px',
                  fontWeight: 600,
                  color: 'text.secondary',
                  textTransform: 'uppercase',
                  mb: 1,
                }}
              >
                {category}
              </Typography>
              {components.map((comp) => (
                <Typography
                  key={comp}
                  sx={{
                    fontFamily: 'monospace',
                    fontSize: '12px',
                    color: 'primary.main',
                    py: 0.25,
                  }}
                >
                  {comp}
                </Typography>
              ))}
            </Box>
          ))}
        </Box>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* 외부 라이브러리 */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
          External Libraries
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {Object.entries(EXTERNAL_LIBRARIES).map(([lib, info]) => (
            <Box
              key={lib}
              sx={{
                bgcolor: 'grey.50',
                p: 2,
                borderRadius: 1,
                border: '1px solid',
                borderColor: 'divider',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <Typography
                  sx={{
                    fontFamily: 'monospace',
                    fontSize: '14px',
                    fontWeight: 700,
                    color: 'primary.main',
                  }}
                >
                  {lib}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: 'monospace',
                    fontSize: '11px',
                    color: 'text.secondary',
                    bgcolor: 'grey.200',
                    px: 0.75,
                    py: 0.25,
                    borderRadius: 0.5,
                  }}
                >
                  {info.version}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                {info.components && (
                  <Box>
                    <Typography sx={{ fontSize: '11px', color: 'text.secondary', mb: 0.5 }}>
                      Components
                    </Typography>
                    <Typography sx={{ fontFamily: 'monospace', fontSize: '12px' }}>
                      {info.components.join(', ')}
                    </Typography>
                  </Box>
                )}
                {info.hooks && (
                  <Box>
                    <Typography sx={{ fontSize: '11px', color: 'text.secondary', mb: 0.5 }}>
                      Hooks
                    </Typography>
                    <Typography sx={{ fontFamily: 'monospace', fontSize: '12px' }}>
                      {info.hooks.join(', ')}
                    </Typography>
                  </Box>
                )}
                {info.icons && (
                  <Box>
                    <Typography sx={{ fontSize: '11px', color: 'text.secondary', mb: 0.5 }}>
                      Icons
                    </Typography>
                    <Typography sx={{ fontFamily: 'monospace', fontSize: '12px' }}>
                      {info.icons.join(', ')}
                    </Typography>
                  </Box>
                )}
                {info.modules && (
                  <Box>
                    <Typography sx={{ fontSize: '11px', color: 'text.secondary', mb: 0.5 }}>
                      Modules
                    </Typography>
                    <Typography sx={{ fontFamily: 'monospace', fontSize: '12px' }}>
                      {info.modules.join(', ')}
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* 컴포넌트 트리 */}
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
          Component Tree
        </Typography>
        <Box
          sx={{
            bgcolor: 'background.paper',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 1,
            p: 2,
          }}
        >
          <TreeNode
            keyName="LandingPage"
            value={LANDING_PAGE_STRUCTURE.LandingPage}
            defaultOpen={true}
          />
        </Box>
      </Box>
    </Box>
  ),
};
