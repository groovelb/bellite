import SignatureSection from './SignatureSection';

export default {
  title: 'Section/Landing/SignatureSection',
  component: SignatureSection,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
## SignatureSection (구겨지지 않는 보관 & 심미적 표현)

Section 3+4 통합: 2x2 그리드 레이아웃으로 이미지와 텍스트를 교차 배치합니다.

### 레이아웃
- 좌상: 이미지 (Archive)
- 우상: 텍스트 (구겨지지 않는 보관)
- 좌하: 텍스트 (심미적 표현)
- 우하: 이미지 (Signature)

### 특징
- FullPageContainer (100vh) 사용
- 이미지/텍스트 교차 배치로 시각적 밸런스
- 스크롤 시 fade-in 애니메이션
- 반응형: 모바일에서는 수직 스택

### 브랜드 메시지
**Archive:**
- 실루엣 뒤에 숨겨진 정교함, 당신의 낭만은 눌리지 않아야 하니까.

**Signature:**
- 입지 않아도 드러나는 내면의 발레코어.

### 데이터 바인딩
- JSON: src/data/landingPageContent.json
        `,
      },
    },
  },
};

/** 기본 - 2x2 그리드 레이아웃 */
export const Default = {
  render: () => <SignatureSection />,
};
