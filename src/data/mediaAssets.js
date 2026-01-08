/**
 * Bellite Landing Page Media Assets
 *
 * 랜딩 페이지에서 사용하는 모든 미디어 에셋을 중앙 관리합니다.
 * landingPageContent.json의 섹션 구조와 일치하도록 구성되어 있습니다.
 *
 * 사용법:
 * import { mediaAssets } from '@/data/mediaAssets';
 *
 * // 섹션별 에셋 접근
 * const heroVideo = mediaAssets.hero.video;
 * const silhouetteSlides = mediaAssets.silhouette.slides;
 */

// ============================================================
// Hero Section Assets
// ============================================================
import heroBgImage1 from '../assets/hero/hero_bg_1.jpeg';
import heroBgImage2 from '../assets/hero/hero_bg_2.jpeg';
import heroBgPng from '../assets/hero/hero_bg.png';
import heroBgVideo from '../assets/hero/hero_bg.mp4';
import heroBgVideo3x2 from '../assets/hero/hero_bg_3x2.mp4';
import heroBgVideoOptimized from '../assets/hero/hero_bg_optimized.mp4';

// ============================================================
// Silhouette Section Assets (외부의 선)
// ============================================================
import silhouetteImage1 from '../assets/silhouette/s1.jpeg';
import silhouetteImage2 from '../assets/silhouette/s2.jpeg';
import silhouetteImage3 from '../assets/silhouette/s3.jpeg';
import silhouetteImage4 from '../assets/silhouette/s4.jpeg';
import silhouetteVideo1 from '../assets/silhouette/s1.mp4';
import silhouetteVideo2 from '../assets/silhouette/s2.mp4';
import silhouetteVideo3 from '../assets/silhouette/s3.mp4';
import silhouetteVideo4 from '../assets/silhouette/s4.mp4';
import clothBgPink from '../assets/silhouette/cloth_bg_pink.png';
import productShotBlack from '../assets/silhouette/producut_shot_black_1.png';

// ============================================================
// InsideMood Section Assets (내부 오브제)
// ============================================================
import insideMoodVideo from '../assets/inside-mood/moodbaord.mp4';

// ============================================================
// Signature Section Assets (심미적 표현)
// ============================================================
import signatureAerialShot from '../assets/signature/aerial-shot.jpeg';
import signatureMoodboard1 from '../assets/signature/moodbaord1.jpeg';
import signatureMoodboard2 from '../assets/signature/moodbaord2.jpeg';

// ============================================================
// Media Assets Export
// ============================================================

/**
 * 섹션별 미디어 에셋 매핑
 * landingPageContent.json의 섹션 ID와 일치
 */
export const mediaAssets = {
  // Hero Section
  hero: {
    images: {
      bg1: heroBgImage1,
      bg2: heroBgImage2,
      bgPng: heroBgPng,
    },
    videos: {
      bg: heroBgVideo,
      bg3x2: heroBgVideo3x2,
      bgOptimized: heroBgVideoOptimized,
    },
    // 기본값 (컴포넌트에서 바로 사용)
    image: heroBgImage2,
    video: heroBgVideoOptimized,
  },

  // Silhouette Section (외부의 선)
  silhouette: {
    // 슬라이드별 에셋 (landingPageContent.json의 slides 배열과 매칭)
    slides: {
      crosswalk: { image: silhouetteImage1, video: silhouetteVideo1 },
      subway: { image: silhouetteImage2, video: silhouetteVideo2 },
      cafe: { image: silhouetteImage3, video: silhouetteVideo3 },
      stairs: { image: silhouetteImage4, video: silhouetteVideo4 },
    },
    // 순서 배열 (인덱스로 접근 시)
    slideArray: [
      { id: 'crosswalk', image: silhouetteImage1, video: silhouetteVideo1 },
      { id: 'subway', image: silhouetteImage2, video: silhouetteVideo2 },
      { id: 'cafe', image: silhouetteImage3, video: silhouetteVideo3 },
      { id: 'stairs', image: silhouetteImage4, video: silhouetteVideo4 },
    ],
    // 추가 에셋
    extras: {
      clothBgPink,
      productShotBlack,
    },
  },

  // InsideMood Section (내부 오브제)
  insideMood: {
    video: insideMoodVideo,
  },

  // Signature Section (심미적 표현)
  signature: {
    images: {
      aerialShot: signatureAerialShot,
      moodboard1: signatureMoodboard1,
      moodboard2: signatureMoodboard2,
    },
    // 그리드용 배열
    gridImages: [
      { id: 'aerialShot', src: signatureAerialShot, alt: 'Aerial shot' },
      { id: 'moodboard1', src: signatureMoodboard1, alt: 'Moodboard 1' },
      { id: 'moodboard2', src: signatureMoodboard2, alt: 'Moodboard 2' },
    ],
  },
};

/**
 * 슬라이드 ID로 미디어 가져오기
 * @param {string} slideId - landingPageContent.json의 slide.id
 * @returns {{ image: string, video: string } | undefined}
 */
export const getSilhouetteSlideMedia = (slideId) => {
  return mediaAssets.silhouette.slides[slideId];
};

/**
 * 섹션별 비디오 맵 (VideoScrubbing 등에서 사용)
 * landingPageContent.json의 video 파일명과 실제 import 매핑
 */
export const videoFileMap = {
  // Silhouette section videos
  's1.mp4': silhouetteVideo1,
  's2.mp4': silhouetteVideo2,
  's3.mp4': silhouetteVideo3,
  's4.mp4': silhouetteVideo4,
  // InsideMood section video
  'moodbaord.mp4': insideMoodVideo,
};

/**
 * 이미지 파일명 → import 매핑
 */
export const imageFileMap = {
  // Silhouette section images
  's1.jpeg': silhouetteImage1,
  's2.jpeg': silhouetteImage2,
  's3.jpeg': silhouetteImage3,
  's4.jpeg': silhouetteImage4,
  // Signature section images
  'aerial-shot.jpeg': signatureAerialShot,
  'moodbaord1.jpeg': signatureMoodboard1,
  'moodbaord2.jpeg': signatureMoodboard2,
};

export default mediaAssets;
