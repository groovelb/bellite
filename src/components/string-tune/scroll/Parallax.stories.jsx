import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Parallax } from './Parallax';

/**
 * Parallax 스토리
 *
 * 스크롤 진행에 따라 요소를 다른 속도로 움직인다. 히어로 로고가 이 컴포넌트를 쓴다.
 *
 * 효과는 전역 StringTune 인스턴스가 켠 모듈에서 나온다.
 * `.storybook/preview.jsx`는 parallax 모듈만 등록하므로, 다른 모듈은 표시만 되고 움직이지 않는다.
 */
export default {
  title: 'Custom Component/3. Motion & Reveal/Parallax',
  component: Parallax,
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
        data-string="parallax", data-string-parallax="0.3". 히어로에서 쓰는 값과 같다.
      </Typography>
      <Parallax speed={ 0.3 }>
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
      </Parallax>
    </Box>
  ),
};
