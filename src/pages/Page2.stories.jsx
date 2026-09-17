import Page2 from './Page2';

/**
 * Page2 스토리
 *
 * 라우터 연동 예시용 페이지다. 랜딩 조립에는 쓰이지 않는다.
 */
export default {
  title: 'Page/Page2',
  component: Page2,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

/** 기본 */
export const Default = {
  render: () => <Page2 />,
};
