import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ScrollProgress } from './ScrollProgress';

/**
 * ScrollProgress 스토리
 *
 * 요소가 뷰포트를 지나는 진행도를 넘긴다.
 *
 * 효과는 전역 StringTune 인스턴스가 켠 모듈에서 나온다.
 * `.storybook/preview.jsx`는 parallax 모듈만 등록하므로, 다른 모듈은 표시만 되고 움직이지 않는다.
 */
export default {
  title: 'Custom Component/3. Motion & Reveal/ScrollProgress',
  component: ScrollProgress,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
};

/** 기본 */
export const Default = {
  render: () => (
    <Box sx={ { display: 'flex', flexDirection: 'column', gap: 2 } }>
      <Typography variant="body2" color="text.secondary">
        data-string="progress", data-string-enter-vp, data-string-exit-vp
      </Typography>
      <ScrollProgress enterVp="0.2" exitVp="0.8">
        <Box
          sx={ {
            p: 4,
            border: '1px solid',
            borderColor: 'divider',
            backgroundColor: 'background.paper',
          } }
        >
          <Typography variant="h5" color="text.primary">
            Your Daily Encore
          </Typography>
        </Box>
      </ScrollProgress>
    </Box>
  ),
};
