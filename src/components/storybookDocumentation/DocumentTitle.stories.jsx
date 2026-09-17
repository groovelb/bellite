import { DocumentTitle } from './DocumentTitle';

/**
 * DocumentTitle 스토리
 *
 * Overview 문서 상단의 타이틀 바다. Bellite 문서가 모두 같은 값으로 쓴다.
 */
export default {
  title: 'Custom Component/7. Docs Tools/DocumentTitle',
  component: DocumentTitle,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
};

/** Bellite 문서가 쓰는 값 */
export const Default = {
  args: {
    title: 'Assets',
    status: 'Available',
    note: '폴더별 사진과 영상 전부, 그리고 서체 파일',
    brandName: 'Design System',
    systemName: 'Bellite',
    version: '1.0',
  },
};

/** 상태와 노트를 바꾼 경우 */
export const Draft = {
  args: {
    title: 'Domain Knowledge',
    status: 'Draft',
    note: '학습 자료 정리 중',
    brandName: 'Design System',
    systemName: 'Bellite',
    version: '1.0',
  },
};
