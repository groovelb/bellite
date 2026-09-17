/**
 * Bellite 조립 순서 5단계.
 *
 * 08 Domain Knowledge & Research 와 0. Hierarchy 가 같은 목록을 쓴다.
 * 한 곳만 고치면 둘이 함께 바뀐다.
 * id 는 빌드된 storybook-static/index.json 의 id 와 같아야 한다.
 * docs 가 true 인 항목은 MDX 문서라 경로 앞머리가 /docs 다.
 */
export const ASSEMBLY_STEPS = [
  {
    step: 1,
    title: '브랜드 방향',
    what: '브랜드 이름의 뜻, 창업 서사, 지켜야 할 세 약속을 먼저 정한다',
    where: 'docs/bellite/01-project-summary.md (원천: brand-direction.md)',
    stories: [
      { label: '01 Project Summary', id: 'overview-bellite-01-project-summary--docs', docs: true },
      { label: '08 Domain Knowledge', id: 'overview-bellite-08-domain-knowledge-research--default' },
    ],
  },
  {
    step: 2,
    title: '무드 이미지 생성',
    what: '자세 장면, 내부 오브제, 자수 디테일, 일상 무드를 사진과 영상으로 만든다',
    where: 'src/assets/{hero, silhouette, inside-mood, signature, dialy-mood}',
    stories: [
      { label: '07 Assets', id: 'overview-bellite-07-assets--default' },
    ],
  },
  {
    step: 3,
    title: '토큰',
    what: '이미지에서 뽑은 색과 서체, 모션 길이를 테마 토큰으로 고정한다',
    where: 'src/styles/themes/theme.js · src/styles/tokens.js',
    stories: [
      { label: '03 Visual Direction', id: 'overview-bellite-03-visual-direction--docs', docs: true },
      { label: 'Style/Colors', id: 'style-colors--docs' },
    ],
  },
  {
    step: 4,
    title: '섹션',
    what: '구간마다 전용 컴포넌트를 만들고 콘텐츠 파일에서 카피와 미디어를 읽는다',
    where: 'src/sections/landing/*.jsx · src/data/landingPageContent.json',
    stories: [
      { label: '05 Pillar Data', id: 'overview-bellite-05-pillar-data--default' },
      { label: '06 Content Data', id: 'overview-bellite-06-content-data--default' },
      { label: 'HeroSection', id: 'section-landing-herosection--default' },
      { label: 'SilhouetteSection', id: 'section-landing-silhouettesection--default' },
    ],
  },
  {
    step: 5,
    title: '랜딩',
    what: '일곱 구간을 순서대로 세우고 전역 네비를 얹는다',
    where: 'src/pages/LandingPage.jsx · src/App.jsx',
    stories: [
      { label: 'LandingPage', id: 'page-landingpage--default' },
      { label: '0. Hierarchy', id: 'custom-component-0-hierarchy--default' },
      { label: '04 Project Structure', id: 'overview-bellite-04-project-structure--default' },
    ],
  },
];

export default ASSEMBLY_STEPS;
