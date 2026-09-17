import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CustomCursor from './CustomCursor';

/**
 * CustomCursor 스토리
 *
 * 브랜드 커서다. 마우스를 움직이면 따라오고, 링크나 버튼 위에서 모양이 바뀐다.
 */
export default {
  title: 'Custom Component/3. Motion & Reveal/CustomCursor',
  component: CustomCursor,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

/** 아래 영역에서 마우스를 움직여 본다 */
export const Default = {
  render: () => (
    <Box
      sx={ {
        minHeight: 360,
        p: 6,
        backgroundColor: 'background.default',
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        alignItems: 'flex-start',
      } }
    >
      <CustomCursor />
      <Typography variant="h4" color="text.primary">
        Your Daily Encore
      </Typography>
      <Typography variant="body1" color="text.secondary">
        마우스를 움직이면 커서가 따라온다. 아래 버튼 위에서는 모양이 바뀐다.
      </Typography>
      <Button variant="outlined" color="primary">
        호버해 보기
      </Button>
    </Box>
  ),
};
