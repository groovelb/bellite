import DailyMoodSection from './DailyMoodSection';

/**
 * DailyMoodSection 스토리
 *
 * 랜딩 마지막 구간이다. 브로큰 그리드로 일상 장면 아홉 칸을 겹쳐 놓고
 * 중앙에 출시 예고 문구를 둔다.
 */
export default {
  title: 'Section/Landing/DailyMoodSection',
  component: DailyMoodSection,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

/** 기본 */
export const Default = {
  render: () => <DailyMoodSection />,
};
