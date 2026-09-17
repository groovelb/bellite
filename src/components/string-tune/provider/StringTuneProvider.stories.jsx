import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { StringTuneProvider, useStringTune } from './StringTuneProvider';

/**
 * StringTuneProvider 스토리
 *
 * StringTune 인스턴스를 만들고 모듈을 등록하는 전역 공급자다.
 * 인스턴스는 싱글턴이라 한 화면에 두 번 mount하면 나중에 unmount될 때 전역 인스턴스가 함께 사라진다.
 * 그래서 이 스토리는 공급자를 다시 mount하지 않고, 이미 켜져 있는 전역 인스턴스 상태를 읽어 보여 준다.
 * 실제 등록은 `.storybook/preview.jsx`와 `src/main.jsx`가 한다.
 */
export default {
  title: 'Custom Component/3. Motion & Reveal/StringTuneProvider',
  component: StringTuneProvider,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
};

// 공급자가 등록할 수 있는 모듈과 그것을 쓰는 컴포넌트
const MODULES = [
  { name: 'parallax', component: 'Parallax', usedBy: 'HeroSection 로고' },
  { name: 'glide', component: 'Glide', usedBy: '미사용' },
  { name: 'lerp', component: 'Lerp', usedBy: '미사용' },
  { name: 'progress', component: 'ScrollProgress', usedBy: '미사용' },
  { name: 'magnetic', component: 'Magnetic', usedBy: '미사용' },
  { name: 'cursor', component: 'CursorFollow', usedBy: '미사용' },
  { name: 'spotlight', component: 'Spotlight', usedBy: '미사용' },
  { name: 'impulse', component: 'Impulse', usedBy: '미사용' },
  { name: 'sequence', component: 'Sequence', usedBy: '미사용' },
  { name: 'split', component: 'SplitText', usedBy: '미사용' },
  { name: 'form', component: 'FormField', usedBy: '미사용' },
  { name: 'lazy', component: '(직접 대응 없음)', usedBy: '미사용' },
  { name: 'fpsTracker', component: '(디버그 오버레이)', usedBy: '미사용' },
  { name: 'positionTracker', component: '(디버그 오버레이)', usedBy: '미사용' },
];

/** 전역 인스턴스가 살아 있는지 읽는 작은 표시기 */
function InstanceStatus() {
  const { instance } = useStringTune();
  return (
    <Typography variant="body2" color={ instance ? 'success.dark' : 'text.secondary' }>
      전역 StringTune 인스턴스: { instance ? '연결됨' : '아직 없음 (첫 렌더 직후에는 비어 있다)' }
    </Typography>
  );
}

/** 모듈 목록과 전역 인스턴스 상태 */
export const Default = {
  render: () => (
    <Box sx={ { display: 'flex', flexDirection: 'column', gap: 2 } }>
      <InstanceStatus />
      <Typography variant="body2" color="text.secondary">
        이 스토리는 공급자를 새로 mount하지 않는다. 싱글턴을 파괴해 다른 스토리의 모션을 끄지 않기 위해서다.
      </Typography>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={ { fontWeight: 600 } }>module</TableCell>
              <TableCell sx={ { fontWeight: 600 } }>React 컴포넌트</TableCell>
              <TableCell sx={ { fontWeight: 600 } }>랜딩에서 쓰는 곳</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { MODULES.map((row) => (
              <TableRow key={ row.name }>
                <TableCell sx={ { fontFamily: 'monospace', fontSize: 12 } }>{ row.name }</TableCell>
                <TableCell sx={ { fontFamily: 'monospace', fontSize: 12 } }>{ row.component }</TableCell>
                <TableCell sx={ { fontSize: 13 } }>{ row.usedBy }</TableCell>
              </TableRow>
            )) }
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  ),
};
