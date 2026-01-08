import { Box } from '@mui/material';
import { GNB } from '../components/navigation/GNB';
import HeroSection from '../sections/landing/HeroSection';
import ValuePillarsSection from '../sections/landing/ValuePillarsSection';
import SilhouetteSection from '../sections/landing/SilhouetteSection';
import InsideMoodSection from '../sections/landing/InsideMoodSection';
import SignatureSection from '../sections/landing/SignatureSection';
import DailyMoodSection from '../sections/landing/DailyMoodSection';
import OriginSection from '../sections/landing/OriginSection';

/**
 * LandingPage - Bellite 브랜드 랜딩 페이지
 *
 * 모든 랜딩 섹션을 순서대로 조합한 전체 페이지 컴포넌트입니다.
 * 상단에 GNB가 고정되어 각 섹션으로 스크롤 앵커 기능을 제공합니다.
 *
 * 섹션 구성 (7개 섹션):
 * 1. HeroSection - 브랜드 아이덴티티 & 미션
 * 2. ValuePillarsSection - 세 가지 약속 (브릿지)
 * 3. SilhouetteSection - 외부의 선: 무너지지 않는 실루엣
 * 4. InsideMoodSection - 내부 오브제 무드보드 (분위기 전환)
 * 5. SignatureSection - 구겨지지 않는 보관 & 심미적 표현
 * 6. OriginSection - 브랜드 기원 (타이포 리빌)
 * 7. FooterSection - 브랜드 클로징
 *
 * Example usage:
 * <LandingPage />
 */
function LandingPage() {
  return (
    <Box
      component="main"
      sx={{
        width: '100%',
        minHeight: '100vh',
        overflowX: 'clip',
      }}
    >
      {/* Global Navigation Bar */}
      <GNB />

      {/* Section 1: Hero - 브랜드 아이덴티티 (비디오 배경) */}
      <Box id="hero">
        <HeroSection backgroundMode="video" />
      </Box>

      {/* Section 2: Value Pillars - 세 가지 약속 (브릿지) */}
      <Box id="valuePillars">
        <ValuePillarsSection />
      </Box>

      {/* Section 3: Silhouette - 외부의 선: 무너지지 않는 실루엣 */}
      <Box id="silhouette">
        <SilhouetteSection />
      </Box>

      {/* Section 4: InsideMood - 내부 오브제 무드보드 (분위기 전환) */}
      <Box id="insideMood">
        <InsideMoodSection />
      </Box>

      {/* Section 5: Signature - 구겨지지 않는 보관 & 심미적 표현 */}
      <Box id="signature">
        <SignatureSection />
      </Box>

      {/* Section 6: Origin - 브랜드 기원 */}
      <Box id="origin">
        <OriginSection />
      </Box>

      {/* Section 7: DailyMood - 브랜드 철학 (브로큰 그리드) */}
      <Box id="dailyMood">
        <DailyMoodSection />
      </Box>
    </Box>
  );
}

export default LandingPage;
