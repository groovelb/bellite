import FooterSection from './FooterSection';

export default {
  title: 'Section/Landing/FooterSection',
  component: FooterSection,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
## FooterSection (Maintain the Line)

Section 6: 브랜드 랜딩 페이지의 클로징 섹션입니다.

### 특징
- 미니멀한 레이아웃
- 페이드 인 애니메이션으로 브랜드 슬로건 노출
- 하단 페이드 아웃 효과로 여운 연출
- Rose Gold 액센트로 브랜드 아이덴티티 강조

### 브랜드 메시지
- H1: Maintain the Line.
- H2: 당신의 모든 순간이 발레가 되도록.

### 데이터 바인딩
- JSON: src/data/landingPageContent.json
        `,
      },
    },
  },
};

/** 기본 - 내부 JSON 데이터 사용 */
export const Default = {
  render: () => <FooterSection />,
};
