import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

/**
 * SectionContainer - 페이지 섹션 컨테이너
 *
 * 페이지 내의 각 섹션을 구분하는 컨테이너입니다.
 * MUI Container 기반으로 반응형 maxWidth와 패딩을 제공합니다.
 *
 * 사용 패턴:
 * 1. 기본 (패딩 + maxWidth): <SectionContainer maxWidth="md">
 * 2. 풀블리드: <SectionContainer maxWidth={false} disableGutters disablePadding>
 * 3. 풀높이: <SectionContainer fullHeight>
 *
 * Props:
 * @param {string} id - 섹션 ID (앵커 링크용) [Optional]
 * @param {node} children - 콘텐츠 [Required]
 * @param {string|false} maxWidth - Container maxWidth ('sm'|'md'|'lg'|'xl'|false) [Optional, 기본값: 'xl']
 * @param {boolean} disableGutters - 좌우 거터(패딩) 제거 [Optional, 기본값: false]
 * @param {boolean} disablePadding - 수직 패딩(py) 제거 [Optional, 기본값: false]
 * @param {number|object} py - 수직 패딩 커스터마이징 [Optional, 기본값: { xs: 4, md: 6 }]
 * @param {number|object} spacing - children 간격 (Stack). null이면 Stack 없이 렌더링 [Optional, 기본값: null]
 * @param {string} bgcolor - 배경색 [Optional]
 * @param {boolean} fullHeight - 100vh 최소 높이 + 중앙 정렬 [Optional, 기본값: false]
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * // 기본 사용
 * <SectionContainer id="about" maxWidth="md">
 *   <Content />
 * </SectionContainer>
 *
 * // 풀블리드 (이미지가 edge-to-edge)
 * <SectionContainer maxWidth={false} disableGutters disablePadding>
 *   <FullWidthImage />
 * </SectionContainer>
 *
 * // 풀높이 + 중앙 정렬
 * <SectionContainer fullHeight bgcolor="brand.urban">
 *   <CenteredContent />
 * </SectionContainer>
 */
export const SectionContainer = ({
  id,
  children,
  maxWidth = 'xl',
  disableGutters = false,
  disablePadding = false,
  py,
  spacing = null,
  bgcolor,
  fullHeight = false,
  sx,
  ...props
}) => {
  // 수직 패딩 결정
  const verticalPadding = disablePadding ? 0 : (py ?? { xs: 4, md: 6 });

  // spacing이 있으면 Stack으로 감싸고, 없으면 children 직접 렌더링
  const content = spacing !== null ? (
    <Stack
      spacing={spacing}
      sx={fullHeight ? { flex: 1, justifyContent: 'center' } : undefined}
    >
      {children}
    </Stack>
  ) : (
    fullHeight ? (
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {children}
      </Box>
    ) : children
  );

  return (
    <Container
      id={id}
      component="section"
      maxWidth={maxWidth}
      disableGutters={disableGutters}
      sx={{
        py: verticalPadding,
        bgcolor,
        ...(fullHeight && {
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }),
        ...sx,
      }}
      {...props}
    >
      {content}
    </Container>
  );
};

