import Container from '@mui/material/Container';

/**
 * ContentArea - 반응형 콘텐츠 영역
 *
 * 섹션 내부에서 콘텐츠의 최대 너비를 제한하고 중앙 정렬합니다.
 * SectionContainer 내부 또는 풀블리드 섹션 내에서 일부 콘텐츠만
 * maxWidth 제한이 필요할 때 사용합니다.
 *
 * Props:
 * @param {node} children - 콘텐츠 [Required]
 * @param {string|false} maxWidth - Container maxWidth ('sm'|'md'|'lg'|'xl'|false) [Optional, 기본값: 'lg']
 * @param {boolean} disableGutters - 좌우 거터(패딩) 제거 [Optional, 기본값: false]
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * // 기본 사용 (maxWidth: lg)
 * <ContentArea>
 *   <Typography>중앙 정렬된 콘텐츠</Typography>
 * </ContentArea>
 *
 * // 좁은 콘텐츠 영역
 * <ContentArea maxWidth="sm">
 *   <Typography>좁은 영역</Typography>
 * </ContentArea>
 *
 * // 풀블리드 섹션 내 일부 콘텐츠만 제한
 * <SectionContainer maxWidth={false} disableGutters>
 *   <FullWidthImage />
 *   <ContentArea maxWidth="md">
 *     <TextContent />
 *   </ContentArea>
 * </SectionContainer>
 */
export const ContentArea = ({
  children,
  maxWidth = 'lg',
  disableGutters = false,
  sx,
  ...props
}) => {
  return (
    <Container
      maxWidth={maxWidth}
      disableGutters={disableGutters}
      sx={sx}
      {...props}
    >
      {children}
    </Container>
  );
};
