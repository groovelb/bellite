import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import VideoSlide from './VideoSlide';
import landingContent from '../../data/landingPageContent.json';
import { videoFileMap } from '../../data/mediaAssets';

/**
 * VideoSlide 스토리
 *
 * Silhouette 구간의 가로 트랙 한 칸이다. 세로 스크롤 진행도를 받아 영상을 스크러빙한다.
 * 데이터는 landingPageContent.json의 silhouette.slides를 그대로 쓴다.
 */
export default {
  title: 'Custom Component/4. Media/VideoSlide',
  component: VideoSlide,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

const slides = landingContent.sections.find((s) => s.id === 'silhouette').slides;

/** 자세 장면 한 칸 */
export const Default = {
  render: () => {
    const slide = slides[0];
    return (
      <Box sx={ { p: 4, backgroundColor: 'background.default' } }>
        <VideoSlide
          src={ videoFileMap[slide.video] }
          width="60vw"
          placeholderColor="grey.300"
          slideIndex={ 0 }
          totalSlides={ slides.length }
        >
          <Box sx={ { position: 'absolute', bottom: 0, left: 0, right: 0, p: 3 } }>
            <Typography variant="h4" sx={ { color: 'brand.soul' } }>
              { slide.titleEn }
            </Typography>
            <Typography variant="body2" sx={ { color: 'brand.soul' } }>
              { slide.titleKo }
            </Typography>
          </Box>
        </VideoSlide>
      </Box>
    );
  },
};

/** 트랙에 네 칸을 나란히 둔 모습 */
export const Track = {
  render: () => (
    <Box sx={ { display: 'flex', gap: 2, p: 4, overflowX: 'auto', backgroundColor: 'background.default' } }>
      { slides.map((slide, index) => (
        <Box key={ slide.id } sx={ { flexShrink: 0 } }>
          <VideoSlide
            src={ videoFileMap[slide.video] }
            width="40vw"
            placeholderColor="grey.300"
            slideIndex={ index }
            totalSlides={ slides.length }
          >
            <Box sx={ { position: 'absolute', bottom: 0, left: 0, right: 0, p: 2 } }>
              <Typography variant="subtitle1" sx={ { color: 'brand.soul' } }>
                { slide.titleEn }
              </Typography>
            </Box>
          </VideoSlide>
        </Box>
      )) }
    </Box>
  ),
};
