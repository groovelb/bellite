import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useTheme } from '@mui/material/styles';
import {
  DocumentTitle,
  PageContainer,
  SectionTitle,
  TreeNode,
} from '../../components/storybookDocumentation';
import { displayFontFamily, bodyFontFamily } from '../../styles/themes/theme';

export default {
  title: 'Style/Typography',
  parameters: {
    layout: 'padded',
  },
};

/** 타이포그래피 시스템 문서 */
export const Docs = {
  render: () => {
    const theme = useTheme();

    // 토큰 구조 (트리 뷰용)
    const tokenStructure = {
      typography: {
        fontFamily: theme.typography.fontFamily,
        fontSize: theme.typography.fontSize,
        fontWeightLight: theme.typography.fontWeightLight,
        fontWeightRegular: theme.typography.fontWeightRegular,
        fontWeightMedium: theme.typography.fontWeightMedium,
        fontWeightBold: theme.typography.fontWeightBold,
        h1: theme.typography.h1,
        h2: theme.typography.h2,
        h3: theme.typography.h3,
        h4: theme.typography.h4,
        h5: theme.typography.h5,
        h6: theme.typography.h6,
        body1: theme.typography.body1,
        body2: theme.typography.body2,
        subtitle1: theme.typography.subtitle1,
        subtitle2: theme.typography.subtitle2,
        button: theme.typography.button,
        caption: theme.typography.caption,
        overline: theme.typography.overline,
      },
    };

    // 토큰 값 (테이블용) - 고정 사이즈 variants
    const tokenValues = [
      { variant: 'h6', fontSize: '1rem', fontWeight: 600, font: 'Body', usage: '라벨 타이틀' },
      { variant: 'subtitle1', fontSize: '1rem', fontWeight: 500, font: 'Body', usage: '서브타이틀' },
      { variant: 'subtitle2', fontSize: '0.875rem', fontWeight: 500, font: 'Body', usage: '작은 서브타이틀' },
      { variant: 'button', fontSize: '0.875rem', fontWeight: 500, font: 'Body', usage: '버튼 텍스트' },
      { variant: 'caption', fontSize: '0.75rem', fontWeight: 400, font: 'Body', usage: '캡션, 상태 라벨' },
      { variant: 'overline', fontSize: '0.75rem', fontWeight: 500, font: 'Body', usage: '카테고리, 태그' },
    ];

    // 반응형 토큰 값 (테이블용)
    const responsiveTokenValues = [
      { variant: 'h1', xs: '3.5rem', sm: '5rem', md: '7rem', lg: '9rem', font: 'Display', usage: '히어로 헤드라인' },
      { variant: 'h2', xs: '1.75rem', sm: '2.5rem', md: '3.5rem', lg: '4.5rem', font: 'Display', usage: '섹션 타이틀' },
      { variant: 'h3', xs: '1.5rem', sm: '2rem', md: '2.5rem', lg: '3rem', font: 'Display', usage: '서브섹션 타이틀' },
      { variant: 'h4', xs: '1.25rem', sm: '1.5rem', md: '1.75rem', lg: '2rem', font: 'Display', usage: '카드 타이틀' },
      { variant: 'h5', xs: '1rem', sm: '1.25rem', md: '1.5rem', lg: '1.7rem', font: 'Body', usage: '작은 타이틀' },
      { variant: 'body1', xs: '1rem', sm: '1.125rem', md: '1.125rem', lg: '1.125rem', font: 'Body', usage: '본문 텍스트' },
      { variant: 'body2', xs: '0.9375rem', sm: '1rem', md: '1rem', lg: '1rem', font: 'Body', usage: '보조 본문' },
    ];

    // Font Weight 데이터
    const fontWeights = [
      { name: 'Light', token: 'fontWeightLight', value: theme.typography.fontWeightLight },
      { name: 'Regular', token: 'fontWeightRegular', value: theme.typography.fontWeightRegular },
      { name: 'Medium', token: 'fontWeightMedium', value: theme.typography.fontWeightMedium },
      { name: 'Bold', token: 'fontWeightBold', value: theme.typography.fontWeightBold },
    ];

    return (
      <>
        <DocumentTitle
          title="Typography"
          status="Available"
          note="Chandia + Pretendard"
          brandName="Bellite"
          systemName="Design System"
          version="1.0"
        />
        <PageContainer>
          {/* 제목 + 1줄 개요 */}
          <Typography variant="h4" sx={ { fontWeight: 700, mb: 1 } }>
            Typography System
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={ { mb: 4 } }>
            자수 기법을 형상화한 셰리프 필기체와 산세리프 본문 폰트의 조합으로 절제된 우아함을 표현합니다.
          </Typography>

          {/* 폰트 패밀리 */}
          <SectionTitle title="Font Family" description="Bellite 타이포그래피 시스템" />
          <TableContainer sx={ { mb: 4 } }>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={ { fontWeight: 600 } }>Role</TableCell>
                  <TableCell sx={ { fontWeight: 600 } }>Font</TableCell>
                  <TableCell sx={ { fontWeight: 600 } }>Sample</TableCell>
                  <TableCell sx={ { fontWeight: 600 } }>용도</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell sx={ { fontWeight: 600 } }>Display</TableCell>
                  <TableCell sx={ { fontFamily: 'monospace', fontSize: 12 } }>Chandia</TableCell>
                  <TableCell>
                    <Typography sx={ { fontFamily: displayFontFamily, fontSize: 24, fontWeight: 400 } }>
                      Your Daily Encore
                    </Typography>
                  </TableCell>
                  <TableCell sx={ { color: 'text.secondary', fontSize: 13 } }>
                    h1-h4 헤딩, 브랜드 슬로건
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={ { fontWeight: 600 } }>Body</TableCell>
                  <TableCell sx={ { fontFamily: 'monospace', fontSize: 12 } }>Pretendard Variable</TableCell>
                  <TableCell>
                    <Typography sx={ { fontFamily: bodyFontFamily, fontSize: 16 } }>
                      구겨지지 않는 당신의 선을 위해
                    </Typography>
                  </TableCell>
                  <TableCell sx={ { color: 'text.secondary', fontSize: 13 } }>
                    본문, 버튼, 캡션
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          {/* 폰트 선택 이유 */}
          <Box sx={ { p: 3, border: '1px solid', borderColor: 'divider', mb: 4 } }>
            <Typography variant="subtitle2" sx={ { fontWeight: 600, mb: 1 } }>
              폰트 선택 이유
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={ { mb: 1 } }>
              <strong>Chandia:</strong> 자수 기법을 형상화한 셰리프 필기체로, 발레의 우아한 선(Line)을 표현합니다.
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Pretendard:</strong> 한글/영문 혼용에 최적화되어 있으며, 가변 폰트를 지원합니다.
            </Typography>
          </Box>

          {/* 토큰 구조 (트리 뷰) */}
          <SectionTitle title="토큰 구조" description="theme.typography 계층 구조" />
          <Box sx={ { p: 2, border: '1px solid', borderColor: 'divider', mb: 4 } }>
            { Object.entries(tokenStructure).map(([key, value]) => (
              <TreeNode key={ key } keyName={ key } value={ value } defaultOpen />
            )) }
          </Box>

          {/* 반응형 토큰 값 (테이블) */}
          <SectionTitle title="반응형 Typography Scale" description="브레이크포인트별 자동 조정되는 variants (h1-h5, body1-2)" />
          <Box sx={ { p: 2, bgcolor: 'grey.50', border: '1px solid', borderColor: 'divider', mb: 2 } }>
            <Typography variant="body2" color="text.secondary">
              테마 레벨에서 반응형이 적용되어, <code>variant</code>만 지정하면 화면 크기에 따라 자동으로 fontSize가 조정됩니다.
            </Typography>
          </Box>
          <TableContainer sx={ { mb: 4 } }>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={ { fontWeight: 600, py: 1.5 } }>Variant</TableCell>
                  <TableCell sx={ { fontWeight: 600, py: 1.5 } }>Font</TableCell>
                  <TableCell sx={ { fontWeight: 600, py: 1.5, bgcolor: 'grey.100' } }>xs (&lt;600px)</TableCell>
                  <TableCell sx={ { fontWeight: 600, py: 1.5, bgcolor: 'grey.100' } }>sm (600px)</TableCell>
                  <TableCell sx={ { fontWeight: 600, py: 1.5, bgcolor: 'grey.100' } }>md (900px)</TableCell>
                  <TableCell sx={ { fontWeight: 600, py: 1.5, bgcolor: 'grey.100' } }>lg (1200px+)</TableCell>
                  <TableCell sx={ { fontWeight: 600, py: 1.5 } }>용도</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                { responsiveTokenValues.map((row) => (
                  <TableRow key={ row.variant }>
                    <TableCell sx={ { fontFamily: 'monospace', fontSize: 13, py: 2 } }>{ row.variant }</TableCell>
                    <TableCell sx={ { fontSize: 12, py: 2 } }>{ row.font }</TableCell>
                    <TableCell sx={ { fontFamily: 'monospace', fontSize: 12, py: 2, bgcolor: 'grey.50' } }>{ row.xs }</TableCell>
                    <TableCell sx={ { fontFamily: 'monospace', fontSize: 12, py: 2, bgcolor: 'grey.50' } }>{ row.sm }</TableCell>
                    <TableCell sx={ { fontFamily: 'monospace', fontSize: 12, py: 2, bgcolor: 'grey.50' } }>{ row.md }</TableCell>
                    <TableCell sx={ { fontFamily: 'monospace', fontSize: 12, py: 2, bgcolor: 'grey.50' } }>{ row.lg }</TableCell>
                    <TableCell sx={ { color: 'text.secondary', fontSize: 13, py: 2 } }>{ row.usage }</TableCell>
                  </TableRow>
                )) }
              </TableBody>
            </Table>
          </TableContainer>

          {/* 고정 사이즈 토큰 값 (테이블) */}
          <SectionTitle title="고정 Typography Scale" description="화면 크기와 무관하게 고정 사이즈인 variants" />
          <TableContainer sx={ { mb: 4 } }>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={ { fontWeight: 600, py: 1.5 } }>Variant</TableCell>
                  <TableCell sx={ { fontWeight: 600, py: 1.5 } }>Font</TableCell>
                  <TableCell sx={ { fontWeight: 600, py: 1.5 } }>Size</TableCell>
                  <TableCell sx={ { fontWeight: 600, py: 1.5 } }>Weight</TableCell>
                  <TableCell sx={ { fontWeight: 600, py: 1.5 } }>Sample</TableCell>
                  <TableCell sx={ { fontWeight: 600, py: 1.5 } }>용도</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                { tokenValues.map((row) => (
                  <TableRow key={ row.variant }>
                    <TableCell sx={ { fontFamily: 'monospace', fontSize: 13, py: 2 } }>{ row.variant }</TableCell>
                    <TableCell sx={ { fontSize: 12, py: 2 } }>{ row.font }</TableCell>
                    <TableCell sx={ { fontFamily: 'monospace', fontSize: 13, py: 2 } }>{ row.fontSize }</TableCell>
                    <TableCell sx={ { fontFamily: 'monospace', fontSize: 13, py: 2 } }>{ row.fontWeight }</TableCell>
                    <TableCell sx={ { py: 2 } }>
                      <Typography variant={ row.variant }>
                        구겨지지 않는 당신의 선
                      </Typography>
                    </TableCell>
                    <TableCell sx={ { color: 'text.secondary', fontSize: 13, py: 2 } }>{ row.usage }</TableCell>
                  </TableRow>
                )) }
              </TableBody>
            </Table>
          </TableContainer>

          {/* Font Weight 테이블 */}
          <SectionTitle title="Font Weight" description="사용 가능한 폰트 굵기" />
          <TableContainer sx={ { mb: 4 } }>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={ { fontWeight: 600, py: 2 } }>Name</TableCell>
                  <TableCell sx={ { fontWeight: 600, py: 2 } }>Token</TableCell>
                  <TableCell sx={ { fontWeight: 600, py: 2 } }>Value</TableCell>
                  <TableCell sx={ { fontWeight: 600, py: 2 } }>Sample</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                { fontWeights.map((row) => (
                  <TableRow key={ row.token }>
                    <TableCell sx={ { py: 2 } }>{ row.name }</TableCell>
                    <TableCell sx={ { fontFamily: 'monospace', fontSize: 13, py: 2 } }>{ row.token }</TableCell>
                    <TableCell sx={ { fontFamily: 'monospace', fontSize: 13, py: 2 } }>{ row.value }</TableCell>
                    <TableCell sx={ { py: 2 } }>
                      <Box component="span" sx={ { fontWeight: row.value } }>
                        The quick brown fox
                      </Box>
                    </TableCell>
                  </TableRow>
                )) }
              </TableBody>
            </Table>
          </TableContainer>

          {/* 사용 예시 */}
          <SectionTitle title="사용 예시" description="MUI Typography 컴포넌트 활용" />
          <Box
            component="pre"
            sx={ {
              backgroundColor: 'grey.100',
              p: 2,
              fontSize: 12,
              fontFamily: 'monospace',
              overflow: 'auto',
              mb: 4,
            } }
          >
{ `// Display Typography (Chandia)
<Typography variant="h1">Your Daily Encore</Typography>
<Typography variant="h2">Bellite</Typography>

// Body Typography (Pretendard)
<Typography variant="body1">발레가 끝나도, 구겨지지 않는 당신의 선을 위해.</Typography>
<Typography variant="caption">Ballet Pink · Rose Gold</Typography>

// 브랜드 컬러와 함께 사용
<Typography variant="h4" color="secondary">Rose Gold Accent</Typography>
<Typography variant="body2" color="text.secondary">보조 설명 텍스트</Typography>

// sx prop으로 Display 폰트 직접 지정
<Typography sx={{ fontFamily: 'Chandia, serif', fontSize: 32 }}>
  The Unwrinkled Line
</Typography>` }
          </Box>

          {/* Vibe Coding Prompt */}
          <SectionTitle
            title="Vibe Coding Prompt"
            description="AI 코딩 도구에서 활용할 수 있는 프롬프트 예시"
          />
          <Box
            component="pre"
            sx={ {
              backgroundColor: 'grey.900',
              color: 'grey.100',
              p: 2,
              fontSize: 12,
              fontFamily: 'monospace',
              overflow: 'auto',
            } }
          >
{ `/* Bellite 타이포그래피 프롬프트 예시 */

"히어로 헤드라인은 Typography variant='h1'으로 만들어줘.
Chandia 셰리프 필기체 폰트가 적용되어 있어."

"브랜드 슬로건 'Your Daily Encore'는 h2로,
서브 카피는 body1으로 만들어줘."

"제품명은 h4 (Chandia), 카테고리 태그는 overline으로 표시해줘.
overline은 Pretendard, uppercase가 적용돼."

"CTA 버튼 텍스트는 button variant 사용해줘.
fontWeight: 500, Pretendard 폰트가 적용돼."

"sx prop으로 Chandia Decorative 폰트를 사용하려면:
sx={{ fontFamily: 'Chandia Decorative, serif' }}"` }
          </Box>
        </PageContainer>
      </>
    );
  },
};

/** Display vs Body 비교 */
export const FontComparison = {
  name: 'Font Comparison',
  render: () => (
    <>
      <DocumentTitle
        title="Font Comparison"
        status="Available"
        note="Display vs Body fonts"
        brandName="Bellite"
        systemName="Design System"
        version="1.0"
      />
      <PageContainer>
        <Typography variant="h4" sx={ { fontWeight: 700, mb: 1 } }>
          Font Comparison
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={ { mb: 4 } }>
          Display 폰트와 Body 폰트의 시각적 차이를 비교합니다.
        </Typography>

        <SectionTitle title="Display (Chandia)" description="셰리프 필기체 - 헤딩용" />
        <Box sx={ { mb: 4 } }>
          <Typography variant="h2" sx={ { mb: 2 } }>
            Your Daily Encore
          </Typography>
          <Typography variant="h4">
            The Unwrinkled Line
          </Typography>
        </Box>

        <SectionTitle title="Body (Pretendard)" description="한글/영문 본문용" />
        <Box sx={ { mb: 4 } }>
          <Typography variant="body1" sx={ { mb: 2 } }>
            발레가 끝나도, 구겨지지 않는 당신의 선을 위해.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Bellite accompanies your unwrinkled line throughout your daily encore.
          </Typography>
        </Box>

      </PageContainer>
    </>
  ),
};
