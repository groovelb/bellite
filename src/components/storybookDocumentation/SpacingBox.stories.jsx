import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { SpacingBox } from './SpacingBox';
import { SPACING, toPx } from '../../styles/tokens';

/**
 * SpacingBox 스토리
 *
 * 간격 값을 정사각형으로 보여 준다. 값은 src/styles/tokens.js의 시멘틱 토큰에서 온다.
 */
export default {
  title: 'Custom Component/7. Docs Tools/SpacingBox',
  component: SpacingBox,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
};

/** inset 토큰 여섯 단계 */
export const InsetScale = {
  render: () => (
    <Stack direction="row" spacing={ 3 } alignItems="flex-end">
      { Object.entries(SPACING.inset).map(([name, value]) => (
        <Stack key={ name } spacing={ 1 } alignItems="center">
          <SpacingBox size={ toPx(value) } />
          <Typography variant="caption" color="text.secondary">
            { name } · { toPx(value) }
          </Typography>
        </Stack>
      )) }
    </Stack>
  ),
};

/** section 토큰 네 단계 */
export const SectionScale = {
  render: () => (
    <Stack direction="row" spacing={ 3 } alignItems="flex-end">
      { Object.entries(SPACING.section).map(([name, value]) => (
        <Stack key={ name } spacing={ 1 } alignItems="center">
          <SpacingBox size={ toPx(value) } color="text.primary" />
          <Typography variant="caption" color="text.secondary">
            { name } · { toPx(value) }
          </Typography>
        </Stack>
      )) }
    </Stack>
  ),
};
