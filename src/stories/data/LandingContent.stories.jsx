import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { ChevronDown, FileJson, Layout, Type, Image, Video } from 'lucide-react';
import {
  DocumentTitle,
  PageContainer,
  SectionTitle,
  TreeNode,
} from '../../components/storybookDocumentation';
import landingContent from '../../data/landingPageContent.json';

export default {
  title: 'Data/Landing Content',
  parameters: {
    layout: 'padded',
  },
};

/**
 * 섹션 카드 컴포넌트
 */
const SectionCard = ({ section, index }) => {
  const hasSlides = section.slides?.length > 0;
  const hasPillars = section.pillars?.length > 0;
  const hasStoragePoints = section.storagePoints?.length > 0;
  const hasFloatingObjects = section.floatingObjects?.length > 0;

  return (
    <Accordion
      sx={{
        border: '1px solid',
        borderColor: 'divider',
        '&:before': { display: 'none' },
        mb: 1,
      }}
    >
      <AccordionSummary expandIcon={<ChevronDown size={18} />}>
        <Stack direction="row" spacing={2} alignItems="center" sx={{ width: '100%', pr: 2 }}>
          <Chip
            label={`${index + 1}`}
            size="small"
            sx={{ minWidth: 28, fontFamily: 'monospace' }}
          />
          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
              {section.name}
            </Typography>
            {section.nameKo && (
              <Typography variant="caption" color="text.secondary">
                {section.nameKo}
              </Typography>
            )}
          </Box>
          <Stack direction="row" spacing={0.5}>
            {hasSlides && <Chip label={`${section.slides.length} slides`} size="small" variant="outlined" />}
            {hasPillars && <Chip label={`${section.pillars.length} pillars`} size="small" variant="outlined" />}
            {hasStoragePoints && <Chip label={`${section.storagePoints.length} points`} size="small" variant="outlined" />}
            {hasFloatingObjects && <Chip label={`${section.floatingObjects.length} objects`} size="small" variant="outlined" />}
          </Stack>
        </Stack>
      </AccordionSummary>
      <AccordionDetails sx={{ bgcolor: 'grey.50' }}>
        {/* Content */}
        {section.content && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.secondary', mb: 1, display: 'block' }}>
              Content
            </Typography>
            <TableContainer>
              <Table size="small">
                <TableBody>
                  {Object.entries(section.content).map(([key, value]) => (
                    <TableRow key={key}>
                      <TableCell sx={{ fontFamily: 'monospace', fontSize: 12, width: 120, color: 'secondary.main' }}>
                        {key}
                      </TableCell>
                      <TableCell sx={{ fontSize: 13, whiteSpace: 'pre-wrap' }}>
                        {value}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}

        {/* Slides */}
        {hasSlides && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.secondary', mb: 1, display: 'block' }}>
              Slides ({section.slides.length})
            </Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600, py: 1 }}>ID</TableCell>
                    <TableCell sx={{ fontWeight: 600, py: 1 }}>Title (EN)</TableCell>
                    <TableCell sx={{ fontWeight: 600, py: 1 }}>Title (KO)</TableCell>
                    <TableCell sx={{ fontWeight: 600, py: 1 }}>Media</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {section.slides.map((slide) => (
                    <TableRow key={slide.id}>
                      <TableCell sx={{ fontFamily: 'monospace', fontSize: 12 }}>{slide.id}</TableCell>
                      <TableCell sx={{ fontSize: 13 }}>{slide.titleEn}</TableCell>
                      <TableCell sx={{ fontSize: 13 }}>{slide.titleKo}</TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={0.5}>
                          {slide.image && <Chip icon={<Image size={12} />} label={slide.image} size="small" sx={{ fontSize: 10 }} />}
                          {slide.video && <Chip icon={<Video size={12} />} label={slide.video} size="small" sx={{ fontSize: 10 }} />}
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}

        {/* Pillars */}
        {hasPillars && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.secondary', mb: 1, display: 'block' }}>
              Pillars ({section.pillars.length})
            </Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600, py: 1 }}>ID</TableCell>
                    <TableCell sx={{ fontWeight: 600, py: 1 }}>Title (EN)</TableCell>
                    <TableCell sx={{ fontWeight: 600, py: 1 }}>Title (KO)</TableCell>
                    <TableCell sx={{ fontWeight: 600, py: 1 }}>Icon</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {section.pillars.map((pillar) => (
                    <TableRow key={pillar.id}>
                      <TableCell sx={{ fontFamily: 'monospace', fontSize: 12 }}>{pillar.id}</TableCell>
                      <TableCell sx={{ fontSize: 13 }}>{pillar.titleEn}</TableCell>
                      <TableCell sx={{ fontSize: 13 }}>{pillar.titleKo}</TableCell>
                      <TableCell sx={{ fontFamily: 'monospace', fontSize: 12 }}>{pillar.icon}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}

        {/* Storage Points */}
        {hasStoragePoints && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.secondary', mb: 1, display: 'block' }}>
              Storage Points ({section.storagePoints.length})
            </Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600, py: 1 }}>ID</TableCell>
                    <TableCell sx={{ fontWeight: 600, py: 1 }}>Title</TableCell>
                    <TableCell sx={{ fontWeight: 600, py: 1 }}>Description</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {section.storagePoints.map((point) => (
                    <TableRow key={point.id}>
                      <TableCell sx={{ fontFamily: 'monospace', fontSize: 12 }}>{point.id}</TableCell>
                      <TableCell sx={{ fontSize: 13 }}>{point.title}</TableCell>
                      <TableCell sx={{ fontSize: 13, color: 'text.secondary' }}>{point.description}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}
      </AccordionDetails>
    </Accordion>
  );
};

/**
 * Landing Content 문서
 */
export const Docs = {
  render: () => {
    const { meta, sections } = landingContent;

    return (
      <>
        <DocumentTitle
          title="Landing Content"
          status="Available"
          note="landingPageContent.json"
          brandName="Bellite"
          systemName="Data"
          version="1.0"
        />
        <PageContainer>
          {/* 제목 + 개요 */}
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
            Landing Page Content
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Bellite 랜딩 페이지의 모든 텍스트 콘텐츠를 관리하는 JSON 데이터입니다.
          </Typography>

          {/* 브랜드 메타 정보 */}
          <SectionTitle title="Brand Meta" description="브랜드 기본 정보" />
          <Box sx={{ p: 2, border: '1px solid', borderColor: 'divider', mb: 4 }}>
            <Stack spacing={1}>
              <Stack direction="row" spacing={2}>
                <Typography variant="caption" sx={{ fontWeight: 600, minWidth: 80 }}>Brand</Typography>
                <Typography variant="body2">{meta.brand}</Typography>
              </Stack>
              <Stack direction="row" spacing={2}>
                <Typography variant="caption" sx={{ fontWeight: 600, minWidth: 80 }}>Concept</Typography>
                <Typography variant="body2">{meta.concept}</Typography>
              </Stack>
              <Stack direction="row" spacing={2}>
                <Typography variant="caption" sx={{ fontWeight: 600, minWidth: 80 }}>Description</Typography>
                <Typography variant="body2" color="text.secondary">{meta.description}</Typography>
              </Stack>
            </Stack>
          </Box>

          {/* 섹션 구조 */}
          <SectionTitle title="Sections" description={`${sections.length}개 섹션 구조`} />
          <Box sx={{ mb: 4 }}>
            {sections.map((section, index) => (
              <SectionCard key={section.id} section={section} index={index} />
            ))}
          </Box>

          {/* JSON 구조 트리뷰 */}
          <SectionTitle title="JSON Structure" description="데이터 계층 구조" />
          <Box sx={{ p: 2, border: '1px solid', borderColor: 'divider', mb: 4, maxHeight: 400, overflow: 'auto' }}>
            <TreeNode keyName="landingPageContent" value={landingContent} defaultOpen />
          </Box>

          {/* 파일 경로 및 사용법 */}
          <SectionTitle title="Usage" description="코드에서 사용 방법" />
          <Box
            component="pre"
            sx={{
              backgroundColor: 'grey.100',
              p: 2,
              fontSize: 12,
              fontFamily: 'monospace',
              overflow: 'auto',
              mb: 4,
            }}
          >
{`// JSON 파일 위치
src/data/landingPageContent.json

// Import
import landingContent from '@/data/landingPageContent.json';

// 특정 섹션 데이터 접근
const heroSection = landingContent.sections.find(s => s.id === 'hero');
console.log(heroSection.content.h1); // "Your Daily Encore."

// 슬라이드 데이터 접근
const silhouetteSection = landingContent.sections.find(s => s.id === 'silhouette');
silhouetteSection.slides.forEach(slide => {
  console.log(slide.titleEn, slide.video);
});

// Pillars 데이터 접근
const valuePillars = landingContent.sections.find(s => s.id === 'valuePillars');
valuePillars.pillars.forEach(pillar => {
  console.log(pillar.titleKo, pillar.icon);
});`}
          </Box>

          {/* 섹션 ID 참조 */}
          <SectionTitle title="Section IDs" description="빠른 참조용 섹션 ID 목록" />
          <TableContainer sx={{ mb: 4 }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>Order</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>ID</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Data Keys</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sections.map((section) => (
                  <TableRow key={section.id}>
                    <TableCell>{section.order}</TableCell>
                    <TableCell sx={{ fontFamily: 'monospace', fontSize: 12 }}>{section.id}</TableCell>
                    <TableCell>{section.name}</TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
                        {section.content && <Chip label="content" size="small" sx={{ fontSize: 10 }} />}
                        {section.slides && <Chip label="slides" size="small" sx={{ fontSize: 10 }} />}
                        {section.pillars && <Chip label="pillars" size="small" sx={{ fontSize: 10 }} />}
                        {section.storagePoints && <Chip label="storagePoints" size="small" sx={{ fontSize: 10 }} />}
                        {section.floatingObjects && <Chip label="floatingObjects" size="small" sx={{ fontSize: 10 }} />}
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </PageContainer>
      </>
    );
  },
};
