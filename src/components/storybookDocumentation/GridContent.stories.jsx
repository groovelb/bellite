import Grid from '@mui/material/Grid';
import { GridContent } from './GridContent';

/**
 * GridContent 스토리
 *
 * 레이아웃 데모용 셀이다. 문서 안에서 그리드 분할을 보일 때 쓴다.
 */
export default {
  title: 'Custom Component/7. Docs Tools/GridContent',
  component: GridContent,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
};

/** 세 변형 */
export const Variants = {
  render: () => (
    <Grid container spacing={ 2 }>
      <Grid size={ 4 }><GridContent label="default" /></Grid>
      <Grid size={ 4 }><GridContent label="primary" variant="primary" /></Grid>
      <Grid size={ 4 }><GridContent label="secondary" variant="secondary" /></Grid>
    </Grid>
  ),
};

/** 12열 분할 데모 */
export const GridDemo = {
  render: () => (
    <Grid container spacing={ 2 }>
      <Grid size={ 12 }><GridContent label="size=12" variant="primary" /></Grid>
      <Grid size={ 6 }><GridContent label="size=6" /></Grid>
      <Grid size={ 6 }><GridContent label="size=6" /></Grid>
      <Grid size={ 4 }><GridContent label="size=4" height={ 100 } /></Grid>
      <Grid size={ 4 }><GridContent label="size=4" height={ 100 } /></Grid>
      <Grid size={ 4 }><GridContent label="size=4" height={ 100 } /></Grid>
    </Grid>
  ),
};
