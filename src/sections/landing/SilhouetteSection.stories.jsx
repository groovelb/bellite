import SilhouetteSection from './SilhouetteSection';

export default {
  title: 'Section/Landing/SilhouetteSection',
  component: SilhouetteSection,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
## SilhouetteSection (무너지지 않는 실루엣)

Section 3: 일상과 발레의 동작이 겹쳐지는 찰나를 가로 스크롤로 표현합니다.

### 특징
- SectionTitle 컴포넌트 사용 (통일된 타이틀 스타일)
- sticky 영역(100vh) 내부에 타이틀 + 슬라이드 수직 중앙 정렬
- 세로 스크롤 → 가로 슬라이드 변환
- 비디오 스크러빙 + 텍스트 오버레이

### 브랜드 메시지
- Title: "Unbroken Line" (영문, Bold)

### Visual Assets (3 슬라이드 × 2 레이어)
- 일상 레이어: 계단, 카페, 지하철
- 발레 오버레이: 레벨레, 폴드브라, 5번 자세

### 데이터 바인딩
- JSON: src/data/landingPageContent.json
- 이미지: src/assets/s2/

### 주의사항
- 스토리북에서는 스크롤 영역이 제한되어 있어 전체 인터랙션을 확인하기 어려울 수 있습니다.
- 실제 페이지에서 테스트하는 것을 권장합니다.
        `,
      },
    },
  },
};

/** 기본 - 내부 JSON 데이터 사용 */
export const Default = {
  render: () => <SilhouetteSection />,
};
