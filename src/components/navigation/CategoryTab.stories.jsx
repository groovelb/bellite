import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { CategoryTab } from './CategoryTab';
import landingContent from '../../data/landingPageContent.json';

/**
 * CategoryTab 스토리
 *
 * 카테고리 필터 탭이다. 랜딩 구간 목록을 카테고리로 삼아 동작을 보인다.
 */
export default {
  title: 'Custom Component/5. Layout & Shell/CategoryTab',
  component: CategoryTab,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
};

const categories = landingContent.sections.map((section) => ({
  id: section.id,
  label: section.nameKo || section.name,
}));

/** 랜딩 구간을 탭으로 */
export const Default = {
  render: function DefaultRender() {
    const [selected, setSelected] = useState(categories[0].id);
    return (
      <Box>
        <CategoryTab categories={ categories } selected={ selected } onChange={ setSelected } />
        <Typography variant="body2" color="text.secondary">
          선택한 구간: { selected }
        </Typography>
      </Box>
    );
  },
};
